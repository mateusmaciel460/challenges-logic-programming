const elementMessageAlert = document.querySelector('#element-message-alert');
const elementAllNumbers = document.querySelector('#element-all-numbers');

function drawNumber() {
    let typeDefault = parseInt(document.querySelector('#type-default').value);
    let numberMin = parseInt(document.querySelector('#number-min').value);
    let numberMax = parseInt(document.querySelector('#number-max').value);
    let numberQuantity = parseInt(document.querySelector('#number-quantity').value);

    let listNumberDraw = [];
    let numberDraw = 0;

    if (!validationField(typeDefault, numberMin, numberMax, numberQuantity)) return;

    for (let i = 0; i < numberQuantity; i++) {

        numberDraw = getDrawNumbers(numberMin, numberMax);

        while (listNumberDraw.includes(numberDraw) || checkTypeOperation(typeDefault, numberDraw)) {
            numberDraw = getDrawNumbers(numberMin, numberMax);
        }

        listNumberDraw.push(numberDraw);
    }

    let joinListNumberDraw = listNumberDraw.sort(returnOrderNumberDraw).join(', ');
    showMessageAlert(elementMessageAlert, 'success', `Números sorteados: ${joinListNumberDraw}`);
    showAllNumbers(numberMax, listNumberDraw);

    document.querySelector('#button-restart').removeAttribute('disabled');
    clearField();
}

function checkTypeOperation(typeDefault, numberDraw) {
    let numberPair = numberDraw % 2 === 0;
    let numberOdd = numberDraw % 2 !== 0;

    if (typeDefault === 2) {
        return !(numberPair)
    }

    if (typeDefault === 3) {
        return !(numberOdd);
    }
}

function restartGame() {
    document.querySelector('#button-restart').setAttribute('disabled', true);
    showMessageDefaultAllNumbers();
    elementMessageAlert.innerHTML = '';
}

function validationField(typeDefault, numberMin, numberMax, numberQuantity) {
    const differenceMaxMin = (numberMax - numberMin + 1);
    const limitQuantity = Math.floor(numberMax / 2);

    if (isNaN(numberMin) || isNaN(numberMax) || isNaN(numberQuantity)) {
        showMessageAlert(elementMessageAlert, 'danger', 'Preencha corretamente todos os campos.');
        return false;
    }

    if (numberQuantity > differenceMaxMin) {
        showMessageAlert(elementMessageAlert, 'danger', `Digite uma quantidade entre ${numberMin} e ${numberMax}`);
        return false;
    }

    if (numberQuantity > limitQuantity && typeDefault !== 1) {
        showMessageAlert(elementMessageAlert, 'danger', `Quantidade permitida: ${limitQuantity}`);
        return false;
    }

    return true;
}

function clearField() {
    document.querySelector('#number-min').value = '';
    document.querySelector('#number-max').value = '';
    document.querySelector('#number-quantity').value = '';
}

function returnOrderNumberDraw(numberOne, numberTwo) {
    return numberOne - numberTwo;
}

function showAllNumbers(numberMax, listNumber) {
    let checkNumberChosen = true;

    elementAllNumbers.innerHTML = '';

    for (let i = 1; i <= numberMax; i++) {
        checkNumberChosen = listNumber.includes(i) ? 'green' : 'red';

        elementAllNumbers.innerHTML += `
            <li class="model__box model__background-${checkNumberChosen}">${i}</li>
        `;
    }
}

function showMessageDefaultAllNumbers() {
    elementAllNumbers.innerHTML = `<p class="container__text container__emphasis">Aguardando...</p>`;
}

function showMessageAlert(elementMessage, typeMessage, textMessage) {
    elementMessage.innerHTML = `
        <span class="container__message container__message-${typeMessage}">${textMessage}</span>
    `;
}

function getDrawNumbers(numberMin, numberMax) {
    numberMin = Math.ceil(numberMin);
    numberMax = Math.max(numberMax);

    return parseInt(Math.random() * (numberMax - numberMin + 1) + numberMin);
}

showMessageDefaultAllNumbers();