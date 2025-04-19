// client/src/ui/styles/themes/themeVariables.js

// --- TYPOGRAPHY ---
export const typographyVars = `
  /* Font Families */
  --font-family-primary: 'Google Sans Mono', monospace;
  --font-family-secondary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  --font-family-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

  /* Font Sizes */
  --font-size-2xs: 0.625rem; /* 10px */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
`;

// --- SPACING ---
export const spacingVars = `
  /* Spacing Scale */
  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-0_5: 0.125rem; /* 2px */
  --spacing-1: 0.25rem;    /* 4px */
  --spacing-2: 0.5rem;     /* 8px */
  --spacing-3: 0.75rem;    /* 12px */
  --spacing-4: 1rem;       /* 16px */
  --spacing-5: 1.25rem;    /* 20px */
  --spacing-6: 1.5rem;     /* 24px */
  --spacing-8: 2rem;       /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  --spacing-32: 8rem;      /* 128px */

  /* Component Spacings */
  --padding-button: var(--spacing-2) var(--spacing-4); /* Adjusted for smaller base */
  --padding-input: var(--spacing-2) var(--spacing-3);
  --padding-card: var(--spacing-4);
  --margin-between-sections: var(--spacing-8);
  --margin-between-elements: var(--spacing-3);
  --container-padding: var(--spacing-4);
`;

// --- LAYOUT ---
export const layoutVars = `
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* Layout */
  --header-height: 56px; /* Adjusted */
  --nav-height: 48px; /* Adjusted */
  --footer-height: 56px; /* Adjusted */
  --sidebar-width: 240px; /* Adjusted */
  --sidebar-collapsed-width: 56px; /* Adjusted */

  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  --container-max-width: var(--container-xl); /* Example default max width */

  /* Grid & Layout */
  --grid-gap: var(--spacing-4);
  --container-padding-x: var(--spacing-4);
  --container-padding-y: var(--spacing-6);
  --sidebar-padding: var(--spacing-4);

  /* icons */
  --icon-size-small: 16px; /* Adjusted */
  --icon-size-normal: 20px; /* Adjusted */
  --icon-size-large: 24px; /* Adjusted */
  --icon-nav-bar: 24px; /* Adjusted */
`;

// --- BORDERS ---
export const borderVars = `
  /* Border Radius */
  --border-radius-none: 0;
  --border-radius-sm: 0.125rem; /* 2px */
  --border-radius-md: 0.25rem;  /* 4px */
  --border-radius-lg: 0.5rem;   /* 8px */
  --border-radius-xl: 0.75rem;  /* 12px */
  --border-radius-2xl: 1rem;   /* 16px */
  --border-radius-full: 9999px;

  /* Border Widths */
  --border-width-0: 0px;
  --border-width-1: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;
  --border-width-8: 8px;
`;

// --- EFFECTS ---
export const effectVars = `
  /* Shadow Styles */
  --shadow-none: none;
  --shadow-sm: 0 1px 2px 0 var(--color-shadow, rgba(0, 0, 0, 0.05));
  --shadow-md: 0 4px 6px -1px var(--color-shadow, rgba(0, 0, 0, 0.1)), 0 2px 4px -1px var(--color-shadow, rgba(0, 0, 0, 0.06));
  --shadow-lg: 0 10px 15px -3px var(--color-shadow, rgba(0, 0, 0, 0.1)), 0 4px 6px -2px var(--color-shadow, rgba(0, 0, 0, 0.05));
  --shadow-xl: 0 20px 25px -5px var(--color-shadow, rgba(0, 0, 0, 0.1)), 0 10px 10px -5px var(--color-shadow, rgba(0, 0, 0, 0.04));
  --shadow-2xl: 0 25px 50px -12px var(--color-shadow, rgba(0, 0, 0, 0.25));
  --shadow-inner: inset 0 2px 4px 0 var(--color-shadow, rgba(0, 0, 0, 0.06));

  /* Transition & Animation */
  --transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  --transition-timing-fast: 150ms;
  --transition-timing-normal: 300ms;
  --transition-timing-slow: 500ms;
  --transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
`;

