function initSlideshow() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const slides = document.querySelectorAll('.slide');

    if (!slidesWrapper || slides.length === 0 || !prevArrow || !nextArrow) return;

    const totalSlides = slides.length;
    
    // Clone first and last slides for infinite effect
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
    
    // Add clones to the wrapper
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

function initHistorySlideshow() {
    const slides = document.querySelectorAll('.slideshow img');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }, 3000);
}

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;

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

function setupIntersectionObservers() {
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue("stat-members", 0, document.getElementById('stat-members')?.getAttribute('data-value') || 0, 1500);
                    animateValue("stat-rockets", 0, document.getElementById('stat-rockets')?.getAttribute('data-value') || 0, 1500);
                    animateValue("stat-altitude", 0, document.getElementById('stat-altitude')?.getAttribute('data-value') || 0, 2000);
                    animateValue("stat-started", 0, document.getElementById('stat-started')?.getAttribute('data-value') || 0, 1500);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    const historySection = document.getElementById('history');
    if (historySection) {
        const historyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    historySection.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        historyObserver.observe(historySection);
    }

    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
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
    }

    const teamCards = document.querySelectorAll('.team-card');
    if (teamCards.length > 0) {
        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
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
}

function setupModal() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal .close');

    if (!modal || !modalImg || !closeBtn) return;

    document.querySelectorAll('.timeline-image img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
}

window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = 0;
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 2000);
    
    initSlideshow();
    initHistorySlideshow();
    setupIntersectionObservers();
    setupModal();
});

function hamburgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x) {
        x.classList.toggle("responsive");
    }
}

document.getElementById('logo')?.addEventListener('click', function() {
    window.location.href = '/main';
});
