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
    
    // Set initial position
    let currentSlide = 1;
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

// Simple automatic slideshow for the history section
function initHistorySlideshow() {
    const slides = document.querySelectorAll('.slideshow img');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }, 3000);
}

// Count-up animation function for statistics
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        const current = Math.floor(start + (end - start) * Math.min(progress / duration, 1));
        obj.textContent = current;
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Set up Intersection Observers to trigger animations on scroll
function setupIntersectionObservers() {
    // Observer for Stats Section (restart animation when visible)
    const statsSection = document.getElementById('stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statMembersValue = document.getElementById('stat-members').getAttribute('data-value');
                const statRocketsValue = document.getElementById('stat-rockets').getAttribute('data-value');
                const statAltitudeValue = document.getElementById('stat-altitude').getAttribute('data-value');
                const statStartedValue = document.getElementById('stat-started').getAttribute('data-value');

                animateValue("stat-members", 0, statMembersValue, 1500);
                animateValue("stat-rockets", 0, statRocketsValue, 1500);
                animateValue("stat-altitude", 0, statAltitudeValue, 2000);
                animateValue("stat-started", 0, statStartedValue, 1500);
            }
        });0.5 });
    statsObserver.observe(statsSection);

    // Observer for History Section: Fade in/out on scroll
    const historySection = document.getElementById('history');
    const historyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                historySection.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    historyObserver.observe(historySection);

    // Observer for Timeline Items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Observer for Team Cards
    const teamCards = document.querySelectorAll('.team-card');
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation for each card
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    teamCards.forEach(card => {
        teamObserver.observe(card);
    });
}

// Setup modal for timeline images
function setupModal() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal .close');

    // Add click event to all timeline images
    document.querySelectorAll('.timeline-image img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
        });
    });

    // Close modal when clicking close button or outside the image
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
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
    initHistorySlideshow();
    setupIntersectionObservers();
    setupModal();
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