const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const wpmElement = document.getElementById('wpmtext')
const leaderboardOne = document.getElementById('leaderboardone')
const leaderboardTwo = document.getElementById('leaderboardtwo')
const leaderboardThree = document.getElementById('leaderboardthree')
const leaderboardFour = document.getElementById('leaderboardfour')
const leaderboardFive = document.getElementById('leaderboardfive')
if (localStorage.getItem("leaderboard1") === null) {
    topScores = [0, 0, 0, 0, 0]
}
else {
    topScores = []
    topScores[0] = window.localStorage.getItem('leaderboard1')
    topScores[1] = window.localStorage.getItem('leaderboard2')
    topScores[2] = window.localStorage.getItem('leaderboard3')
    topScores[3] = window.localStorage.getItem('leaderboard4')
    topScores[4] = window.localStorage.getItem('leaderboard5')
}

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
        let finalWPM = getWPM()
        for (var i = 0; i < topScores.length; i++){
            if (finalWPM > topScores[i]){
                temphigher = finalWPM
                for (var j = i; j < topScores.length; j++){
                    temp = topScores[j]
                    topScores[j] = temphigher
                    temphigher = temp
                }
                temp = topScores[i]
                topScores[i] = finalWPM
                break
            }
        }
        correctWords = 0;
        window.localStorage.setItem('leaderboard1', topScores[0])
        window.localStorage.setItem('leaderboard2', topScores[1])
        window.localStorage.setItem('leaderboard3', topScores[2])
        window.localStorage.setItem('leaderboard4', topScores[3])
        window.localStorage.setItem('leaderboard5', topScores[4])
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
    setTextScores()
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
    timerElement.innerText = "Timer: 0 seconds"
    startTime = new Date()
    setInterval(() => {
        if (Math.floor(getTimerTime()) == 1){
            timerElement.innerText = 'Timer: ' + Math.floor(getTimerTime()) + ' second'
        }
        else{
            timerElement.innerText = 'Timer: ' + Math.floor(getTimerTime()) + ' seconds'
        }
    }, 1000)
}

function startWPM() {
    setInterval(() => {
        wpmElement.innerText = getWPM() + " wpm"
    }, 1000)

}

function setTextScores() { 
    leaderboardOne.innerText = '1. ' + topScores[0] + ' WPM'
    leaderboardTwo.innerText = '2. ' + topScores[1] + ' WPM'
    leaderboardThree.innerText = '3. ' + topScores[2] + ' WPM'
    leaderboardFour.innerText = '4. ' + topScores[3] + ' WPM'
    leaderboardFive.innerText = '5. ' + topScores[4] + ' WPM'
}


function getWPM() {
    if (getTimerTime() == 0){
        return 0
    }
    return Math.floor(correctWords * 60 / getTimerTime())
}
function getTimerTime() {
    return (new Date() - startTime) / 1000
}


renderNewQuote()