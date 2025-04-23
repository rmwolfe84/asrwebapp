// Function to initialize Facebook SDK
function initFacebookSDK() {
  return new Promise(resolve => {
    // Load the SDK asynchronously
    window.fbAsyncInit = function() {
      FB.init({
        appId: 'YOUR_APP_ID', // Optional: only needed if you're using other FB features
        xfbml: true,  // Parse social plugins on this page
        version: 'v18.0' // Use the latest version
      });
      resolve();
    };
    
    // Load the SDK
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}

// Function to embed a Facebook post
async function embedFacebookPost(postUrl, targetElementId) {
  // Make sure SDK is initialized
  if (!window.FB) {
    await initFacebookSDK();
  }
  
  // Create the embed div with proper attributes
  const container = document.getElementById(targetElementId);
  container.innerHTML = `<div class="fb-post" data-href="${postUrl}" data-width="500"></div>`;
  
  // Process the embed
  if (window.FB) {
    FB.XFBML.parse(container);
  }
}

// Usage example
embedFacebookPost('https://www.facebook.com/example/posts/123456789', 'facebook-container');