import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

export function ShootingStars({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = '#9E00FF',
  trailColor = '#2EB9DF',
  starWidth = 10,
  starHeight = 1,
  className,
}: ShootingStarsProps) {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const createStar = () => {
      const newStar: ShootingStar = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight / 2),
        angle: 215 + Math.random() * 20,
        scale: 1,
        speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
        distance: 0,
      };
      setStar(newStar);

      const maxDistance = window.innerWidth;
      const duration = (maxDistance / newStar.speed) * 16;

      setTimeout(() => setStar(null), duration);
    };

    const scheduleNext = () => {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      return setTimeout(() => {
        createStar();
        timerId = scheduleNext();
      }, delay);
    };

    let timerId = scheduleNext();
    return () => clearTimeout(timerId);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    if (!star) return;
    const svg = svgRef.current;
    if (!svg) return;

    let animationFrame: number;
    let currentStar = { ...star };

    const moveStar = () => {
      const rad = (currentStar.angle * Math.PI) / 180;
      currentStar.x += Math.cos(rad) * currentStar.speed * 0.5;
      currentStar.y += Math.sin(rad) * currentStar.speed * 0.5;
      currentStar.distance += currentStar.speed * 0.5;
      currentStar.scale = 1 + currentStar.distance / 200;

      if (
        currentStar.x < -100 ||
        currentStar.x > window.innerWidth + 100 ||
        currentStar.y < -100 ||
        currentStar.y > window.innerHeight + 100
      ) {
        return;
      }

      setStar({ ...currentStar });
      animationFrame = requestAnimationFrame(moveStar);
    };

    animationFrame = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animationFrame);
  }, [star?.id]);

  return (
    <svg ref={svgRef} className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}>
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#shootingStarGradient)"
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id="shootingStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface StarsBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export function StarsBackground({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}: StarsBackgroundProps) {
  const [stars, setStars] = useState<Array<{ x: number; y: number; radius: number; opacity: number; twinkleSpeed: number | null }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateStars = () => {
      const area = window.innerWidth * window.innerHeight;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) : null,
        };
      });
    };
    setStars(generateStars());
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stars.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.twinkleSpeed ? 0.3 + Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.7) : star.opacity})`;
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [stars]);

  return <canvas ref={canvasRef} className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />;
}
