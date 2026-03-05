// Main Interactions

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger animation if needed
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // 4. Events Slider
    const slider = document.querySelector('.events-slider');
    if (slider) {
        const slides = document.querySelectorAll('.event-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicators = document.querySelectorAll('.indicator');

        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            indicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 4000);
        }

        function stopSlideInterval() {
            clearInterval(slideInterval);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideInterval();
            startSlideInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideInterval();
            startSlideInterval();
        });

        indicators.forEach((ind, index) => {
            ind.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
                stopSlideInterval();
                startSlideInterval();
            });
        });

        slider.addEventListener('mouseenter', stopSlideInterval);
        slider.addEventListener('mouseleave', startSlideInterval);

        // Touch events for mobile swiping support
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopSlideInterval();
        }, { passive: true });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startSlideInterval();
        }, { passive: true });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) nextSlide();
            if (touchEndX > touchStartX + 50) prevSlide();
        }

        startSlideInterval();
    }
});