// --- Z-INDEX ---
export const zIndexVars = `
  /* Z-index Structure */
  --z-negative: -1;
  --z-0: 0;
  --z-10: 10;
  --z-20: 20;
  --z-30: 30;
  --z-40: 40;
  --z-50: 50;
  --z-auto: auto;
  --z-header: 1000;
  --z-sidebar: 900;
  --z-footer: 800;
  --z-dropdown: 1050; /* Ensure dropdowns are above headers typically */
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-overlay: 1250; /* Overlay below modal */
  --z-modal: 1300;
  --z-popover: 1400;
  --z-tooltip: 1500;
  --z-toast: 1600;
`;

// --- FORMS ---
export const formVars = `
  /* Accessibility & Focus */
  --focus-ring-width: 2px; /* Adjusted */
  --focus-ring-color: var(--color-focus, rgba(59, 130, 246, 0.5)); /* Use focus color variable */
  --focus-ring-offset: 1px; /* Adjusted */
  --outline-width: 2px; /* Deprecated by focus-ring, but kept for potential fallback */
  --outline-color: var(--color-primary); /* Deprecated by focus-ring */

  /* Form Element Sizes */
  --input-height-sm: 2rem;    /* 32px */
  --input-height-md: 2.5rem;  /* 40px */
  --input-height-lg: 3rem;    /* 48px */
  --button-height-sm: 2rem;   /* 32px */
  --button-height-md: 2.5rem; /* 40px */
  --button-height-lg: 3rem;   /* 48px */
`;

// --- BASE VARS (Combine non-color vars) ---
export const baseVars = `
  ${typographyVars}
  ${spacingVars}
  ${layoutVars}
  ${borderVars}
  ${effectVars}
  ${zIndexVars}
  ${formVars}
`;

// --- COLORS ---

