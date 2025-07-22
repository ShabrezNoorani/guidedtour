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
        const tourDetails = {
            private: {
                title: 'Private Sainte-Chapelle Tour Information & Consent',
                points: [
                    '<strong>Exclusive Experience:</strong> This is a private walking tour reserved for your group only. The pace is set by you, ensuring a personal and flexible experience.',
                    '<strong>Sainte-Chapelle Entry:</strong> Your tour includes a pre-booked, timed-entry ticket to Sainte-Chapelle. Your guide will provide a full explanation outside but will not accompany you inside, allowing you to explore its beauty at your own leisure.',
                    '<strong>Walking Requirement:</strong> Participants should be in good health and comfortable walking and standing for the full duration of the tour (approx. 1.5 hours).',
                    '<strong>Direct Booking Discount:</strong> The promotional price is available exclusively for bookings made on our website using the advertised promo code.',
                    '<strong>Cancellation Policy:</strong> Full refund for cancellations made at least 24 hours before the tour start time. No refunds are provided for later cancellations or no-shows.',
                    '<strong>Liability & Safety:</strong> Participants are responsible for their own safety and personal belongings. Scenic Zest is fully insured but is not liable for personal injury or loss of property.',
                    '<strong>Photography Consent:</strong> Photos may be taken for promotional use. Please inform your guide at the start of the tour if you prefer not to be photographed.'
                ]
            },
            'private-crypt': {
                title: 'Private Crypt Tour Information & Consent',
                points: [
                    '<strong>Exclusive Experience:</strong> This is a private walking tour reserved for your group only. The pace is set by you, ensuring a personal and flexible experience.',
                    '<strong>Archaeological Crypt Entry:</strong> Your tour includes a pre-booked ticket to the Archaeological Crypt beneath the Notre Dame square. Your guide will explain its history from the outside before you enter to explore at your own pace.',
                    '<strong>Walking Requirement:</strong> Participants should be in good health and comfortable walking and standing for the full duration of the tour (approx. 1.5 hours).',
                    '<strong>Direct Booking Discount:</strong> The promotional price is available exclusively for bookings made on our website using the advertised promo code.',
                    '<strong>Cancellation Policy:</strong> Full refund for cancellations made at least 24 hours before the tour start time. No refunds are provided for later cancellations or no-shows.',
                    '<strong>Liability & Safety:</strong> Participants are responsible for their own safety and personal belongings. Scenic Zest is fully insured but is not liable for personal injury or loss of property.',
                    '<strong>Photography Consent:</strong> Photos may be taken for promotional use. Please inform your guide at the start of the tour if you prefer not to be photographed.'
                ]
            },
            group: {
                title: 'Group Tour Information & Consent',
                points: [
                '<strong>Small-Group Tour:</strong> This is a walking tour with a small group of up to 10 travelers. Your guide will set a moderate and comfortable pace for everyone.',
                '<strong>Health & Fitness:</strong> Participants should be in good health and able to walk and stand for the full 1.5-hour duration of the tour.',
                '<strong>Direct Booking Discount:</strong> The promotional price is available exclusively for bookings made on our website using the advertised promo code at checkout.',
                '<strong>Cancellation Policy:</strong> Full refund for cancellations made at least 24 hours before the tour start time. No refunds for later cancellations or no-shows.',
                '<strong>Liability & Safety:</strong> Participants are responsible for their own safety and personal belongings. Scenic Zest is fully insured but is not liable for personal injury or loss of property.',
                '<strong>Photography Consent:</strong> Photos may be taken for promotional use. Please inform your guide at the start of the tour if you prefer not to be photographed.'
            ]
            }
        };

        const openModalButtons = document.querySelectorAll('.open-custom-modal');
        const closeModalButtons = document.querySelectorAll('.close-modal-button');
        const modalTitle = document.getElementById('modal-title');
        const modalPoints = document.getElementById('modal-points');
        const proceedBookingButton = document.getElementById('modal-proceed-booking');

        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tourType = button.dataset.tourType;
                const bokunTargetId = button.dataset.bokunTargetId;
                const details = tourDetails[tourType];

                if (details && bokunTargetId) {
                    modalTitle.textContent = details.title;
                    modalPoints.innerHTML = details.points.map(point => `<li>${point}</li>`).join('');
                    proceedBookingButton.dataset.bokunTargetId = bokunTargetId;
                    consentModal.classList.add('active');
                }
            });
        });

        proceedBookingButton.addEventListener('click', () => {
            const bokunTargetId = proceedBookingButton.dataset.bokunTargetId;
            if (bokunTargetId) {
                const hiddenBokunButton = document.getElementById(bokunTargetId);
                if (hiddenBokunButton) {
                    hiddenBokunButton.click();
                }
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Check if it's a real anchor and not just "#"
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

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
        contactForm.addEventListener('submit', function (event) {
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
    if (workWithUsModal) {
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
        workForm.addEventListener('submit', function (event) {
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

    // --- Meeting Point Modal Logic ---
    const meetingPointModal = document.getElementById('meeting-point-modal');
    if (meetingPointModal) {
        const openMeetingModalButtons = document.querySelectorAll('.open-meeting-modal');
        const closeMeetingModalButtons = document.querySelectorAll('.close-meeting-modal');

        openMeetingModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                meetingPointModal.classList.add('active');
            });
        });

        closeMeetingModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                meetingPointModal.classList.remove('active');
            });
        });

        meetingPointModal.addEventListener('click', (e) => {
            if (e.target === meetingPointModal) {
                meetingPointModal.classList.remove('active');
            }
        });
    }

    // --- Dynamic Title Logic ---
    let originalTitle = document.title;
    let titleInterval;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            const messages = [
                '😲 Don\'t Miss Out!',
                '🇫🇷 Book Your Paris Tour!',
                '🎁 Flat 27% OFF Today!',
                'We Miss You! 👋'
            ];
            let msgIndex = 0;

            clearInterval(titleInterval);

            titleInterval = setInterval(() => {
                document.title = messages[msgIndex];
                msgIndex = (msgIndex + 1) % messages.length;
            }, 1500);
        } else {
            clearInterval(titleInterval);
            document.title = originalTitle;
        }
    });

    // --- Page-Specific JS for blog-post-1.html (Île de la Cité) & blog-post-2.html (Sainte-Chapelle) ---
    if (document.querySelector('.landmark-panel')) {
        const landmarkPanels = document.querySelectorAll('.landmark-panel');
        const landmarkTitle = document.getElementById('landmark-title');
        const landmarkDescription = document.getElementById('landmark-description');
        const landmarkDescBox = document.getElementById('landmark-description-box');
        landmarkPanels.forEach(panel => {
            panel.addEventListener('click', () => {
                landmarkTitle.textContent = panel.dataset.title;
                landmarkDescription.textContent = panel.dataset.desc;
                landmarkDescBox.style.backgroundColor = panel.dataset.color || 'white';
            });
        });
    }

    if (document.querySelector('.window-panel')) {
        const windowPanels = document.querySelectorAll('.window-panel');
        const windowTitle = document.getElementById('window-title');
        const windowDescription = document.getElementById('window-description');
        const windowDescBox = document.getElementById('window-description-box');
        windowPanels.forEach(panel => {
            panel.addEventListener('click', () => {
                windowTitle.textContent = panel.dataset.title;
                windowDescription.textContent = panel.dataset.desc;
                windowDescBox.style.backgroundColor = panel.dataset.color || 'white';
            });
        });
    }

    // --- Shared JS for Interactive Blog Posts (Accordions and Filters) ---
    if (document.querySelector('.accordion-item')) {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.accordion-icon');
            header.addEventListener('click', () => {
                const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
                accordionItems.forEach(i => {
                    i.querySelector('.accordion-content').style.maxHeight = '0px';
                    i.querySelector('.accordion-icon').textContent = '+';
                });
                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '-';
                }
            });
        });
    }

    if (document.querySelector('.filter-btn') && document.querySelector('.restaurant-card')) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const restaurantCards = document.querySelectorAll('.restaurant-card');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                restaurantCards.forEach(card => {
                    card.style.display = 'none'; // Hide all first
                    if (filter === 'all' || card.dataset.category.includes(filter)) {
                        card.style.display = 'block'; // Then show matching
                    }
                });
            });
        });
    }

    // --- Shared Timeline Animation for Blog Posts ---
    if (document.querySelector('.timeline-item')) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // --- Page-Specific JS for blog-post-3.html (Notre Dame Guide) ---
    if (document.getElementById('construction-chart')) {

        const architectureData = {
            towers: { title: 'The North & South Towers', text: 'Completed around 1250, the two towers stand 69 meters (226 feet) tall. The South Tower houses the cathedral\'s largest bell, Emmanuel. For centuries, they were the tallest structures in Paris.' },
            rose: { title: 'The Rose Windows', text: 'Notre-Dame features three spectacular rose windows. The North and South windows are among the largest in the world, at 13 meters in diameter, depicting Old and New Testament scenes in vibrant stained glass.' },
            portals: { title: 'The Three Portals', text: 'The western facade features three grand portals. The central Portal of the Last Judgment depicts Christ deciding the fate of humanity. The left is the Portal of the Virgin, and the right is the Portal of St. Anne.' },
            gallery: { title: 'The Gallery of Kings', text: 'This row of 28 statues represents the kings of Judah. The original 13th-century figures were torn down during the French Revolution, mistaken for kings of France. The current statues are 19th-century reproductions.' },
            buttresses: { title: 'Flying Buttresses', text: 'Notre-Dame was one of the first buildings to use flying buttresses. These arched exterior supports were a revolutionary innovation, allowing for higher walls and larger windows by transferring the roof\'s weight outwards.' }
        };

        const landmarkData = {
            'sainte-chapelle': { title: 'Sainte-Chapelle', text: 'A jewel of Gothic architecture, built by King Louis IX in the 1240s to house Christ\'s Crown of Thorns. It features one of the most extensive 13th-century stained-glass collections in the world.' },
            'conciergerie': { title: 'The Conciergerie', text: 'Part of the former royal palace, it became a notorious prison during the French Revolution. Its most famous prisoner was Marie Antoinette, who was held here before her execution.' },
            'pont-neuf': { title: 'Pont Neuf', text: 'Despite its name meaning "New Bridge," this is the oldest standing bridge across the river Seine in Paris. Completed in 1607, it was unique for its time, with sidewalks and no houses built on it.' },
            'notre-dame-map': { title: 'Notre-Dame Cathedral', text: 'The spiritual and geographical heart of the island and the city of Paris. Its construction began in 1163 and represents the pinnacle of French Gothic architecture.' }
        };

        const restaurantData = [
            { name: "Le Vieux Bistro", type: "Classic French dining experience with traditional dishes like coq au vin and boeuf bourguignon.", category: "french" },
            { name: "Café Saint-Michel", type: "A charming spot for coffee, croissants, and people-watching, with views towards the river.", category: "cafe" },
            { name: "Crêperie du Parvis", type: "Serving delicious sweet and savory crêpes, perfect for a quick and satisfying meal.", category: "quick" },
            { name: "La Rôtisserie Ancienne", type: "Known for its succulent roast chicken and potatoes, a simple yet profound taste of France.", category: "french" },
            { name: "Le Scribe Pâtissier", type: "Exquisite pastries, macarons, and éclairs. A must-visit for anyone with a sweet tooth.", category: "cafe" },
            { name: "Baguette Express", type: "Freshly made sandwiches with classic fillings on crusty baguettes. Ideal for a lunch on the go.", category: "quick" },
            { name: "Auberge de la Cité", type: "An elegant restaurant offering modern interpretations of French regional cuisine.", category: "french" }
        ];

        const faqData = [
            { question: "How old is Notre-Dame?", answer: "Construction began in 1163 and was largely completed by 1345, making the core structure nearly 860 years old." },
            { question: "When will Notre-Dame reopen after the fire?", answer: "The cathedral is scheduled to reopen to the public and for worship in December 2024, following a massive five-year restoration project." },
            { question: "Is it free to enter Notre-Dame?", answer: "Yes, before the fire, entry to the main cathedral was free of charge. Access to the towers and crypt required a ticket. This policy is expected to continue upon reopening." },
            { question: "What are the most important relics at Notre-Dame?", answer: "The cathedral housed priceless relics, all of which were saved from the fire. The most famous are the Crown of Thorns, a fragment of the True Cross, and one of the Holy Nails." },
            { question: "What does 'Notre Dame' mean?", answer: "In French, 'Notre Dame' translates to 'Our Lady,' a reference to the Virgin Mary, to whom the cathedral is dedicated." }
        ];

        // Architecture Explorer
        const archInfoTitle = document.getElementById('info-title');
        const archInfoText = document.getElementById('info-text');
        document.querySelectorAll('[data-feature]').forEach(button => {
            button.addEventListener('click', (e) => {
                const feature = e.currentTarget.dataset.feature;
                archInfoTitle.textContent = architectureData[feature].title;
                archInfoText.textContent = architectureData[feature].text;
            });
        });

        // Landmark Explorer
        const landmarkInfoTitle = document.getElementById('landmark-title');
        const landmarkInfoText = document.getElementById('landmark-text');
        document.querySelectorAll('[data-landmark]').forEach(button => {
            button.addEventListener('click', (e) => {
                const landmark = e.currentTarget.dataset.landmark;
                landmarkInfoTitle.textContent = landmarkData[landmark].title;
                landmarkInfoText.textContent = landmarkData[landmark].text;
            });
        });

        // Restaurant Filter
        const restaurantList = document.getElementById('restaurant-list');
        const filterBtns = document.querySelectorAll('#restaurant-filters .filter-btn');

        const displayRestaurants = (items) => {
            restaurantList.innerHTML = items.map(item => `
                <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                    <h4 class="font-bold">${item.name}</h4>
                    <p class="text-sm text-gray-600">${item.type}</p>
                </div>
            `).join('');
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-[#4a69bd]', 'text-white');
                    b.classList.add('bg-gray-200');
                });
                e.currentTarget.classList.add('active', 'bg-[#4a69bd]', 'text-white');
                e.currentTarget.classList.remove('bg-gray-200');

                const filteredData = (category === 'all') ? restaurantData : restaurantData.filter(item => item.category === category);
                displayRestaurants(filteredData);
            });
        });
        displayRestaurants(restaurantData);

        // FAQ Accordion
        const faqContainer = document.getElementById('faq-container');
        if (faqContainer) {
            faqContainer.innerHTML = faqData.map((item) => `
                <div class="accordion-item bg-white rounded-lg shadow-sm border border-gray-200">
                    <button class="accordion-header w-full text-left p-4 font-semibold flex justify-between items-center">
                        ${item.question}<span class="accordion-icon text-xl font-bold text-gray-500">+</span>
                    </button>
                    <div class="accordion-content"><p class="p-4 pt-0 text-gray-700">${item.answer}</p></div>
                </div>
            `).join('');
            // Re-run accordion logic for this dynamically generated content
            document.querySelectorAll('#faq-container .accordion-item').forEach(item => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                const icon = item.querySelector('.accordion-icon');
                header.addEventListener('click', () => {
                    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
                    // Close all others
                    document.querySelectorAll('#faq-container .accordion-content').forEach(i => i.style.maxHeight = '0px');
                    document.querySelectorAll('#faq-container .accordion-icon').forEach(i => i.textContent = '+');
                    if (!isOpen) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        icon.textContent = '-';
                    }
                });
            });
        }

        // Construction Chart
        const ctx = document.getElementById('construction-chart').getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Choir & Ambulatory', 'Nave', 'Western Facade & Towers', 'Transepts & Spire'],
                    datasets: [{
                        label: 'Construction Period (Years)',
                        data: [21, 56, 40, 28],
                        backgroundColor: 'rgba(74, 105, 189, 0.7)',
                        borderColor: 'rgba(74, 105, 189, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) { label += ': '; }
                                    if (context.parsed.x !== null) {
                                        const startYear = [1163, 1182, 1200, 1250][context.dataIndex];
                                        const endYear = startYear + context.parsed.x;
                                        label += `${context.parsed.x} years (approx. ${startYear} - ${endYear})`;
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: { x: { beginAtZero: true, title: { display: true, text: 'Duration in Years' } } }
                }
            });
        }
    }

    // --- FAQ Accordion Logic ---
    const faqContainer = document.getElementById('faq');
    if (faqContainer) {
        const faqItems = faqContainer.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            const content = item.querySelector('.faq-content');
            const icon = item.querySelector('.faq-icon');

            header.addEventListener('click', () => {
                const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                        otherItem.querySelector('.faq-header').classList.remove('active');
                        otherItem.querySelector('.faq-icon').textContent = '+';
                    }
                });

                // Toggle the clicked item
                if (isOpen) {
                    content.style.maxHeight = '0px';
                    header.classList.remove('active');
                    icon.textContent = '+';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    header.classList.add('active');
                    icon.textContent = '-';
                }
            });
        });
    }

    // --- Ko-fi Floating Widget Trigger (for nav links on guides.html) ---
    const kofiNavTriggers = [
        document.getElementById('tip-us-link-desktop'),
        document.getElementById('tip-us-link-mobile')
    ];

    const triggerKofi = (e) => {
        e.preventDefault();
        if (typeof kofiWidgetOverlay !== 'undefined') {
            kofiWidgetOverlay.toggle();
        }
    };

    kofiNavTriggers.forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', triggerKofi);
        }
    });
});