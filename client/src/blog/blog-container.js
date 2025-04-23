// src/blog/blog-container.js
import { LitElement, html, css } from 'lit';
import { mainStyles } from '../ui/styles/main-styles.js';
import './blog-post-list.js';
import './blog-post-detail.js';

export class BlogContainer extends LitElement {
  static properties = {
    activeView: { type: String },
    selectedPostId: { type: String }
  };

  static styles = [
    mainStyles,
    css`
      :host {
        display: block;
      }
    `
  ];

  constructor() {
    super();
    this.activeView = 'list';
    this.selectedPostId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Listen for view-post-detail events
    this.addEventListener('view-post-detail', this.handleViewPostDetail);
    this.addEventListener('close-detail', this.handleCloseDetail);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Clean up event listeners
    this.removeEventListener('view-post-detail', this.handleViewPostDetail);
    this.removeEventListener('close-detail', this.handleCloseDetail);
  }

  handleViewPostDetail(event) {
    this.selectedPostId = event.detail;
    this.activeView = 'detail';
  }

  handleCloseDetail() {
    this.activeView = 'list';
    this.selectedPostId = null;
  }

  render() {
    return html`
      <div class="blog-container">
        ${this.activeView === 'list' 
          ? html`<blog-post-list></blog-post-list>` 
          : html`<blog-post-detail .postId=${this.selectedPostId}></blog-post-detail>`
        }
      </div>
    `;
  }
}

customElements.define('blog-container', BlogContainer);