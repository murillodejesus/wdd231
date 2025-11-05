
const courses = [
    {
        courseCode: "CSE 110",
        name: "Introduction to Web and Computer Programming",
        credits: 2,
        completed: true 
    },
    {
        courseCode: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        courseCode: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        courseCode: "WDD 131",
        name: "Developing Web Applications",
        credits: 3,
        completed: false
    },
    {
        courseCode: "WDD 231",
        name: "Visual Design and the Web",
        credits: 3,
        completed: false
    },
    {
        courseCode: "CSE 210",
        name: "Programming with Classes",
        credits: 3,
        completed: false
    },
    {
        courseCode: "WDD 331",
        name: "Frontend Development",
        credits: 3,
        completed: false
    }
];


const cardsContainer = document.getElementById('course-cards-container');
const totalCreditsSpan = document.getElementById('total-credits');
const filterAllBtn = document.getElementById('filter-all');
const filterWDDBtn = document.getElementById('filter-wdd');
const filterCSEBtn = document.getElementById('filter-cse');

/**
 *
 * @param {Array} courseArray 
 */
function displayCourses(courseArray) {

    cardsContainer.innerHTML = '';
    
    courseArray.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`; // Adiciona classe 'completed'

        card.innerHTML = `
            <h3>${course.courseCode}</h3>
            <p><strong>Nome:</strong> ${course.name}</p>
            <p><strong>Créditos:</strong> ${course.credits}</p>
            <p><strong>Status:</strong> ${course.completed ? 'Concluído' : 'Pendente'}</p>
        `;
        
        cardsContainer.appendChild(card);
    });
    
    calculateAndDisplayTotalCredits(courseArray);
}

/**
 * 
 * @param {Array} courseArray 
 */
function calculateAndDisplayTotalCredits(courseArray) {

    const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);
    
    totalCreditsSpan.textContent = totalCredits;
}

/**
 * 
 * @param {string} filterType 
 */
function filterCourses(filterType) {
    let filteredList = [];
    
    if (filterType === 'WDD') {
        filteredList = courses.filter(course => course.courseCode.startsWith('WDD'));
    } else if (filterType === 'CSE') {
        filteredList = courses.filter(course => course.courseCode.startsWith('CSE'));
    } else {
        // 'all'
        filteredList = courses;
    }
    
    updateButtonStatus(filterType);
    
    displayCourses(filteredList);
}

/**
 * 
 * @param {string} activeType 
 */
function updateButtonStatus(activeType) {
    // Remove a classe 'active' de todos os botões
    [filterAllBtn, filterWDDBtn, filterCSEBtn].forEach(btn => {
        btn.classList.remove('active');
    });

    if (activeType === 'WDD') {
        filterWDDBtn.classList.add('active');
    } else if (activeType === 'CSE') {
        filterCSEBtn.classList.add('active');
    } else {
        filterAllBtn.classList.add('active');
    }
}


// ------------------- INICIALIZAÇÃO -------------------

filterAllBtn.addEventListener('click', () => filterCourses('all'));
filterWDDBtn.addEventListener('click', () => filterCourses('WDD'));
filterCSEBtn.addEventListener('click', () => filterCourses('CSE'));

filterCourses('all');