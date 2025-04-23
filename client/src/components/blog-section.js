import { LitElement, html, css } from 'lit';
import '../blog/blog-container.js';

export class BlogSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 60px 0;
      background-color: var(--section-bg, #f7f7f7);
    }

    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .section-title {
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.5rem;
      color: var(--heading-color, #333);
    }

    .section-title span {
      color: var(--accent-color, #be2026);
    }

    .section-description {
      text-align: center;
      margin-bottom: 30px;
      font-size: 1.1rem;
      color: var(--text-color, #666);
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 2rem;
      }
    }
  `;

  render() {
    return html`
      <section id="blog" class="blog-section">
        <div class="container">
          <h2 class="section-title">Our <span>Blog</span></h2>
          <p class="section-description">
            Stay informed with the latest news, tips, and insights about roofing services 
            and home improvement from our expert team.
          </p>
          
          <!-- Blog container component -->
          <blog-container></blog-container>
        </div>
      </section>
    `;
  }
}

customElements.define('blog-section', BlogSection);