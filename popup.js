document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("fetch-button").addEventListener("click", function() {
    // Get the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Send a message to the background page to fetch the URL and data
      chrome.runtime.sendMessage({action: "fetch-url", url: tabs[0].url}, function(response) {
        if (response && response.success) {
          // Download the data as a file
          download(response.data);
        }
      });
    });
  });
});

function download(data) {
  var blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "data.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
