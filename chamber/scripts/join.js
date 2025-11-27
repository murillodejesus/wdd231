
function setTimestamp() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = Date.now();
    }
}

function animateCards() {
    const cards = document.querySelectorAll('.level-card');
    
    cards.forEach((card, index) => {
        const delay = index * 200; 

        setTimeout(() => {
            card.style.opacity = 1; 
            card.style.transform = 'translateY(0)';
            card.style.marginBottom = '15px'; 
        }, 50 + delay);
    });
}

function setupModals() {
    const modalLinks = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.modal .close-btn');
    const modals = document.querySelectorAll('.modal');

    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimestamp();
    setupModals();
    animateCards();
});