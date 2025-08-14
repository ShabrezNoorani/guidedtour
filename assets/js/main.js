// --- Master Tour Data List ---
// This is the new "database" for all tours.
// To add, remove, or edit a tour, you only need to change this list.
const tourData = [
    {
        id: 'private-sainte-chapelle',
        type: 'private',
        title: 'Private Notre Dame Walking Tour + Entrance to Sainte-Chapelle',
        image: 'assets/img/private.webp',
        altText: 'Gargoyle overlooking Paris from Notre Dame',
        description: "An exclusive tour for you and your group to explore the cathedral's exterior and visit the stunning Sainte-Chapelle.",
        duration: '2 hr',
        price: 155,
        discountEuros: 46.50,
        pricePer: 'person',
        bokunId: 'bokun_ddac3360_b6ce_498e_ac1a_b5ac3206f5cf',
        bokunExperienceUrl: 'https://widgets.bokun.io/online-sales/9468be75-021b-4e0a-befb-fa17ddb6e389/experience/1057128?partialView=1',
        promo: {
            type: 'seasonal',
            title: 'August in Paris Special!',
            details: 'Book directly & get <strong class="bg-white px-1.5 py-0.5 rounded text-amber-600 tracking-wider">30% off*</strong>'
        }
    },
    {
        id: 'private-crypt',
        type: 'private-crypt',
        title: 'Private Notre Dame Walking Tour + Entrance to Crypt',
        image: 'assets/img/crypt.webp',
        altText: 'Archaeological Crypt under Notre Dame',
        description: 'Journey beneath the square of Notre Dame to uncover Roman ruins and medieval foundations in the fascinating archaeological crypt.',
        duration: '2 hr',
        price: 130,
        discountEuros: 39,
        pricePer: 'person',
        bokunId: 'bokun_c2cea072_5b43_477c_9d32_19b23e7fc82b',
        bokunExperienceUrl: 'https://widgets.bokun.io/online-sales/9468be75-021b-4e0a-befb-fa17ddb6e389/experience/1060432?partialView=1',
        promo: {
            type: 'seasonal',
            title: 'August in Paris Special!',
            details: 'Book directly and get <strong class="bg-white px-1.5 py-0.5 rounded text-amber-600 tracking-wider">30% off*</strong>'
        }
    },
    {
        id: 'group-tour',
        type: 'group',
        title: 'Paris Notre Dame Exterior with Sainte-Chapelle or Crypt Entry',
        image: 'assets/img/group.webp',
        altText: 'A group of tourists near Notre Dame',
        description: "Join our small-group tour to explore Notre Dame's exterior. Choose your adventure: enhance your visit with entry to the historic Crypt or the breathtaking Sainte-Chapelle.",
        duration: '1 hr 30 m',
        price: 25,
        discountEuros: 6.75,
        pricePer: 'person',
        bokunId: 'bokun_d20df2ac_a831_438e_a00c_df8d93fe168d',
        bokunExperienceUrl: 'https://widgets.bokun.io/online-sales/9468be75-021b-4e0a-befb-fa17ddb6e389/experience/1069923?partialView=1',
        promo: {
            type: 'code',
            title: 'Limited Time Offer!',
            details: 'Use code <strong class="bg-white px-1.5 py-0.5 rounded text-amber-600 tracking-wider">FLAT27</strong> to get 27% off your booking!'
        }
    }
];

