import { LitElement, html, css } from 'lit';
import { mainStyles } from '../styles/main-styles.js';

export class TestimonialsSection extends LitElement {
  static styles = [
    mainStyles,
    css`
      :host {
        display: block;
      }

      .testimonials {
        background-color: var(--secondary-color, #f5f5f5);
        padding: 80px 0;
        transition: background-color 0.3s ease;
      }

      .testimonial-slider {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        gap: 30px;
        padding-bottom: 20px;
      }

      .testimonial-slide {
        flex: 0 0 100%;
        scroll-snap-align: start;
        padding: 30px;
        background-color: var(--card-bg, #fff);
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        transition: background-color 0.3s ease;
      }

      .testimonial-content {
        margin-bottom: 20px;
        font-style: italic;
        line-height: 1.6;
        color: var(--text-color, #333);
        transition: color 0.3s ease;
      }

      .testimonial-author {
        font-weight: 700;
        color: var(--text-color, #333);
        transition: color 0.3s ease;
      }

      /* Hide scrollbar for Chrome, Safari and Opera */
      .testimonial-slider::-webkit-scrollbar {
        display: none;
      }

      /* Hide scrollbar for IE, Edge and Firefox */
      .testimonial-slider {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }

      .testimonial-controls {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        gap: 15px;
      }

      .control-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--accent-color, #be2026);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
        font-size: 1.2rem;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background-color: var(--primary-color, #7c7c7c);
      }

      @media (min-width: 768px) {
        .testimonial-slider {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          overflow-x: visible;
        }

        .testimonial-slide {
          flex: 0 0 calc(33.333% - 20px);
        }

        .testimonial-controls {
          display: none;
        }
      }
    `
  ];

  constructor() {
    super();
    this.testimonials = [
      {
        content: "All Square Roofing did an amazing job on our roof replacement. Their team was professional, efficient, and cleaned up thoroughly after the job was complete. We couldn't be happier with the results!",
        author: "John & Sarah Thompson"
      },
      {
        content: "The service from All Square was exceptional from start to finish. They helped us navigate the insurance claim process and made what could have been a stressful experience smooth and easy.",
        author: "Michael Reynolds"
      },
      {
        content: "We had All Square install new gutters and downspouts. The quality of work was outstanding, and their attention to detail impressed us. Would definitely recommend them to friends and family.",
        author: "Emily Wilson"
      }
    ];
  }

  scrollTestimonials(direction) {
    const slider = this.shadowRoot.querySelector('.testimonial-slider');
    const scrollAmount = slider.offsetWidth;
    slider.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }

  render() {
    return html`
      <section id="testimonials" class="testimonials">
        <div class="container">
          <h2 class="section-title">What Our Clients Say</h2>
          
          <div class="testimonial-slider">
            ${this.testimonials.map(testimonial => html`
              <div class="testimonial-slide">
                <p class="testimonial-content">"${testimonial.content}"</p>
                <p class="testimonial-author">- ${testimonial.author}</p>
              </div>
            `)}
          </div>
          
          <div class="testimonial-controls">
            <button class="control-btn" @click="${() => this.scrollTestimonials('prev')}">&#8592;</button>
            <button class="control-btn" @click="${() => this.scrollTestimonials('next')}">&#8594;</button>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('testimonials-section', TestimonialsSection);