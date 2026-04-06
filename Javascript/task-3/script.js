const thumbnails = document.querySelectorAll(".thumb");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close");

/* Open lightbox */

thumbnails.forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src.replace("200/150", "800/600");
        lightbox.classList.add("show");
    });
});

/* Close button */

closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

/* Close on outside click */

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }
});