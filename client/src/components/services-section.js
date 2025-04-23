import { LitElement, html, css } from 'lit';
import { mainStyles } from '../styles/main-styles.js';

export class ServicesSection extends LitElement {
  static styles = [
    mainStyles,
    css`
      :host {
        display: block;
      }

      .services {
        background-color: var(--body-bg, #fff);
        padding: 80px 0;
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
      }

      .service-card {
        background-color: var(--card-bg, #fff);
        border-radius: 10px;
        padding: 30px;
        text-align: center;
        transition: all 0.3s ease-in-out;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        position: relative;
        top: 0;
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.6s ease-out forwards;
      }
      
      .service-card:nth-child(1) { animation-delay: 0.1s; }
      .service-card:nth-child(2) { animation-delay: 0.2s; }
      .service-card:nth-child(3) { animation-delay: 0.3s; }
      .service-card:nth-child(4) { animation-delay: 0.4s; }
      .service-card:nth-child(5) { animation-delay: 0.5s; }
      .service-card:nth-child(6) { animation-delay: 0.6s; }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .service-card:hover {
        transform: translateY(-15px) scale(1.03);
        box-shadow: 0 15px 30px rgba(190, 32, 38, 0.2);
        z-index: 1;
      }
      
      .service-card::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: var(--accent-color, #be2026);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease-in-out;
        border-radius: 0 0 10px 10px;
      }
      
      .service-card:hover::before {
        transform: scaleX(1);
        transform-origin: left;
      }

      .service-icon {
        font-size: 3rem;
        color: var(--accent-color, #be2026);
        margin-bottom: 20px;
      }

      .service-title {
        margin-bottom: 15px;
        font-size: 1.5rem;
        color: var(--text-color, #333);
        transition: color 0.3s ease;
      }

      .service-card p {
        line-height: 1.6;
        color: var(--text-color, #333);
        transition: color 0.3s ease;
      }
    `
  ];

  render() {
    return html`
      <section id="services" class="services">
        <div class="container">
          <h2 class="section-title">Our Services</h2>
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">🏠</div>
              <h3 class="service-title">Roofing</h3>
              <p>Here at All Square, we are committed to delivering the best product possible to our customers. Our roofing experience and craftsmanship are at the top of the field. It's our people and products that make the difference.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">☀️</div>
              <h3 class="service-title">Solar</h3>
              <p>We provide solar applications that help you reduce your carbon footprint and energy costs. Our team of professionals will work with you to design and install a solar system that meets your energy needs.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🪟</div>
              <h3 class="service-title">Windows</h3>
              <p>We offer vinyl replacement windows with a lifetime warranty. Our windows are energy-efficient and designed to enhance the beauty and value of your home.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🏠</div>
              <h3 class="service-title">Siding</h3>
              <p>All Square also specializes in high-quality exterior siding. If your siding has been damaged from wind or hail, let us help you get it restored.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🌧️</div>
              <h3 class="service-title">Gutters</h3>
              <p>Here at All Square we also have expertise in keeping water away. Old or rusted gutters and downspouts can cause damage to your home.</p>
            </div>
            <div class="service-card">
              <div class="service-icon">🏗️</div>
              <h3 class="service-title">Insurance Claims</h3>
              <p>The insurance claims process can be time-consuming, tedious, and frustrating. Our highly experienced general managers partner with our administrative staff and field supervisors to assist homeowners through every step of the claim process.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('services-section', ServicesSection);