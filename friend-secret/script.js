const elementMessageAlert = document.querySelector('#element-message-alert');
const elementAddFriend = document.querySelector('#element-add-friend');
const elementDrawFriend = document.querySelector('#element-draw-friend');

let listFriends = [];

function addFriendSecret() {
    let nameFriend = document.querySelector('#name-friend').value;

    if (!validationField(nameFriend)) return;
    listFriends.push(nameFriend);

    elementAddFriend.innerHTML = `<p class="container__text">${listFriends.join(', ')}</p>`;
    document.querySelector('#name-friend').value = '';
}

function validationField(nameFriend) {
    let nameFriendLowerCase = nameFriend.toLowerCase();
    let listFriendsLowerCase = listFriends.join(', ').toLowerCase();

    elementMessageAlert.innerHTML = '';

    if (nameFriend === '') {
        showMessageAlert(elementMessageAlert, 'danger', `Preencha corretamente o campo de amigo`);
        return false;
    }

    if (listFriendsLowerCase.includes(nameFriendLowerCase)) {
        showMessageAlert(elementMessageAlert, 'danger', `O amigo ${nameFriend} já foi adicionado`);
        return false;
    }

    if (listFriends.length >= 3) {
        document.querySelector('#button-draw').removeAttribute('disabled');
    }

    return true;
}

function drawSecretFriend() {
    elementDrawFriend.innerHTML = '';
    elementMessageAlert.innerHTML = '';

    shuffleList(listFriends);

    for (let i = 0; i < listFriends.length; i++) {
        if (i === (listFriends.length - 1)) {
            returnResultDrawFriend(i, 0);
        } else {
            returnResultDrawFriend(i, i + 1);
        }
    }

    document.querySelector('#button-restart').removeAttribute('disabled');
}

function restartGame() {
    listFriends = [];
    document.querySelector('#button-draw').setAttribute('disabled', true);
    document.querySelector('#button-restart').setAttribute('disabled', true);
    showOnScreenDefaultMessage();
}

function returnResultDrawFriend(positionInitial, positionFinal) {
    elementDrawFriend.innerHTML += `<p class="container__text">${listFriends[positionInitial]} -> ${listFriends[positionFinal]}</p>`;
}

function shuffleList(listChosen) {
    listChosen.sort(() => Math.random() - 0.5);
}

function showMessageAlert(elementAlert, typeAlert, textAlert) {
    elementAlert.innerHTML = `<span class="container__message container__message-${typeAlert}">${textAlert}</span>`;
}

function showOnScreenDefaultMessage() {
    const elementMessageFriend = document.querySelectorAll('.model__box .model__vertical');

    elementMessageFriend.forEach((message) => {
        message.innerHTML = `<span class="container__message container__message-danger">Nenhum amigo foi ${message.title} até o momento.</span>`;
    });
}

showOnScreenDefaultMessage();