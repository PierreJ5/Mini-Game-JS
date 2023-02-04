const listOfWord = ['Humain', 'Habitation', 'Animal', 'Lion', 'Javascript', 'Appartement', 'Investissement']

let word = listOfWord[rng(0, listOfWord.length)]

function rng(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

console.log(word)