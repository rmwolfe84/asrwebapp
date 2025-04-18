// In ./client/main.js
import './src/style.css'; // Or your CSS entry point
import { ThemeManager } from './src/ui/styles/themes/ThemeManager.js';

const app = document.querySelector('#app');
app.innerHTML = `
  <h1>Vanilla Mongoose App</h1>
  <form id="item-form">
    <input type="text" id="item-name" placeholder="Item Name" required />
    <input type="text" id="item-desc" placeholder="Description (optional)" />
    <button type="submit">Add Item</button>
  </form>
  <h2>Items List:</h2>
  <ul id="items-list">
    <li>Loading...</li>
  </ul>
`;

const itemsList = document.querySelector('#items-list');
const itemForm = document.querySelector('#item-form');
const itemNameInput = document.querySelector('#item-name');
const itemDescInput = document.querySelector('#item-desc');
const themeManager = ThemeManager.getInstance();

const lightBtn = document.getElementById('theme-light');
const darkBtn = document.getElementById('theme-dark');
const colorblindBtn = document.getElementById('theme-colorblind');
const themeDisplay = document.getElementById('current-theme-display'); 

// Update display initially (optional)
if (themeDisplay) {
    themeDisplay.textContent = themeManager.getCurrentTheme();
}

// Add event listeners that CALL the setTheme method on the instance
if (lightBtn) {
  lightBtn.addEventListener('click', () => {
    themeManager.setTheme('light');
    if (themeDisplay) themeDisplay.textContent = 'light';
  });
}
if (darkBtn) {
  darkBtn.addEventListener('click', () => {
    themeManager.setTheme('dark');
    if (themeDisplay) themeDisplay.textContent = 'dark';
  });
}
if (colorblindBtn) {
  colorblindBtn.addEventListener('click', () => {
    themeManager.setTheme('colorblind');
    if (themeDisplay) themeDisplay.textContent = 'colorblind';
  });
}
console.log("App initialized, ThemeManager instance created.");
// Function to fetch and display items
async function fetchItems() {
  try {
    // During development, Vite proxy handles '/api'. In production, Express serves this route.
    const response = await fetch('/api/items');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const items = await response.json();

    itemsList.innerHTML = ''; // Clear loading/previous items

    if (items.length === 0) {
        itemsList.innerHTML = '<li>No items found. Add one!</li>';
        return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name}${item.description ? ` (${item.description})` : ''}`;
      itemsList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    itemsList.innerHTML = '<li>Error loading items.</li>';
  }
}

// Function to add an item
async function addItem(event) {
    event.preventDefault(); // Prevent form submission reload

    const name = itemNameInput.value.trim();
    const description = itemDescInput.value.trim();

    if (!name) return; // Simple validation

    try {
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
        }

        // Clear form and refresh list
        itemNameInput.value = '';
        itemDescInput.value = '';
        await fetchItems(); // Re-fetch items to show the new one

    } catch(error) {
        console.error('Error adding item:', error);
        alert(`Failed to add item: ${error.message}`); // Show error to user
    }
}

// Initial fetch when the script loads
fetchItems();

// Add event listener for form submission
itemForm.addEventListener('submit', addItem);