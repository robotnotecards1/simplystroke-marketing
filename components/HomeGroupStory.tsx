import Image from "next/image";
import styles from "@/app/home.module.css";

const steps = [
  {
    title: "Start with friends",
    copy: "Choose With Friends when you start the round.",
    kind: "mode",
  },
  {
    title: "Share one code",
    copy: "Your group gets one link or six-character code.",
    kind: "lobby",
  },
  {
    title: "Everyone taps",
    copy: "Each golfer counts on the round screen while the live card updates itself.",
    kind: "image",
    image: "/images/app-screens/round.png",
    width: 270,
    height: 540,
    alt: "The SimplyStroke active-round screen with the stroke counter and live scorecard strip",
  },
] as const;

function GroupModeScreen() {
  return (
    <div className={`${styles.groupAppScreen} ${styles.groupModeScreen}`} aria-label="SimplyStroke iPhone new-round screen with With Friends selected">
      <div className={styles.groupAppHeader}>
        <span>←</span>
        <strong>New round</strong>
        <small>How are you playing today?</small>
      </div>
      <div className={styles.groupModeOptions}>
        <div>
          <i aria-hidden="true">●</i>
          <p><strong>Just me</strong><span>Track your own strokes, solo.</span></p>
          <b aria-hidden="true">›</b>
        </div>
        <div className={styles.groupChosen}>
          <i aria-hidden="true">▤</i>
          <p><strong>With friends</strong><span>Share a code—everyone&apos;s scores on one live card.</span></p>
          <b aria-hidden="true">›</b>
        </div>
      </div>
    </div>
  );
}

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
              ) : step.kind === "mode" ? <GroupModeScreen /> : <GroupLobbyScreen />}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
