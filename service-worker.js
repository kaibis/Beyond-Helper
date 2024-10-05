// Listener for messages from the side panel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getTabUrl') {
      // Get the currently active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        sendResponse({ url: currentTab.url });
      });
      return true; // Keep the message channel open for async response
    }
  });
  
  // Listener for when the active tab changes
  chrome.tabs.onActivated.addListener((activeInfo) => {
    // Get the new active tab
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      // Do something with the new active tab, e.g., send a message
      chrome.runtime.sendMessage({
        action: 'tabChanged',
        url: tab.url
      });
    });
  });
  
  