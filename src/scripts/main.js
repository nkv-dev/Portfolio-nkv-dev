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
  // Check for mobile and data saver mode
  const isMobile = window.innerWidth <= 768;
  const isDataSaver = navigator.connection && navigator.connection.saveData;
  
  // Available videos: pc.mp4, drifting.mp4, army.mp4, coding_website.mp4, eletronics.mp4
  const playlist = isMobile || isDataSaver ? [
    // Optimized for mobile - shorter clips to save data
    { src: "assets/pc.mp4", start: 0, end: 5 },
    { src: "assets/drifting.mp4", start: 0, end: 4 },
    { src: "assets/coding_website.mp4", start: 0, end: 4 },
    { src: "assets/eletronics.mp4", start: 0, end: 4 },
    { src: "assets/army.mp4", start: 0, end: 3 }
  ] : [
    // Full desktop experience - longer clips
    { src: "assets/pc.mp4", start: 0, end: 8 },
    { src: "assets/drifting.mp4", start: 0, end: 6 },
    { src: "assets/coding_website.mp4", start: 0, end: 6 },
    { src: "assets/eletronics.mp4", start: 0, end: 6 },
    { src: "assets/army.mp4", start: 0, end: 5 }
  ];

  let currentIndex = 0;
  let isTransitioning = false;

  function playCurrentVideo() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const v = playlist[currentIndex];

    // Fade out current video
    video.style.transition = 'opacity 0.3s ease';
    video.style.opacity = '0.7';

    setTimeout(() => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.src = v.src;

      const onLoaded = () => {
        video.currentTime = v.start;
        video.style.opacity = '0';
        
        // Mobile optimizations
        if (isMobile) {
          video.playbackRate = 0.9;
          video.setAttribute('playsinline', '');
        }
        
        video.play().then(() => {
          // Fade in after play starts
          setTimeout(() => {
            video.style.opacity = '1';
            isTransitioning = false;
          }, 100);
        }).catch(() => {
          isTransitioning = false;
        });
        
        video.removeEventListener("loadedmetadata", onLoaded);
      };

      video.addEventListener("loadedmetadata", onLoaded);
    }, 300);
  }

  video.addEventListener("timeupdate", () => {
    if (!isTransitioning && video.currentTime >= playlist[currentIndex].end) {
      currentIndex = (currentIndex + 1) % playlist.length;
      playCurrentVideo();
    }
  });

  video.addEventListener("error", (e) => {
    console.warn("Video failed to load:", video.src, e);
    // Skip to next video on error
    currentIndex = (currentIndex + 1) % playlist.length;
    if (currentIndex !== 0) {
      playCurrentVideo();
    } else {
      // All videos failed - hide video element gracefully
      video.style.display = 'none';
    }
  });

  // Handle visibility changes (pause when tab hidden)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  });

  playCurrentVideo();
}
