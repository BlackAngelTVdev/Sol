let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

window.changeSlide = function(direction) {
    if (slides.length <= 1) return;

    // Retire l'état actif
    slides[currentSlide].classList.remove('active');

    // Calcule l'index suivant
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Ajoute l'état actif (le CSS gère le fondu tout seul)
    slides[currentSlide].classList.add('active');
}

// Gestion du Timer automatique
let slideInterval;

function startInterval(time = 10000) {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        window.changeSlide(1);
    }, time);
}

// Init
startInterval();

// Reset du timer au clic sur les flèches
const arrows = document.querySelectorAll('.nav-arrow');
arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        startInterval(15000); // On laisse 15s de repos après un clic manuel
    });
});