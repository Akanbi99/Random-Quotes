// Get all id n the page
let quoteContainer = document.getElementById('quote-container');
let quote = document.getElementById('quote');
let author = document.getElementById('author');
let twitter = document.getElementById('twitter');
let newQuote = document.getElementById('new-quote');
let loader = document.getElementById('loader');


// Show loader 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
} 

let randomQuote = []

async function getQuote() {
    loading();
    try {
        const apiUrl = await fetch('https://type.fit/api/quotes');
        const response = await apiUrl.json();
        randomQuote = response[Math.floor(Math.random() * response.length)] //picks a random quote
        if(!randomQuote.author) {
            author.textContent = "Anonymous"
        } else {
            author.textContent = randomQuote.author
        }
    } catch (err){
        // catch the error message
        console.log(err);
    }
    
    // Check quote length to resize if it too long
    if(randomQuote.text.length > 50) {
        quote.classList.add('long-quote');
    } else {
        quote.classList.remove('long-quote')
    }
    // set quote, hide loader
    quote.textContent = randomQuote.text;
    complete();
}

 function tweetQuote() {
     loading();
     const twitterURL = `https://twitter.com/intent/tweet?text=${randomQuote.text} - ${randomQuote.author}`;
     window.open(twitterURL, '_blank');
 }

// On Load 
getQuote()


// Chenge the font size for long text quote.


// Load a new quote on clicking the 'New Quote' button, and tweet the current quote on clicking the twitter icon
twitter.addEventListener('click', tweetQuote)
newQuote.addEventListener('click', getQuote)