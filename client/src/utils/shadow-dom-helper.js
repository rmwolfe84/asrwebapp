/**
 * Helper functions for working with Shadow DOM and section navigation
 */

/**
 * Makes Shadow DOM sections available for hash navigation
 * by adding ID attributes to the host elements
 */
export function exposeShadowSections() {
  console.log('Exposing shadow DOM sections...');
  
  // Wait for components to be registered and rendered
  setTimeout(() => {
    // Define all our section components
    const sectionComponents = [
      'hero-banner',
      'about-section',
      'services-section',
      'testimonials-section',
      'blog-section',
      'contact-section',
      'cta-section'
    ];
    
    // Get all custom elements that are section components
    sectionComponents.forEach(tagName => {
      const elements = document.querySelectorAll(tagName);
      
      elements.forEach(element => {
        // Extract the ID from the tag name (e.g., "about-section" -> "about")
        let sectionId = tagName.replace('-section', '');
        if (sectionId === 'hero-banner') sectionId = 'home';
        
        // Set the ID on the host element
        element.id = sectionId;
        console.log(`Added ID "${sectionId}" to ${tagName} element`);
      });
    });
    
    // Log all available sections
    const sections = document.querySelectorAll('[id]');
    console.log('Available sections for navigation:', Array.from(sections).map(s => s.id));
  }, 500);
}

/**
 * Scrolls to a specific section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} [offset=70] - Offset from the top (for fixed header)
 * @param {boolean} [smooth=true] - Whether to use smooth scrolling
 * @returns {boolean} - Whether the section was found and scrolled to
 */
export function scrollToSectionById(sectionId, offset = 70, smooth = true) {
  // Find the element with the given ID
  const element = document.getElementById(sectionId);
  
  if (!element) {
    console.warn(`Section with ID "${sectionId}" not found`);
    return false;
  }
  
  // Calculate the position
  const position = element.offsetTop - offset;
  
  // Scroll to the element
  try {
    window.scrollTo({
      top: position,
      behavior: smooth ? 'smooth' : 'auto'
    });
    console.log(`Scrolled to section "${sectionId}" at position ${position}`);
    return true;
  } catch (error) {
    // Fallback for browsers that don't support smooth scrolling
    window.scrollTo(0, position);
    console.log(`Fallback scroll to section "${sectionId}" at position ${position}`);
    return true;
  }
}