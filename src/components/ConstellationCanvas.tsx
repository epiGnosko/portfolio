import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
}

export const ConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();

    // Create particle fleet
    const particleCount = Math.floor(Math.min(width, 1400) / 16); // Responsive density
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseR = Math.random() * 1.5 + 1.0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: baseR,
        baseRadius: baseR,
        alpha: Math.random() * 0.4 + 0.3
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      mousePos.current.active = true;
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
      mousePos.current.x = -1000;
      mousePos.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseleave', handleMouseLeave);

    const maxDistance = 120;
    const mouseRadius = 160;

    // 60FPS continuous render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid overlay
      const gridSize = 48;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(64, 224, 208, 0.025)';
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const mouseActive = mousePos.current.active;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction: push / connect
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 2;
            p.x += (dx / (dist || 1)) * force;
            p.y += (dy / (dist || 1)) * force;
            p.radius = p.baseRadius * 1.5;
          } else {
            p.radius = p.baseRadius;
          }
        } else {
          p.radius = p.baseRadius;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(64, 224, 208, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(64, 224, 208, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearest neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(64, 224, 208, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect to mouse if close
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseRadius) {
            const lineAlpha = (1 - dist / mouseRadius) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(64, 224, 208, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
};
