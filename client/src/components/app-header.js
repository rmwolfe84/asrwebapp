import { LitElement, html, css } from 'lit';
import { initializeScrollBehavior } from '../utils/scroll-utils.js';
import { unregisterFromHashUpdates, scrollToSection } from '../utils/hash-handler.js';

export class AppHeader extends LitElement {
  static properties = {
    mobileMenuActive: { type: Boolean },
    activeSection: { type: String }
  };

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

    nav ul li a:hover,
    nav ul li a.active {
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

    nav ul li a:hover::after,
    nav ul li a.active::after {
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
    this.activeSection = window.location.hash ? window.location.hash.substring(1) : 'home';
  }

  connectedCallback() {
    super.connectedCallback();
    // We don't initialize here as shadow DOM might not be ready
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    // Unregister from hash updates when the component is removed
    unregisterFromHashUpdates(this);
  }
  
  firstUpdated() {
    // Initialize after shadow DOM is ready
    console.log('AppHeader shadow DOM ready, initializing scroll behavior');
    initializeScrollBehavior(this);
    
    // Log all navigation links found
    if (this.shadowRoot) {
      const links = this.shadowRoot.querySelectorAll('a[href^="#"]');
      console.log(`Found ${links.length} navigation links in header`);
      links.forEach(link => console.log(`Link: ${link.getAttribute('href')}`));
    }
  }
  
  updated(changedProperties) {
    if (changedProperties.has('activeSection')) {
      console.log('Active section updated to:', this.activeSection);
    }
  }

  // This method is called from hash-handler.js when a section is scrolled to
  setActiveNavItem(sectionId) {
    this.activeSection = sectionId;
    this.requestUpdate();
  }

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
    this.requestUpdate();
  }
  
  handleNavClick(sectionId) {
    this.mobileMenuActive = false;
    this.activeSection = sectionId;
    
    // Directly trigger scrolling to the section
    scrollToSection(sectionId);
  }

  render() {
    return html`
      <header>
        <div class="container header-container">
          <a href="#home" class="logo">
            <img src="/assets/logo/ASR500x500Logo (1024 x 1024 px).png" alt="All Square Roofing Logo">
          </a>
          <nav>
            <ul class="${this.mobileMenuActive ? 'active' : ''}">
              <li><a href="#home" class="${this.activeSection === 'home' ? 'active' : ''}" @click="${() => this.handleNavClick('home')}">Home</a></li>
              <li><a href="#about" class="${this.activeSection === 'about' ? 'active' : ''}" @click="${() => this.handleNavClick('about')}">About</a></li>
              <li><a href="#services" class="${this.activeSection === 'services' ? 'active' : ''}" @click="${() => this.handleNavClick('services')}">Services</a></li>
              <li><a href="#testimonials" class="${this.activeSection === 'testimonials' ? 'active' : ''}" @click="${() => this.handleNavClick('testimonials')}">Testimonials</a></li>
              <li><a href="#blog" class="${this.activeSection === 'blog' ? 'active' : ''}" @click="${() => this.handleNavClick('blog')}">Blog</a></li>
              <li><a href="#contact" class="${this.activeSection === 'contact' ? 'active' : ''}" @click="${() => this.handleNavClick('contact')}">Contact</a></li>
            </ul>
          </nav>
          <div class="mobile-menu-btn" @click="${this.toggleMobileMenu}">&#9776;</div>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);