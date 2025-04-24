/**
 * Bootstrap stages enum
 * @enum {number}
 */
const BootstrapStage = {
  INITIALIZED: 0,      // Handler has been initialized
  LOADED: 1,           // DOMContentLoaded has fired
  FULLY_LOADED: 2,     // window.load has fired
  READY: 3             // All components are ready
};

/**
 * HashHandler - Singleton class to manage hash-based navigation
 */
class HashHandler {
  constructor() {
    // Singleton pattern
    if (HashHandler.instance) {
      return HashHandler.instance;
    }
    
    HashHandler.instance = this;
    
    // Initialize properties
    this.components = new Set();
    this.currentSection = window.location.hash ? window.location.hash.substring(1) : 'home';
    this.bootstrapStage = BootstrapStage.INITIALIZED;
    
    // Bind methods
    this.handleHashChange = this.handleHashChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.processHash = this.processHash.bind(this);
    
    // Initialize event listeners
    this.initEventListeners();
    
    console.log('HashHandler initialized with current section:', this.currentSection);
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Handle hash changes
    window.addEventListener('hashchange', this.handleHashChange);
    
    // Handle scroll events to update active section
    window.addEventListener('scroll', this.handleScroll);
    
    // DOM ready event
    document.addEventListener('DOMContentLoaded', () => {
      this.bootstrapStage = BootstrapStage.LOADED;
      console.log('Bootstrap stage:', 'LOADED');
      this.processHash();
    });
    
    // Window fully loaded event
    window.addEventListener('load', () => {
      this.bootstrapStage = BootstrapStage.FULLY_LOADED;
      console.log('Bootstrap stage:', 'FULLY_LOADED');
      this.processHash();
      
      // Set final ready state after a delay to ensure all components are mounted
      setTimeout(() => {
        this.bootstrapStage = BootstrapStage.READY;
        console.log('Bootstrap stage:', 'READY');
        this.processHash();
      }, 500);
    });
    
    // Immediate check for hash
    this.processHash();
    
    // Additional check after a short delay
    setTimeout(this.processHash, 50);
  }
  
  /**
   * Process the current hash in the URL
   */
  processHash() {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      console.log(`Processing hash: ${sectionId}, bootstrap stage: ${this.bootstrapStage}`);
      
      // Different behavior based on bootstrap stage
      switch (this.bootstrapStage) {
        case BootstrapStage.INITIALIZED:
          // Just update the current section, don't scroll yet
          this.currentSection = sectionId;
          break;
          
        case BootstrapStage.LOADED:
          // DOM is ready, try to scroll but allow for components still loading
          this.scrollToSection(sectionId, true);
          break;
          
        case BootstrapStage.FULLY_LOADED:
        case BootstrapStage.READY:
          // Everything should be ready, scroll with confidence
          this.scrollToSection(sectionId, true);
          break;
      }
    }
  }
  
  /**
   * Handle hash change events
   */
  handleHashChange() {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      console.log('Hash changed to:', sectionId);
      
      // Always use smooth scrolling for user-initiated hash changes
      this.scrollToSection(sectionId, false);
    }
  }
  
  /**
   * Handle scroll events to update active section
   */
  handleScroll() {
    // Skip if we're not fully bootstrapped
    if (this.bootstrapStage < BootstrapStage.LOADED) return;
    
    // Throttle scroll events
    if (this.scrollTimeout) return;
    
    this.scrollTimeout = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      if (sections.length === 0) return;
      
      // Current scroll position with offset for header
      const scrollPos = window.scrollY + 100;
      let activeFound = false;
      
      // Find which section is currently in view
      for (const section of sections) {
        const sectionId = section.id;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Check if section is in view
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          if (this.currentSection !== sectionId) {
            this.currentSection = sectionId;
            
            // Update URL without triggering scroll
            if (this.bootstrapStage >= BootstrapStage.FULLY_LOADED) {
              history.replaceState(null, null, `#${sectionId}`);
              this.updateComponents(sectionId);
            }
          }
          activeFound = true;
          break;
        }
      }
      
      // Handle edge cases (scrolled before first or after last section)
      if (!activeFound && this.bootstrapStage >= BootstrapStage.FULLY_LOADED) {
        const firstSection = sections[0];
        const lastSection = sections[sections.length - 1];
        
        if (scrollPos < firstSection.offsetTop && this.currentSection !== firstSection.id) {
          this.currentSection = firstSection.id;
          history.replaceState(null, null, `#${firstSection.id}`);
          this.updateComponents(firstSection.id);
        } else if (scrollPos >= lastSection.offsetTop + lastSection.offsetHeight && 
                  this.currentSection !== lastSection.id) {
          this.currentSection = lastSection.id;
          history.replaceState(null, null, `#${lastSection.id}`);
          this.updateComponents(lastSection.id);
        }
      }
      
      this.scrollTimeout = null;
    }, 100);
  }
  
  /**
   * Scroll to a specific section
   * @param {string} sectionId - ID of the section to scroll to
   * @param {boolean} immediate - Whether to use immediate or smooth scrolling
   */
  scrollToSection(sectionId, immediate = false) {
    // We'll just rely on the section ID being directly on the host element
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
      console.log(`Scrolling to section: ${sectionId}, immediate: ${immediate}`);
      
      // Update current section
      this.currentSection = sectionId;
      this.updateComponents(sectionId);
      
      // Calculate position accounting for fixed header
      const headerHeight = 70;
      const offsetPosition = targetElement.offsetTop - headerHeight;
      
      // Perform the scroll
      try {
        window.scrollTo({
          top: offsetPosition,
          behavior: immediate ? 'auto' : 'smooth'
        });
      } catch (error) {
        // Fallback for browsers that don't support smooth scrolling
        window.scrollTo(0, offsetPosition);
      }
      
      // Update URL if this wasn't triggered by a hashchange event
      if (!immediate) {
        history.pushState(null, null, `#${sectionId}`);
      }
    } else {
      console.warn(`Target section not found: ${sectionId}`);
    }
  }
  
  /**
   * Register a component to receive active section updates
   * @param {Object} component - Component with setActiveNavItem method
   */
  registerComponent(component) {
    if (component && typeof component.setActiveNavItem === 'function') {
      this.components.add(component);
      console.log('Component registered with hash handler');
      
      // Update the component with current section
      component.setActiveNavItem(this.currentSection);
    }
  }
  
  /**
   * Unregister a component
   * @param {Object} component - Component to unregister
   */
  unregisterComponent(component) {
    if (this.components.has(component)) {
      this.components.delete(component);
      console.log('Component unregistered from hash handler');
    }
  }
  
  /**
   * Update all registered components with active section
   * @param {string} sectionId - ID of the active section
   */
  updateComponents(sectionId) {
    this.components.forEach(component => {
      if (typeof component.setActiveNavItem === 'function') {
        component.setActiveNavItem(sectionId);
      }
    });
  }
}

// Create and export singleton instance
export const hashHandler = new HashHandler();

// Convenience exports
export const scrollToSection = (sectionId) => hashHandler.scrollToSection(sectionId, false);
export const registerForHashUpdates = (component) => hashHandler.registerComponent(component);
export const unregisterFromHashUpdates = (component) => hashHandler.unregisterComponent(component);