"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * Pointer-aware volumetric stage — the signature interactive object treatment.
 * Cursor offset from viewport center lerps toward a target each frame (0.08),
 * eased through smoothstep, driving rotateX/rotateY on a preserve-3d stack.
 * A slow idle drift keeps the object alive even without pointer input.
 */
export function TiltStage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let idle = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.x = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
      target.y = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));
    };
    if (canHover) window.addEventListener("pointermove", onMove);

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      idle += 0.0016;
      const el = stageRef.current;
      if (el) {
        const rotY = smoothstep(Math.abs(current.x)) * Math.sign(current.x) * 15;
        const rotX = -smoothstep(Math.abs(current.y)) * Math.sign(current.y) * 12;
        const floatY = Math.sin(idle) * 6;
        el.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(${floatY.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className={className} style={{ perspective: 1350 }}>
      <div
        ref={stageRef}
        className="h-full w-full"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}
