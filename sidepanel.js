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
      contentDiv.innerHTML = `
        <h1>DnDBeyond Helper</h1>
        <p>This is the helper panel for D&D Beyond!</p>
      `;
    } else {
      contentDiv.innerHTML = `
        <h1>Helper Not Available</h1>
        <p>This feature is only available on D&D Beyond.</p>
      `;
    }
  }
  