"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";

const benefits = [
  {
    title: "Tap once after every shot",
    copy: "Your current number stays large and visible, so you never have to reconstruct the hole in your head.",
  },
  {
    title: "Fix a mistake without leaving the screen",
    copy: "Undo a stroke, add a penalty, or correct the hole count in seconds.",
  },
  {
    title: "Get the complete scorecard",
    copy: "SimplyStroke totals every hole and saves a clean scorecard when the round is done.",
  },
] as const;

export default function HomeBenefitsStory() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [inView, setInView] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(story);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % benefits.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [cycle, inView]);

  const selectBenefit = (index: number) => {
    setActive(index);
    setCycle((current) => current + 1);
  };

  return (
    <div ref={storyRef} className={`${styles.wrap} ${styles.simpleLayout}`}>
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>Simple on purpose</p>
        <h2 className={styles.wrappedHeadline}>
          <span>The count, the card,</span>
          <span>and nothing in the way.</span>
        </h2>
        <p className={styles.lede}>
          No yardage maps, club recommendations, swing analysis, or setup maze.
          Just the controls you need to record the shot, correct the score, and
          finish the round.
        </p>
        <Link href="/compare/" className={styles.textLink}>
          See how it compares to the big golf apps <span aria-hidden="true">→</span>
        </Link>
        <span className={styles.simpleSketch} aria-hidden="true">
          {benefits.map((benefit, index) => (
            <span className={styles.simpleSketchSegment} key={benefit.title}>
              <b className={index === active ? styles.simpleSketchActive : index < active ? styles.simpleSketchDone : ""}>
                {index + 1}
              </b>
              {index < benefits.length - 1 ? <i className={index < active ? styles.simpleSketchLineDone : ""} /> : null}
            </span>
          ))}
          <em className={active === benefits.length - 1 ? styles.simpleSketchActive : ""}>✓</em>
        </span>
      </div>

      <div className={styles.editorialBenefits} role="tablist" aria-label="Why golfers use SimplyStroke">
        {benefits.map((benefit, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? styles.editorialBenefitActive : styles.editorialBenefit}
            onClick={() => selectBenefit(index)}
            key={benefit.title}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong>{benefit.title}</strong>
              <small>{benefit.copy}</small>
            </span>
            {active === index ? <i key={`${index}-${cycle}`} className={styles.benefitProgress} aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