// --- Dynamic Tour Card Generation ---
function createTourCard(tour) {
    const card = document.createElement('div');
    card.className = 'card rounded-lg overflow-hidden shadow-lg tour-card relative';

    let discountBannerHTML = '';
    let priceHTML = '';
    let hasDiscount = tour.discountEuros && tour.discountEuros > 0;

    if (hasDiscount) {
        const discountPercentage = Math.round((tour.discountEuros / tour.price) * 100);
        discountBannerHTML = `<div class="discount-banner">${discountPercentage}% OFF</div>`;
        const newPrice = tour.price - tour.discountEuros;
        priceHTML = `
            <span class="original-price">€${tour.price}</span>
            <span class="text-2xl font-bold text-[#4a69bd]">€${newPrice.toFixed(2)} <span class="text-base font-normal">/ ${tour.pricePer}</span></span>
        `;
    } else {
        priceHTML = `<span class="text-2xl font-bold text-[#4a69bd]">€${tour.price} <span class="text-base font-normal">/ ${tour.pricePer}</span></span>`;
    }

    let promoBannerHTML = '';
    if (tour.promo) {
        promoBannerHTML = `
            <div class="my-4 p-3 rounded-lg bg-gradient-to-r from-yellow-300 to-amber-400 text-gray-800 border-l-4 border-yellow-500 shadow-md rotating-banner">
                <p class="font-semibold text-sm text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clip-rule="evenodd" />
                    </svg>
                    <strong>${tour.promo.title}</strong>
                </p>
                <p class="text-center text-sm mt-1">${tour.promo.details}</p>
            </div>
        `;
    }

    card.innerHTML = `
        ${discountBannerHTML}
        <img src="${tour.image}"
             onerror="this.onerror=null;this.src='https://placehold.co/600x400/a0522d/FFFFFF?text=Tour+Image';"
             alt="${tour.altText}" class="w-full h-56 object-cover">
        <div class="p-6 card-content">
            <div class="card-body flex flex-col">
                <h3 class="text-2xl font-serif mb-2">${tour.title}</h3>
                <p class="text-gray-700 mb-4 flex-grow">${tour.description}</p>
                ${promoBannerHTML}
            </div>
            <div class="flex justify-between items-center mb-6 mt-auto">
                <span class="text-lg font-medium">${tour.duration}</span>
                <div class="price-display text-right ${hasDiscount ? 'has-discount' : ''}">
                    ${priceHTML}
                </div>
            </div>
            <button class="open-custom-modal w-full py-2.5 rounded-lg btn-primary interactive-element select-none"
                    data-tour-type="${tour.type}"
                    data-bokun-target-id="${tour.bokunId}">
                Book now
            </button>
            <div class="payment-logos-container">
                <span class="secure-payment-text">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>
                    Secure payment
                </span>
                <svg class="payment-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"></path><path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"></path></svg>
                <svg class="payment-icon" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-mastercard"><title id="pi-mastercard">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><circle fill="#EB001B" cx="15" cy="12" r="7" /><circle fill="#F79E1B" cx="23" cy="12" r="7" /><path fill="#FF5F00" d="M22 12c0-3.9-3.1-7-7-7v14c3.9 0 7-3.1 7-7z" /></svg>
                <svg class="payment-icon" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-amex"><title id="pi-amex">American Express</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><rect x="1" y="2" width="36" height="20" rx="2" fill="#0077C8" /><path fill="#fff" d="M15.175,13.25L13.8,16.962l-1.375-3.712H10.5v5.225L8.575,13.25H7.062L5,18.75h1.238l0.413-1.237h2.338L9.4,18.75h2.337 v-4.125l1.513,4.125h1.1l1.513-3.987v3.987h1.1v-5.5H15.175z M7.062,16.275L7.75,14.35l0.688,1.925H7.062z M24.938,16L27,13.25h-1.513l-1.375,1.65l-1.1-1.65h-4.538v5.5h4.4l1.375-1.788l1.375,1.788H27L24.938,16z M22.188,17.65 h-2.612v-1.1h2.475v-1.1h-2.475v-0.962h2.75l1.1,1.513L22.188,17.65z" /></svg>
            </div>
            <div hidden>
                <!-- This button is now just a placeholder for Bokun to find -->
                <button class="bokunButton" disabled id="${tour.bokunId}"
                    data-src="${tour.bokunExperienceUrl}"
                    data-testid="widget-book-button"> Book now </button>
            </div>
        </div>
    `;
    return card;
}

function displayTourCards(tours) {
    const container = document.getElementById('tour-card-container');
    if (container) {
        container.innerHTML = ''; // Clear existing content
        tours.forEach(tour => {
            const cardElement = createTourCard(tour);
            container.appendChild(cardElement);
        });
        
        // This is the new, robust way to load and initialize the Bokun script
        loadAndInitBokun();
    }
}

