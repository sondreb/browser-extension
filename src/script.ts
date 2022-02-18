function writeToLog(text: string) {
    console.log(text);
}

const state = {
    activated: true,
    items: ["1", "2", "3"]
};

const store = {
    items: ["1", "2", "3"]
};

document.getElementById('try-button')?.addEventListener("click", () => {
    console.log('Hello World!');
});

document.getElementById('set-button')?.addEventListener("click", async () => {
    const chr = chrome.storage as any;
    await chr.session.set({ 'data': state, 'store': store });
    console.log('STATE SAVED!');

    const bytesInUse = await chr.session.getBytesInUse();
    console.log(bytesInUse);
});

document.getElementById('get-button')?.addEventListener("click", async () => {
    const chr = chrome.storage as any;
    const data = await chr.session.get(['data', 'store']);
    console.log('Data and Store', data);
});

document.getElementById('get-store-button')?.addEventListener("click", async () => {
    const chr = chrome.storage as any;
    const data = await chr.session.get(['store']);
    console.log('Store', data);
});

document.getElementById('remove-button')?.addEventListener("click", async () => {
    const chr = chrome.storage as any;
    await chr.session.remove(['data']);
    console.log('data was removed');
});

document.getElementById('clear-button')?.addEventListener("click", async () => {
    const chr = chrome.storage as any;
    await chr.session.clear();
    console.log('session state was cleared');
});

chrome.action.setBadgeBackgroundColor(
    { color: '#00FF00' },  // Also green
    () => { /* ... */ },
);



// {get: ƒ, set: ƒ, remove: ƒ, clear: ƒ, getBytesInUse: ƒ, …}