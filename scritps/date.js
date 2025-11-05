
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    const today = new Date();
    currentYearSpan.textContent = today.getFullYear();
}


const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}