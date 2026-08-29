"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";

const DEVICE_STATES = [0, 1, 2, 3] as const;

export default function HomeHeroDevices() {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const devicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const devices = devicesRef.current;
    if (!devices) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.12 }
    );

    observer.observe(devices);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let timer: number | undefined;
    let firstTick: number | undefined;

    const updatePlayback = () => {
      if (firstTick) window.clearTimeout(firstTick);
      if (timer) window.clearInterval(timer);

      setCount(0);
      if (reduceMotion.matches) return;
      const advance = () => {
        setCount((current) => (current + 1) % DEVICE_STATES.length);
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
  }, [inView]);

  return (
    <div ref={devicesRef} className={styles.heroDevices} aria-label="SimplyStroke running on iPhone and Apple Watch">
      <div className={styles.heroHalo} aria-hidden="true" />
      <div className={styles.heroPhone}>
        <div className={styles.heroPhoneScreen}>
          {DEVICE_STATES.map((state) => (
            <Image
              key={state}
              src={`/images/hero-devices/phone-${state}.jpg`}
              alt={state === count ? `SimplyStroke iPhone scoring screen showing ${state} ${state === 1 ? "stroke" : "strokes"}` : ""}
              width={460}
              height={1000}
              loading="eager"
              unoptimized
              className={state === count ? styles.deviceFrameActive : styles.deviceFrame}
            />
          ))}
        </div>
      </div>
      <div className={styles.heroWatch}>
        <div className={styles.heroWatchFace}>
          {DEVICE_STATES.map((state) => (
            <Image
              key={state}
              src={`/images/hero-devices/watch-${state}.jpg`}
              alt={state === count ? `SimplyStroke Apple Watch scoring screen showing ${state} ${state === 1 ? "stroke" : "strokes"}` : ""}
              width={416}
              height={496}
              loading="eager"
              unoptimized
              className={state === count ? styles.deviceFrameActive : styles.deviceFrame}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
