let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

window.changeSlide = function(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Défilement automatique toutes les 6 secondes
setInterval(() => {
    window.changeSlide(1);
}, 6000);