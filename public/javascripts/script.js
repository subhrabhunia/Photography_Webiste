document.addEventListener("DOMContentLoaded", () => {
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
});


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

// const params = new URLSearchParams(window.location.search);
//   if (params.get("status") === "success") {
//     alert("Message sent successfully!");
//   }
//   if (params.get("status") === "error") {
//     alert("Error sending message. Please try again later.");
//   }

const params1 = new URLSearchParams(window.location.search);
  if (params1.get("status") === "success") {
    alert("Message sent successfully!");
    window.location.href = "/"; // go back to clean homepage
  }
  if (params1.get("status") === "error") {
    alert("Error sending message. Please try again later.");
    window.location.href = "/"; // also reset to clean homepage
  }

const params2 = new URLSearchParams(window.location.search);
  if (params2.get("booking") === "success") {
    alert("🎉 Booking request sent successfully! We will contact you soon.");
    window.location.href = "/"; // go back to clean homepage
  }
  if (params2.get("booking") === "error") {
    alert("⚠️ Error sending booking request. Please try again later.");
    window.location.href = "/"; // reset back to clean homepage
  }