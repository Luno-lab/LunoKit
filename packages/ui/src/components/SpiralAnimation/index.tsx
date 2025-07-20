import React, { useEffect, useRef } from 'react';
import {cs} from '../../utils'

export interface SpiralAnimationProps {
  size?: number;
  dotCount?: number;
  duration?: number;
  className?: string;
}

export const SpiralAnimation: React.FC<SpiralAnimationProps> = ({
  size = 160,
  dotCount = 300,
  duration = 3,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const DOT_RADIUS = 1;
    const MARGIN = 2;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const CENTER = size / 2;
    const MAX_RADIUS = CENTER - MARGIN - DOT_RADIUS;
    const svgNS = "http://www.w3.org/2000/svg";

    containerRef.current.innerHTML = '';

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", size.toString());
    svg.setAttribute("height", size.toString());
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svg.style.display = 'block';

    containerRef.current.appendChild(svg);

    for (let i = 0; i < dotCount; i++) {
      const idx = i + 0.5;
      const frac = idx / dotCount;
      const r = Math.sqrt(frac) * MAX_RADIUS;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", x.toString());
      circle.setAttribute("cy", y.toString());
      circle.setAttribute("r", DOT_RADIUS.toString());
      circle.setAttribute("fill", "currentColor");
      circle.setAttribute("opacity", "0.6");
      svg.appendChild(circle);

      const animR = document.createElementNS(svgNS, "animate");
      animR.setAttribute("attributeName", "r");
      animR.setAttribute(
        "values",
        `${DOT_RADIUS * 0.5};${DOT_RADIUS * 1.8};${DOT_RADIUS * 0.5}`
      );
      animR.setAttribute("dur", `${duration}s`);
      animR.setAttribute("begin", `${frac * duration}s`);
      animR.setAttribute("repeatCount", "indefinite");
      animR.setAttribute("calcMode", "spline");
      animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      circle.appendChild(animR);

      const animO = document.createElementNS(svgNS, "animate");
      animO.setAttribute("attributeName", "opacity");
      animO.setAttribute("values", "0.2;1;0.2");
      animO.setAttribute("dur", `${duration}s`);
      animO.setAttribute("begin", `${frac * duration}s`);
      animO.setAttribute("repeatCount", "indefinite");
      animO.setAttribute("calcMode", "spline");
      animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      circle.appendChild(animO);
    }
  }, [size, dotCount, duration]);

  return (
    <div
      ref={containerRef}
      className={cs('text-accentColor inline-flex w-full h-full justify-center align-center', className)}
    />
  );
};
