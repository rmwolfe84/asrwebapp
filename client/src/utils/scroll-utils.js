import { scrollToSection, registerForHashUpdates } from './hash-handler.js';

/**
 * Initializes smooth scrolling behavior for navigation links in Lit components
 * @param {LitElement} element - The Lit component containing navigation links
 */
export function initializeScrollBehavior(element) {
  // Register the component with the hash handler if it has the required method
  if (element.setActiveNavItem) {
    registerForHashUpdates(element);
  }
  
  // For Lit components, wait for the shadow DOM to be ready
  if (element.updateComplete) {
    element.updateComplete.then(() => {
      setupEventListeners(element);
    });
  } else {
    // For non-Lit components, just set up listeners directly
    setupEventListeners(element);
  }
}

/**
 * Sets up click event listeners for hash links within a component's shadow DOM
 * @param {Element} element - The element containing navigation links
 */
function setupEventListeners(element) {
  // Only proceed if the element has a shadow root
  if (!element.shadowRoot) {
    console.warn('Element has no shadow root:', element);
    return;
  }
  
  // Get all hash links in shadow DOM
  const links = element.shadowRoot.querySelectorAll('a[href^="#"]');
  
  // Add click handlers
  links.forEach(link => {
    // Remove any existing listeners first to prevent duplicates
    link.removeEventListener('click', handleLinkClick);
    link.addEventListener('click', handleLinkClick);
  });
}

/**
 * Handle click events on hash links
 * @param {Event} e - The click event
 */
function handleLinkClick(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href').substring(1);
  console.log('Navigation link clicked:', targetId);
  
  // Scroll to the target section
  scrollToSection(targetId);
  
  // Find the nearest component with a mobile menu and close it
  let element = this;
  while (element && !element.tagName?.includes('-')) {
    element = element.parentElement;
  }
  
  // If we found a custom element, try to close its mobile menu
  if (element && element.mobileMenuActive !== undefined) {
    element.mobileMenuActive = false;
    element.requestUpdate?.();
  }
}