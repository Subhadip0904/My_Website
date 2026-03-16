import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  isDarkMode?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDarkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      isHovering = false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      active: boolean;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 150;
        this.opacity = 0.4;
        this.active = true;
      }

      update() {
        this.radius += 2;
        this.opacity = Math.max(0, 0.4 * (1 - this.radius / this.maxRadius));
        if (this.radius >= this.maxRadius) {
          this.active = false;
        }
      }

      draw() {
        if (!ctx || !this.active) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(6, 182, 212, 0)`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    let ripples: Ripple[] = [];
    let lastRippleTime = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseVx = (Math.random() - 0.5) * 0.5;
        this.baseVy = (Math.random() - 0.5) * 0.5;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.vx += (dx / distance) * force * 0.03;
          this.vy += (dy / distance) * force * 0.03;
        } else {
          this.vx += (this.baseVx - this.vx) * 0.02;
          this.vy += (this.baseVy - this.vy) * 0.02;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
          this.baseVx *= -1;
          this.x = Math.max(0, Math.min(this.x, canvas.width));
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
          this.baseVy *= -1;
          this.y = Math.max(0, Math.min(this.y, canvas.height));
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(6, 182, 212, 0.6)';
        ctx.fill();
      }
    }

    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 30 : 80;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Opacity is inversely proportional to distance: max 0.15 at distance 0, fading to 0 at distance 80
            const maxOpacity = isDarkMode ? 0.15 : 0.4;
            const opacity = maxOpacity * (1 - distance / 80);
            ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isDarkMode) {
        // Dark mode background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(10, 10, 15, 1)');
        gradient.addColorStop(0.5, 'rgba(15, 20, 30, 1)');
        gradient.addColorStop(1, 'rgba(5, 10, 15, 1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Vibrant Light Mode Mesh Background
        ctx.fillStyle = '#f8fafc'; // slate-50 base
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animated Mesh gradient blobs
        const time = Date.now() * 0.001;
        const drawBlob = (x: number, y: number, r: number, color: string) => {
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
          grad.addColorStop(0, color);
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        drawBlob(canvas.width * 0.2 + Math.sin(time) * 150, canvas.height * 0.3 + Math.cos(time) * 150, 600, 'rgba(167, 139, 250, 0.4)'); // purple
        drawBlob(canvas.width * 0.8 + Math.cos(time) * 150, canvas.height * 0.7 + Math.sin(time) * 150, 600, 'rgba(45, 212, 191, 0.4)'); // teal
        drawBlob(canvas.width * 0.5 + Math.sin(time * 0.5) * 200, canvas.height * 0.5 + Math.cos(time * 0.5) * 200, 800, 'rgba(56, 189, 248, 0.3)'); // sky blue

        // Highly visible futuristic grid
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.1)'; // Darker grid lines for visibility
        ctx.lineWidth = 1;
        const gridSize = 40;
        
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
        }
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();

        // Add glowing dots at intersections
        ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
        for (let x = 0; x <= canvas.width; x += gridSize) {
          for (let y = 0; y <= canvas.height; y += gridSize) {
            if ((x * 13 + y * 7) % 100 > 90) { 
              ctx.beginPath();
              ctx.arc(x, y, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw ripples
      if (isHovering && mouse.x !== -1000) {
        const now = Date.now();
        if (now - lastRippleTime > 300) {
          ripples.push(new Ripple(mouse.x, mouse.y));
          lastRippleTime = now;
        }
      }

      ripples.forEach(r => {
        r.update();
        r.draw();
      });
      ripples = ripples.filter(r => r.active);

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 transition-colors duration-300"
    />
  );
};
