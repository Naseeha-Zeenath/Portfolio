const words = [
    "Hi, I'm Naseeha Zeenath",
    "Beginner-Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {
    if (!typing) return;
    const currentWord = words[wordIndex];

    if (!deleting) {
        typing.textContent = currentWord.substring(0, charIndex++);
    } else {
        typing.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = deleting ? 70 : 120;

    if (!deleting && charIndex === currentWord.length + 1) {
        deleting = true;
        speed = 1500;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();



// ========== PROFILE IMAGE ==========
const profileImg = document.getElementById("prflImg");

// 1. Entrance animation when page first loads
window.addEventListener("load", () => {
    setTimeout(() => {
        if (profileImg) {
            profileImg.classList.add("loaded");
        }
    }, 100);
});

// 2. Continuous rotation while scrolling (up & down)
window.addEventListener("scroll", () => {
    if (!profileImg) return;

    // Only start rotating after the entrance animation is done
    if (!profileImg.classList.contains("loaded")) return;

    const scrollY = window.scrollY;
    const rotateY = scrollY * 0.45;   // change speed here

    profileImg.style.transform = `
        perspective(1000px)
        rotateY(${rotateY}deg)
        scale(1.05)
    `;
});

// ==========  SCROLL REVEAL ==========
const revealElements = document.querySelectorAll(
    ".reveal, .reveal-stagger, .project-card-anim"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active"); // reverse on scroll up
            }
        });
    },
    {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
    }
);

revealElements.forEach((el) => observer.observe(el));


// ========== COUNTERS ==========
function animateCounter(el, target) {
    let start = 0;
    const duration = 1600;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            el.textContent = target + (el.dataset.suffix || "");
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + (el.dataset.suffix || "");
        }
    }, 16);
}

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
                entry.target.classList.add("counted");
                animateCounter(entry.target, parseInt(entry.target.dataset.target));
            }
        });
    },
    { threshold: 0.6 }
);

counters.forEach((c) => counterObserver.observe(c));





// ========== CORE TECHNOLOGIES - One by One Animation ==========
const techItems = document.querySelectorAll(".tech-item");

const techObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                techItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add("show");
                    }, index * 150); // 150ms delay between each span
                });
            } else {
                techItems.forEach((item) => {
                    item.classList.remove("show");
                });
            }
        });
    },
    {
        threshold: 0.5,
        rootMargin: "0px 0px -40px 0px"
    }
);

const techContainer = document.querySelector(".tech-container");
if (techContainer) {
    techObserver.observe(techContainer);
}


// ========== FOOTER YEAR ==========
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}






