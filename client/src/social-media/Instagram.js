// Array of Instagram post URLs you want to display
const instagramPosts = [
  'https://www.instagram.com/p/FIRST_POST_ID/',
  'https://www.instagram.com/p/SECOND_POST_ID/',
  'https://www.instagram.com/p/THIRD_POST_ID/'
];

// Function to embed multiple Instagram posts
function embedMultipleInstagramPosts(postUrls, containerElementId) {
  const container = document.getElementById(containerElementId);
  
  // Create placeholder divs for each post
  postUrls.forEach((url, index) => {
    const postDiv = document.createElement('div');
    postDiv.id = `instagram-post-${index}`;
    container.appendChild(postDiv);
    
    // Fetch and embed each post
    fetchInstagramEmbed(url, postDiv.id);
  });
}

// Helper function to fetch and insert a single post
async function fetchInstagramEmbed(postUrl, targetElementId) {
  try {
    const response = await fetch(`https://api.instagram.com/oembed/?url=${encodeURIComponent(postUrl)}`);
    const data = await response.json();
    document.getElementById(targetElementId).innerHTML = data.html;
  } catch (error) {
    console.error('Error embedding Instagram post:', error);
  }
}

// Load Instagram embed script once all posts are inserted
function loadInstagramEmbedScript() {
  const script = document.createElement('script');
  script.src = '//www.instagram.com/embed.js';
  document.body.appendChild(script);
}

// Usage
embedMultipleInstagramPosts(instagramPosts, 'instagram-feed-container');
// Load the script after a short delay to ensure all post HTML is inserted
setTimeout(loadInstagramEmbedScript, 500);