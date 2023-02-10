// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "getRequestURL") {
    // Get the request URL using the chrome.devtools API
    chrome.devtools.network.getHAR((harLog) => {
      let entries = harLog.entries;
      if (entries.length > 0) {
        // Send the first request URL in the network log as a response
        sendResponse({url: entries[0].request.url});
      }
    });
  }
  return true;
});
