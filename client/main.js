// Client entry point
import './src/style.css';
import './src/ui/styles/main-styles.js';
import './src/ui/themes/theme-bridge.css';

// Import utilities
import './src/utils/scroll-utils.js';

// Import roofing website components
import './src/components/app-header.js';
import './src/components/hero-banner.js';
import './src/components/about-section.js';
import './src/components/services-section.js';
import './src/components/cta-section.js';
import './src/components/testimonials-section.js';
import './src/components/blog-section.js';
import './src/components/contact-section.js';
import './src/components/app-footer.js';
import './src/components/theme-toggle.js';

// Import blog system
import { initializeBlogSystem } from './src/blog/blog.js';
import { ThemeManager } from './src/ui/themes/ThemeManager.js';

// Import social media integration
import { SocialMediaIntegration } from './src/social-media/SocialMediaIntegration.js';

// Initialize theme manager
const themeManager = ThemeManager.getInstance();

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log('All Square Roofing website initialized');
  
  // Check for saved theme preference or use default light theme
  const savedTheme = localStorage.getItem('asr-theme-mode') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Apply the theme class to body as well for our CSS bridge
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (savedTheme === 'colorblind') {
    document.body.classList.add('colorblind-mode');
  }
  
  // Initialize blog system
  initializeBlogSystem();
  
  // Initialize social media feeds
  const socialMediaManager = new SocialMediaIntegration();
  socialMediaManager.initialize({
    instagramPosts: [
      'https://www.instagram.com/p/EXAMPLE_POST_ID_1/',
      'https://www.instagram.com/p/EXAMPLE_POST_ID_2/'
    ],
    facebookPosts: [
      'https://www.facebook.com/example/posts/123456789',
      'https://www.facebook.com/example/posts/987654321'
    ]
  });
  
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
  });
  
  // Select elements to animate on scroll
  setTimeout(() => {
    document.querySelectorAll('.section-title, .about-text p, .contact-form, .contact-info, .blog-post-item').forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }, 500);
  
  // Add event listeners for blog post interactions
  document.addEventListener('viewPostDetail', (event) => {
    const postId = event.detail;
    const blogListContainer = document.getElementById('blog-list-container');
    const blogDetailContainer = document.getElementById('blog-detail-container');
    
    if (blogListContainer && blogDetailContainer) {
      blogListContainer.style.display = 'none';
      blogDetailContainer.style.display = 'block';
    }
  });
  
  // Add event listener for theme changes to update body classes
  document.addEventListener('themechanged', (event) => {
    // Remove all theme classes
    document.body.classList.remove('dark-mode', 'colorblind-mode');
    
    // Add the appropriate class based on the new theme
    if (event.detail.mode === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (event.detail.mode === 'colorblind') {
      document.body.classList.add('colorblind-mode');
    }
  });
  
  // Check if user is admin and show admin area if needed
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (isAdmin) {
    const adminArea = document.getElementById('admin-area');
    if (adminArea) {
      adminArea.style.display = 'block';
    }
  }
});