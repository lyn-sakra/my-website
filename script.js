
function lightningEffect() {
  const lightning = document.querySelector('.storm .lightning');
  setInterval(() => {
    lightning.style.opacity = '0.8';
    setTimeout(() => lightning.style.opacity = '0', 100);
  }, 4000 + Math.random() * 4000);
}

function showGiftSection() {
  const giftSection = document.querySelector('.gift');
  giftSection.style.display = 'block'; // Show the gift section on moon click
}

function generateStars(count = 80) {
  const starsContainer = document.querySelector('.night .stars');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    starsContainer.appendChild(star);
  }
}

function generateRain(count = 60) {
    const stormSection = document.querySelector('.storm');
    for (let i = 0; i < count; i++) {
      const drop = document.createElement('div');
      drop.classList.add('raindrop');
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.top = `${Math.random() * 100}vh`;
      drop.style.animationDuration = `${0.8 + Math.random() * 0.5}s`;
      drop.style.animationDelay = `${Math.random() * 3}s`;
      drop.style.position = 'absolute';
      drop.style.zIndex = 1;
      stormSection.appendChild(drop);
    }
  }
  

document.addEventListener("DOMContentLoaded", () => {
    generateRain();
  });
  

document.addEventListener('DOMContentLoaded', () => {
  lightningEffect();
  generateStars(80);
});

document.addEventListener("DOMContentLoaded", () => {
  const moon = document.querySelector(".moon");
  const overlay = document.querySelector(".gift-popup-overlay");
  const content = document.querySelector(".gift-content");
  const closeBtn = document.getElementById("close-gift");
  const audio = new Audio("hiddenMusic.mp3");

  moon.style.cursor = "pointer";

  moon.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    audio.play();

    // 🎉 Confetti burst on moon click
    // confetti({
    //   particleCount: 150,
    //   spread: 120,
    //   origin: { y: 0.6 },
    // });

    // Classic center-top burst
confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 } });

// Side bursts (like celebration walls)
confetti({ particleCount: 40, spread: 70, origin: { x: 0.1, y: 0.6 } });
confetti({ particleCount: 40, spread: 70, origin: { x: 0.9, y: 0.6 } });


    // Reveal content after delay
    setTimeout(() => {
      content.classList.remove("hidden");
      content.classList.add("show");
    }, 1500);
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    content.classList.add("hidden");
    content.classList.remove("show");
    audio.pause();
    audio.currentTime = 0;
  });
});




// Existing confetti or intro overlay logic (unchanged)
window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");
  if (overlay) {
    document.addEventListener("click", () => {
      overlay.style.display = "none";
    }, { once: true });
  }

  // Music and popup logic starts here
  const backgroundMusic = document.getElementById("backgroundMusic");
  const hiddenMusic = document.getElementById("hiddenMusic");
  const giftPopupOverlay = document.querySelector(".gift-popup-overlay");
  const moon = document.querySelector(".moon");
  const closeGiftBtn = document.getElementById("close-gift");
  const giftContent = document.querySelector(".gift-content");

  let backgroundMusicWasPlaying = false;
  let hasUserInteracted = false;

  // Play background music once user interacts
  const startMusicOnInteraction = () => {
    if (!hasUserInteracted) {
      hasUserInteracted = true;
      if (backgroundMusic) {
        backgroundMusic.play().catch(() => {
          console.warn("Autoplay blocked, user interaction needed.");
        });
      }
    }
  };
  document.addEventListener("click", startMusicOnInteraction, { once: true });

  // Moon click → open gift popup, pause background music, play hidden music
  moon?.addEventListener("click", () => {
    if (!giftPopupOverlay || !giftContent) return;
  
    if (backgroundMusic && !backgroundMusic.paused) {
      backgroundMusic.pause();
      backgroundMusicWasPlaying = true;
    } else {
      backgroundMusicWasPlaying = false;
    }
  
    giftPopupOverlay.classList.remove("hidden");
    giftContent.classList.remove("hidden");
  
    if (hiddenMusic && hiddenMusic.paused) {
      hiddenMusic.currentTime = 0;
      hiddenMusic.play().catch(() => {});
    }
  });
  

  // Close popup → stop hidden music, resume background music
  closeGiftBtn?.addEventListener("click", () => {
    if (hiddenMusic) {
      hiddenMusic.pause();
      hiddenMusic.currentTime = 0;
    }

    if (giftPopupOverlay && giftContent) {
      giftPopupOverlay.classList.add("hidden");
      giftContent.classList.add("hidden");
    }

    if (backgroundMusicWasPlaying && backgroundMusic) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(() => {});
    }
  });
});

