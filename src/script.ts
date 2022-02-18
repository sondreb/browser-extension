function writeToLog(text: string) {
    console.log(text);
}

const state = {
    activated: true,
    items: ["1", "2", "3"]
};

document.getElementById('try-button')?.addEventListener("click", () => {
    console.log('Hello World!');
});

document.getElementById('set-button')?.addEventListener("click", async () => {
    const chr = chrome.storage as any;
    await chr.session.set({ 'data': state });
    console.log('STATE SAVED!');

    const bytesInUse = await chr.session.getBytesInUse();
    console.log(bytesInUse);
});

document.getElementById('get-button')?.addEventListener("click", async () => {
    const chr = chrome.storage as any;
    const data = await chr.session.get(['data', 'ui', 'action', 'store']);
    console.log(data);
});


// {get: ƒ, set: ƒ, remove: ƒ, clear: ƒ, getBytesInUse: ƒ, …}