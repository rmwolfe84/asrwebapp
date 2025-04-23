import { css } from 'lit';

export const mainStyles = css`
  :host {
    display: block;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-family-secondary, 'Roboto, Arial, sans-serif');
  }

  .container {
    width: 90%;
    max-width: var(--container-max-width, 1200px);
    margin: 0 auto;
    padding: 0 var(--spacing-4, 15px);
  }

  .section-title {
    text-align: center;
    margin-bottom: var(--spacing-12, 50px);
    position: relative;
    color: var(--color-text-primary, #333);
    font-size: var(--font-size-2xl, 1.5rem);
    font-weight: var(--font-weight-bold, 700);
    line-height: var(--line-height-tight, 1.25);
    transition: color var(--transition-timing-normal, 0.3s) ease;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--color-accent, #be2026);
  }

  .btn {
    display: inline-block;
    padding: var(--spacing-3, 12px) var(--spacing-8, 30px);
    background-color: var(--color-button-primary-bg, var(--color-accent, #be2026));
    color: var(--color-button-primary-text, var(--color-text-on-primary, #fff));
    border-radius: var(--border-radius-md, 5px);
    font-weight: var(--font-weight-medium, 500);
    font-size: var(--font-size-lg, 1.1rem);
    transition: all var(--transition-timing-normal, 0.3s) ease-in-out;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    text-align: center;
    min-width: 200px;
  }

  .btn:hover {
    background-color: var(--color-primary-dark, #a01a1f);
    transform: translateY(-3px);
    box-shadow: var(--shadow-md, 0 10px 20px rgba(0, 0, 0, 0.1));
  }

  .btn-secondary {
    background-color: transparent;
    border: var(--border-width-2, 2px) solid var(--color-text-on-primary, #fff);
    color: var(--color-text-on-primary, #fff);
  }

  .btn-secondary:hover {
    background-color: var(--color-text-on-primary, #fff);
    color: var(--color-accent, #be2026);
  }

  /* Blog Styles */
  .blog-post-item {
    background-color: var(--color-surface-primary, #fff);
    border-radius: var(--border-radius-lg, 8px);
    padding: var(--spacing-5, 20px);
    margin-bottom: var(--spacing-5, 20px);
    box-shadow: var(--shadow-sm, 0 2px 5px rgba(0, 0, 0, 0.1));
    transition: all var(--transition-timing-normal, 0.3s) ease-in-out;
  }

  .blog-post-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md, 0 5px 15px rgba(0, 0, 0, 0.1));
  }

  .blog-post-title {
    color: var(--color-accent, #be2026);
    margin-top: 0;
    font-size: var(--font-size-xl, 1.25rem);
    font-weight: var(--font-weight-semibold, 600);
  }

  .blog-post-content {
    margin-bottom: var(--spacing-4, 15px);
    color: var(--color-text-primary, #333);
    line-height: var(--line-height-normal, 1.5);
  }

  .view-post {
    background-color: var(--color-button-primary-bg, var(--color-primary, #7c7c7c));
    color: var(--color-button-primary-text, #fff);
    border: none;
    padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
    border-radius: var(--border-radius-md, 4px);
    cursor: pointer;
    transition: all var(--transition-timing-normal, 0.3s) ease;
  }

  .view-post:hover {
    background-color: var(--color-accent, #be2026);
  }

  /* Social Media Feed Styles */
  .social-feed-container {
    margin-bottom: var(--spacing-10, 40px);
  }

  .social-feed-container h3 {
    color: var(--color-text-primary, #333);
    margin-bottom: var(--spacing-4, 16px);
    font-size: var(--font-size-xl, 1.25rem);
    font-weight: var(--font-weight-semibold, 600);
  }

  .social-media-feed {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-5, 20px);
    margin-top: var(--spacing-5, 20px);
  }

  .instagram-post, .facebook-post {
    flex: 1;
    min-width: 300px;
    max-width: 500px;
    margin-bottom: var(--spacing-5, 20px);
    background-color: var(--color-surface-primary, #fff);
    border-radius: var(--border-radius-md, 4px);
    overflow: hidden;
    box-shadow: var(--shadow-sm, 0 2px 5px rgba(0, 0, 0, 0.1));
  }

  /* Admin Area Styles */
  #admin-area {
    background-color: var(--color-surface-secondary, #f5f5f5);
    padding: var(--spacing-8, 32px) 0;
  }

  #admin-area .section-title {
    color: var(--color-primary, #7c7c7c);
  }

  .form-group {
    margin-bottom: var(--spacing-5, 20px);
  }

  .form-group label {
    display: block;
    margin-bottom: var(--spacing-2, 8px);
    color: var(--color-text-primary, #333);
    font-weight: var(--font-weight-medium, 500);
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: var(--spacing-3, 12px);
    border: var(--border-width-1, 1px) solid var(--color-border-regular, #ccc);
    border-radius: var(--border-radius-md, 4px);
    font-family: var(--font-family-secondary, 'Roboto, Arial, sans-serif');
    font-size: var(--font-size-base, 1rem);
    background-color: var(--color-input-background, #fff);
    color: var(--color-text-primary, #333);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--color-input-focus-border, var(--color-primary, #7c7c7c));
    box-shadow: 0 0 0 var(--focus-ring-width, 2px) var(--color-input-focus-ring, rgba(124, 124, 124, 0.2));
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .btn {
      padding: var(--spacing-2, 10px) var(--spacing-4, 20px);
      font-size: var(--font-size-base, 1rem);
    }
    
    .section-title {
      font-size: var(--font-size-xl, 1.25rem);
    }
    
    .container {
      width: 95%;
    }
  }

  @media (max-width: 576px) {
    .btn {
      display: block;
      margin: var(--spacing-2, 10px) auto;
      width: 80%;
    }

    .btn-secondary {
      margin-left: auto;
    }
    
    .instagram-post, .facebook-post {
      flex: 100%;
    }
  }
`;