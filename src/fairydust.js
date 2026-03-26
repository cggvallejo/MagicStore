// Disney Character Sprites for Particles
const DISNEY_SPRITES = [
  'https://img.icons8.com/color/96/mickey-mouse.png',
  'https://img.icons8.com/color/96/minnie-mouse.png',
  'https://img.icons8.com/color/96/donald-duck.png',
  'https://img.icons8.com/color/96/stitch.png',
  'https://img.icons8.com/color/96/winnie-the-pooh.png'
];

function createDisneyParticles() {
  const container = document.getElementById('fairy-dust');
  if (!container) return;

  // Clear existing particles
  container.innerHTML = '';

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'disney-particle';
    
    // Random sprite
    const sprite = DISNEY_SPRITES[Math.floor(Math.random() * DISNEY_SPRITES.length)];
    p.style.backgroundImage = `url('${sprite}')`;
    
    // Random position
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    
    // Dynamic variables for CSS animation
    const duration = 10 + Math.random() * 20; // 10-30s
    const size = 30 + Math.random() * 40; // 30-70px
    const tx = (Math.random() - 0.5) * 400; // -200 to 200px move
    const ty = (Math.random() - 0.5) * 400;
    const rot = (Math.random() - 0.5) * 360; // Random rotation
    
    p.style.setProperty('--duration', `${duration}s`);
    p.style.setProperty('--size', `${size}px`);
    p.style.setProperty('--tx', `${tx}px`);
    p.style.setProperty('--ty', `${ty}px`);
    p.style.setProperty('--rot', `${rot}deg`);
    
    p.style.animationDelay = (Math.random() * -duration) + 's';
    
    container.appendChild(p);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createDisneyParticles();
});

