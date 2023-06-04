const runGameBtn = document.getElementById('runGameBtn')
const gameDisplay = document.getElementById('gameDisplay')
const newGameDisplay = document.getElementById('newGameDisplay')
const newGameBtn = document.getElementById('newGameBtn')
const label = document.getElementsByName('difficulté')
const minuteur = document.getElementById('compteurGame')
const checkButton = document.getElementById('checkButton')
const inputNumber = document.getElementById('inputGame')
const exitBtn = document.getElementById('exit')
const textArea = document.getElementById('outputGame')

let timer; // Iterator
let interval; // variable for setInterval()

let goalNumber;

        // RANDOM NUMBER INIT

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

        // GAME SYSTEM

class GameSystem {
    constructor(difficult, time, goal) {
        this.difficult = difficult;
        this.time = time;
        this.goal = goal
    }
}

let thisGame = new GameSystem()

        // TIMER FONCTION

const initChrono = () => {
    timer = thisGame.time
    minuteur.textContent = timer
    interval = setInterval(diminuerTemps, 1000)
    interval
}

const diminuerTemps = () => {
    if (timer > 0) {
        timer--
        minuteur.textContent = timer
    }else {
        clearInterval(interval)
        console.log('defaite')
        inputNumber.disabled = true
        checkButton.disabled = true
        thisGame.goal = 'loose'
        console.log(thisGame)
        textArea.innerHTML = `<p style='font-size: 1.5em; color: red;'><strong>Perdu</strong>...</p> <p>Le Juste Prix était <strong>${goalNumber}</strong></p>`
    }
}

        // INIT NEW GAME \\ BUTTON START

const initNewGame = () => {
    label.forEach(function(item) { 
        if (item.checked) {  // Récupère la difficulté
            thisGame = new GameSystem(item.value, item.dataset.time)
            
            console.log(thisGame)
        }
    })
    newGameDisplay.style.display = 'none'
    gameDisplay.style.display = 'flex'

    goalNumber = Math.floor(randomNumber(1, 999))
    console.log(goalNumber)
    initChrono()
    inputNumber.focus()
}

        // RETURN HOME \\ BUTTON NEW GAME

const returnHome = () => {
    if (gameDisplay.style.display === 'flex') {
        gameDisplay.style.display = 'none'
        newGameDisplay.style.display = 'flex'
        clearInterval(interval)
        inputNumber.disabled = false
        checkButton.disabled = false
        thisGame = new GameSystem()
        console.log(thisGame)
        minuteur.innerText = ''
        textArea.innerText = ''
    }
}

const checkNumbers = () => {
    let i = inputNumber.value
    if (i != NaN && i != undefined && i != null && i != '') {
        if (i == goalNumber) {
            inputNumber.disabled = true
            checkButton.disabled = true
            thisGame.goal = 'win'
            console.log(thisGame)
            clearInterval(interval)
            textArea.innerHTML = `<p style='font-size: 1.5em;'><strong>${i}</strong></p> <p><span class='green'>EST</span></strong> le Juste Prix ! <strong>Bravo</strong> !</p>`
        } else if (i < goalNumber) {
            textArea.innerHTML = `<p style='font-size: 1.5em;'><strong>${i} \></strong></p> <p>est trop <strong><span class='red'>Bas</span></strong></p>`
        } else if (i > goalNumber) {
            textArea.innerHTML = `<p style='font-size: 1.5em;'><strong>\< ${i}</strong></p> <p>est trop <strong><span class='yellow'>Haut</span></strong></p>`
        }
    }
    inputNumber.value = ''
    inputNumber.focus()
    
}

        // EVENT CLICK
        
runGameBtn.addEventListener('click', initNewGame) //Clique sur lancer
newGameBtn.addEventListener('click', returnHome) //Clique sur Nouvelle Partie
checkButton.addEventListener('click', checkNumbers)
exitBtn.addEventListener('click', () => {
    window.close()
})

inputNumber.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        checkNumbers()
    }
})

