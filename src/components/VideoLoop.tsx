"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Two stacked copies of the same clip crossfade into each other ~1s before
 * the end, so the loop never shows the hard cut-back-to-frame-1 that a bare
 * `loop` attribute produces on a non-loop-perfect generated clip.
 */
export function VideoLoop({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const [aOnTop, setAOnTop] = useState(true);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let switching = false;
    a.play().catch(() => {});

    function watch(
      playing: HTMLVideoElement,
      idle: HTMLVideoElement,
      bringIdleToTop: boolean,
    ) {
      const onTimeUpdate = () => {
        if (switching || !playing.duration) return;
        if (playing.currentTime >= playing.duration - 1) {
          switching = true;
          idle.currentTime = 0;
          idle.play().catch(() => {});
          setAOnTop(bringIdleToTop);
          window.setTimeout(() => {
            playing.pause();
            playing.currentTime = 0;
            switching = false;
          }, 900);
        }
      };
      playing.addEventListener("timeupdate", onTimeUpdate);
      return () => playing.removeEventListener("timeupdate", onTimeUpdate);
    }

    const cleanupA = watch(a, b, false);
    const cleanupB = watch(b, a, true);
    return () => {
      cleanupA();
      cleanupB();
    };
  }, []);

  return (
    <div className={`bg-ink ${className ?? ""}`}>
      {poster && (
        <Image
          src={poster}
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover"
        />
      )}
      <video
        ref={aRef}
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
        style={{ opacity: aOnTop ? 1 : 0 }}
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={bRef}
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
        style={{ opacity: aOnTop ? 0 : 1 }}
        muted
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
