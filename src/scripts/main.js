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
  // Shorter clips for continuous seamless looping (2-3 seconds each)
  const playlist = [
    { src: "assets/pc.mp4", start: 0, end: 3 },
    { src: "assets/drifting.mp4", start: 0, end: 2 },
    { src: "assets/coding_website.mp4", start: 0, end: 2 },
    { src: "assets/eletronics.mp4", start: 0, end: 2 },
    { src: "assets/army.mp4", start: 0, end: 2 }
  ];

  let currentIndex = 0;
  let isTransitioning = false;

  function playCurrentVideo() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const v = playlist[currentIndex];

    // Quick transition - no fade for continuous feel
    video.style.opacity = '0.95';

    setTimeout(() => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.src = v.src;

      const onLoaded = () => {
        video.currentTime = v.start;
        video.style.opacity = '1';
        
        // Ensure continuous playback
        video.play().then(() => {
          isTransitioning = false;
        }).catch((err) => {
          console.warn('Video play failed:', err);
          isTransitioning = false;
          // Try next video immediately
          currentIndex = (currentIndex + 1) % playlist.length;
          setTimeout(playCurrentVideo, 100);
        });
        
        video.removeEventListener("loadedmetadata", onLoaded);
      };

      video.addEventListener("loadedmetadata", onLoaded);
      
      // Timeout fallback if loadedmetadata doesn't fire
      setTimeout(() => {
        if (isTransitioning) {
          isTransitioning = false;
          currentIndex = (currentIndex + 1) % playlist.length;
          playCurrentVideo();
        }
      }, 3000);
    }, 50);
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

  // Ensure continuous playback - restart if paused unexpectedly
  video.addEventListener('pause', () => {
    if (!isTransitioning && video.currentTime < playlist[currentIndex].end - 0.5) {
      video.play().catch(() => {});
    }
  });

  // Auto-play on page load and ensure it stays playing
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.muted = true;
  video.playsInline = true;

  playCurrentVideo();
}
