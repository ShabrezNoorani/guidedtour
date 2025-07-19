// SN Guided Tours - Main JavaScript File
// This file controls the interactive effects for the entire website.

document.addEventListener('DOMContentLoaded', () => {
    const effectContainer = document.getElementById('effect-container');

    // This check ensures the script doesn't throw errors on pages without the container.
    if (effectContainer) {
        // --- UPDATED: Baguette Crumb Trail Effect ---
        let mouseMoveTimer;
        
        const crumbSVGs = [
            `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#D2B48C"/></svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 100 60"><ellipse cx="50" cy="30" rx="50" ry="30" fill="#F3E5AB"/></svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 100 100"><path d="M10 10 L90 20 L80 90 L20 80 Z" fill="#E4C59E"/></svg>`
        ];

        document.addEventListener('mousemove', e => {
            cancelAnimationFrame(mouseMoveTimer);
            mouseMoveTimer = requestAnimationFrame(() => {
                createBaguetteCrumb(e.pageX, e.pageY);
            });
        });

        function createBaguetteCrumb(x, y) {
            const crumb = document.createElement('div');
            crumb.className = 'baguette-crumb';
            crumb.innerHTML = crumbSVGs[Math.floor(Math.random() * crumbSVGs.length)];
            effectContainer.appendChild(crumb);
            crumb.style.left = `${x - 5}px`;
            crumb.style.top = `${y - 5}px`;
            const randomRotate = (Math.random() - 0.5) * 480;
            const randomScale = Math.random() * 0.4 + 0.2;
            const randomTranslateX = (Math.random() - 0.5) * 80;
            const randomTranslateY = Math.random() * 50 + 20;
            crumb.style.setProperty('--transform-end', `translate(${randomTranslateX}px, ${randomTranslateY}px) rotate(${randomRotate}deg) scale(${randomScale})`);
            setTimeout(() => {
                crumb.remove();
            }, 1200);
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

    // --- Custom Modal Logic for New Booking Flow ---
    const consentModal = document.getElementById('consent-modal');
    if (consentModal) {
        // CHANGE: Updated tour details with new cancellation policy and discount info.
        const tourDetails = {
            private: {
                title: 'Private Tour Information & Consent',
                points: [
                    '<strong>Nature of Tour:</strong> This is an exclusive private walking tour for your group only. The pace is set by you.',
                    '<strong>Health & Fitness:</strong> Participants should be in good health and able to walk for approximately 60 minutes.',
                    '<strong>Discount Alert:</strong> The promotional price shown is available only when you book directly and use the discount code at checkout.',
                    '<strong>Cancellations:</strong> Cancellations made 24 hours before the tour start time will receive a full refund. No refunds for later cancellations or no-shows.',
                    '<strong>Liability:</strong> Scenic Zest and its guides are not liable for any personal injury or loss of property. Participants are responsible for their own safety.',
                    '<strong>Photography:</strong> We may take photos for promotional purposes. Please inform your guide if you do not wish to be photographed.'
                ]
            },
            group: {
                title: 'Group Tour Information & Consent',
                points: [
                    '<strong>Nature of Tour:</strong> This is a walking tour with a small group of up to 10 adults. The guide will set a moderate pace for the group.',
                    '<strong>Health & Fitness:</strong> Participants should be in good health and able to walk for approximately 60 minutes at a moderate pace.',
                    '<strong>Discount Alert:</strong> The promotional price shown is available only when you book directly and use the discount code at checkout.',
                    '<strong>Cancellations:</strong> Cancellations made 24 hours before the tour start time will receive a full refund. No refunds for later cancellations or no-shows.',
                    '<strong>Liability:</strong> Scenic Zest and its guides are not liable for any personal injury or loss of property. Participants are responsible for their own safety.',
                    '<strong>Photography:</strong> We may take photos for promotional purposes. Please inform your guide if you do not wish to be photographed.'
                ]
            }
        };

        const openModalButtons = document.querySelectorAll('.open-custom-modal');
        const closeModalButtons = document.querySelectorAll('.close-modal-button');
        const modalTitle = document.getElementById('modal-title');
        const modalPoints = document.getElementById('modal-points');
        const proceedBookingButton = document.getElementById('modal-proceed-booking');

        // When a "Book now" button is clicked...
        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tourType = button.dataset.tourType;
                const bokunTargetId = button.dataset.bokunTargetId;
                const details = tourDetails[tourType];

                if (details && bokunTargetId) {
                    // 1. Populate the modal with the correct content
                    modalTitle.textContent = details.title;
                    modalPoints.innerHTML = details.points.map(point => `<li>${point}</li>`).join('');
                    
                    // 2. Pass the hidden Bokun button's ID to the 'I Agree' button
                    proceedBookingButton.dataset.bokunTargetId = bokunTargetId;

                    // 3. Show the modal
                    consentModal.classList.add('active');
                }
            });
        });

        // When "I Agree & Proceed" is clicked...
        proceedBookingButton.addEventListener('click', () => {
            const bokunTargetId = proceedBookingButton.dataset.bokunTargetId;
            if (bokunTargetId) {
                const hiddenBokunButton = document.getElementById(bokunTargetId);
                if (hiddenBokunButton) {
                    // Click the real, hidden Bokun button to trigger the widget
                    hiddenBokunButton.click();
                }
                // Close the modal
                consentModal.classList.remove('active');
            }
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
            return 300;
        };
        nextButton.addEventListener('click', () => {
            reviewsSlider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
        prevButton.addEventListener('click', () => {
            reviewsSlider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });
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
            const walk = (x - startX) * 2;
            reviewsSlider.scrollLeft = scrollLeft - walk;
        });
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
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            heroSliderTrack.appendChild(clone);
        });
        const numSlides = slides.length;
        const animationDuration = numSlides * 10;
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

    // --- Promotion Logic ---
    function handlePromotions() {
        const tourCards = document.querySelectorAll('.tour-card');
        tourCards.forEach(card => {
            const originalPrice = parseFloat(card.dataset.originalPrice);
            const discountEuros = parseFloat(card.dataset.discountEuros);
            if (originalPrice && discountEuros && discountEuros > 0) {
                const newPrice = originalPrice - discountEuros;
                const discountPercentage = Math.round((discountEuros / originalPrice) * 100);
                const banner = card.querySelector('.discount-banner');
                if (banner) {
                    banner.textContent = `${discountPercentage}% OFF`;
                    banner.classList.remove('hidden');
                }
                const priceContainer = card.querySelector('.price-display');
                if (priceContainer) {
                    priceContainer.innerHTML = '';
                    const originalPriceElement = document.createElement('span');
                    originalPriceElement.className = 'original-price';
                    originalPriceElement.textContent = `€${originalPrice}`;
                    priceContainer.appendChild(originalPriceElement);
                    const newPriceElement = document.createElement('span');
                    newPriceElement.className = 'text-2xl font-bold text-[#4a69bd]';
                    newPriceElement.innerHTML = `€${newPrice} <span class="text-base font-normal">/ person</span>`;
                    priceContainer.appendChild(newPriceElement);
                    priceContainer.classList.add('has-discount');
                }
            }
        });
    }
    handlePromotions();

    // --- Formspree AJAX Form Submission (Main Contact Form) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    formStatus.innerHTML = "Thank you! Your message has been sent.";
                    formStatus.style.color = 'green';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                        }
                        formStatus.style.color = 'red';
                    })
                }
            }).catch(error => {
                formStatus.innerHTML = "Oops! There was a network problem.";
                formStatus.style.color = 'red';
});
        });
    }

    // --- "Work With Us" Modal Logic ---
    const workWithUsModal = document.getElementById('work-with-us-modal');
    if(workWithUsModal) {
        const openWorkModalButton = document.getElementById('work-with-us-button');
        const closeWorkModalButtons = workWithUsModal.querySelectorAll('.close-work-modal-button');

        openWorkModalButton.addEventListener('click', (e) => {
            e.preventDefault();
            workWithUsModal.classList.add('active');
        });

        closeWorkModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                workWithUsModal.classList.remove('active');
            });
        });
        
        workWithUsModal.addEventListener('click', (e) => {
            if (e.target === workWithUsModal) {
                 workWithUsModal.classList.remove('active');
            }
        });
    }

    // --- "Work With Us" Formspree AJAX Submission ---
    const workForm = document.getElementById('work-with-us-form');
    const workFormStatus = document.getElementById('work-form-status');

    if (workForm) {
        workForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(workForm);
            fetch(workForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    workFormStatus.innerHTML = "Thank you! Your application has been sent.";
                    workFormStatus.style.color = 'green';
                    workForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            workFormStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            workFormStatus.innerHTML = "Oops! There was a problem submitting your application.";
                        }
                        workFormStatus.style.color = 'red';
                    });
                }
            }).catch(error => {
                workFormStatus.innerHTML = "Oops! There was a network problem.";
                workFormStatus.style.color = 'red';
            });
        });
    }

});