// Light mode colors
export const lightModeColors = `
  /* Base Colors */
  --color-primary: #1E4A43;
  --color-primary-light: #487871;
  --color-primary-dark: #2F4F2F; /* Note: DarkGreen, maybe not ideal primary-dark */
  --color-secondary: #3B7B9E;
  --color-secondary-light: #73A9CE;
  --color-secondary-dark: #285A7A;
  --color-tertiary: #8FBC8F; /* DarkSeaGreen */
  --color-accent: #960018; /* Carmine */

  /* Neutrals */
  --color-neutral-50: #F8F8F8;
  --color-neutral-100: #F0F0F0;
  --color-neutral-200: #E0E0E0;
  --color-neutral-300: #C0C0C0;
  --color-neutral-400: #A0A0A0;
  --color-neutral-500: #808080;
  --color-neutral-600: #606060;
  --color-neutral-700: #404040;
  --color-neutral-800: #202020;
  --color-neutral-900: #000000;

  /* UI Elements */
  --color-background-primary: var(--color-neutral-50);
  --color-background-secondary: var(--color-neutral-100);
  --color-surface-primary: var(--color-neutral-100); /* Card/Input backgrounds */
  --color-surface-secondary: var(--color-neutral-200);
  --color-surface-tertiary: var(--color-neutral-300);
  --color-header: var(--color-primary);
  --color-footer: var(--color-neutral-200);
  --color-sidebar: var(--color-neutral-200);
  --color-nav: var(--color-secondary);
  --color-border-light: var(--color-neutral-300);
  --color-border-regular: var(--color-neutral-400);
  --color-border-heavy: var(--color-neutral-600);
  --color-divider: var(--color-neutral-300);
  --color-shadow: rgba(0, 0, 0, 0.1); /* Default shadow color */

  /* Text */
  --color-text-primary: var(--color-neutral-800);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-tertiary: var(--color-neutral-500);
  --color-text-disabled: var(--color-neutral-400);
  --color-text-inverse: var(--color-neutral-50); /* Text on dark backgrounds */
  --color-text-on-primary: var(--color-neutral-50);
  --color-text-on-secondary: var(--color-neutral-50);
  --color-text-on-accent: var(--color-neutral-50);
  --color-text-link: var(--color-secondary);
  --color-text-link-visited: #551A8B; /* Standard visited purple */
  --color-text-link-hover: var(--color-secondary-light);

  /* Feedback */
  --color-success: #2E8B57; /* SeaGreen */
  --color-success-light: #8FBC8F; /* DarkSeaGreen */
  --color-success-dark: #228B22; /* ForestGreen */
  --color-error: #B22222; /* Firebrick */
  --color-error-light: #F08080; /* LightCoral */
  --color-error-dark: #8B0000; /* DarkRed */
  --color-warning: #FF8C00; /* DarkOrange */
  --color-warning-light: #FFA500; /* Orange */
  --color-warning-dark: #D2691E; /* Chocolate */
  --color-info: #1E90FF; /* DodgerBlue */
  --color-info-light: #ADD8E6; /* LightBlue */
  --color-info-dark: #0000CD; /* MediumBlue */

  /* States */
  --color-hover: rgba(0, 0, 0, 0.05); /* Subtle dark overlay */
  --color-focus: var(--color-secondary-light); /* Use a light color for focus ring */
  --color-active: rgba(0, 0, 0, 0.1); /* Slightly darker overlay */
  --color-selected: rgba(59, 123, 156, 0.2); /* Based on secondary */
  --color-disabled-bg: var(--color-neutral-300); /* Background for disabled elements */
  --color-disabled-text: var(--color-neutral-500); /* Text for disabled elements */
  --color-dragging: rgba(59, 123, 156, 0.3); /* Based on secondary */
  --color-loading: var(--color-secondary-light);

  /* Specialized Components */
  --color-button-primary-bg: var(--color-primary);
  --color-button-primary-text: var(--color-text-on-primary);
  --color-button-secondary-bg: var(--color-secondary);
  --color-button-secondary-text: var(--color-text-on-secondary);
  --color-button-tertiary-bg: var(--color-neutral-300);
  --color-button-tertiary-text: var(--color-text-primary); /* Dark text on light gray */
  --color-input-background: var(--color-neutral-50); /* Slightly lighter than surface */
  --color-input-border: var(--color-border-regular);
  --color-input-focus-border: var(--color-secondary);
  --color-input-focus-ring: var(--color-focus);
  --color-table-header: var(--color-neutral-200);
  --color-table-row-odd: var(--color-neutral-50);
  --color-table-row-even: var(--color-neutral-100);
  --color-table-border: var(--color-neutral-300);
  --color-tooltip-bg: var(--color-neutral-700);
  --color-tooltip-text: var(--color-neutral-50);
  --color-modal-overlay: rgba(0, 0, 0, 0.5);
  --color-modal-background: var(--color-neutral-50);
  --color-menu-background: var(--color-neutral-100);
  --color-scrollbar: var(--color-neutral-300);
  --color-scrollbar-thumb: var(--color-neutral-500);
  --color-badge-background: var(--color-primary-light);
  --color-badge-text: var(--color-text-on-primary);
  --color-card-highlight: var(--color-primary-light); /* Example for highlighting cards */
`;

