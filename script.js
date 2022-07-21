const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const wpmElement = document.getElementById('wpmtext')
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    let previousWordIndex = 0
    correctWords = 0;
    arrayQuote.forEach((characterSpan, index) => {
        
        const character = arrayValue[index]
        if (characterSpan.innerText === " ")
        {
            correctWord = true;
            // currentWord = quotelist.slice(previousWordIndex, index)
            for (var i = previousWordIndex; i < index; i++) {
                if (quotelist[i] != arrayValue[i]){
                    correctWord = false;
                }
            }
            if (correctWord){
                correctWords++
            }
            previousWordIndex = index
        }
        if (character == null) {
            
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false;
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')

        } 
        
        else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false;
        }
    })

    if (correct){
        correctWords = 0;
        renderNewQuote()
    }
})
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    correctWords = 0
    const quote = await getRandomQuote()
    quotelist = Array.from(quote)
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
    startWPM()
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        if (Math.floor(getTimerTime()) == 1){
            timerElement.innerText = Math.floor(getTimerTime()) + ' second'
        }
        else{
            timerElement.innerText = Math.floor(getTimerTime()) + ' seconds'
        }
    }, 1000)
}

function startWPM() {
    wpmElement.innerText = '0 wpm'
    setInterval(() => {
        wpmElement.innerText = getWPM()
    }, 1000)

}

function getWPM() {
    if (getTimerTime() == 0){
        return '0 wpm'
    }
    return Math.floor(correctWords * 60 / getTimerTime()) + ' wpm'
}
function getTimerTime() {
    return (new Date() - startTime) / 1000
}
renderNewQuote()