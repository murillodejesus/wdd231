const courses = [
    {
        courseCode: "CSE 110",
        name: "Introduction to Web and Computer Programming",
        credits: 2,
        completed: false 
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
        completed: true 
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

function displayCourses(courseArray) {
    cardsContainer.innerHTML = '';
    
    if (!cardsContainer) {
        return; 
    }

    courseArray.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;

        card.innerHTML = `
            <h3>${course.courseCode}</h3>
            <p><strong>Nome:</strong> ${course.name}</p>
            <p><strong>Créditos:</strong> ${course.credits}</p>
            <p style="display:none;">${course.completed ? 'Concluído' : 'Pendente'}</p>
        `;
        
        cardsContainer.appendChild(card);
    });
    
    calculateAndDisplayTotalCredits(courseArray);
}

function calculateAndDisplayTotalCredits(courseArray) {
    const completedCourses = courseArray.filter(course => course.completed === true);
    const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

function filterCourses(filterType) {
    let filteredList = [];
    
    if (filterType === 'WDD') {
        filteredList = courses.filter(course => course.courseCode.startsWith('WDD'));
    } else if (filterType === 'CSE') {
        filteredList = courses.filter(course => course.courseCode.startsWith('CSE'));
    } else {
        filteredList = courses;
    }
    
    updateButtonStatus(filterType);
    displayCourses(filteredList);
}

function updateButtonStatus(activeType) {
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

if (filterAllBtn) {
    filterAllBtn.addEventListener('click', () => filterCourses('all'));
}
if (filterWDDBtn) {
    filterWDDBtn.addEventListener('click', () => filterCourses('WDD'));
}
if (filterCSEBtn) {
    filterCSEBtn.addEventListener('click', () => filterCourses('CSE'));
}

filterCourses('all');