// src/blog/blog-post-list.js
import { LitElement, html, css } from 'lit';
import { mainStyles } from '../ui/styles/main-styles.js';
import { getPublishedPostsAPI } from './blog-service.js';

export class BlogPostList extends LitElement {
  static properties = {
    posts: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
    currentPage: { type: Number },
    totalPages: { type: Number }
  };

  static styles = [
    mainStyles,
    css`
      :host {
        display: block;
        margin-bottom: var(--spacing-8, 32px);
      }
      
      .loading, .error {
        padding: var(--spacing-5, 20px);
        text-align: center;
      }
      
      .error {
        color: var(--color-error, #B22222);
      }
      
      .blog-post-item {
        background-color: var(--color-surface-primary, #fff);
        border-radius: var(--border-radius-lg, 8px);
        padding: var(--spacing-5, 20px);
        margin-bottom: var(--spacing-5, 20px);
        box-shadow: var(--shadow-sm, 0 2px 5px rgba(0, 0, 0, 0.1));
        transition: all var(--transition-timing-normal, 0.3s) ease-in-out;
      }
      
      .blog-post-item:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-md, 0 5px 15px rgba(0, 0, 0, 0.1));
      }
      
      .blog-post-title {
        color: var(--color-accent, #be2026);
        margin-top: 0;
        font-size: var(--font-size-xl, 1.25rem);
        font-weight: var(--font-weight-semibold, 600);
      }
      
      .blog-post-date {
        color: var(--color-text-secondary, #666);
        font-size: 0.9em;
        margin-bottom: var(--spacing-2, 8px);
      }
      
      .blog-post-excerpt {
        margin-bottom: var(--spacing-4, 16px);
        color: var(--color-text-primary, #333);
        line-height: var(--line-height-normal, 1.5);
      }
      
      .view-post {
        background-color: var(--color-button-primary-bg, var(--color-primary, #7c7c7c));
        color: var(--color-button-primary-text, #fff);
        border: none;
        padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
        border-radius: var(--border-radius-md, 4px);
        cursor: pointer;
        transition: all var(--transition-timing-normal, 0.3s) ease;
      }
      
      .view-post:hover {
        background-color: var(--color-accent, #be2026);
      }
      
      .pagination {
        display: flex;
        justify-content: center;
        margin-top: var(--spacing-5, 20px);
      }
      
      .pagination button {
        background-color: var(--color-surface-primary, #fff);
        color: var(--color-text-primary, #333);
        border: 1px solid var(--color-border-regular, #ccc);
        padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
        margin: 0 var(--spacing-1, 4px);
        border-radius: var(--border-radius-md, 4px);
        cursor: pointer;
        transition: all var(--transition-timing-normal, 0.3s) ease;
      }
      
      .pagination button:hover {
        background-color: var(--color-surface-secondary, #f0f0f0);
      }
      
      .pagination button:disabled {
        background-color: var(--color-disabled-bg, #e0e0e0);
        color: var(--color-disabled-text, #a0a0a0);
        cursor: not-allowed;
      }
      
      .current-page {
        margin: 0 var(--spacing-2, 8px);
        align-self: center;
      }
      
      .no-posts {
        text-align: center;
        padding: var(--spacing-8, 32px);
        color: var(--color-text-secondary, #666);
      }
    `
  ];

  constructor() {
    super();
    this.posts = [];
    this.loading = true;
    this.error = null;
    this.currentPage = 1;
    this.totalPages = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadPosts();
  }

  async loadPosts(page = 1) {
    this.loading = true;
    this.error = null;
    this.currentPage = page;
    this.requestUpdate();
    
    try {
      const data = await getPublishedPostsAPI(page, 5); // 5 posts per page
      this.posts = data.posts;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
      this.loading = false;
    } catch (error) {
      console.error("Error loading blog posts:", error);
      this.error = error.message;
      this.loading = false;
    }
    
    this.requestUpdate();
  }

  refresh() {
    return this.loadPosts(this.currentPage);
  }

  handlePrevPage() {
    if (this.currentPage > 1) {
      this.loadPosts(this.currentPage - 1);
    }
  }

  handleNextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadPosts(this.currentPage + 1);
    }
  }

  handleViewPost(postId) {
    this.dispatchEvent(new CustomEvent('view-post-detail', {
      detail: postId,
      bubbles: true,
      composed: true
    }));
  }

  renderPosts() {
    if (this.posts.length === 0) {
      return html`<div class="no-posts">No blog posts found.</div>`;
    }
    
    return this.posts.map(post => {
      const date = new Date(post.publishDate || post.createdAt).toLocaleDateString();
      const excerpt = post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '');
      
      return html`
        <div class="blog-post-item">
          <h3 class="blog-post-title">${post.title}</h3>
          <div class="blog-post-date">Published: ${date}</div>
          <div class="blog-post-excerpt">${excerpt}</div>
          <button class="view-post" @click=${() => this.handleViewPost(post._id)}>
            Read More
          </button>
        </div>
      `;
    });
  }

  renderPagination() {
    return html`
      <div class="pagination">
        <button 
          ?disabled=${this.currentPage === 1}
          @click=${this.handlePrevPage}
        >
          Previous
        </button>
        <span class="current-page">
          Page ${this.currentPage} of ${this.totalPages}
        </span>
        <button 
          ?disabled=${this.currentPage === this.totalPages}
          @click=${this.handleNextPage}
        >
          Next
        </button>
      </div>
    `;
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading blog posts...</div>`;
    }
    
    if (this.error) {
      return html`<div class="error">Error loading blog posts: ${this.error}</div>`;
    }
    
    return html`
      <div class="blog-post-list">
        ${this.renderPosts()}
        ${this.totalPages > 1 ? this.renderPagination() : ''}
      </div>
    `;
  }
}

customElements.define('blog-post-list', BlogPostList);