// Dark mode colors
export const darkModeColors = `
  /* Base Colors */
  --color-primary: #62948D; /* Lighter teal */
  --color-primary-light: #8AB6B1;
  --color-primary-dark: #487871; /* Original light primary */
  --color-secondary: #8ACBE3; /* Lighter blue */
  --color-secondary-light: #B2DFF5;
  --color-secondary-dark: #73A9CE; /* Original light secondary */
  --color-tertiary: #A0D6A0; /* Light green */
  --color-accent: #FF6B81; /* Lighter red/pink */

  /* Neutrals (Inverted) */
  --color-neutral-50: #121212; /* Slightly off-black */
  --color-neutral-100: #1E1E1E;
  --color-neutral-200: #2C2C2C;
  --color-neutral-300: #3A3A3A;
  --color-neutral-400: #555555;
  --color-neutral-500: #777777;
  --color-neutral-600: #999999;
  --color-neutral-700: #B3B3B3;
  --color-neutral-800: #D9D9D9;
  --color-neutral-900: #F5F5F5; /* Slightly off-white */

  /* UI Elements */
  --color-background-primary: var(--color-neutral-50);
  --color-background-secondary: var(--color-neutral-100);
  --color-surface-primary: var(--color-neutral-100);
  --color-surface-secondary: var(--color-neutral-200);
  --color-surface-tertiary: var(--color-neutral-300);
  --color-header: var(--color-neutral-200); /* Darker header */
  --color-footer: var(--color-neutral-100);
  --color-sidebar: var(--color-neutral-100);
  --color-nav: var(--color-neutral-200); /* Darker nav */
  --color-border-light: var(--color-neutral-300);
  --color-border-regular: var(--color-neutral-400);
  --color-border-heavy: var(--color-neutral-600);
  --color-divider: var(--color-neutral-300);
  --color-shadow: rgba(0, 0, 0, 0.5); /* Darker shadow */

  /* Text */
  --color-text-primary: var(--color-neutral-800);
  --color-text-secondary: var(--color-neutral-700);
  --color-text-tertiary: var(--color-neutral-600);
  --color-text-disabled: var(--color-neutral-500);
  --color-text-inverse: var(--color-neutral-100); /* Text on light backgrounds */
  --color-text-on-primary: var(--color-neutral-900); /* High contrast needed */
  --color-text-on-secondary: var(--color-neutral-900);
  --color-text-on-accent: var(--color-neutral-900);
  --color-text-link: var(--color-secondary-light);
  --color-text-link-visited: #C1A0E1; /* Lighter purple */
  --color-text-link-hover: var(--color-secondary);

  /* Feedback */
  --color-success: #90EE90; /* LightGreen */
  --color-success-light: #C1FFC1; /* PaleGreen */
  --color-success-dark: #3CB371; /* MediumSeaGreen */
  --color-error: #FF7F7F; /* Light Coral alternative */
  --color-error-light: #FFAAAA;
  --color-error-dark: #CD5C5C; /* IndianRed */
  --color-warning: #FFC966; /* Lighter Orange */
  --color-warning-light: #FFDA8A;
  --color-warning-dark: #CD853F; /* Peru */
  --color-info: #87CEFA; /* LightSkyBlue */
  --color-info-light: #B0E0E6; /* PowderBlue */
  --color-info-dark: #6495ED; /* CornflowerBlue */

  /* States */
  --color-hover: rgba(255, 255, 255, 0.08); /* Subtle light overlay */
  --color-focus: var(--color-secondary-light); /* Use a light color for focus ring */
  --color-active: rgba(255, 255, 255, 0.12); /* Brighter overlay */
  --color-selected: rgba(138, 203, 227, 0.25); /* Based on secondary */
  --color-disabled-bg: var(--color-neutral-300); /* Background for disabled elements */
  --color-disabled-text: var(--color-neutral-500); /* Text for disabled elements */
  --color-dragging: rgba(138, 203, 227, 0.3); /* Based on secondary */
  --color-loading: var(--color-secondary);

  /* Specialized Components */
  --color-button-primary-bg: var(--color-primary);
  --color-button-primary-text: var(--color-text-on-primary);
  --color-button-secondary-bg: var(--color-secondary);
  --color-button-secondary-text: var(--color-text-on-secondary);
  --color-button-tertiary-bg: var(--color-neutral-600); /* Darker gray button */
  --color-button-tertiary-text: var(--color-text-primary);
  --color-input-background: var(--color-neutral-200);
  --color-input-border: var(--color-border-regular);
  --color-input-focus-border: var(--color-secondary);
  --color-input-focus-ring: var(--color-focus);
  --color-table-header: var(--color-neutral-300);
  --color-table-row-odd: var(--color-neutral-100);
  --color-table-row-even: var(--color-neutral-200);
  --color-table-border: var(--color-neutral-400);
  --color-tooltip-bg: var(--color-neutral-700);
  --color-tooltip-text: var(--color-neutral-100);
  --color-modal-overlay: rgba(0, 0, 0, 0.7);
  --color-modal-background: var(--color-neutral-100);
  --color-menu-background: var(--color-neutral-200);
  --color-scrollbar: var(--color-neutral-400); /* Darker scrollbar */
  --color-scrollbar-thumb: var(--color-neutral-600);
  --color-badge-background: var(--color-primary-light);
  --color-badge-text: var(--color-text-on-primary);
  --color-card-highlight: var(--color-primary-light);
`;

