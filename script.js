const words = [
    "Hi, I'm Naseeha Zeenath",
    "Beginner-Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

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


const profile = document.getElementById("prflImg");


window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    profile.style.transform = `
        perspective(1200px)
        rotateY(${scroll * 0.5}deg)
        rotateX(${scroll * 0.0}deg)
        scale(1.05)
    `;

});