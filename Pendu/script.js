const textArea = document.getElementById('textArea')
const userInput = document.getElementById('userInput')
const buttonsLetter = document.querySelectorAll('.btn')

const listOfWord = ['Humain', 'Habitation', 'Animal', 'Lion', 'Javascript', 'Appartement', 'Investissement', 'Manuelle']

let word = listOfWord[rng(0, listOfWord.length - 1)]
let tempWordDisplay = []
let hiddenLetter = []
let inputLetter


for (letter of word) {
    tempWordDisplay.push(letter) // Copie du mot dans un array
}

hiddenLetter = tempWordDisplay.slice(1, -1)
tempWordDisplay.fill('_', 1, -1)


// Gère le Font-Size du textArea Selon la longueur du mot
if (tempWordDisplay.length > 10) {
    textArea.style.fontSize = '45px'
} else {
    textArea.style.fontSize = '50px'
}

// Affiche le mot
tempWordDisplay.forEach(letter => textArea.innerText += letter)
 
function rng(min, max) {
    return Math.round(Math.random() * (max - min))
}

function checkLetter() {
    for (y = 0; y < hiddenLetter.length; y++) {
        if (hiddenLetter[y] == inputLetter) {
            tempWordDisplay[y + 1] = inputLetter
        }
    }
        textArea.innerText = ''
        tempWordDisplay.forEach(letter => textArea.innerText += letter)
}

function init(e) {
    if (e.key == 'Enter') {
        inputLetter = userInput.value
        userInput.value = ''
        checkLetter()
        if (hiddenLetter.length == 0) {
            alert('Partie Terminée')
        }
    }
}

buttonsLetter.forEach(btn => btn.addEventListener('click', () => {
    console.log(btn.dataset.value)
}))
userInput.addEventListener('keydown', init)


