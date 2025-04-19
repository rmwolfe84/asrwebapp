// website-root/js/components/blog/BlogService.js

/** Calls the backend to generate blog content based on a prompt. */
const generateBlogContentAPI = async (prompt) => {
    try {
        const response = await fetch('/api/generate-blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.content; // Assuming the AI returns the content in a 'content' field
    } catch (error) {
        console.error("Error generating blog content:", error);
        throw error; // Re-throw to be caught by the caller
    }
};

/** Submits a generated blog post for approval. */
const submitBlogPostAPI = async (postData) => {
    // postData should contain { title, content, prompt, publishDate? }
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        return await response.json(); // Returns { message, post }
    } catch (error) {
        console.error("Error submitting blog post:", error);
        throw error;
    }
};

/** Fetches published blog posts. */
const getPublishedPostsAPI = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        return await response.json(); // Returns { posts, currentPage, totalPages, totalPosts }
    } catch (error) {
        console.error("Error fetching published posts:", error);
        throw error;
    }
};

/** Fetches pending blog posts for approval. */
const getPendingPostsAPI = async (page = 1, limit = 10) => {
    try {
        // IMPORTANT: This endpoint on the server MUST be protected
        const response = await fetch(`/api/approvals/pending?page=${page}&limit=${limit}`);
        if (!response.ok) {
             if (response.status === 401 || response.status === 403) {
                 throw new Error("Unauthorized: You need to be logged in as an admin.");
             }
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        return await response.json(); // Returns { posts, currentPage, totalPages, totalPosts }
    } catch (error) {
        console.error("Error fetching pending posts:", error);
        throw error;
    }
};

/** Approves or denies a post. */
const approveDenyPostAPI = async (postId, action, publishDate = null) => {
    // action should be 'approve' or 'deny'
     try {
        // IMPORTANT: This endpoint on the server MUST be protected
        const body = { action };
        if (action === 'approve' && publishDate) {
            body.publishDate = publishDate;
        }
        const response = await fetch(`/api/approvals/${postId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                 throw new Error("Unauthorized: You need to be logged in as an admin.");
             }
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        return await response.json(); // Returns { message, post }
    } catch (error) {
        console.error(`Error ${action}ing post ${postId}:`, error);
        throw error;
    }
}


// Export functions for use in components
// Note: Using export syntax for ES Modules, adjust if sticking strictly to CommonJS on client-side
export {
    generateBlogContentAPI,
    submitBlogPostAPI,
    getPublishedPostsAPI,
    getPendingPostsAPI,
    approveDenyPostAPI
};