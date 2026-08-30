"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TrackedCta from "@/components/TrackedCta";
import { trackHomepageEvent } from "@/lib/analytics";
import { APP_STORE_URL } from "@/lib/site";
import styles from "@/app/home.module.css";

function statusCopy(count: number): string {
  if (count === 0) return "Your stroke count: 0";
  if (count === 1) return "1 stroke. Zero math.";
  if (count === 2) return "That’s pretty much the whole app—which is the point.";
  return `${count} strokes. The number stays here.`;
}

const DEVICE_STATES = [0, 1, 2] as const;

export default function HomeDemo() {
  const [count, setCount] = useState(0);
  const [autoGuiding, setAutoGuiding] = useState(true);
  const [inView, setInView] = useState(false);
  const started = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.34 }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const countStroke = () => {
    setAutoGuiding(false);
    if (!started.current) {
      started.current = true;
      trackHomepageEvent("homepage_demo_started");
    }
    setCount((current) => {
      const next = Math.min(DEVICE_STATES.length - 1, current + 1);
      trackHomepageEvent("homepage_demo_stroke_logged", { stroke_count: next });
      return next;
    });
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(12);
    }
  };

  const undo = () => {
    if (count === 0) return;
    setAutoGuiding(false);
    setCount((current) => {
      const next = Math.max(0, current - 1);
      trackHomepageEvent("homepage_demo_undo_used", { stroke_count: next });
      return next;
    });
  };

  return (
    <div ref={stageRef} className={styles.demoStage}>
      <div className={styles.demoCopy}>
        <p className={styles.eyebrow}>Try the whole idea</p>
        <h2>Go ahead. Count a stroke.</h2>
        <p className={styles.lede}>
          Tap the ball like you would after a shot. No form. No math. No tiny
          scorecard boxes.
        </p>
        <div className={styles.demoStatus} aria-live="polite" aria-atomic="true">
          <span>{statusCopy(count)}</span>
        </div>
      </div>

      <div className={styles.demoDevices}>
        <div className={styles.demoPhone}>
          <div className={styles.demoPhoneScreen}>
            {DEVICE_STATES.map((state) => (
              <Image
                key={state}
                src={`/images/hero-devices/phone-${state}.jpg`}
                alt={state === count ? `Real SimplyStroke iPhone scoring screen showing ${state} ${state === 1 ? "stroke" : "strokes"}` : ""}
                width={460}
                height={1000}
                loading="eager"
                unoptimized
                className={state === count ? styles.deviceFrameActive : styles.deviceFrame}
              />
            ))}
            <button
              type="button"
              className={styles.demoBallTarget}
              onClick={countStroke}
              onPointerUp={(event) => event.currentTarget.blur()}
              aria-label={`Count this stroke. Current count ${count}`}
            ><span className={styles.srOnly}>Count this stroke</span></button>
            <button
              type="button"
              className={styles.demoUndoTarget}
              onClick={undo}
              disabled={count === 0}
              aria-label="Undo the last stroke"
            ><span className={styles.srOnly}>Undo the last stroke</span></button>
            {inView && autoGuiding ? (
              <>
                <span className={styles.demoTryHint} aria-hidden="true">Try it now ↓</span>
                <span className={`${styles.demoPointer} ${styles.demoPointerPersistent}`} aria-hidden="true">
                  <svg viewBox="0 0 144 160">
                    <path
                      className={styles.demoHandBody}
                      d="M52 150c-3-14-9-28-19-39L14 91c-6-6-6-14-1-19 6-6 14-5 20 1l15 15V38c0-9 6-15 14-15s14 6 14 15v42-24c0-8 6-14 14-14s14 6 14 14v28-20c0-8 6-14 14-14s14 6 14 14v28-17c0-8 5-14 12-14s12 6 12 14v24c0 21-8 37-16 51H52Z"
                    />
                    <path className={styles.demoHandRays} d="M29 29 15 20M42 15 34 2M62 10V0M82 15 91 2" />
                  </svg>
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div className={styles.demoWatch}>
          <div className={styles.demoWatchScreen}>
            {DEVICE_STATES.map((state) => (
              <Image
                key={state}
                src={`/images/hero-devices/watch-${state}.jpg`}
                alt={state === count ? `Real SimplyStroke Apple Watch scoring screen showing ${state} ${state === 1 ? "stroke" : "strokes"}` : ""}
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

      <TrackedCta
        event="app_store_click"
        ctaLocation="home_demo"
        href={APP_STORE_URL}
        className={`${styles.primaryCta} ${styles.demoCta}`}
      >
        Get it on my iPhone →
      </TrackedCta>
    </div>
  );
}
