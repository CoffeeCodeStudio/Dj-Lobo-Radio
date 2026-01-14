import { useEffect, useRef } from "react";

const AnimatedMeshBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear with slight fade for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create flowing mesh gradient
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time * 0.0003) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.0004) * 80,
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.5
      );
      gradient1.addColorStop(0, "hsla(270, 80%, 25%, 0.15)");
      gradient1.addColorStop(0.5, "hsla(280, 70%, 20%, 0.08)");
      gradient1.addColorStop(1, "transparent");

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.0002) * 120,
        canvas.height * 0.6 + Math.sin(time * 0.0003) * 100,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.6
      );
      gradient2.addColorStop(0, "hsla(220, 80%, 25%, 0.12)");
      gradient2.addColorStop(0.5, "hsla(240, 70%, 18%, 0.06)");
      gradient2.addColorStop(1, "transparent");

      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.00025) * 80,
        canvas.height * 0.8 + Math.cos(time * 0.00035) * 60,
        0,
        canvas.width * 0.5,
        canvas.height * 0.8,
        canvas.width * 0.4
      );
      gradient3.addColorStop(0, "hsla(300, 60%, 20%, 0.1)");
      gradient3.addColorStop(0.5, "hsla(290, 50%, 15%, 0.05)");
      gradient3.addColorStop(1, "transparent");

      // Draw gradients
      ctx.globalCompositeOperation = "screen";
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";

      if (!prefersReducedMotion) {
        time += 16;
      }
      
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
};

export default AnimatedMeshBackground;
