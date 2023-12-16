
let langOptions = document.querySelectorAll('select');
let fromtext = document.querySelector(".fromtext");
let transferText = document.querySelector(".toTranslite");
let speak = document.querySelector(".speak");
let tovoice = document.querySelector(".tospeak");
let totallength = document.getElementById("displaydata");


// anime
window.onload = () => {
    document.getElementById("main").style.display= "none"
    setTimeout(() => {
        document.getElementById("anime").style.display = "none";
    document.getElementById("main").style.display= "block"

    }, 2000);
};

langOptions.forEach((element, cont) => {
    for (let country in language) {
        let selected;
        if (cont == 0 && country == "en-GB") {
            selected = "selected"
        } else if (cont == 1 && country == "bn-IN") {
            selected = "selected";
        }
        let option = `<option value="${country}" ${selected}>${language[country]}</option>`;
        element.insertAdjacentHTML("beforeend", option);
    }
});
fromtext.addEventListener("input", function () {
    let content = fromtext.value;
    FromContent = langOptions[0].value
    transContent = langOptions[1].value
    let transferLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${FromContent}|${transContent}`
    axios.get(transferLink)
        .then(res => {
            let data = res.data;
            transferText.value = data.responseData.translatedText;
        })
})

speak.addEventListener('click', () => {
    let fromtalk
    fromtalk = new SpeechSynthesisUtterance(fromtext.value);
    fromtalk.lang = langOptions[0].value;
    speechSynthesis.speak(fromtalk)
})
tovoice.addEventListener('click', () => {
    let fromtalk
    fromtalk = new SpeechSynthesisUtterance(transferText.value);
    fromtalk.lang = langOptions[0].value;
    speechSynthesis.speak(fromtalk)
})

document.querySelector(".cpybtn").addEventListener("click", () => {
    navigator.clipboard.writeText(transferText.value)
})
fromtext.addEventListener("keyup", () => {
    totallength.innerHTML = `${fromtext.value.length}`
})

// Color change
function load() {
    var letters = document.querySelectorAll('p span');
    letters.forEach(function (letter, index) {
        setTimeout(function () {
            letter.style.color = "rgb(13, 102, 199)";
        }, index * 1000)
    })
}
load()
