// Send a message to background.js to get the current tab's URL on load
chrome.runtime.sendMessage({ action: 'getTabUrl' }, (response) => {
    updatePanelContent(response.url);
  });
  
  // Listen for messages about tab changes
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'tabChanged') {
      updatePanelContent(message.url);
    }
  });
  
  // Function to update panel content based on the URL
  function updatePanelContent(url) {
    const contentDiv = document.getElementById('content');
  
    if (url.startsWith("https://www.dndbeyond.com")) {
      // Load DnDBeyond helper content
      fetch('beyond-helper.html')
        .then(response => response.text())
        .then(data => {
          contentDiv.innerHTML = data;
        })
        .catch(error => console.error('Error loading DnDBeyond content:', error));
    } else {
      // Load "Helper Not Available" content
      fetch('beyond-helper-not-available.html')
        .then(response => response.text())
        .then(data => {
          contentDiv.innerHTML = data;
        })
        .catch(error => console.error('Error loading Helper Not Available content:', error));
    }
  }
  

