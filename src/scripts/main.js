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
 * Double Buffering - No Black Screen
 ***************************/
const videoA = document.getElementById("bgVideo");
const videoB = document.getElementById("bgVideo2");

if (videoA && videoB) {
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
  let activeVideo = videoA;  // Currently visible video
  let nextVideo = videoB;    // Video loading next clip

  // Initialize videos
  videoA.style.zIndex = '-2';
  videoA.style.opacity = '1';
  videoB.style.zIndex = '-3';
  videoB.style.opacity = '0';
  videoA.muted = true;
  videoB.muted = true;
  videoA.playsInline = true;
  videoB.playsInline = true;

  function loadVideo(video, index) {
    return new Promise((resolve, reject) => {
      const v = playlist[index];
      
      const onLoaded = () => {
        video.currentTime = v.start;
        video.playbackRate = isMobile ? 0.9 : 1.0;
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("error", onError);
        resolve();
      };
      
      const onError = (e) => {
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("error", onError);
        reject(e);
      };
      
      video.addEventListener("loadedmetadata", onLoaded);
      video.addEventListener("error", onError);
      video.src = v.src;
      video.load();
    });
  }

  async function startPlayback() {
    // Load first video into active video
    await loadVideo(activeVideo, 0);
    await activeVideo.play().catch(() => {});
    
    // Preload second video into next video
    const nextIndex = (currentIndex + 1) % playlist.length;
    loadVideo(nextVideo, nextIndex).catch(() => {});
    
    // Start monitoring time
    monitorPlayback();
  }

  function monitorPlayback() {
    const checkTime = () => {
      if (isTransitioning) {
        requestAnimationFrame(checkTime);
        return;
      }
      
      const v = playlist[currentIndex];
      if (activeVideo.currentTime >= v.end) {
        // Time to switch - next video should already be loaded
        performTransition();
      }
      
      requestAnimationFrame(checkTime);
    };
    
    requestAnimationFrame(checkTime);
  }

  async function performTransition() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Ensure next video is ready to play
    const nextIndex = (currentIndex + 1) % playlist.length;
    
    try {
      // If next video not loaded yet, load it now
      if (!nextVideo.src || nextVideo.src.indexOf(playlist[nextIndex].src) === -1) {
        await loadVideo(nextVideo, nextIndex);
      }
      
      // Start playing next video (still invisible)
      await nextVideo.play().catch(() => {});
      
      // Crossfade: bring next video to front while active is still playing
      nextVideo.style.zIndex = '-2';
      activeVideo.style.zIndex = '-3';
      
      // Fade transition over 300ms
      nextVideo.style.transition = 'opacity 0.3s ease';
      activeVideo.style.transition = 'opacity 0.3s ease';
      
      nextVideo.style.opacity = '1';
      activeVideo.style.opacity = '0';
      
      // Wait for transition to complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Pause the old active video
      activeVideo.pause();
      
      // Swap roles
      const temp = activeVideo;
      activeVideo = nextVideo;
      nextVideo = temp;
      
      currentIndex = nextIndex;
      isTransitioning = false;
      
      // Preload the next video in the background
      const preloadIndex = (currentIndex + 1) % playlist.length;
      loadVideo(nextVideo, preloadIndex).catch(() => {});
      
    } catch (err) {
      console.warn('Transition failed:', err);
      isTransitioning = false;
      // Skip to next video
      currentIndex = (currentIndex + 1) % playlist.length;
      performTransition();
    }
  }

  // Handle errors on both videos
  videoA.addEventListener("error", (e) => {
    console.warn("Video A failed:", e);
    if (activeVideo === videoA) {
      currentIndex = (currentIndex + 1) % playlist.length;
      performTransition();
    }
  });
  
  videoB.addEventListener("error", (e) => {
    console.warn("Video B failed:", e);
    if (activeVideo === videoB) {
      currentIndex = (currentIndex + 1) % playlist.length;
      performTransition();
    }
  });

  // Handle visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      videoA.pause();
      videoB.pause();
    } else {
      activeVideo.play().catch(() => {});
    }
  });

  // Start the player
  startPlayback();
}
