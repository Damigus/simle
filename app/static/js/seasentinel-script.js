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
    
    // Auto-slide functionality
    let slideInterval = setInterval(() => {
        if (currentSlide >= totalSlides + 1) return;
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto-slide on hover
    slidesWrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume auto-slide on mouse leave
    slidesWrapper.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            if (currentSlide >= totalSlides + 1) return;
            goToSlide(currentSlide + 1);
        }, 5000);
    });
}

// Set up intersection observers for animation triggers
function setupAnimations() {
    // Add animation delay to team members for staggered effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.setProperty('--index', index);
    });
    
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.project-card, .team-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'fadeUp 0.8s ease forwards';
                } else if (entry.target.classList.contains('team-category')) {
                    const members = entry.target.querySelectorAll('.team-member');
                    members.forEach((member, index) => {
                        setTimeout(() => {
                            member.style.animation = 'fadeUp 0.6s ease forwards';
                        }, index * 100);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Count-up animation for statistics
function animateCounter(id, endValue, duration) {
    const obj = document.getElementById(id);
    const start = 0;
    const range = endValue - start;
    const minTimer = 50;
    const stepTime = Math.abs(Math.floor(duration / range));
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;
    
    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(endValue - (remaining * range));
        obj.innerHTML = value;
        if (value === endValue) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}

// Initialize statistics animation
function initStatistics() {
    const statsSection = document.getElementById('stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate each statistic with different durations
                animateCounter('stat-members', 100, 2000);
                animateCounter('stat-vehicles', 3, 1500);
                animateCounter('stat-position', 7, 1000);
                animateCounter('stat-started', 2021, 2500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
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
    
    initSlideshow();
    setupAnimations();
    initStatistics();
    initSmoothScroll();
});