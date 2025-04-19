// client/src/blog/blog.js (or wherever you placed it)

// Use ES Module imports
// --- VERIFY THESE PATHS ARE CORRECT relative to blog.js ---
import BlogForm from './BlogForm.js';
import BlogPostList from './BlogPostList.js';
import BlogPostDetail from './BlogPostDetail.js';
import ApprovalQueue from './ApprovalQueue.js';
// import SearchBar from './components/blog/SearchBar.js'; // If used
// import PaginationControls from './components/blog/PaginationControls.js'; // If used

// --- REMOVED the document.addEventListener wrapper ---

// Export the initialization function directly at the top level
export function initializeBlogSystem() {
    console.log("Blog component system initializing...");

    // Find the containers defined in index.html
    const blogFormContainer = document.querySelector('#blog-form-container');
    const blogListContainer = document.querySelector('#blog-list-container');
    const blogDetailContainer = document.querySelector('#blog-detail-container');
    const approvalContainer = document.querySelector('#approval-queue-container');
    // const searchContainer = document.querySelector('#search-bar-container');
    // const paginationContainer = document.querySelector('#pagination-controls-container');

    let blogForm, blogPostList, blogPostDetail, approvalQueue; // searchBar, paginationControls;

    // Initialize components only if their container exists
    if (blogFormContainer) {
        blogForm = new BlogForm(blogFormContainer);
        console.log("BlogForm initialized.");
    } else {
         console.warn("BlogForm container not found.");
    }

    if (blogListContainer) {
        blogPostList = new BlogPostList(blogListContainer);
        console.log("BlogPostList initialized.");
    } else {
        console.warn("BlogPostList container not found.");
    }

    if (blogDetailContainer) {
        blogPostDetail = new BlogPostDetail(blogDetailContainer);
         console.log("BlogPostDetail initialized.");
    } else {
         console.warn("BlogPostDetail container not found.");
    }

     // IMPORTANT: Only initialize ApprovalQueue if the user is likely an admin
     // This check should ideally happen based on server-side authentication info
    if (approvalContainer) {
        approvalQueue = new ApprovalQueue(approvalContainer);
         console.log("ApprovalQueue initialized.");
    }

    // --- Event Listeners for Component Interaction ---
    // These listeners should still work when attached to document
    document.addEventListener('blogSubmitted', (event) => {
        console.log('Heard blogSubmitted event:', event.detail);
        if (approvalQueue) {
             setTimeout(() => approvalQueue.refresh(), 500);
        }
    });

    document.addEventListener('viewPostDetail', (event) => {
        const postId = event.detail;
        console.log('Heard viewPostDetail event for:', postId);
        if (blogPostDetail) {
            blogPostDetail.loadPost(postId);
        } else {
            console.warn("BlogPostDetail component not available to display post.");
        }
    });

     document.addEventListener('postApproved', (event) => {
        console.log('Heard postApproved event:', event.detail);
         if (blogPostList) {
            setTimeout(() => blogPostList.refresh(), 1000);
         }
    });

    console.log("Blog component system initialization complete.");
} // End of initializeBlogSystem function

// --- NO closing }); from the event listener ---