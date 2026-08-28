"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";

const PHONE_FRAMES = [0.2, 2.2, 3.25, 4.3];
const WATCH_FRAMES = [0.2, 3.25, 5.25, 6.25];

export default function HomeHeroDevices() {
  const [count, setCount] = useState(0);
  const phoneRef = useRef<HTMLVideoElement>(null);
  const watchRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = [phoneRef.current, watchRef.current].filter(
      (video): video is HTMLVideoElement => Boolean(video)
    );

    let timer: number | undefined;
    let firstTick: number | undefined;

    const seek = (next: number) => {
      if (phoneRef.current?.readyState) phoneRef.current.currentTime = PHONE_FRAMES[next];
      if (watchRef.current?.readyState) watchRef.current.currentTime = WATCH_FRAMES[next];
    };

    const updatePlayback = () => {
      if (firstTick) window.clearTimeout(firstTick);
      if (timer) window.clearInterval(timer);
      videos.forEach((video) => {
        video.pause();
      });

      setCount(0);
      seek(0);
      const advance = () => {
        setCount((current) => {
          const next = (current + 1) % PHONE_FRAMES.length;
          seek(next);
          return next;
        });
      };

      firstTick = window.setTimeout(() => {
        advance();
        timer = window.setInterval(advance, 1800);
      }, 700);
    };

    updatePlayback();
    reduceMotion.addEventListener("change", updatePlayback);
    return () => {
      if (firstTick) window.clearTimeout(firstTick);
      if (timer) window.clearInterval(timer);
      reduceMotion.removeEventListener("change", updatePlayback);
    };
  }, []);

  return (
    <div className={styles.heroDevices} aria-label="SimplyStroke running on iPhone and Apple Watch">
      <div className={styles.heroHalo} aria-hidden="true" />
      <div className={styles.heroPhone}>
        <div className={styles.heroPhoneScreen}>
          <video
            ref={phoneRef}
            src="/videos/phone-active-round.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              event.currentTarget.pause();
              event.currentTarget.currentTime = PHONE_FRAMES[count];
            }}
            aria-label="A real SimplyStroke round counting strokes on iPhone"
          />
        </div>
      </div>
      <div className={styles.heroWatch}>
        <div className={styles.heroWatchFace}>
          <video
            ref={watchRef}
            src="/videos/watch-live-round.mp4"
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={(event) => {
              event.currentTarget.pause();
              event.currentTarget.currentTime = WATCH_FRAMES[count];
            }}
            aria-label="A real SimplyStroke round counting strokes on Apple Watch"
          />
        </div>
      </div>
    </div>
  );
}
