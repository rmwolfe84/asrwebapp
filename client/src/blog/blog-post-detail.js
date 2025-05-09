// src/components/blog/blog-post-detail.js
import { LitElement, html, css } from 'lit';
import { mainStyles } from '../ui/styles/main-styles.js';
import { getPostByIdAPI } from './blog-service.js';

export class BlogPostDetail extends LitElement {
  static properties = {
    postId: { type: String },
    post: { type: Object },
    loading: { type: Boolean },
    error: { type: String }
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
      
      .back-button {
        margin-bottom: var(--spacing-5, 20px);
        background-color: var(--primary-color, #7c7c7c);
        color: var(--light-text, #fff);
        border: none;
        padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
        border-radius: var(--border-radius-md, 4px);
        cursor: pointer;
      }
      
      .blog-post-detail {
        background-color: var(--card-bg, #ffffff);
        border-radius: var(--border-radius-lg, 8px);
        padding: var(--spacing-5, 20px);
        box-shadow: var(--shadow-sm, 0 2px 5px rgba(0, 0, 0, 0.1));
      }
      
      .blog-post-title {
        color: var(--accent-color, #be2026);
        margin-bottom: var(--spacing-3, 12px);
      }
      
      .blog-post-date {
        color: var(--text-color, #333333);
        opacity: 0.7;
        font-size: 0.9em;
        margin-bottom: var(--spacing-4, 16px);
      }
      
      .blog-post-content {
        line-height: 1.6;
      }
    `
  ];

  constructor() {
    super();
    this.postId = null;
    this.post = null;
    this.loading = false;
    this.error = null;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    
    // Load the post if postId changes
    if (changedProperties.has('postId') && this.postId) {
      this.loadPost(this.postId);
    }
  }

  async loadPost(postId) {
    if (!postId) return;
    
    this.loading = true;
    this.error = null;
    this.post = null;
    this.requestUpdate();
    
    try {
      const post = await getPostByIdAPI(postId);
      this.post = post;
      this.loading = false;
    } catch (error) {
      console.error(`Error fetching blog post ${postId}:`, error);
      this.error = error.message;
      this.loading = false;
    }
    
    this.requestUpdate();
  }

  closeDetail() {
    this.dispatchEvent(new CustomEvent('close-detail', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading blog post...</div>`;
    }
    
    if (this.error) {
      return html`
        <button class="back-button" @click=${this.closeDetail}>
          Back to Blog List
        </button>
        <div class="error">Error loading blog post: ${this.error}</div>
      `;
    }
    
    if (!this.post) {
      return html`
        <button class="back-button" @click=${this.closeDetail}>
          Back to Blog List
        </button>
        <div>Select a post to view details.</div>
      `;
    }
    
    const postDate = new Date(this.post.publishDate || this.post.createdAt).toLocaleString();
    
    return html`
      <button class="back-button" @click=${this.closeDetail}>
        Back to Blog List
      </button>
      
      <div class="blog-post-detail">
        <header>
          <h2 class="blog-post-title">${this.post.title}</h2>
          <div class="blog-post-date">Published: ${postDate}</div>
        </header>
        
        <div class="blog-post-content">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }

  renderContent() {
    if (!this.post || !this.post.content) return '';
    
    // Simple markdown parser for headers, paragraphs, and lists
    const markdownToHtml = (markdown) => {
      if (!markdown) return '';
      
      // Convert headings (# Heading)
      let html = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
      html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
      html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
      
      // Convert paragraphs (blank lines between text)
      html = html.replace(/^(?!<h[1-3]>)(.+)$/gm, '<p>$1</p>');
      
      // Convert lists (- item)
      html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
      
      // Remove empty paragraphs
      html = html.replace(/<p>\s*<\/p>/g, '');
      
      return html;
    };

    // Using unsafeHTML would be better here with a proper sanitizer,
    // but for now we'll create a template element to parse the HTML
    const template = document.createElement('template');
    template.innerHTML = markdownToHtml(this.post.content);
    
    // Clone the content so we don't modify the original
    return template.content.cloneNode(true);
  }
}

customElements.define('blog-post-detail', BlogPostDetail);