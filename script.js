/***********************
 * TYPEWRITER EFFECT
 ***********************/
const words = [
  "Coder",
  "Web Developer",
  "Tinker",
  "Embedded Systems Enthusiast",
  "Biker",
  "MotorSports Fan",
  "Hobbyist"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 130;
const deletingSpeed = 50;
const delayBetweenWords = 140;

const typingElement = document.getElementById("typing");

function typeEffect() {
  if (!typingElement) return;

  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), delayBetweenWords);
    }
  } else {
    typingElement.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();

/***************************
 * BACKGROUND VIDEO PLAYER
 ***************************/
const video = document.getElementById("bgVideo");

if (video) {
  // Check for mobile and reduce video quality/data usage
  const isMobile = window.innerWidth <= 768;
  
  const playlist = isMobile ? [
    { src: "assets/coding_website.mp4", start: 0, end: 3 },
    { src: "assets/pcrunning.mp4",     start: 0, end: 3 }
  ] : [
    { src: "assets/pcrunning.mp4",     start: 0, end: 5 },
    { src: "assets/coding_website.mp4", start: 0, end: 5},
    { src: "assets/eletronics.mp4",    start: 0, end: 5 },
    { src: "assets/drifting.mp4",       start: 0, end: 5},
    { src: "assets/army.mp4",           start: 0, end: 4}
  ];

  let currentIndex = 0;

  function playCurrentVideo() {
    const v = playlist[currentIndex];

    video.pause();
    video.removeAttribute("src");
    video.load();

    video.src = v.src;

    const onLoaded = () => {
      video.currentTime = v.start;
      // Add mobile-specific video settings
      if (isMobile) {
        video.playbackRate = 0.8; // Slightly slower on mobile
      }
      video.play().catch(() => {});
      video.removeEventListener("loadedmetadata", onLoaded);
    };

    video.addEventListener("loadedmetadata", onLoaded);
  }

  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= playlist[currentIndex].end) {
      currentIndex = (currentIndex + 1) % playlist.length;
      playCurrentVideo();
    }
  });

  video.addEventListener("error", () => {
    console.error("Video failed to load:", video.src);
  });

  playCurrentVideo();
}
