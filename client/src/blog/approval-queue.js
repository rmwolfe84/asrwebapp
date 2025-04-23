import { getPendingPostsAPI, approveDenyPostAPI } from './blog-service.js';

class ApprovalQueue {
    constructor(containerElement) {
        this.container = containerElement;
        this.posts = [];
        this.currentPage = 1;
        this.totalPages = 1;
        this.render();
        this.loadPendingPosts(); // Load initial posts
    }

    render() {
        this.container.innerHTML = `
            <h3 class="component-title">Pending Approval Queue</h3>
            <div class="list-status" id="approval-queue-status"></div>
            <div id="approval-queue-list-items" class="post-list approval-queue"></div>
            <div id="approval-queue-pagination" class="pagination"></div>
        `;
        this.listItemsContainer = this.container.querySelector('#approval-queue-list-items');
        this.paginationContainer = this.container.querySelector('#approval-queue-pagination');
        this.statusContainer = this.container.querySelector('#approval-queue-status');
    }

     setStatus(message, isError = false) {
        this.statusContainer.textContent = message;
        this.statusContainer.className = `list-status ${isError ? 'error' : 'info'}`;
    }

    async loadPendingPosts(page = 1) {
        this.setStatus('Loading pending posts...');
        this.listItemsContainer.innerHTML = '';
        this.paginationContainer.innerHTML = '';

        try {
            // IMPORTANT: Server must protect the '/api/approvals/pending' endpoint
            const data = await getPendingPostsAPI(page);
            this.posts = data.posts;
            this.currentPage = data.currentPage;
            this.totalPages = data.totalPages;

            if (this.posts.length === 0) {
                this.setStatus('No posts pending approval.');
            } else {
                this.setStatus('');
                this.renderPendingPosts();
                this.renderPagination();
            }
        } catch (error) {
            console.error("Error loading pending posts:", error);
             this.setStatus(`Error: ${error.message}`, true); // Show unauthorized errors etc.
             // Optionally hide the component or redirect if unauthorized
        }
    }

    renderPendingPosts() {
        this.listItemsContainer.innerHTML = ''; // Clear previous posts
        this.posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('approval-item');
            postDiv.dataset.postId = post._id;

            // Format dates nicely (optional, consider a helper function)
            const createdAt = new Date(post.createdAt).toLocaleString();
            const publishDate = post.publishDate ? new Date(post.publishDate).toLocaleString() : 'Not scheduled';

            postDiv.innerHTML = `
                <div class="approval-item-header">
                    <strong class="approval-item-title">${post.title}</strong>
                    <span class="approval-item-date">Submitted: ${createdAt}</span>
                    <span class="approval-item-schedule">Scheduled: ${publishDate}</span>
                </div>
                <div class="approval-item-content">${post.content.substring(0, 200)}...</div>
                <div class="approval-item-actions">
                    <button class="button approve-button">Approve</button>
                    <button class="button deny-button">Deny</button>
                    <input type="datetime-local" class="approval-publish-date" title="Override schedule date on approval">
                    <span class="action-status"></span>
                 </div>
            `;

             const approveButton = postDiv.querySelector('.approve-button');
             const denyButton = postDiv.querySelector('.deny-button');
             const publishDateInput = postDiv.querySelector('.approval-publish-date');
             const actionStatus = postDiv.querySelector('.action-status');


             approveButton.addEventListener('click', () => this.handleAction(post._id, 'approve', publishDateInput.value || null, actionStatus, postDiv));
             denyButton.addEventListener('click', () => this.handleAction(post._id, 'deny', null, actionStatus, postDiv));


            this.listItemsContainer.appendChild(postDiv);
        });
    }

    renderPagination() {
        // (Similar pagination logic as BlogPostList, but call loadPendingPosts)
        this.paginationContainer.innerHTML = '';
        if (this.totalPages <= 1) return;

        const createButton = (text, pageNum, isDisabled = false, isActive = false) => {
            const button = document.createElement('button');
            button.textContent = text;
            button.dataset.page = pageNum;
            button.disabled = isDisabled;
            if (isActive) button.classList.add('active');
            // Use loadPendingPosts for pagination clicks
            button.addEventListener('click', (e) => this.loadPendingPosts(parseInt(e.target.dataset.page)));
            return button;
         };

        this.paginationContainer.appendChild(createButton('« Prev', this.currentPage - 1, this.currentPage === 1));
        for (let i = 1; i <= this.totalPages; i++) {
            this.paginationContainer.appendChild(createButton(i, i, false, i === this.currentPage));
        }
        this.paginationContainer.appendChild(createButton('Next »', this.currentPage + 1, this.currentPage === this.totalPages));
    }


    async handleAction(postId, action, publishDate, statusElement, itemElement) {
        statusElement.textContent = 'Processing...';
        statusElement.className = 'action-status info';
        itemElement.querySelectorAll('button').forEach(btn => btn.disabled = true); // Disable buttons

        try {
            const result = await approveDenyPostAPI(postId, action, publishDate);
            statusElement.textContent = `${action.charAt(0).toUpperCase() + action.slice(1)}d successfully!`;
             statusElement.className = 'action-status success';
             // Remove the item from the queue visually after a short delay
             setTimeout(() => {
                 itemElement.style.opacity = '0';
                 itemElement.style.transition = 'opacity 0.5s ease-out';
                 setTimeout(() => {
                    itemElement.remove();
                    // Optionally reload if list becomes empty or to ensure consistency
                     if (this.listItemsContainer.children.length === 0) {
                        this.loadPendingPosts(this.currentPage > 1 ? this.currentPage -1 : 1); // Go to prev page if current is now empty
                     }
                 }, 500); // Wait for fade out
             }, 1500); // Wait a bit after success message

            // Dispatch an event if approved, so BlogPostList might refresh
            if (action === 'approve') {
                 const event = new CustomEvent('postApproved', { detail: result.post, bubbles: true });
                 this.container.dispatchEvent(event);
            }

        } catch (error) {
            console.error(`Error ${action}ing post ${postId}:`, error);
            statusElement.textContent = `Error: ${error.message}`;
            statusElement.className = 'action-status error';
            itemElement.querySelectorAll('button').forEach(btn => btn.disabled = false); // Re-enable buttons on error
        }
    }

     // Public method to allow refreshing the list
    refresh() {
        this.loadPendingPosts(this.currentPage);
    }
}

export default ApprovalQueue;