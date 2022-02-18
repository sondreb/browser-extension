// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
chrome.runtime.onInstalled.addListener(async () => {

    console.log('ON INSTALLED!');

    // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
    // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
    // runtime.
    let url = chrome.runtime.getURL("index.html");

    // Open a new tab pointing at our page's URL using JavaScript's object initializer shorthand.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
    //
    // Many of the extension platform's APIs are asynchronous and can either take a callback argument
    // or return a promise. Since we're inside an async function, we can await the resolution of the
    // promise returned by the tabs.create call. See the following link for more info on async/await.
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
    let tab = await chrome.tabs.create({ url });

    // Finally, let's log the ID of the newly created tab using a template literal.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    //
    // To view this log message, open chrome://extensions, find "Hello, World!", and click the
    // "service worker" link in th card to open DevTools.
    console.log(`Created tab ${tab.id}`);

    chrome.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });

    chrome.action.setBadgeText(
        {
            text: 'WHUT!',
            tabId: tab.id,
        },
        () => { }
    );

    chrome.action.setBadgeBackgroundColor(
        { color: '#00FF00' },  // Also green
        () => { /* ... */ },
    );

});

// chrome.action.onClicked.addListener(tab => {
//     console.log('chrome.action.onClicked.addListener');
//     debugger;
//     let url = chrome.runtime.getURL("index.html");

//     chrome.tabs.query({ url: url }, tabs => {
//         console.log('tabs.length', tabs.length);
//         if (tabs.length) {
//             chrome.tabs.update(tabs[0].id as any)
//         }
//         else chrome.tabs.create({
//             url: url,
//             active: true,
//             index: 0
//         })
//     });
// });


chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: ['provider.js']
    });
});

chrome.runtime.onMessage.addListener((message, sender, reply) => {
    console.log('onMessage!!', message);
    console.log('onMessage: sender!!', sender);
    // chrome.runtime.onMessage.removeListener(event);
});

chrome.runtime.onSuspend.addListener(() => {
    console.log("Unloading.");
    chrome.browserAction.setBadgeText({ text: "" });
});

// chrome.runtime.onMessage.addListener((message, callback) => {
//     const tabId = getForegroundTabId();
//     if (message.data === "setAlarm") {
//         chrome.alarms.create({ delayInMinutes: 5 })
//     } else if (message.data === "runLogic") {
//         chrome.scripting.executeScript({ file: 'logic.js', tabId });
//     } else if (message.data === "changeColor") {
//         chrome.scripting.executeScript(
//             { func: () => document.body.style.backgroundColor = "orange", tabId });
//     };
// });

// chrome.runtime.onMessage.addListener((message, callback) => {
//     if (message === 'hello') {
//         sendResponse({ greeting: 'welcome!' })
//     } else if (message === 'goodbye') {
//         chrome.runtime.Port.disconnect();
//     }
// });