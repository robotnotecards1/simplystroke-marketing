"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/app/home.module.css";

const DEVICE_STATES = [0, 1, 2] as const;

export default function HomeHeroDevices() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer: number | undefined;
    let firstTick: number | undefined;
    let started = false;

    const startPlayback = () => {
      if (started) return;
      started = true;
      setCount(0);
      const advance = () => {
        setCount((current) => (current + 1) % DEVICE_STATES.length);
      };

      firstTick = window.setTimeout(() => {
        advance();
        timer = window.setInterval(advance, 1800);
      }, 700);
    };

    if (document.readyState === "complete") {
      startPlayback();
    } else {
      window.addEventListener("load", startPlayback, { once: true });
    }

    return () => {
      if (firstTick) window.clearTimeout(firstTick);
      if (timer) window.clearInterval(timer);
      window.removeEventListener("load", startPlayback);
    };
  }, []);

  return (
    <div className={styles.heroDevices} aria-label="SimplyStroke running on iPhone and Apple Watch">
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
