import Image from "next/image";
import styles from "@/app/home.module.css";

const steps = [
  {
    title: "Start with friends",
    copy: "Choose With Friends when you start the round.",
    kind: "image",
    image: "/images/group-flow/mode-phone-current-2x.png",
    width: 860,
    height: 1440,
    alt: "The SimplyStroke iPhone new-round screen with Just Me and With Friends choices",
  },
  {
    title: "Share one code",
    copy: "Your group gets one link or six-character code.",
    kind: "lobby",
  },
  {
    title: "Everyone taps",
    copy: "Each golfer counts their own ball. The live card updates itself.",
    kind: "image",
    image: "/images/group-flow/live-phone-crisp.png",
    width: 1012,
    height: 2196,
    alt: "The SimplyStroke iPhone live group scorecard showing every golfer",
  },
] as const;

function GroupLobbyScreen() {
  return (
    <div className={styles.groupAppScreen} aria-label="SimplyStroke iPhone group lobby with a share code">
      <div className={styles.groupPhoneStatus}><span>7:48</span><i /><span>••• ◉ ▰</span></div>
      <div className={styles.groupPlainHeader}><span>←</span><b>GROUP ROUND</b><span>☰</span></div>
      <div className={styles.groupAppBody}>
        <strong className={styles.groupScreenTitle}>Group round</strong>
        <small>Skip the course, just count</small>
        <div className={styles.groupCodeCard}>
          <span>JOIN CODE</span>
          <strong>DEMO24</strong>
          <div><b>COPY CODE</b><b>SHARE</b></div>
        </div>
        <p className={styles.groupRosterLabel}>PLAYERS (3)</p>
        <div className={styles.groupRoster}>
          <span><i />Jed (you)</span>
          <span><i />Mike</span>
          <span><i />Danny</span>
        </div>
        <b className={styles.groupStartButton}>START ROUND →</b>
      </div>
    </div>
  );
}

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
              {step.kind === "image" ? (
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  sizes="(max-width: 820px) 240px, 230px"
                  className={styles.groupSequenceShot}
                  unoptimized
                />
              ) : <GroupLobbyScreen />}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
