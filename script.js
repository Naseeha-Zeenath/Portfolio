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
                    }, index * 100); // 150ms delay between each span
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


// ========== MOBILE MENU (Hamburger) ==========
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIconOpen = document.getElementById("menuIconOpen");
const menuIconClose = document.getElementById("menuIconClose");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        const isOpen = !mobileMenu.classList.contains("hidden");

        if (isOpen) {
            mobileMenu.classList.add("hidden");
            menuIconOpen.classList.remove("hidden");
            menuIconClose.classList.add("hidden");
            menuBtn.setAttribute("aria-expanded", "false");
        } else {
            mobileMenu.classList.remove("hidden");
            menuIconOpen.classList.add("hidden");
            menuIconClose.classList.remove("hidden");
            menuBtn.setAttribute("aria-expanded", "true");
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuIconOpen.classList.remove("hidden");
            menuIconClose.classList.add("hidden");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}


// ========== DARK / LIGHT THEME TOGGLE ==========
const themeToggle = document.getElementById("themeToggle");
const iconSun = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");
const html = document.documentElement;

function applyTheme(theme) {
    if (theme === "light") {
        html.classList.add("light");
        if (iconSun) iconSun.classList.add("hidden");
        if (iconMoon) iconMoon.classList.remove("hidden");
    } else {
        html.classList.remove("light");
        if (iconSun) iconSun.classList.remove("hidden");
        if (iconMoon) iconMoon.classList.add("hidden");
    }
}

// Load saved theme (default = dark)
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight = html.classList.contains("light");
        const newTheme = isLight ? "dark" : "light";

        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });
}



// ========== SCROLLSPY ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-section") === current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);


// ========== CURSOR GLOW (Default cursor remains visible) ==========

const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});