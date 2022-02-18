// Understand content script capabilities
// Content scripts can access Chrome APIs used by their parent extension by exchanging messages with the extension. 
// They can also access the URL of an extension's file with chrome.runtime.getURL() and use the result the same as other URLs.
// 
// https://developer.chrome.com/docs/extensions/mv2/content_scripts/#capabilities

console.log('EXTENSION CONTENT SCRIPT!!');


// An isolated world is a private execution environment that isn't accessible to the page or other extensions. 
// A practical consequence of this isolation is that JavaScript variables in an extension's content scripts are not visible to the host page or other extensions' content scripts. 
// The concept was originally introduced with the initial launch of Chrome, providing isolation for browser tabs.


var port = chrome.runtime.connect();

window.addEventListener("message", (event) => {
    // We only accept messages from ourselves
    if (event.source != window) {
        return;
    }

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        port.postMessage(event.data.text);
    }
}, false);

