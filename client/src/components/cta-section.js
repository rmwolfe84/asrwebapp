import { LitElement, html, css } from 'lit';
import { mainStyles } from '../ui/styles/main-styles.js';

export class CtaSection extends LitElement {
  static styles = [
    mainStyles,
    css`
      :host {
        display: block;
      }

      .cta {
        background: linear-gradient(rgba(190, 32, 38, 0.9), rgba(190, 32, 38, 0.9)), url('https://source.unsplash.com/random/1920x1080/?construction') no-repeat center center/cover;
        color: var(--light-text, #fff);
        text-align: center;
        padding: 80px 0;
      }

      .cta-title {
        font-size: 2.5rem;
        margin-bottom: 20px;
      }

      .cta-text {
        font-size: 1.2rem;
        margin-bottom: 30px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      @media (max-width: 768px) {
        .cta-title {
          font-size: 2rem;
        }

        .cta-text {
          font-size: 1.1rem;
        }
      }
    `
  ];

  render() {
    return html`
      <section class="cta">
        <div class="container">
          <h2 class="cta-title">Your Satisfaction is Our Mission</h2>
          <p class="cta-text">No matter what kind of property you own, we're the team of professionals that will get your project all squared away.</p>
          <a href="#contact" class="btn">Contact Us Today</a>
        </div>
      </section>
    `;
  }
}

customElements.define('cta-section', CtaSection);