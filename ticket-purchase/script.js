const elementMessageAlert = document.querySelector('#element-message-alert');
const elementAvailableSeats = document.querySelector('#element-available-seats');
const elementPriceTicket = document.querySelector('#element-price-ticket');
const elementPriceBuy = document.querySelector('#element-price-buy');
const elementShowNumberChosen = document.querySelector('#element-show-number-chosen');
const elementTicketAdd = document.querySelector('#element-ticket-add');

const listAvailableSeats = [
    { id: 1, title: 'Superior', chosen: [1,2,3,4,5,6] },
    { id: 2, title: 'Central', chosen: [7,8,9,10,11,12] },
    { id: 3, title: 'Inferior', chosen: [13,14,15,16] }
];

let listSeatChosen = [];
let listSeatFinish = [];

let priceTicket = 25;
let priceBuy = 0;

function finishReserve() {
    const nameUser = document.querySelector('#name-user').value;

    if (!validationField(nameUser)) return;

    listSeatFinish.push({ user: nameUser, seatReserve: listSeatChosen });
    addNewReserveUser();

    document.querySelector('#name-user').value = '';
    listSeatChosen = [];
}

function addNewReserveUser() {
    elementTicketAdd.innerHTML = '';

    listSeatFinish.forEach((seatFinish) => {
        elementTicketAdd.innerHTML += `
            <p class="container__text container__text-border">
                Usuário: <span class="container__emphasis">${seatFinish.user}</span> |
                Assentos: [<span class="container__emphasis">${seatFinish.seatReserve.join(', ')}</span>]
            </p>
        `;
    });

    listSeatChosen.forEach((seatChosen) => {
        revertProcessPurchaseTicket(seatChosen, 'green', 'gray', '');
    })

    elementShowNumberChosen.textContent = 'Nenhum assento escolhido.';

    priceBuy = 0;
    elementPriceBuy.textContent = `${priceBuy}`;
}

function revertProcessPurchaseTicket(seatChosen, modelClassRemove, modelClassAdd, nameFunction) {
    const elementSeatChosen = document.querySelector(`#seat-${seatChosen}`);
    const classElementSearchChosen = elementSeatChosen.classList;

    const classModel = 'model__background-';

    classElementSearchChosen.remove(classModel + modelClassRemove);
    classElementSearchChosen.add(classModel + modelClassAdd);

    elementSeatChosen.setAttribute('onclick', `${nameFunction}(${seatChosen})`);

    const checkQuantityNumbersChosen = listSeatChosen.length > 0 ? `Assento(s): ${listSeatChosen.join(', ')}` : 'Nenhum assento escolhido';
    elementShowNumberChosen.textContent = checkQuantityNumbersChosen;
}

function reserveSeat(seatChosen) {
    listSeatChosen.push(seatChosen);
    revertProcessPurchaseTicket(seatChosen, 'red', 'green', 'revertSeat');

    priceBuy += priceTicket;
    elementPriceBuy.textContent = `${priceBuy}`;
}

function revertSeat(seatChosen) {
    const seatRevert = listSeatChosen.indexOf(seatChosen);

    if (seatRevert > -1) {
        listSeatChosen.splice(seatRevert, 1);
    }

    revertProcessPurchaseTicket(seatChosen, 'green', 'red', 'reserveSeat');

    priceBuy -= priceTicket;
    elementPriceBuy.textContent = `${priceBuy}`;
}

function validationField(nameUser) {
    elementMessageAlert.innerHTML = '';

    if (nameUser === '') {
        showOnScreenMessageAlert(elementMessageAlert, 'danger', 'Preencha o nome do usuário');
        return false;
    }

    if (listSeatChosen.length === 0) {
        showOnScreenMessageAlert(elementMessageAlert, 'danger', 'Escolha no mínimo 1 assento');
        return;
    }

    return true;
}


function showOnScreenAvailableSeats() {
    let totalSeatsAvailable = checkQuantitySeatsAvailableSeats();

    for (let i = 1; i <= totalSeatsAvailable; i++) {
        elementAvailableSeats.innerHTML += `
            <li onclick="reserveSeat(${i})" class="model__box model__background-red" id="seat-${i}">${i}</li>
        `;
    }

    elementPriceTicket.textContent = `${priceTicket}`;
    elementPriceBuy.textContent = `${priceBuy}`;
}

function checkQuantitySeatsAvailableSeats() {
    let totalSeatsAvailable = 0;

    listAvailableSeats.forEach((seats) => {
        totalSeatsAvailable += seats.chosen.length;
    });

    return totalSeatsAvailable;
}

function showOnScreenMessageAlert(elementMessage, typeMessage, textMessage) {
    elementMessage.innerHTML = `
        <span class="container__message container__message-${typeMessage}">${textMessage}</span>
    `;
}

showOnScreenAvailableSeats();