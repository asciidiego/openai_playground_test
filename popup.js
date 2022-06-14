// Initialize button with user's preferred color
let alertButton = document.getElementById("alertButton");

chrome.storage.sync.get("color", ({ color }) => {
  alertButton.style.backgroundColor = color;
});