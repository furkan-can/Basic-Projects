const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const btnTranslate = document.querySelector("#btnTranslate");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");
const snackbar = document.getElementById("snackbar");


for (let lang in languages) {
    let options = `<option value="${lang}">${languages[lang]}</option>`;

    fromLang.insertAdjacentHTML("beforeend", options);
    toLang.insertAdjacentHTML("beforeend", options);

    fromLang.value = "tr-TR"
    toLang.value = "en-US"
}


btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;

    const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData["translatedText"];
        });
});


exchange.addEventListener("click", () => {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
});

const showSnackbar = (text) => {
    snackbar.innerText=text;
    snackbar.classList.add("show");
    setTimeout(function () { 
        snackbar.classList.remove("show"); 
    }, 3000);
}

for (let icon of icons) {
    icon.addEventListener("click", (e) => {

        if (e.target.classList.contains("fa-copy")) {
            if (e.target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
                showSnackbar("Text copied.");
            } else {
                navigator.clipboard.writeText(toText.value);
                showSnackbar("Text copied.");
            }
        } else {
            let utterance;
            if (e.target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang=fromLang.value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang=toLang.value;
            }

            speechSynthesis.speak(utterance);
        }
    });
}