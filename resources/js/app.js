let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// On expose la fonction au window pour le onclick du HTML
window.changeSlide = function(direction) {
    if (slides.length === 0) return;

    // Masque l'actuelle
    slides[currentSlide].classList.remove('active');

    // Calcule la nouvelle
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Affiche la nouvelle
    slides[currentSlide].classList.add('active');
}

// Timer auto
let slideInterval = setInterval(() => {
    window.changeSlide(1);
}, 6000);

// Pour que ce soit "chill" : si l'utilisateur clique, on reset le timer
const arrows = document.querySelectorAll('.nav-arrow');
arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => window.changeSlide(1), 6000);
    });
});