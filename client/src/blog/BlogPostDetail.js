class BlogPostDetail {
    constructor(containerElement) {
        this.container = containerElement;
        this.container.innerHTML = `
            <h3 class="component-title">Post Detail</h3>
            <div id="post-detail-content">Select a post to view details.</div>
        `;
        this.contentDiv = this.container.querySelector('#post-detail-content');
    }

    // Method to be called by the main blog component when a post is selected
    async loadPost(postId) {
        this.contentDiv.innerHTML = `Loading post ${postId}...`;
        try {
            // You would typically fetch the full post details here using its ID
            // Example: const post = await getPostByIdAPI(postId); // Need to create this API function
            // For now, just simulate:
             const response = await fetch(`/api/posts/${postId}`); // Use existing endpoint
             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
             const post = await response.json();

            this.contentDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p><em>Published: ${new Date(post.publishDate || post.createdAt).toLocaleString()}</em></p>
                <hr>
                <div class="post-full-content">${post.content}</div>
                `;
                // Add CommentSection integration here later if needed
        } catch (error) {
            console.error("Error loading post detail:", error);
            this.contentDiv.innerHTML = `<p class="error">Error loading post: ${error.message}</p>`;
        }
    }

    clear() {
         this.contentDiv.innerHTML = 'Select a post to view details.';
    }
}

export default BlogPostDetail;