import { LitElement, html, css } from 'lit';

export class ThemeToggle extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .theme-toggle {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 100;
      background-color: var(--primary-color);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    }

    .theme-toggle:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .sun, .moon {
      width: 24px;
      height: 24px;
      transition: all 0.3s ease;
    }

    .sun {
      color: #ffd700;
      display: none;
    }

    .moon {
      color: #ffffff;
      display: block;
    }

    :host([theme="dark"]) .sun {
      display: block;
    }

    :host([theme="dark"]) .moon {
      display: none;
    }
  `;

  static properties = {
    theme: {
      type: String,
      reflect: true
    }
  };

  constructor() {
    super();
    this.theme = localStorage.getItem('theme') || 'light';
  }

  connectedCallback() {
    super.connectedCallback();
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  render() {
    return html`
      <div class="theme-toggle" @click="${this.toggleTheme}" title="Toggle dark/light mode">
        <svg class="moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg class="sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </div>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle);