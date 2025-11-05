const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        
        mainNav.setAttribute('aria-expanded', !isExpanded);
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
}