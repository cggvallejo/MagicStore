import { initChatbot } from './chatbot.js';

initChatbot();

// Background animation
const magicBg = document.querySelector('.magic-bg');
let angle = 0;
function animate() {
  angle += 0.01;
  if(magicBg) magicBg.style.backgroundPosition = `${50 - Math.sin(angle)*2}% 50%`;
  requestAnimationFrame(animate);
}
animate();
