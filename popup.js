// Initialize button with user's preferred color
let mainButton = document.getElementById("mainButton");

chrome.storage.sync.get("color", ({ color }) => {
  mainButton.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
mainButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: appendButtonToPlaygroundHeader,
  });
});

// The body of this function will be executed as a content script inside the
// current page.  Since the function is injected through serialization and
// deserialization, we need to put the DOM manipulation functions and subroutines
// inside the function that we intend to inject.  Otherwise, the functions will
// not be in scope and, thus, will not be defined in the tab context.
function appendButtonToPlaygroundHeader() {
  function createHeaderButton() {
    const button = document.createElement("button");
    const buttonLabel = "Test";
    button.textContent = buttonLabel;
    const OpenAI_buttonClasses = ["btn", "btn-sm", "btn-filled", "btn-neutral"];
    button.classList.add(...OpenAI_buttonClasses);

    return button;
  }

  function addButtonToHeader(button) {
    const [OpenAI_headerDiv] =
      document.getElementsByClassName("pg-header-actions");
    OpenAI_headerDiv.appendChild(button);
  }

  // create a button that looks like an OpenAI button
  const headerButton = createHeaderButton();
  addButtonToHeader(headerButton);

  /*
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
    */
}
