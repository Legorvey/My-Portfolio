'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The text string to render in both base and spotlight layers. */
  text?: string;
  /** Custom children to render in both layers if text is not a simple string. */
  children?: React.ReactNode;
  /** Shared styling applied to both text layers (sizing, tracking, leading). */
  textClassName?: string;
  /** Classes specific to the base (unfocused/dim) text layer. */
  baseClassName?: string;
  /** Inline style overrides for the base layer. */
  baseStyle?: React.CSSProperties;
  /** Classes specific to the spotlight (illuminated/focused) text layer. */
  spotlightClassName?: string;
  /** Inline style overrides for the spotlight layer. */
  spotlightStyle?: React.CSSProperties;
  /** Radius of the spotlight beam in pixels (default: 160). */
  spotlightSize?: number;
  /** Falloff/softness area in pixels or percent (default: 80). */
  spotlightArea?: number;
  /** Optional custom RGB color string (e.g. "255, 255, 255") for glow or inline tint. */
  spotlightColor?: string;
  /** Automatically sweep light on touch-only devices without fine cursor. */
  animateOnPhone?: boolean;
}

export function TextSpotlight({
  text,
  children,
  className,
  textClassName,
  baseClassName = 'text-muted-foreground/45',
  baseStyle,
  spotlightClassName = 'text-foreground',
  spotlightStyle,
  spotlightSize = 160,
  spotlightArea = 70,
  spotlightColor,
  animateOnPhone = true,
  ...props
}: TextSpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = React.useState(false);

  // Check pointer capability (coarse = touch device, fine = mouse)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: coarse)');
    setIsCoarsePointer(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsCoarsePointer(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Autonomous sweep for mobile/touch screens when animateOnPhone is enabled
  React.useEffect(() => {
    if (!animateOnPhone || !isCoarsePointer) return;

    let rafId: number;
    let startTime: number | null = null;
    const cycleDuration = 4800; // 4.8s sweep cycle

    const loop = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % cycleDuration) / cycleDuration;
      // Sine wave oscillation back and forth across container width
      const width = containerRef.current?.clientWidth ?? 300;
      const height = containerRef.current?.clientHeight ?? 80;
      const norm = (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2;

      setPosition({
        x: norm * width,
        y: height / 2,
      });
      setIsHovered(true);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [animateOnPhone, isCoarsePointer]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(e);
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    if (!isCoarsePointer) {
      setIsHovered(false);
    }
  };

  const content = text ?? children;

  const maskStyle: React.CSSProperties = {
    maskImage: isHovered
      ? `radial-gradient(circle ${spotlightSize}px at ${position.x}px ${position.y}px, black ${spotlightArea}%, transparent 100%)`
      : 'radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)',
    WebkitMaskImage: isHovered
      ? `radial-gradient(circle ${spotlightSize}px at ${position.x}px ${position.y}px, black ${spotlightArea}%, transparent 100%)`
      : 'radial-gradient(circle 0px at 0px 0px, black 0%, transparent 100%)',
    color: spotlightColor ? `rgb(${spotlightColor})` : undefined,
    ...spotlightStyle,
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn('relative inline-block select-none cursor-default', className)}
      {...props}
    >
      {/* Base Layer: Dimmed or Wireframe Text */}
      <div
        className={cn('transition-colors duration-300', textClassName, baseClassName)}
        style={baseStyle}
      >
        {content}
      </div>

      {/* Spotlight Layer: Masked High-Contrast Illuminated Text */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 select-none transition-opacity duration-300',
          textClassName,
          spotlightClassName,
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        style={maskStyle}
      >
        {content}
      </div>
    </div>
  );
}
