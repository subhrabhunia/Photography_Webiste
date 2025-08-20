document.addEventListener("DOMContentLoaded", () => {

    // --- Video Player Logic ---
    // Pauses other videos when one is played.
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
        video.addEventListener("play", () => {
            videos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });

    // --- Booking Form Pop-up Logic ---
    const bookNowBtn = document.getElementById("book-now-hero-btn");
    const bookingOverlay = document.getElementById("booking-form-overlay");
    const closeBookingBtn = document.getElementById("close-booking-form");

    // Open popup
    bookNowBtn.addEventListener("click", () => {
        bookingOverlay.classList.add("active");
    });

    // Close popup
    closeBookingBtn.addEventListener("click", () => {
        bookingOverlay.classList.remove("active");
    });

    // Close when clicking outside the form
    window.addEventListener("click", (e) => {
        if (e.target === bookingOverlay) {
            bookingOverlay.classList.remove("active");
        }
    });

    // --- URL Parameter Handling ---
    // Displays alerts for form submissions and cleans up the URL.
    const params = new URLSearchParams(window.location.search);

    if (params.get("status") === "success") {
        alert("Message sent successfully!");
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (params.get("status") === "error") {
        alert("Error sending message. Please try again later.");
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (params.get("booking") === "success") {
        alert("🎉 Booking request sent successfully! We will contact you soon.");
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (params.get("booking") === "error") {
        alert("⚠️ Error sending booking request. Please try again later.");
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // --- Gallery Lightbox with Navigation Logic ---
    const lightboxOverlay = document.getElementById("lightbox-overlay");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeLightboxBtn = document.querySelector(".lightbox-overlay .close-btn");
    const prevBtn = document.querySelector(".lightbox-overlay .prev-btn");
    const nextBtn = document.querySelector(".lightbox-overlay .next-btn");

    let currentGalleryImages = [];
    let currentIndex = 0;

    const allGallerySections = document.querySelectorAll('.category-gallery, .gallery-section');

    allGallerySections.forEach(section => {
        const imagesInThisSection = section.querySelectorAll('.gallery-item img');

        imagesInThisSection.forEach((img, index) => {
            img.addEventListener('click', () => {
                // Set the current set of images and the index
                currentGalleryImages = Array.from(imagesInThisSection);
                currentIndex = index;

                // Display the lightbox with the clicked image
                lightboxImage.src = currentGalleryImages[currentIndex].src;
                lightboxOverlay.style.display = 'flex';
                
                // Show navigation buttons
                if (prevBtn) prevBtn.style.display = 'block';
                if (nextBtn) nextBtn.style.display = 'block';
            });
        });
    });

    // Go to previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
            lightboxImage.src = currentGalleryImages[currentIndex].src;
        });
    }

    // Go to next image
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % currentGalleryImages.length;
            lightboxImage.src = currentGalleryImages[currentIndex].src;
        });
    }
    
    // Close lightbox
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => {
            lightboxOverlay.style.display = 'none';
        });
    }

    // Close lightbox by clicking overlay
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
        }
    });

});