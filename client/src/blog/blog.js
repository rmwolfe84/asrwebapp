// client/src/blog/blog.js

// Use ES Module imports for traditional classes
import BlogForm from './blog-form.js';
import ApprovalQueue from './approval-queue.js';

// Import Lit Element components by using their defined custom elements
import './blog-post-list.js';
import './blog-post-detail.js';
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
        // Create and append the lit-element component
        blogPostList = document.createElement('blog-post-list');
        blogListContainer.appendChild(blogPostList);
        console.log("BlogPostList initialized.");
    } else {
        console.warn("BlogPostList container not found.");
    }

    if (blogDetailContainer) {
        // Create and append the lit-element component
        blogPostDetail = document.createElement('blog-post-detail');
        blogDetailContainer.appendChild(blogPostDetail);
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
            // Call loadPost method on the web component
            if (typeof blogPostDetail.loadPost === 'function') {
                blogPostDetail.loadPost(postId);
            } else {
                // Alternative: set the postId property which will trigger the component to load
                blogPostDetail.postId = postId;
            }
        } else {
            console.warn("BlogPostDetail component not available to display post.");
        }
    });

     document.addEventListener('postApproved', (event) => {
        console.log('Heard postApproved event:', event.detail);
         if (blogPostList) {
            setTimeout(() => {
                // Call refresh method if it exists
                if (typeof blogPostList.refresh === 'function') {
                    blogPostList.refresh();
                } else {
                    // Alternative: dispatch a custom event to the component
                    blogPostList.dispatchEvent(new CustomEvent('refresh-posts', {
                        bubbles: true,
                        composed: true
                    }));
                }
            }, 1000);
         }
    });

    console.log("Blog component system initialization complete.");
} // End of initializeBlogSystem function

// --- NO closing }); from the event listener ---