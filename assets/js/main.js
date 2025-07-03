// SN Guided Tours - Main JavaScript File
// This file controls the interactive effects for the entire website.

document.addEventListener('DOMContentLoaded', () => {
    const effectContainer = document.getElementById('effect-container');

    // This check ensures the script doesn't throw errors on pages without the container.
    if (effectContainer) {
        // --- Improved Mouse Trail Effect ---
        let mouseMoveTimer;

        document.addEventListener('mousemove', e => {
            cancelAnimationFrame(mouseMoveTimer);
            mouseMoveTimer = requestAnimationFrame(() => {
                createTrailParticle(e.pageX, e.pageY);
            });
        });

        function createTrailParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'trail-particle';
            effectContainer.appendChild(particle);

            // Golden color for the trail
            particle.style.background = 'radial-gradient(circle, rgba(255,223,100,0.8) 0%, rgba(255,215,0,0) 70%)';

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }

        // --- Firework Effect on Hover ---
        const interactiveElements = document.querySelectorAll('.interactive-element');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', e => {
                createFireworks(e.currentTarget);
            });
        });

        function createFireworks(element) {
            const rect = element.getBoundingClientRect();
            const particleCount = 25;
            const colors = ['#ffd700', '#ffec8b', '#ffffff', '#87cefa'];

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                effectContainer.appendChild(particle);

                const size = Math.random() * 2.5 + 1;
                const color = colors[Math.floor(Math.random() * colors.length)];

                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = color;
                
                const startX = rect.left + rect.width / 2;
                const startY = rect.top + rect.height / 2;

                particle.style.left = `${startX}px`;
                particle.style.top = `${startY}px`;

                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 40 + 10;
                const translateX = Math.cos(angle) * distance;
                const translateY = Math.sin(angle) * distance;

                particle.style.setProperty('--translateX', `${translateX}px`);
                particle.style.setProperty('--translateY', `${translateY}px`);

                particle.style.animation = `firework-anim 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards`;

                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        }
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Modal Logic ---
    const consentModal = document.getElementById('consent-modal');
    if(consentModal) {
        const openModalButtons = document.querySelectorAll('.open-modal-button');
        const closeModalButtons = document.querySelectorAll('.close-modal-button');

        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                consentModal.classList.add('active');
            });
        });

        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                consentModal.classList.remove('active');
            });
        });
        
        consentModal.addEventListener('click', (e) => {
            if (e.target === consentModal) {
                 consentModal.classList.remove('active');
            }
        });
    }

    // --- Reviews Slider Logic ---
    const reviewsSlider = document.getElementById('reviews-slider');
    if (reviewsSlider) {
        const prevButton = document.getElementById('prev-review');
        const nextButton = document.getElementById('next-review');

        const scrollAmount = () => {
            const firstCard = reviewsSlider.querySelector('.review-card');
            if (firstCard) {
                const cardStyle = window.getComputedStyle(firstCard);
                const cardMargin = parseFloat(cardStyle.marginLeft);
                return firstCard.offsetWidth + cardMargin;
            }
            return 300; // Fallback
        };

        nextButton.addEventListener('click', () => {
            reviewsSlider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        prevButton.addEventListener('click', () => {
            reviewsSlider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        // --- Swipe functionality for touch devices ---
        let isDown = false;
        let startX;
        let scrollLeft;

        reviewsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            reviewsSlider.style.cursor = 'grabbing';
            startX = e.pageX - reviewsSlider.offsetLeft;
            scrollLeft = reviewsSlider.scrollLeft;
        });
        
        reviewsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            reviewsSlider.style.cursor = 'grab';
        });

        reviewsSlider.addEventListener('mouseup', () => {
            isDown = false;
            reviewsSlider.style.cursor = 'grab';
        });

        reviewsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewsSlider.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            reviewsSlider.scrollLeft = scrollLeft - walk;
        });

        // For mobile touch
        reviewsSlider.addEventListener('touchstart', (e) => {
             isDown = true;
             startX = e.touches[0].pageX - reviewsSlider.offsetLeft;
             scrollLeft = reviewsSlider.scrollLeft;
        }, { passive: true });

        reviewsSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - reviewsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            reviewsSlider.scrollLeft = scrollLeft - walk;
        }, { passive: false });

        reviewsSlider.addEventListener('touchend', () => {
            isDown = false;
        });
    }

    // --- Automatic Hero Slider Logic ---
    const heroSliderTrack = document.querySelector('.hero-slider-track');
    if (heroSliderTrack) {
        const slides = Array.from(heroSliderTrack.children);
        // Duplicate slides for seamless looping
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            heroSliderTrack.appendChild(clone);
        });

        // Set animation properties based on number of slides
        const numSlides = slides.length;
        const animationDuration = numSlides * 10; // 10 seconds per slide
        heroSliderTrack.style.width = `${numSlides * 2 * 100}%`;
        heroSliderTrack.style.animation = `scroll-animation ${animationDuration}s linear infinite`;
    }

    // --- Smooth Scrolling for Homepage Anchors ---
    const pageUrl = window.location.pathname.split('/').pop();
    if (pageUrl === 'index.html' || pageUrl === '') {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});
