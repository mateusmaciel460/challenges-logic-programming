let listNumberSecret = [];

const numberMin = 1;
const numberMax = 5;
const elementMessageAlert = document.querySelector('#element-message-alert');
const elementPossibleNumber = document.querySelector('#element-possible-number');

let numberSecret = getNumberSecret();
let numberKick;
let attempt = 1;

function kickNumberSecret() {
    numberKick = parseInt(document.querySelector('#number-kick').value);

    if (!validationField(numberKick)) return;

    if (numberKick === numberSecret) {
        let textAttempt = attempt > 1 ? 'tentativas' : 'tentativa';

        showOnScreenMessage('h1', 'Parabéns!');
        showOnScreenMessage('h2', `Você acertou o número secreto ${numberSecret} com ${attempt} ${textAttempt}`);

        document.querySelector('#number-kick').setAttribute('disabled', true);
        document.querySelector('#button-kick').setAttribute('disabled', true);
        document.querySelector('#button-restart').removeAttribute('disabled');

        searchElementPossibleNumber(numberSecret);
    } else {
        if (numberKick > numberSecret) {
            showOnScreenMessage('h2', `O número secreto é menor que ${numberKick}`);
        } else {
            showOnScreenMessage('h2', `O número secreto é maior que ${numberKick}`);
        }

        attempt++;
    }
}

function restartGame() {
    document.querySelector('#number-kick').removeAttribute('disabled');
    document.querySelector('#button-kick').removeAttribute('disabled');
    document.querySelector('#button-restart').setAttribute('disabled', true);
    attempt = 1;
    numberSecret = getNumberSecret();
    showOnScreenMessageInitial();
}

function validationField(numberKick) {
    elementMessageAlert.innerHTML = '';
    document.querySelector('#number-kick').value = '';

    if (isNaN(numberKick)) {
        showMessageAlert(elementMessageAlert, 'danger', `Preencha corretamente todos os campos.`);
        return false;
    }

    if ((numberKick < numberMin) || (numberKick > numberMax)) {
        showMessageAlert(elementMessageAlert, 'danger', `Escolha um número entre ${numberMin} e ${numberMax}`);
        return;
    }

    return true;
}

function showMessageAlert(elementAlert, typeAlert, textAlert) {
    elementAlert.innerHTML = `
        <span class="container__message container__message-${typeAlert}">${textAlert}</span>
    `;
}

function getNumberSecret() {
    let numberSecret = parseInt(Math.random() * numberMax + numberMin);

    if (listNumberSecret.length === numberMax) {
        listNumberSecret = [];
        showOnScreenPossibleNumbersRandom();
    }

    if (listNumberSecret.includes(numberSecret)) {
        return getNumberSecret();
    } else {
        listNumberSecret.push(numberSecret);
        return numberSecret;
    }
}

function showOnScreenPossibleNumbersRandom() {
    elementPossibleNumber.innerHTML = '';

    for (let i = 1; i <= numberMax; i++) {
        elementPossibleNumber.innerHTML += `
            <li class="model__box model__background-red" id="element-number-${i}">0${i}</li>
        `;
    }
}

function searchElementPossibleNumber(numberSecret) {
    const elementSearch = document.querySelector(`#element-number-${numberSecret}`);
    const classElementSearch = elementSearch.classList;

    classElementSearch.add('model__background-green');
    classElementSearch.remove('model__background-red');
}

function showOnScreenMessage(tagMessage, textMessage) {
    let field = document.querySelector(tagMessage);
    field.textContent = textMessage;
}

function showOnScreenMessageInitial() {
    showOnScreenMessage('h1', 'Número Secreto');
    showOnScreenMessage('h2', `Digite um número entre ${numberMin} e ${numberMax}`);
}

showOnScreenMessageInitial();
showOnScreenPossibleNumbersRandom();