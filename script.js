
// ========================================
// AMBIENT LIGHTS LLC
// WEBSITE JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // ANIMATED STARLIGHT BACKGROUND
    // ========================================

    const starfield = document.getElementById("starfield");

    if (starfield) {

        const numberOfStars = 150;

        const starColors = [
            "#ffffff",
            "#65c7ff",
            "#9b7aff",
            "#efa0d2"
        ];

        for (let i = 0; i < numberOfStars; i++) {

            const star = document.createElement("span");

            star.classList.add("star");

            const size = Math.random() * 2.5 + 0.5;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            star.style.backgroundColor =
                starColors[Math.floor(Math.random() * starColors.length)];

            star.style.animationDuration =
                `${Math.random() * 4 + 2}s`;

            star.style.animationDelay =
                `${Math.random() * 5}s`;

            starfield.appendChild(star);

        }

    }


    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        function closeMenu() {

            navigation.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

        }

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });


        // Close the menu when a navigation link is clicked.

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        // Close the menu when clicking outside it.

        document.addEventListener("click", event => {

            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMenu();

            }

        });


        // Close the menu using the Escape key.

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        });


        // Reset mobile navigation on larger screens.

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                closeMenu();

            }

        });

    }


    // ========================================
    // AUTOMATIC COPYRIGHT YEAR
    // ========================================

    const copyright = document.querySelector(".copyright");

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} Ambient Lights LLC. All rights reserved.`;

    }

});

// ========================================
// TEMPORARY QUOTE FORM PREVIEW
// ========================================

const quoteForm = document.getElementById("quote-form");
const formStatus = document.getElementById("form-status");

if (quoteForm && formStatus) {

    quoteForm.addEventListener("submit", (event) => {

        event.preventDefault();

        formStatus.textContent =
            "Online quote requests are not available yet. Please contact us through Instagram or Facebook. Your information has not been submitted.";

    });

}

// ========================================
// HERO VIDEO ACCESSIBILITY
// ========================================

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function updateHeroVideo() {

        if (reducedMotion.matches) {

            heroVideo.pause();

        } else {

            heroVideo.play().catch(() => {});

        }

    }

    updateHeroVideo();

    reducedMotion.addEventListener(
        "change",
        updateHeroVideo
    );

}

// ========================================
// INTERACTIVE PHOTO LIGHTBOX
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("photo-lightbox");

    if (!lightbox) return;

    const photoCards = Array.from(
        document.querySelectorAll(".photo-card")
    );

    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");

    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    let currentPhoto = 0;
    let lastFocusedCard = null;


    // UPDATE THE DISPLAYED PHOTO

    function showPhoto(index) {

        currentPhoto =
            (index + photoCards.length) % photoCards.length;

        const card = photoCards[currentPhoto];
        const image = card.querySelector("img");
        const title = card.querySelector("h3");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCaption.textContent =
            title ? title.textContent : image.alt;

        lightboxCounter.textContent =
            `${currentPhoto + 1} of ${photoCards.length}`;

    }


    // OPEN THE LIGHTBOX

    photoCards.forEach((card, index) => {

        card.addEventListener("click", () => {

            lastFocusedCard = card;

            showPhoto(index);

            lightbox.showModal();

            document.body.classList.add("lightbox-open");

            closeButton.focus();

        });

    });


    // CLOSE THE LIGHTBOX

    function closeLightbox() {

        lightbox.close();

    }

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("close", () => {

        document.body.classList.remove("lightbox-open");

        if (lastFocusedCard) {
            lastFocusedCard.focus();
        }

    });


    // PREVIOUS PHOTO

    prevButton.addEventListener("click", () => {

        showPhoto(currentPhoto - 1);

    });


    // NEXT PHOTO

    nextButton.addEventListener("click", () => {

        showPhoto(currentPhoto + 1);

    });


    // KEYBOARD NAVIGATION

    lightbox.addEventListener("keydown", (event) => {

        if (event.key === "ArrowLeft") {

            event.preventDefault();

            showPhoto(currentPhoto - 1);

        }

        if (event.key === "ArrowRight") {

            event.preventDefault();

            showPhoto(currentPhoto + 1);

        }

    });


    // CLICK OUTSIDE THE PHOTO TO CLOSE

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

});
