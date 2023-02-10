chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "fetch-url") {
    fetch(request.url)
      .then(res => res.json())
      .then(data => {
        sendResponse({success: true, data: data});
      })
      .catch(error => {
        console.error(error);
        sendResponse({success: false});
      });
    return true;
  }
});
