/**
 * Initializes smooth scrolling behavior for navigation links
 * @param {HTMLElement} element - The element containing navigation links
 */
export function initializeScrollBehavior(element) {
  const links = element.shadowRoot.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
}