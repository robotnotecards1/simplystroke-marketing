import Image from "next/image";
import styles from "@/app/home.module.css";

const steps = [
  {
    title: "Start with friends",
    copy: "Choose With Friends when you start the round.",
    image: "/images/group-flow/mode-phone.png",
    width: 390,
    height: 720,
    alt: "The real SimplyStroke new-round screen with Just Me and With Friends choices",
  },
  {
    title: "One live card",
    copy: "The shared code puts the whole group on one live scorecard.",
    image: "/images/group-flow/live-phone-crisp.png",
    width: 1012,
    height: 2196,
    alt: "The real SimplyStroke live group scorecard showing four golfers",
  },
  {
    title: "Everyone taps",
    copy: "Each golfer counts on the round screen while the live card updates itself.",
    image: "/images/hero-devices/phone-1.jpg",
    width: 460,
    height: 1000,
    alt: "The real SimplyStroke active-round screen with one stroke and the scorecard strip",
  },
] as const;

export default function HomeGroupStory() {
  return (
    <ol className={styles.groupSequence} aria-label="How group rounds work">
      {steps.map((step, index) => (
        <li className={styles.groupSequenceStep} key={step.title}>
          <div className={styles.groupSequenceCopy}>
            <span className={styles.groupSequenceKicker}>
              <b>{index + 1}</b>
              Step {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </div>

          <div className={styles.groupSequencePhone}>
            <div className={styles.groupSequenceDisplay}>
              <Image
                src={step.image}
                alt={step.alt}
                width={step.width}
                height={step.height}
                sizes="(max-width: 820px) 240px, 230px"
                className={styles.groupSequenceShot}
                unoptimized
              />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
