import { LitElement, html, css } from 'lit';
import { initializeScrollBehavior } from '../utils/scroll-utils.js';

export class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    header {
      background-color: var(--body-bg, #fff);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      height: 70px;
      transition: background-color 0.3s ease;
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .logo img {
      height: 50px;
      width: auto;
    }

    nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    nav ul li {
      margin-left: 30px;
    }

    nav ul li a {
      color: var(--text-color, #333);
      font-weight: 500;
      font-size: 1rem;
      position: relative;
      padding-bottom: 5px;
      text-decoration: none;
      transition: all 0.3s ease-in-out;
    }

    nav ul li a:hover {
      color: var(--accent-color, #be2026);
    }

    nav ul li a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--accent-color, #be2026);
      transition: all 0.3s ease-in-out;
    }

    nav ul li a:hover::after {
      width: 100%;
    }

    .mobile-menu-btn {
      display: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: var(--text-color, #333);
    }

    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
      }

      nav ul {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 80%;
        max-width: 300px;
        height: calc(100vh - 70px);
        background-color: var(--body-bg, #fff);
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
      }

      nav ul.active {
        left: 0;
      }

      nav ul li {
        margin: 15px 0;
      }
    }
  `;

  constructor() {
    super();
    this.mobileMenuActive = false;
  }

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
    this.requestUpdate();
  }
  
  firstUpdated() {
    // Initialize smooth scrolling for navigation links
    initializeScrollBehavior(this);
  }

  render() {
    return html`
      <header>
        <div class="container header-container">
          <a href="#" class="logo">
            <img src="https://allsquareroofing.com/wp-content/uploads/2022/05/All-Square-Roofing-Final-Logo-01-2.png" alt="All Square Roofing Logo">
          </a>
          <nav>
            <ul class="${this.mobileMenuActive ? 'active' : ''}">
              <li><a href="#home" @click="${() => this.mobileMenuActive = false}">Home</a></li>
              <li><a href="#about" @click="${() => this.mobileMenuActive = false}">About</a></li>
              <li><a href="#services" @click="${() => this.mobileMenuActive = false}">Services</a></li>
              <li><a href="#testimonials" @click="${() => this.mobileMenuActive = false}">Testimonials</a></li>
              <li><a href="#blog" @click="${() => this.mobileMenuActive = false}">Blog</a></li>
              <li><a href="#contact" @click="${() => this.mobileMenuActive = false}">Contact</a></li>
            </ul>
          </nav>
          <div class="mobile-menu-btn" @click="${this.toggleMobileMenu}">&#9776;</div>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);