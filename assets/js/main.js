// SN Guided Tours - Main JavaScript File
// This file controls the interactive effects for the entire website.

document.addEventListener('DOMContentLoaded', () => {
    const effectContainer = document.getElementById('effect-container');

    // This check ensures the script doesn't throw errors on pages without the container.
    if (effectContainer) {
        // --- UPDATED: Baguette Crumb Trail Effect ---
        let mouseMoveTimer;
        
        // Array of different crumb SVGs for variety
        const crumbSVGs = [
            // Small circle crumb
            `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#D2B48C"/></svg>`,
            // Small oval crumb
            `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 100 60"><ellipse cx="50" cy="30" rx="50" ry="30" fill="#F3E5AB"/></svg>`,
            // Small jagged crumb
            `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 100 100"><path d="M10 10 L90 20 L80 90 L20 80 Z" fill="#E4C59E"/></svg>`
        ];

        document.addEventListener('mousemove', e => {
            // Throttling the effect to avoid too many crumbs
            cancelAnimationFrame(mouseMoveTimer);
            mouseMoveTimer = requestAnimationFrame(() => {
                createBaguetteCrumb(e.pageX, e.pageY);
            });
        });

        function createBaguetteCrumb(x, y) {
            const crumb = document.createElement('div');
            crumb.className = 'baguette-crumb';
            // Randomly select a crumb shape
            crumb.innerHTML = crumbSVGs[Math.floor(Math.random() * crumbSVGs.length)];
            effectContainer.appendChild(crumb);

            // Positioning the crumb to appear slightly behind and offset from the cursor
            crumb.style.left = `${x - 5}px`;
            crumb.style.top = `${y - 5}px`;

            const randomRotate = (Math.random() - 0.5) * 480;
            const randomScale = Math.random() * 0.4 + 0.2; // smaller crumbs
            const randomTranslateX = (Math.random() - 0.5) * 80;
            const randomTranslateY = Math.random() * 50 + 20; // make it fall down more

            // Set the final state for the animation
            crumb.style.setProperty('--transform-end', `translate(${randomTranslateX}px, ${randomTranslateY}px) rotate(${randomRotate}deg) scale(${randomScale})`);

            setTimeout(() => {
                crumb.remove();
            }, 1200); // Remove after animation finishes
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

    // --- NEW: Promotion Logic ---
    function handlePromotions() {
        const tourCards = document.querySelectorAll('.tour-card');

        tourCards.forEach(card => {
            const originalPrice = parseFloat(card.dataset.originalPrice);
            const discountEuros = parseFloat(card.dataset.discountEuros);

            // Proceed only if there is a valid discount greater than 0
            if (originalPrice && discountEuros && discountEuros > 0) {
                // 1. Calculations
                const newPrice = originalPrice - discountEuros;
                const discountPercentage = Math.round((discountEuros / originalPrice) * 100);

                // 2. Update Banner
                const banner = card.querySelector('.discount-banner');
                if (banner) {
                    banner.textContent = `${discountPercentage}% OFF`;
                    banner.classList.remove('hidden');
                }

                // 3. Update Price Display
                const priceContainer = card.querySelector('.price-display');
                if (priceContainer) {
                    // Clear the existing price (which shows the original price by default)
                    priceContainer.innerHTML = '';

                    // Create and add the original, struck-out price
                    const originalPriceElement = document.createElement('span');
                    originalPriceElement.className = 'original-price';
                    originalPriceElement.textContent = `€${originalPrice}`;
                    priceContainer.appendChild(originalPriceElement);

                    // Create and add the new, discounted price
                    const newPriceElement = document.createElement('span');
                    newPriceElement.className = 'text-2xl font-bold text-[#4a69bd]'; // Use existing styles
                    newPriceElement.innerHTML = `€${newPrice} <span class="text-base font-normal">/ person</span>`;
                    priceContainer.appendChild(newPriceElement);
                    
                    priceContainer.classList.add('has-discount');
                }
            }
        });
    }

    // Run the promotion logic on page load
    handlePromotions();

});