// New function to reliably load and initialize the Bokun script
function loadAndInitBokun() {
    // Check if the script has already been loaded to avoid duplicates
    if (document.querySelector('script[src*="BokunWidgetsLoader.js"]')) {
        if (typeof BokunWidgets !== 'undefined') {
            BokunWidgets.init();
        }
        return;
    }

    // Create a new script element
    const bokunScript = document.createElement('script');
    bokunScript.type = 'text/javascript';
    bokunScript.async = true;
    bokunScript.src = 'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=9468be75-021b-4e0a-befb-fa17ddb6e389';

    // This is the crucial part: wait for the script to load, THEN initialize
    bokunScript.onload = function() {
        if (typeof BokunWidgets !== 'undefined') {
            BokunWidgets.init();
        }
    };

    // Add the script to the document body to start loading
    document.body.appendChild(bokunScript);
}


// SN Guided Tours - Main JavaScript File
document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Tour Card Generation ---
    const tourCardContainer = document.getElementById('tour-card-container');
    if (tourCardContainer) {
        displayTourCards(tourData);
    }
    
    const effectContainer = document.getElementById('effect-container');

    if (effectContainer) {
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

        function initializeInteractiveEffects() {
            const interactiveElements = document.querySelectorAll('.interactive-element');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', createFireworksHandler); 
                el.addEventListener('mouseenter', createFireworksHandler);
            });
        }
        function createFireworksHandler(e) {
             createFireworks(e.currentTarget);
        }
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
        initializeInteractiveEffects();
        if (tourCardContainer) {
            const observer = new MutationObserver(initializeInteractiveEffects);
            observer.observe(tourCardContainer, { childList: true });
        }
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const consentModal = document.getElementById('consent-modal');
    if (consentModal) {
        const tourDetails = {
            private: {
                title: 'Private Sainte-Chapelle Tour Information & Consent',
                points: [
                    '<strong>* Promotion</strong> only applies to selected days and times. Please check the booking page for availability.',
                    '<strong>Promo Code</strong> Kindly use promo code at checkout to avail the discount(if applicable).',
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
                    '<strong>* Promotion</strong> only applies to selected days and times. Please check the booking page for availability.',
                    '<strong>Promo Code</strong> Kindly use promo code at checkout to avail the discount(if applicable).',
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
                    '<strong>* Promotion</strong> only applies to selected days and times. Please check the booking page for availability.',
                    '<strong>Promo Code</strong> Kindly use promo code at checkout to avail the discount(if applicable).',
                    '<strong>Small-Group Tour:</strong> This is a walking tour with a small group of travelers. Your guide will set a moderate and comfortable pace for everyone.',
                    '<strong>Archaeological Crypt Entry(if selected):</strong> Your tour includes a pre-booked ticket to the Archaeological Crypt beneath the Notre Dame square. Your guide will explain its history from the outside before you enter to explore at your own pace.',
                    '<strong>Sainte-Chapelle Entry (if selected):</strong> Your tour includes a pre-booked, timed-entry ticket to Sainte-Chapelle. Your guide will provide a full explanation outside but will not accompany you inside, allowing you to explore its beauty at your own leisure.',
                    '<strong>Health & Fitness:</strong> Participants should be in good health and able to walk and stand for the full 1.5-hour duration of the tour.',
                    '<strong>Direct Booking Discount:</strong> The promotional price is available exclusively for bookings made on our website using the advertised promo code at checkout.',
                    '<strong>Cancellation Policy:</strong> Full refund for cancellations made at least 24 hours before the tour start time. No refunds for later cancellations or no-shows.',
                    '<strong>Liability & Safety:</strong> Participants are responsible for their own safety and personal belongings. Scenic Zest is fully insured but is not liable for personal injury or loss of property.',
                    '<strong>Photography Consent:</strong> Photos may be taken for promotional use. Please inform your guide at the start of the tour if you prefer not to be photographed.'
                ]
            }
        };

        const closeModalButtons = document.querySelectorAll('.close-modal-button');
        const modalTitle = document.getElementById('modal-title');
        const modalPoints = document.getElementById('modal-points');
        const proceedBookingButton = document.getElementById('modal-proceed-booking');
        
        document.body.addEventListener('click', function(e) {
            if (e.target.classList.contains('open-custom-modal')) {
                const tourType = e.target.dataset.tourType;
                const bokunTargetId = e.target.dataset.bokunTargetId;
                const details = tourDetails[tourType];
                if (details && bokunTargetId) {
                    modalTitle.textContent = details.title;
                    modalPoints.innerHTML = details.points.map(point => `<li>${point}</li>`).join('');
                    proceedBookingButton.dataset.bokunTargetId = bokunTargetId;
                    consentModal.classList.add('active');
                }
            }
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
        reviewsSlider.addEventListener('mouseleave', () => { isDown = false; reviewsSlider.style.cursor = 'grab'; });
        reviewsSlider.addEventListener('mouseup', () => { isDown = false; reviewsSlider.style.cursor = 'grab'; });
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
        reviewsSlider.addEventListener('touchend', () => { isDown = false; });
    }

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
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

    const workWithUsModal = document.getElementById('work-with-us-modal');
    if (workWithUsModal) {
        const openWorkModalButton = document.getElementById('work-with-us-button');
        const closeWorkModalButtons = workWithUsModal.querySelectorAll('.close-work-modal-button');
        if(openWorkModalButton) {
            openWorkModalButton.addEventListener('click', (e) => {
                e.preventDefault();
                workWithUsModal.classList.add('active');
            });
        }
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

    let originalTitle = document.title;
    let titleInterval;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            const messages = [
                '😲 Don\'t Miss Out!', '🇫🇷 Book Your Paris Tour!', '🎁 Flat 27% OFF Today!', 'We Miss You! 👋'
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
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.backgroundColor = '';
                    b.style.color = '';
                });
                btn.classList.add('active');
                 btn.style.backgroundColor = '#4a69bd';
                 btn.style.color = 'white';
                const filter = btn.dataset.filter;
                restaurantCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category.includes(filter)) {
                        card.style.display = 'block'; 
                    } else {
                        card.style.display = 'none'; 
                    }
                });
            });
        });
        const firstBtn = document.querySelector('.filter-btn');
        if (firstBtn) {
            firstBtn.style.backgroundColor = '#4a69bd';
            firstBtn.style.color = 'white';
        }
    }

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
        const archInfoTitle = document.getElementById('info-title');
        const archInfoText = document.getElementById('info-text');
        document.querySelectorAll('[data-feature]').forEach(button => {
            button.addEventListener('click', (e) => {
                const feature = e.currentTarget.dataset.feature;
                archInfoTitle.textContent = architectureData[feature].title;
                archInfoText.textContent = architectureData[feature].text;
            });
        });
        const landmarkInfoTitle = document.getElementById('landmark-title');
        const landmarkInfoText = document.getElementById('landmark-text');
        document.querySelectorAll('[data-landmark]').forEach(button => {
            button.addEventListener('click', (e) => {
                const landmark = e.currentTarget.dataset.landmark;
                landmarkInfoTitle.textContent = landmarkData[landmark].title;
                landmarkInfoText.textContent = landmarkData[landmark].text;
            });
        });
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
            document.querySelectorAll('#faq-container .accordion-item').forEach(item => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                const icon = item.querySelector('.accordion-icon');
                header.addEventListener('click', () => {
                    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
                    document.querySelectorAll('#faq-container .accordion-content').forEach(i => i.style.maxHeight = '0px');
                    document.querySelectorAll('#faq-container .accordion-icon').forEach(i => i.textContent = '+');
                    if (!isOpen) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        icon.textContent = '-';
                    }
                });
            });
        }
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

    const faqContainer = document.getElementById('faq');
    if (faqContainer) {
        const faqItems = faqContainer.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            const content = item.querySelector('.faq-content');
            const icon = item.querySelector('.faq-icon');
            header.addEventListener('click', () => {
                const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                        otherItem.querySelector('.faq-header').classList.remove('active');
                        otherItem.querySelector('.faq-icon').textContent = '+';
                    }
                });
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