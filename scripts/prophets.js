const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url); 
        const data = await response.json();
        
        displayProphets(data.prophets);
    } catch (error) {
        console.error("Erro ao buscar ou processar os dados:", error);
        cards.innerHTML = "<p>Desculpe, não foi possível carregar os dados dos profetas.</p>";
    }
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2'); 
        let dob = document.createElement('p');     
        let pob = document.createElement('p');     
        let order = document.createElement('p');   
        let length = document.createElement('p');  
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`; 

        dob.textContent = `Data de Nascimento: ${prophet.birthdate}`;
        pob.textContent = `Local de Nascimento: ${prophet.birthplace}`;
        
        order.textContent = `Ordem: ${prophet.order}º Profeta`;
        length.textContent = `Anos de Serviço: ${prophet.length} ano(s)`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Retrato de ${prophet.name} ${prophet.lastname} - ${prophet.order}º Profeta`); 
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName); 
        card.appendChild(order);     
        card.appendChild(length);    
        card.appendChild(dob); 
        card.appendChild(pob); 
        card.appendChild(portrait);
        cards.appendChild(card);
    }); 
}

// --- FOOTER ---

const lastModifiedSpan = document.querySelector('#lastmodified');
if (lastModifiedSpan) {

    const lastModifiedDate = new Date(document.lastModified);
    
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, 
        
        timeZone: 'America/Denver' 
    };

    const formattedDateTime = lastModifiedDate.toLocaleDateString('en-US', options);

    lastModifiedSpan.textContent = `Last Modification: ${formattedDateTime}`;
}
