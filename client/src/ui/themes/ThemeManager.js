// client\src\ui\styles\themes\ThemeManager.js
import {
  baseVars,             // Name matches the export in themeVariables.js
  lightModeColors,      // Name matches the export
  darkModeColors,       // Name matches the export
  colorblindModeColors, // Name matches the export
  animationKeyframes    // Name matches the export (include if you defined it)
} from './themeVariables.js'; 

// Theme manager singleton (JavaScript Class)
export class ThemeManager {
  // Static property to hold the single instance (ES Class field syntax)
  static instance = null;

  // Instance property to hold the style element (public by default)
  styleElement = null;

  // Constructor: Private convention enforced by using getInstance()
  constructor() {
    // Prevent direct instantiation after the first time (optional safety)
    if (ThemeManager.instance) {
      // It's generally better to just rely on getInstance always being used
      // console.warn("ThemeManager already instantiated. Use getInstance().");
      // return ThemeManager.instance; // Or throw error
    }

    // Find existing or create new style element
    this.styleElement = document.getElementById('asr-theme-styles'); // Use specific ID
    if (!this.styleElement) {
      this.createAndAppendStyleElement();
    }

    // Populate the style element with CSS rules
    this.populateStyleElement();

    // Apply the theme saved in localStorage (or default to 'light')
    this.loadSavedTheme();
  }

  // Static method to get or create the singleton instance
  static getInstance() {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  // Creates the <style> element, sets its ID, and appends to <head>
  createAndAppendStyleElement() {
    this.styleElement = document.createElement('style');
    this.styleElement.id = 'asr-theme-styles'; // Use a specific ID
    document.head.appendChild(this.styleElement);
    // Note: We return it here just in case the constructor pattern changes,
    // but currently it directly sets this.styleElement.
    return this.styleElement;
  }

  // Injects the actual CSS rules into the style element
  populateStyleElement() {
    if (!this.styleElement) {
      console.error("ThemeManager: Style element not found.");
      return;
    }

    // Build the core CSS string using imported variables
    const themeStyles = `
      :root {
        ${baseVars}
        ${lightModeColors} /* Light mode variables applied by default */
      }

      body.dark-mode {
        ${darkModeColors}
      }

      body.colorblind-mode {
        ${colorblindModeColors}
      }

      /* Animations (include if defined) */
      ${animationKeyframes || ''}
    `;

    // Use textContent for security and potential performance benefits
    this.styleElement.textContent = themeStyles;
  }

  // Loads theme preference from localStorage
  loadSavedTheme() {
    // Use a unique key for localStorage to avoid conflicts
    const savedTheme = localStorage.getItem('asr-theme-mode') || 'light';
    this.setTheme(savedTheme);
  }

  // Sets the theme by adding/removing body classes and saving preference
  // mode parameter is expected to be 'light', 'dark', or 'colorblind' string
  setTheme(mode) {
    // List of all possible theme classes managed by this manager
    const themeClasses = ['dark-mode', 'colorblind-mode'];

    // Remove all known theme classes first
    document.body.classList.remove(...themeClasses);

    // Add the specific class if it's not light mode
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (mode === 'colorblind') {
      document.body.classList.add('colorblind-mode');
    }
    // 'light' mode requires no extra class, as :root rules apply

    // Save the preference with the specific key
    localStorage.setItem('asr-theme-mode', mode);

    // Dispatch a custom event so other parts of the app can react
    document.dispatchEvent(new CustomEvent('themechanged', { 
      detail: { mode: mode },
      bubbles: true,
      composed: true  // Allow event to cross shadow DOM boundaries for web components
    }));
  }

  // Helper method to get the currently active theme name
  getCurrentTheme() {
    return localStorage.getItem('asr-theme-mode') || 'light';
  }
}