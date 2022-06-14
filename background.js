const color = "black";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background set to %cblack", `color: ${color}`);
});
