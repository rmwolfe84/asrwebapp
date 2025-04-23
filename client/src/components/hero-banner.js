import { LitElement, html, css } from 'lit';
import { mainStyles } from '../styles/main-styles.js';

export class HeroBanner extends LitElement {
  static styles = [
    mainStyles,
    css`
      :host {
        display: block;
      }

      .hero {
        background-color: #1a1a1a;
        color: var(--light-text, #fff);
        padding: 0;
        margin-top: 70px;
        position: relative;
        overflow: hidden;
      }

      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(124, 124, 124, 0.2), rgba(190, 32, 38, 0.8));
        z-index: 1;
      }

      .hero-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 2;
        padding: 80px 20px;
        max-width: 1200px;
        margin: 0 auto;
        min-height: calc(100vh - 70px);
        justify-content: center;
      }

      .hero-content {
        text-align: center;
        max-width: 800px;
      }

      .hero-title {
        font-size: 3rem;
        margin-bottom: 20px;
        animation: fadeInDown 1s;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        margin-bottom: 30px;
        animation: fadeInUp 1s;
      }

      .hero-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 30px;
      }

      .logo-container {
        margin-bottom: 40px;
        width: 300px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        animation: float 6s ease-in-out infinite;
      }

      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-15px);
        }
        100% {
          transform: translateY(0px);
        }
      }

      .logo-circle {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid #be2026;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        animation: pulse 3s ease-in-out infinite;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 0.8;
        }
        50% {
          transform: scale(1.05);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 0.8;
        }
      }

      .logo-inner {
        position: relative;
        width: 220px;
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: white;
        border: 8px solid #be2026;
        z-index: 2;
        padding: 15px;
        box-shadow: 0 10px 30px rgba(190, 32, 38, 0.3);
      }

      .logo-container img {
        max-width: 85%;
        max-height: 85%;
        object-fit: contain;
        display: block;
      }

      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (min-width: 768px) {
        .hero-container {
          flex-direction: row;
          text-align: left;
          justify-content: space-between;
          gap: 40px;
          padding: 0 40px;
        }

        .hero-content {
          text-align: left;
          flex: 1;
          order: 1;
        }

        .logo-container {
          order: 2;
          margin-bottom: 0;
          margin-left: 20px;
        }

        .hero-buttons {
          justify-content: flex-start;
        }
      }

      @media (max-width: 767px) {
        .hero-title {
          font-size: 2.5rem;
        }

        .hero-subtitle {
          font-size: 1.2rem;
        }
        
        .hero-buttons {
          flex-direction: column;
        }
      }
    `
  ];

  render() {
    return html`
      <section id="home" class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-container">
          <div class="logo-container">
            <div class="logo-circle"></div>
            <div class="logo-inner">
              <img src="https://allsquareroofing.com/wp-content/uploads/2022/05/All-Square-Roofing-Final-Logo-01-2.png" alt="All Square Roofing Logo">
            </div>
          </div>
          <div class="hero-content">
            <h1 class="hero-title">Quality Residential & Commercial Roofing Services</h1>
            <p class="hero-subtitle">Serving customers with unmatched quality, service, and industry knowledge</p>
            <div class="hero-buttons">
              <a href="#services" class="btn">OUR SERVICES</a>
              <a href="#contact" class="btn btn-secondary">GET A QUOTE</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-banner', HeroBanner);