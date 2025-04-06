function createStars() {
    const starsContainer = document.getElementById('stars');
    const maxStars = 200;

    for (let i = 0; i < maxStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Rozmiar gwiazdy: 1–3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Losowa pozycja na ekranie
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;

        // Opcjonalnie: lekkie rozmycie dla efektu głębi
        star.style.filter = 'blur(0.5px)';
        
        // Brak animacji – gwiazda jest statyczna
        starsContainer.appendChild(star);
    }
}


// Slideshow functionality with infinite carousel
function initSlideshow() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
    
    slidesWrapper.appendChild(firstSlideClone);
    slidesWrapper.insertBefore(lastSlideClone, slides[0]);
    
    slidesWrapper.style.width = `${(totalSlides + 2) * 100}%`;
    
    let currentSlide = 1;
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / (totalSlides + 2)}%)`;
    
    function goToSlide(index) {
        slidesWrapper.style.transition = 'transform 0.6s ease';
        currentSlide = index;
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / (totalSlides + 2)}%)`;
    }
    
    prevArrow.addEventListener('click', () => {
        if (currentSlide <= 0) return;
        goToSlide(currentSlide - 1);
    });
    
    nextArrow.addEventListener('click', () => {
        if (currentSlide >= totalSlides + 1) return;
        goToSlide(currentSlide + 1);
    });
    
    slidesWrapper.addEventListener('transitionend', () => {
        if (currentSlide === 0) {
            slidesWrapper.style.transition = 'none';
            currentSlide = totalSlides;
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / (totalSlides + 2)}%)`;
        } else if (currentSlide === totalSlides + 1) {
            slidesWrapper.style.transition = 'none';
            currentSlide = 1;
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / (totalSlides + 2)}%)`;
        }
    });

    slidesWrapper.addEventListener('transitionend', () => {
        setTimeout(() => {
            slidesWrapper.style.transition = 'transform 0.6s ease';
        }, 10);
    });
}

// Remove loader after page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        loader.style.opacity = 0;
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    createStars();
    initSlideshow();
});

// Handle video playback
const videoLoader = document.getElementById('video-loader');
const rocketVideo = document.getElementById('rocket-video');
rocketVideo.disablePictureInPicture = true;
rocketVideo.currentTime = 1;

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// Hamburger menu
function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

document.getElementById('logo').addEventListener('click', function() {
    window.location.href = '/main';
});
