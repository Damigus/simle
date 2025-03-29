// Create animated stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const maxStars = 200; // Maximum number of stars on screen at once
    let activeStars = 0;
    
    // Function to create a single star with smooth animation
    function createSingleStar() {
        if (activeStars >= maxStars) return;
        
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        
        // Random duration for the animation (3-6 seconds)
        const duration = Math.random() * 3 + 3;
        star.style.animationDuration = `${duration}s`;
        
        // Use a cubic-bezier timing function for smooth deceleration
        star.style.animationTimingFunction = "ease-out";
        
        // Add event listener to remove the star when animation ends
        star.addEventListener('animationend', function() {
            star.remove();
            activeStars--;
            // Create a new star to replace this one
            setTimeout(createSingleStar, Math.random() * 500);
        });
        
        starsContainer.appendChild(star);
        activeStars++;
    }
    
    // Initially create stars with staggered appearance
    for (let i = 0; i < maxStars; i++) {
        setTimeout(() => createSingleStar(), i * 30);
    }
    
    // Add shooting stars
    for (let i = 0; i < 5; i++) {
        createShootingStar(starsContainer, i * 15);
    }
}

// Create shooting stars with delayed start and randomized direction
function createShootingStar(container, delaySeconds) {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    
    // Random size for the shooting star
    const width = Math.random() * 100 + 50;
    shootingStar.style.width = `${width}px`;
    
    // Random start position (anywhere along the top half of the screen)
    const startLeft = Math.random() * 100; // Can start anywhere horizontally
    const startTop = Math.random() * 40;   // Start in the top 40% of the hero
    shootingStar.style.left = `${startLeft}%`;
    shootingStar.style.top = `${startTop}%`;
    
    // Generate random movement direction
    const movementAngle = Math.random() * 160 - 80; // -80 to +80 degrees
    
    // Apply the angle as rotation to align the trail with movement direction
    shootingStar.style.transform = `rotate(${movementAngle}deg)`;
    
    // Create a unique animation name for this star
    const animationName = `shootingStar_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Create a dynamic keyframe animation with simple start and end points
    const styleSheet = document.createElement('style');
    
    // Simple keyframes with just start and end positions
    styleSheet.textContent = `
        @keyframes ${animationName} {
            0% { 
                opacity: 0;
                transform: translateX(0) translateY(0) rotate(${movementAngle}deg);
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% { 
                opacity: 0;
                transform: translateX(${Math.cos(movementAngle * Math.PI/180) * 700}px) 
                          translateY(${Math.sin(movementAngle * Math.PI/180) * 700}px) 
                          rotate(${movementAngle}deg) scaleX(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Use a simple linear motion instead of complex cubic-bezier
    const duration = Math.random() * 3 + 3; // 3-6 seconds
    shootingStar.style.animation = `${animationName} ${duration}s ease-out ${delaySeconds}s 1 forwards`;
    
    container.appendChild(shootingStar);
    
    // Remove star and create a new one after this one finishes
    setTimeout(() => {
        shootingStar.remove();
        styleSheet.remove(); // Clean up the custom animation
        createShootingStar(container, Math.random() * 4 + 2); // 2-6 second random delay
    }, (duration + delaySeconds) * 1000);
}

// Slideshow functionality with infinite carousel
function initSlideshow() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Clone first and last slides for infinite effect
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
    
    // Add clones to the wrapper
    slidesWrapper.appendChild(firstSlideClone);
    slidesWrapper.insertBefore(lastSlideClone, slides[0]);
    
    // Adjust width to accommodate clones
    slidesWrapper.style.width = `${(totalSlides + 2) * 100}%`;
    
    // Set initial position to the first real slide (not the clone)
    let currentSlide = 1; // Start at index 1 (after the clone of the last slide)
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / (totalSlides + 2)}%)`;
    
    // Function to go to a specific slide with animation
    function goToSlide(index) {
        slidesWrapper.style.transition = 'transform 0.6s ease';
        currentSlide = index;
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / (totalSlides + 2)}%)`;
    }
    
    // Add click event listeners to the arrows
    prevArrow.addEventListener('click', () => {
        if (currentSlide <= 0) return;
        goToSlide(currentSlide - 1);
    });
    
    nextArrow.addEventListener('click', () => {
        if (currentSlide >= totalSlides + 1) return;
        goToSlide(currentSlide + 1);
    });
    
    // Handle transition end to create infinite effect
    slidesWrapper.addEventListener('transitionend', () => {
        // If we're at a clone, jump to the corresponding real slide without animation
        if (currentSlide === 0) {
            // At clone of last slide - jump to real last slide
            slidesWrapper.style.transition = 'none';
            currentSlide = totalSlides;
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / (totalSlides + 2)}%)`;
        } else if (currentSlide === totalSlides + 1) {
            // At clone of first slide - jump to real first slide
            slidesWrapper.style.transition = 'none';
            currentSlide = 1;
            slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / (totalSlides + 2)}%)`;
        }
    });
    
    // Re-enable transitions after position reset
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
    }, 2000); // Show loader for at least 2 seconds
    
    createStars();
    initSlideshow();
});

// Handle video playback
const videoLoader = document.getElementById('video-loader');
const rocketVideo = document.getElementById('rocket-video');
rocketVideo.disablePictureInPicture = true; // Ustawiamy flagę na `true`, aby wyłączyć możliwość obrazu w obrazie
rocketVideo.currentTime = 1;


// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Observe all feature cards and gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// wpierdole tutaj hamburgera
function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  document.getElementById('logo').addEventListener('click', function() {
    window.location.href = '/main';  // Zmień na odpowiedni adres URL
});