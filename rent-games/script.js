let counterTotalGame = 0;
const elementListGames = document.querySelector('#element-list-games');
const elementTotalRent = document.querySelector('#element-total-rent');

const listGames = [
    { id: 1, title: 'Grand Theft Auto V', imgUrl: 'LX2kNw4h/gta-five.png' },
    { id: 2, title: 'Elden Ring', imgUrl: 'C39Sj4fv/elden-ring.png' },
    { id: 3, title: 'God of War Ragnarök', imgUrl: 'h1LTYnCJ/god-of-war.png' },
];

function rentGame(idGame) {
    const game = document.querySelector(`#game-${idGame}`);
    const imgGame = game.querySelector('img');
    const imgGameClass = imgGame.classList;
    const titleGame = game.querySelector('h2');
    const tagGame = game.querySelector('span');
    const tagGameClass = tagGame.classList;
    const buttonGame = game.querySelector('button');
    const buttonGameClass = buttonGame.classList;

    if (buttonGameClass.contains('container__button-blue')) {
        imgGameClass.add('container__image-opacity');

        buttonGameClass.add('container__button-gray');
        buttonGameClass.remove('container__button-blue');

        tagGameClass.add('model__background-red');
        tagGameClass.remove('model__background-green');

        tagGame.textContent = 'Você alugou';
        buttonGame.textContent = 'Devolver';
        counterTotalGame++;

    } else {
        if (!validationField(titleGame)) return;

        imgGameClass.remove('container__image-opacity');
        
        buttonGameClass.add('container__button-blue');
        buttonGameClass.remove('container__button-gray');

        tagGameClass.add('model__background-green');
        tagGameClass.remove('model__background-red');

        tagGame.textContent = 'Ninguém alugou';
        buttonGame.textContent = 'Alugar';
        counterTotalGame--;
    }

    elementTotalRent.textContent = `${counterTotalGame}`;
}

function validationField(titleGame) {
    const contentTitleGame = titleGame.textContent;
    let messageAlert = prompt(`Digite (${contentTitleGame}) para devolver o jogo.`);
    let checkMessageAlert = messageAlert === contentTitleGame ? 'sim' : 'não';
    let messageDefault = `Você escolheu (${checkMessageAlert}) para devolver o jogo.`;

    if (messageAlert !== contentTitleGame) {
        alert(messageDefault);
        return false;
    } else {
        alert(messageDefault);
        return true;
    }
}

function showOnScreenListGames() {
    listGames.forEach((game) => {
         elementListGames.innerHTML += `
             <div class="container__layer model__vertical model__center" id="game-${game.id}">
                <img src="https://i.ibb.co/${game.imgUrl}" alt="Logo do jogo (${game.title})" class="container__image"/>
                <h2 class="container__subtitle">${game.title}</h2>
                <span class="container__tag model__background-green">Ninguém alugou</span>
                <button onclick="rentGame(${game.id})" class="container__button container__button-blue">Alugar</button>
             </div>
         `;
    });
}

showOnScreenListGames();