// Colorblind mode colors (Overrides specific colors from Light Mode)
// This aims for higher contrast and avoids red/green reliance where possible.
// It inherits Light Mode neutrals and structure, only changing key colors.
export const colorblindModeColors = `
  /* Base Colors */
  --color-primary: #00429d; /* Strong Blue */
  --color-primary-light: #4771b2;
  --color-primary-dark: #00306d;
  --color-secondary: #9e4b00; /* Strong Orange/Brown */
  --color-secondary-light: #c17832;
  --color-secondary-dark: #773800;
  --color-tertiary: #5c5c5c; /* Distinct Gray */
  --color-accent: #ffd300; /* Bright Yellow */

  /* UI Elements */
  /* Inherit most from Light Mode via :root initially */
  --color-header: var(--color-primary);
  --color-nav: var(--color-secondary);
  --color-border-regular: var(--color-neutral-600); /* Darker border for contrast */
  --color-border-heavy: var(--color-neutral-800);
  --color-shadow: rgba(0, 0, 0, 0.2); /* Stronger shadow */

  /* Text */
  --color-text-primary: var(--color-neutral-900); /* Black for max contrast */
  --color-text-secondary: var(--color-neutral-700);
  --color-text-link: var(--color-primary); /* Blue link */
  --color-text-link-visited: #5c009e; /* Distinct Purple */
  --color-text-link-hover: var(--color-primary-light);
  --color-text-on-primary: var(--color-neutral-50);
  --color-text-on-secondary: var(--color-neutral-50);
  --color-text-on-accent: var(--color-neutral-900); /* Black text on yellow */

  /* Feedback (Using Blue/Yellow/Orange/Distinct Gray) */
  --color-success: #007750; /* Dark Teal/Green (careful) */
  --color-success-light: #59a185;
  --color-success-dark: #00583a;
  --color-error: #d43f00; /* Dark Orange for error */
  --color-error-light: #ff7439;
  --color-error-dark: #a03000;
  --color-warning: #b17c00; /* Dark Yellow/Ochre */
  --color-warning-light: #eac14d;
  --color-warning-dark: #8a6100;
  --color-info: #006dd4; /* Slightly different Blue for info */
  --color-info-light: #5899e2;
  --color-info-dark: #004f9e;

  /* States */
  --color-focus: var(--color-primary); /* Blue focus ring */
  --color-selected: rgba(0, 66, 157, 0.25); /* Based on primary */
  --color-disabled-bg: var(--color-neutral-400); /* More distinct disabled bg */
  --color-disabled-text: var(--color-neutral-600);

  /* Specialized Components */
  --color-button-primary-bg: var(--color-primary);
  --color-button-primary-text: var(--color-text-on-primary);
  --color-button-secondary-bg: var(--color-secondary);
  --color-button-secondary-text: var(--color-text-on-secondary);
  --color-button-tertiary-bg: var(--color-neutral-400); /* Darker gray */
  --color-button-tertiary-text: var(--color-neutral-900);
  --color-input-background: var(--color-neutral-50);
  --color-input-border: var(--color-border-regular);
  --color-input-focus-border: var(--color-primary);
  --color-input-focus-ring: var(--color-focus);
  --color-table-header: var(--color-neutral-300);
  --color-table-row-odd: var(--color-neutral-50);
  --color-table-row-even: var(--color-neutral-100);
  --color-table-border: var(--color-neutral-400);
  --color-tooltip-bg: var(--color-neutral-900);
  --color-tooltip-text: var(--color-neutral-50);
  --color-badge-background: var(--color-accent);
  --color-badge-text: var(--color-text-on-accent);
  --color-card-highlight: var(--color-accent);
`;

// --- ANIMATIONS ---
// (Added back from previous example)
export const animationKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes ping {
    0% { transform: scale(1); opacity: 1; }
    75%, 100% { transform: scale(2); opacity: 0; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
    50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
  }
`;

// Note: The export * ... section from your original code is removed
// as we are keeping everything in one file for this example.
// If you split into separate files (variables.js, colors.js), you'd re-introduce that pattern.