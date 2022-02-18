console.log('EXTENSION PROVIDER SCRIPT!!');

const gt = globalThis as any;

gt.blockcore = {
    enabled: true
};


window.addEventListener('message', message => {
    console.log('message', message);
})