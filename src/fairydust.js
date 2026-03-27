/**
 * Premium Magic Dust Effect
 * Creates elegant, drifting particles that react to mouse and add a luxury feel.
 */

class MagicDust {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];
        const count = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        const colors = ['#FF2DCD', '#8B5CF6', '#ffffff'];
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.5 + 0.2,
            growth: Math.random() * 0.01
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();
            
            // Movement
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Mouse interaction (gentle attraction)
            const dx = this.mouseX - p.x;
            const dy = this.mouseY - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 200) {
                p.x += dx * 0.001;
                p.y += dy * 0.001;
            }

            // Boundary wrap
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            // Flimmer effect
            p.opacity += (Math.random() - 0.5) * 0.02;
            p.opacity = Math.max(0.1, Math.min(0.7, p.opacity));
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MagicDust('fairydust-canvas');
});
