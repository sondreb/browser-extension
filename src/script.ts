function writeToLog(text: string) {
    console.log(text);
}


const btn = document.getElementById('try-button');

if (btn)
{
    btn.addEventListener("click", () => {
        console.log('Hello World!');
    });
}



