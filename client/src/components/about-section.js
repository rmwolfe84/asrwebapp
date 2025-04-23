import { LitElement, html, css } from 'lit';
import { mainStyles } from '../ui/styles/main-styles.js';

export class AboutSection extends LitElement {
  static styles = [
    mainStyles,
    css`
      :host {
        display: block;
      }

      .about {
        background-color: var(--secondary-color, #f5f5f5);
        padding: 80px 0;
        transition: background-color 0.3s ease;
      }

      .about-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 50px;
      }

      .about-text {
        flex: 1;
      }

      .about-text p {
        margin-bottom: 15px;
        line-height: 1.6;
        color: var(--text-color, #333);
        transition: color 0.3s ease;
      }

      .about-image {
        flex: 1;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      }

      .about-image img {
        width: 100%;
        height: auto;
        display: block;
      }

      @media (max-width: 992px) {
        .about-content {
          flex-direction: column;
        }

        .about-image {
          margin-top: 30px;
        }
      }
    `
  ];

  render() {
    return html`
      <section id="about" class="about">
        <div class="container">
          <h2 class="section-title">About All Square</h2>
          <div class="about-content">
            <div class="about-text">
              <p>All Square is dedicated to serving our customers with unmatched quality, service, and industry knowledge. We employ professional construction technicians who take pride in their work and who put our customers first.</p>
              <p>At All Square, we pride ourselves on being a full-service contractor. We have a vast network of subcontractors that we work with that can complete many other trades including, but not limited to: roofing, solar, windows, siding, gutters, and more.</p>
              <p>Whether it's roofing, windows, solar, or even general contracting, quality is at the center of everything we do. It starts with the manufacturers we partner with and the expert construction professionals we employ, who are highly trained in craftsmanship, OSHA standards, and All Square safety standards.</p>
              <p>That level of care and attention to detail has earned us an A+ BBB rating, and it's what you can expect from us every day on the job.</p>
            </div>
            <div class="about-image">
              <img src="https://source.unsplash.com/random/600x400/?roofing-team" alt="All Square Roofing Team">
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('about-section', AboutSection);