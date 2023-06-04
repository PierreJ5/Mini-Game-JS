var allButton = document.querySelectorAll('button') // Tout les boutons du Html
var textZone = document.getElementById('textArea') // Zone LCD
var tempBtn // retour de touche
var tempX = '' // temp1
var tempY = '' // temp2
var tempZ = '' // temp Result
var trueAction = '' // true Action pour le case '=' -> fonction checkResult

const reset = () => { // fonction de reset
    textZone.innerText = '' 
    tempY = 0 
    tempX = 0
    tempZ = 0  
    trueAction = ''
}

const checkResult = (num1, num2) => { // fonction de calcul par TrueAction
    if (trueAction == 'addition') {
        return parseFloat(num1) + parseFloat(num2)
    }else if (trueAction =='soustract') {
        return parseFloat(num1) - parseFloat(num2)
    }else if (trueAction == 'multiple') {
        return parseFloat(num1) * parseFloat(num2)
    }else if (trueAction == 'divide') {
        return parseFloat(num1) / parseFloat(num2)
    }
}

const action = () => {
    if (tempY == 0) {
        tempY = tempX // Passe la valeur X dans le Y
        tempX = 0 // Re init de X              
        textZone.innerText = ''
    }else {
        tempY = checkResult(tempY, tempX) // Effectue l'operation Y avec X et libère X
        tempX = 0 // Re init de X
        textZone.innerText = ''
    }
}

const returnValue = (btn) => {
    tempBtn = btn.target.value // Recupere le value html du bouton
    switch (tempBtn) {

        case 'C':
            reset() // Reset des valeurs et du innerText
            break;

        case '+':
            action()
            trueAction = 'addition' // Definie l'action pour le résultat = checkResult
            break;

        case '-':
            action()
            trueAction = 'soustract' // Definie l'action pour le résultat =
            break;

        case 'x':
            action()
            trueAction = 'multiple' // Definie l'action pour le résultat =
            break;

        case '%':
            action()
            trueAction = 'divide' // Definie l'action pour le résultat =
            break;

        case '=':
            tempZ = checkResult(tempY, tempX)
            textZone.innerText = tempZ
            tempX = tempZ // Renvoi la valeur Z a X, pour prochaine opération
            trueAction = ''
            tempY = 0
            tempZ = 0
            break;

        default: //Chaque touche de chiffre pressé
            if (textZone.textContent.length < 9) {
                textZone.innerText += tempBtn
                tempX += tempBtn
                console.log(tempX)
            }else {
                alert('Nombre maximum de chiffre atteint [max 9]')
            }
    }
}

allButton.forEach(elem => elem.addEventListener('click', returnValue))