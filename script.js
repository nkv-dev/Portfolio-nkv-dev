const words = [
  "Coder",
  "Web Developer",
  "Tinker",
  "Embedded Systems Enthusiast",
  "Biker",
  "MotorSports fan",
  "Hobbist",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 130;
const deletingSpeed = 50;
const delayBetweenWords = 140;

const typingElement = document.getElementById("typing");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), delayBetweenWords);
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();

const video = document.getElementById("bgVideo");

// Section start and end (in seconds)
const startTime = 0;
const endTime = 62;

// Start video at 0s
video.currentTime = startTime;
video.play();

// Listen for time updates
video.addEventListener("timeupdate", () => {
  if (video.currentTime >= endTime) {
    video.pause(); // stop at 42s
    video.currentTime = startTime; // go back to 0s
    video.play(); // optional: loop
  }
});
