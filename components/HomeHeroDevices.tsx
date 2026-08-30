"use client";

import { useEffect, useState } from "react";
import HomeDeviceScreen, { MAX_DEMO_STROKES } from "@/components/HomeDeviceScreen";
import styles from "@/app/home.module.css";

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
        setCount((current) => (current + 1) % (MAX_DEMO_STROKES + 1));
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
          <HomeDeviceScreen device="phone" count={count} />
        </div>
      </div>
      <div className={styles.heroWatch}>
        <div className={styles.heroWatchFace}>
          <HomeDeviceScreen device="watch" count={count} />
        </div>
      </div>
    </div>
  );
}
