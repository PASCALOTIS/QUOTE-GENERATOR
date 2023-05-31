const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  facebookBtn = document.querySelector(".facebook"),
  instagramBtn = document.querySelector(".instagram"),
  synth = window.speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(result => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === "Google UK English Female");
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank");
});

facebookBtn.addEventListener("click", () => {
  let facebookUrl = `https://www.facebook.com/sharer.php?url=${quoteText.innerText}`;
  window.open(facebookUrl, "_blank");
});

instagramBtn.addEventListener("click", () => {
  let instagramUrl = `https://www.instagram.com/?url=${quoteText.innerText}`;
  window.open(instagramUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
