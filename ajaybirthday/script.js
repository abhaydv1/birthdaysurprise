// Load confetti library and trigger confetti burst on page load
window.onload = () => {
  loadConfettiLibrary().then(() => {
    startConfettiBurst(4000);
    startFloatingConfetti(100);
    revealGalleryImages();
  });
};

// Dynamically load confetti library
function loadConfettiLibrary() {
  return new Promise((resolve) => {
    if (window.confetti) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

// Burst confetti for given duration with nice parameters
function startConfettiBurst(duration) {
  const endTime = Date.now() + duration;

  const colors = ['#ff416c', '#ff4b2b', '#ffd6d6', '#ff9a9a', '#d94f49'];

  (function frame() {
    const timeLeft = endTime - Date.now();

    if (timeLeft <= 0) return;

    const particleCount = Math.floor(50 * (timeLeft / duration));

    window.confetti({
      particleCount,
      spread: 70,
      startVelocity: 40,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.4,
      },
      colors,
      shapes: ['circle', 'square'],
      gravity: 0.6,
      scalar: 1,
      drift: 0.3,
      zIndex: 1000,
    });

    requestAnimationFrame(frame);
  })();
}

// Create floating confetti pieces that gently fall and fade out
function startFloatingConfetti(count) {
  const colors = ['#ff416c', '#ff4b2b', '#ffd6d6', '#ff9a9a', '#d94f49'];
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const confettis = [];

  // Initialize confetti pieces
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    const size = randomRange(6, 12);
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.position = 'absolute';
    confetti.style.top = `${randomRange(-20, 100)}vh`;
    confetti.style.left = `${randomRange(0, 100)}vw`;
    confetti.style.opacity = Math.random() * 0.8 + 0.2;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.transform = `rotate(${randomRange(0, 360)}deg)`;
    confetti.style.transition = 'opacity 1s ease-out';
    container.appendChild(confetti);

    confettis.push({
      el: confetti,
      x: parseFloat(confetti.style.left),
      y: parseFloat(confetti.style.top),
      size,
      velocityY: randomRange(0.15, 0.5),
      velocityX: randomRange(-0.15, 0.15),
      rotation: randomRange(0, 360),
      rotationSpeed: randomRange(-3, 3),
      opacity: parseFloat(confetti.style.opacity),
      fade: Math.random() * 0.005 + 0.001,
    });
  }

  // Animate floating confetti
  function animate() {
    confettis.forEach((c) => {
      c.x += c.velocityX;
      c.y += c.velocityY;
      c.rotation += c.rotationSpeed;
      c.opacity -= c.fade;

      if (c.opacity <= 0 || c.y > 110) {
        // Reset confetti to top with new random params
        c.x = randomRange(0, 100);
        c.y = randomRange(-20, 0);
        c.opacity = Math.random() * 0.8 + 0.2;
        c.velocityY = randomRange(0.15, 0.5);
        c.velocityX = randomRange(-0.15, 0.15);
        c.rotation = randomRange(0, 360);
        c.rotationSpeed = randomRange(-3, 3);
        c.fade = Math.random() * 0.005 + 0.001;
      }

      c.el.style.left = `${c.x}vw`;
      c.el.style.top = `${c.y}vh`;
      c.el.style.opacity = c.opacity;
      c.el.style.transform = `rotate(${c.rotation}deg)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Reveal gallery images with smooth fade-in effect
function revealGalleryImages() {
  const galleryImages = document.querySelectorAll('.gallery img');

  galleryImages.forEach((img, i) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    img.style.transform = 'translateY(30px)';
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'translateY(0)';
    }, 300 * i);
  });
}

// Utility: random number between min and max
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
