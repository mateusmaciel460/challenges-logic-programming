const elementShowProject = document.querySelector('#element-show-project');

const listProject = [
    { id: 1, title: 'Project Base' }, { id: 2, title: 'Number Secret' },
    { id: 3, title: 'Random Number Generator' }, { id: 4, title: 'Rent Games' },
    { id: 5, title: 'Shop Cart' }, { id: 6, title: 'Friend Secret' },
    { id: 7, title: 'Ticket Purchase' }
];

function showOnScreenProject() {
    listProject.forEach((project) => {
       elementShowProject.innerHTML += `
            <div class="model__vertical model__center">
                <h3 class="container__title">${transformTextIntoAcronym(project.title)}</h3>
                <span class="container__tag model__background-green">${project.title}</span>
                <a href="${transformTextIntoTag(project.title)}/" target="_blank" class="container__button container__button-blue">Visualizar</a>
            </div>
       `;
    });
}

function transformTextIntoAcronym(titleProject) {
    const separatorListTitle = titleProject.split(' ');
    let newTitle = '';

    for (let i = 0; i < separatorListTitle.length; i++) {
        newTitle += separatorListTitle[i][0];
    }

    return newTitle;
}

function transformTextIntoTag(titleProject) {
    titleProject = titleProject.toLowerCase().split(' ').join('-');

    return titleProject;
}

showOnScreenProject();