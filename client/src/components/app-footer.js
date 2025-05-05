import { LitElement, html, css } from 'lit';

export class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    footer {
      background-color: var(--dark-bg, #2c2c2c);
      color: var(--light-text, #fff);
      padding: 50px 0 20px;
    }

    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-bottom: 30px;
    }

    .footer-logo {
      margin-bottom: 20px;
    }
    
    .footer-logo img {
      max-height: 60px;
      width: auto;
    }

    .footer-about p {
      line-height: 1.6;
      margin-bottom: 20px;
      color: #bbb;
    }

    .footer-links h3 {
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 10px;
      color: var(--light-text, #fff);
    }

    .footer-links h3::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background-color: var(--accent-color, #be2026);
    }

    .footer-links ul {
      list-style: none;
    }

    .footer-links ul li {
      margin-bottom: 10px;
    }

    .footer-links ul li a {
      color: #bbb;
      transition: all 0.3s ease-in-out;
      text-decoration: none;
    }

    .footer-links ul li a:hover {
      color: var(--accent-color, #be2026);
      padding-left: 5px;
    }

    .social-links {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }

    .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--light-text, #fff);
      font-size: 1.2rem;
      transition: all 0.3s ease-in-out;
      text-decoration: none;
    }

    .social-link:hover {
      background-color: var(--accent-color, #be2026);
      transform: translateY(-3px);
    }

    .copyright {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #444;
      color: #bbb;
    }
  `;

  getCurrentYear() {
    return new Date().getFullYear();
  }

  render() {
    return html`
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-about">
              <div class="footer-logo">
                <img src="/assets/logo/ASR500x500Logo (1024 x 1024 px).png" alt="All Square Roofing Logo">
              </div>
              <p>We are dedicated to serving our customers with unmatched quality, service, and industry knowledge. No matter what kind of property you own, we're the team of professionals that will get your project all squared away.</p>
              <div class="social-links">
                <a href="#" class="social-link" aria-label="Facebook">f</a>
                <a href="#" class="social-link" aria-label="Twitter">t</a>
                <a href="#" class="social-link" aria-label="Instagram">i</a>
                <a href="#" class="social-link" aria-label="LinkedIn">ln</a>
              </div>
            </div>
            <div class="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div class="footer-links">
              <h3>Services</h3>
              <ul>
                <li><a href="#services">Roofing</a></li>
                <li><a href="#services">Solar</a></li>
                <li><a href="#services">Windows</a></li>
                <li><a href="#services">Siding</a></li>
                <li><a href="#services">Gutters</a></li>
                <li><a href="#services">Insurance Claims</a></li>
              </ul>
            </div>
            <div class="footer-links">
              <h3>Contact Info</h3>
              <ul>
                <li>301 Melton Rd, Burns Harbor, IN 46304</li>
                <li>844-ROOF-ASR (844-766-3277)</li>
                <li>info@allsquareroofing.com</li>
              </ul>
            </div>
          </div>
          <div class="copyright">
            <p>&copy; ${this.getCurrentYear()} All Square Roofing. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);