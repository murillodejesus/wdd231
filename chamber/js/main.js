let chamberMembers = [];
let currentView = 'grid';

function loadFooterInfo() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    const lastModified = document.lastModified;
    document.getElementById('lastmodified').textContent = lastModified;
}

function getLevelName(level) {
    switch (level) {
        case 3: return 'Ouro';
        case 2: return 'Prata';
        case 1: return 'Básico';
        default: return 'Membro';
    }
}

function getLevelClass(level) {
    switch (level) {
        case 3: return 'level-gold';
        case 2: return 'level-silver';
        case 1: return 'level-basic';
        default: return 'level-default';
    }
}

async function getMemberData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        chamberMembers = await response.json();

        displayMembers(chamberMembers, currentView);

        setupViewToggle();
        setupFilter();

    } catch (error) {
        console.error('Erro ao buscar ou processar dados do JSON:', error);
        document.getElementById('member-display').innerHTML = '<p>Não foi possível carregar os dados dos membros. Verifique o console para mais detalhes.</p>';
    }
}

function getCurrentDisplayedMembers() {
    const filterSelect = document.getElementById('member-filter');
    const selectedLevel = filterSelect.value;

    if (selectedLevel === 'all') {
        return chamberMembers;
    }

    const levelToFilter = parseInt(selectedLevel);
    return chamberMembers.filter(member => member.membershipLevel === levelToFilter);
}

function setupFilter() {
    const filterSelect = document.getElementById('member-filter');

    filterSelect.addEventListener('change', () => {
        const filteredMembers = getCurrentDisplayedMembers();
        displayMembers(filteredMembers, currentView);
    });
}

function displayMembers(members, viewType) {
    const displayElement = document.getElementById('member-display');
    displayElement.innerHTML = '';

    currentView = viewType;
    displayElement.className = viewType === 'grid' ? 'grid-view' : 'list-view';

    members.forEach(member => {
        const memberContainer = document.createElement('div');
        memberContainer.classList.add('member-card');

        if (viewType === 'list') {
            memberContainer.classList.add('list-item');
        }

        const levelClass = getLevelClass(member.membershipLevel);
        memberContainer.classList.add(levelClass);

        if (viewType === 'grid') {
            memberContainer.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo">
                <h4>${member.name} (${getLevelName(member.membershipLevel)})</h4>
                <p>${member.description}</p>
                <p><strong>Telefone:</strong> ${member.phone}</p>
                <p><strong>Endereço:</strong> ${member.address}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            `;
        } else {
            memberContainer.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" style="width: 50px; height: 50px;">
                <h4>${member.name}</h4>
                <p>${member.address}</p>
                <p><a href="${member.website}" target="_blank">Visitar Site</a></p>
                <p class="membership-level">${getLevelName(member.membershipLevel)}</p>
            `;
        }

        displayElement.appendChild(memberContainer);
    });

    if (members.length === 0) {
        displayElement.innerHTML = `<p style="text-align: center; grid-column: 1 / -1;">Nenhum membro encontrado neste nível de afiliação.</p>`;
    }
}

function setupViewToggle() {
    const gridButton = document.getElementById('grid-view');
    const listButton = document.getElementById('list-view');

    gridButton.addEventListener('click', () => {
        const currentDisplayedMembers = getCurrentDisplayedMembers();
        displayMembers(currentDisplayedMembers, 'grid');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    });

    listButton.addEventListener('click', () => {
        const currentDisplayedMembers = getCurrentDisplayedMembers();
        displayMembers(currentDisplayedMembers, 'list');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    });
}

document.getElementById('menu-toggle').addEventListener('click', function () {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    loadFooterInfo();
    getMemberData();
});