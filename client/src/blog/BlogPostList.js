import { getPublishedPostsAPI } from './BlogService.js';

class BlogPostList {
    constructor(containerElement) {
        this.container = containerElement;
        this.posts = [];
        this.currentPage = 1;
        this.totalPages = 1;
        this.render();
        this.loadPosts(); // Load initial posts
    }

    render() {
        this.container.innerHTML = `
            <h3 class="component-title">Published Posts</h3>
            <div class="list-status" id="blog-list-status"></div>
            <div id="blog-post-list-items" class="post-list"></div>
            <div id="blog-post-list-pagination" class="pagination"></div>
        `;
        this.listItemsContainer = this.container.querySelector('#blog-post-list-items');
        this.paginationContainer = this.container.querySelector('#blog-post-list-pagination');
        this.statusContainer = this.container.querySelector('#blog-list-status');
    }

    setStatus(message, isError = false) {
        this.statusContainer.textContent = message;
        this.statusContainer.className = `list-status ${isError ? 'error' : 'info'}`;
    }

    async loadPosts(page = 1) {
        this.setStatus('Loading posts...');
        this.listItemsContainer.innerHTML = '';
        this.paginationContainer.innerHTML = ''; // Clear old pagination

        try {
            const data = await getPublishedPostsAPI(page);
            this.posts = data.posts;
            this.currentPage = data.currentPage;
            this.totalPages = data.totalPages;

            if (this.posts.length === 0) {
                 this.setStatus('No published posts found.');
            } else {
                this.setStatus(''); // Clear status message
                this.renderPosts();
                this.renderPagination();
            }
        } catch (error) {
            console.error("Error loading published posts:", error);
            this.setStatus(`Error loading posts: ${error.message}`, true);
        }
    }

    renderPosts() {
        this.listItemsContainer.innerHTML = ''; // Clear previous posts
        const postTemplate = document.getElementById('blog-post-template'); // Get template from index.html

        if (!postTemplate) {
            console.error("Blog post template not found!");
            this.listItemsContainer.innerHTML = '<p class="error">Error: Display template missing.</p>';
            return;
        }


        this.posts.forEach(post => {
            const templateClone = postTemplate.content.cloneNode(true);
            templateClone.querySelector('.blog-post-title').textContent = post.title;
            // Display a snippet of the content
            const contentSnippet = post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '');
            templateClone.querySelector('.blog-post-content').textContent = contentSnippet;

            const viewButton = templateClone.querySelector('.view-post');
            viewButton.dataset.postId = post._id; // Add post ID for event handling
            viewButton.addEventListener('click', (e) => this.handleViewPost(e.target.dataset.postId));

            this.listItemsContainer.appendChild(templateClone);
        });
    }

    renderPagination() {
         this.paginationContainer.innerHTML = ''; // Clear previous pagination
         if (this.totalPages <= 1) return; // No pagination needed for 1 or 0 pages

         const createButton = (text, pageNum, isDisabled = false, isActive = false) => {
            const button = document.createElement('button');
            button.textContent = text;
            button.dataset.page = pageNum;
            button.disabled = isDisabled;
            if (isActive) button.classList.add('active');
            button.addEventListener('click', (e) => this.loadPosts(parseInt(e.target.dataset.page)));
            return button;
         };

        // Previous Button
        this.paginationContainer.appendChild(
            createButton('« Prev', this.currentPage - 1, this.currentPage === 1)
        );

        // Page Number Buttons (simplified example)
        for (let i = 1; i <= this.totalPages; i++) {
            this.paginationContainer.appendChild(
                 createButton(i, i, false, i === this.currentPage)
            );
        }

         // Next Button
        this.paginationContainer.appendChild(
            createButton('Next »', this.currentPage + 1, this.currentPage === this.totalPages)
        );
    }

    handleViewPost(postId) {
        console.log('View post requested:', postId);
        // Dispatch an event for the main blog component or detail component to handle
        const event = new CustomEvent('viewPostDetail', { detail: postId, bubbles: true });
        this.container.dispatchEvent(event);
    }

     // Public method to allow refreshing the list from outside (e.g., after a post is published)
    refresh() {
        this.loadPosts(this.currentPage);
    }
}

export default BlogPostList;