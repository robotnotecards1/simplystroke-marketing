import styles from "@/app/home.module.css";

const steps = [
  {
    title: "Start with friends",
    copy: "Choose With Friends when you start the round.",
  },
  {
    title: "Share one code",
    copy: "Send one link or six-character code to the group.",
  },
  {
    title: "Everyone taps",
    copy: "Each golfer counts their shots. The live card does the group math.",
  },
] as const;

function ModeIllustration() {
  return (
    <div className={`${styles.groupDiagram} ${styles.groupModeDiagram}`} aria-hidden="true">
      <div className={styles.groupDiagramBar}>
        <strong>New round</strong>
        <span>Choose a mode</span>
      </div>
      <div className={styles.groupModeRow}>
        <b>1</b>
        <span><strong>Just me</strong><small>Solo scorecard</small></span>
      </div>
      <div className={`${styles.groupModeRow} ${styles.groupModeRowActive}`}>
        <b>4</b>
        <span><strong>With friends</strong><small>One shared card</small></span>
        <i>→</i>
      </div>
    </div>
  );
}

function CodeIllustration() {
  return (
    <div className={`${styles.groupDiagram} ${styles.groupCodeDiagram}`} aria-hidden="true">
      <span className={styles.groupDiagramLabel}>Join code</span>
      <strong className={styles.groupDemoCode}>DEMO24</strong>
      <div className={styles.groupShareLine}>
        <span>Copy link</span>
        <b>Shared</b>
      </div>
      <div className={styles.groupMiniRoster}>
        <span><i /> You</span>
        <span><i /> Mike</span>
        <span><i /> Danny</span>
      </div>
    </div>
  );
}

function ScoreIllustration() {
  return (
    <div className={`${styles.groupDiagram} ${styles.groupScoreDiagram}`} aria-hidden="true">
      <div className={styles.groupScoreTitle}>
        <strong>Live scorecard</strong>
        <span>Hole 4</span>
      </div>
      <table>
        <thead>
          <tr><th>Player</th><th>1</th><th>2</th><th>3</th><th>4</th><th>Tot</th></tr>
        </thead>
        <tbody>
          <tr><th><i /> You</th><td>4</td><td>4</td><td>3</td><td><b>3</b></td><td>14</td></tr>
          <tr><th><i /> Mike</th><td>5</td><td>4</td><td>4</td><td>4</td><td>17</td></tr>
          <tr><th><i /> Danny</th><td>4</td><td>5</td><td>3</td><td>5</td><td>17</td></tr>
        </tbody>
      </table>
      <div className={styles.groupCountNote}>
        <span>Your tap</span>
        <strong>+1</strong>
        <small>Card updated</small>
      </div>
    </div>
  );
}

const illustrations = [
  <ModeIllustration key="mode" />,
  <CodeIllustration key="code" />,
  <ScoreIllustration key="score" />,
];

export default function HomeGroupStory() {
  return (
    <ol className={styles.groupFlow} aria-label="How group rounds work">
      {steps.map((step, index) => (
        <li className={styles.groupFlowStep} key={step.title}>
          <div className={styles.groupFlowCopy}>
            <span className={styles.groupFlowNumber}>{index + 1}</span>
            <div>
              <small>Step {String(index + 1).padStart(2, "0")}</small>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </div>
          {illustrations[index]}
        </li>
      ))}
    </ol>
  );
}
