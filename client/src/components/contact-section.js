import { LitElement, html, css } from 'lit';
import { mainStyles } from '../styles/main-styles.js';

export class ContactSection extends LitElement {
  static styles = [
    mainStyles,
    css`
      :host {
        display: block;
      }

      .contact {
        background-color: var(--body-bg, #fff);
        padding: 80px 0;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
      }

      .contact-form {
        background-color: var(--card-bg, #fff);
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: var(--text-color, #333);
      }

      .form-control {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
        background-color: var(--body-bg, #fff);
        color: var(--text-color, #333);
      }

      textarea.form-control {
        min-height: 150px;
        resize: vertical;
      }

      .contact-info {
        padding: 30px;
        color: var(--text-color, #333);
      }

      .contact-item {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }

      .contact-icon {
        font-size: 1.5rem;
        color: var(--accent-color, #be2026);
        margin-right: 15px;
      }

      .contact-info h3 {
        margin-bottom: 20px;
        font-size: 1.5rem;
        color: var(--text-color, #333);
        transition: color 0.3s ease;
      }

      .form-btn {
        width: 100%;
      }
    `
  ];

  handleSubmit(e) {
    e.preventDefault();
    // In a real application, you would handle form submission here
    alert('Form submitted! In a real application, this would send your message to All Square Roofing.');
  }

  render() {
    return html`
      <section id="contact" class="contact">
        <div class="container">
          <h2 class="section-title">Contact Us</h2>
          <div class="contact-grid">
            <div class="contact-form">
              <form @submit="${this.handleSubmit}">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input type="tel" id="phone" class="form-control">
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn form-btn">Send Message</button>
              </form>
            </div>
            <div class="contact-info">
              <h3>Get In Touch</h3>
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                  <p><strong>CORPORATE HEADQUARTERS</strong></p>
                  <p>301 Melton Rd</p>
                  <p>Burns Harbor, IN 46304</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                  <p><strong>AKRON OHIO BRANCH</strong></p>
                  <p>2912 S. Hametown Rd</p>
                  <p>Norton, OH 44203</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <p>844-ROOF-ASR (844-766-3277)</p>
              </div>
              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <p>info@allsquareroofing.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('contact-section', ContactSection);