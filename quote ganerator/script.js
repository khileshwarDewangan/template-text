const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const shwoLoadingSpiner = function () {
  quoteContainer.hidden = true;
  loader.hidden = false;
};
const hideLoadingSpiner = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

function newQuote() {
  shwoLoadingSpiner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    quoteAuthor.textContent = "unkhown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoadingSpiner();
}

const tweetQuoteHandalr = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
};

twitterBtn.addEventListener("click", tweetQuoteHandalr);
quoteBtn.addEventListener("click", newQuote);

//  get quotes form api
const getQuotesFromApi = async function () {
  shwoLoadingSpiner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    setTimeout(() => {
      getQuotesFromApi;
    }, 10000);
  }
  hideLoadingSpiner();
};

// on load
getQuotesFromApi();
