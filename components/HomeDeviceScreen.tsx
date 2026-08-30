import styles from "@/app/home.module.css";

export const MAX_DEMO_STROKES = 5;

/** Keep the real screen artwork; render changing scores instead of capping at the recorded frames. */
export default function HomeDeviceScreen({
  device,
  count,
}: {
  device: "phone" | "watch";
  count: number;
}) {
  const phone = device === "phone";
  const width = phone ? 460 : 416;
  const height = phone ? 1000 : 496;
  const center = width / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={styles.deviceFrameActive}
      role="img"
      aria-label={`SimplyStroke ${phone ? "iPhone" : "Apple Watch"} demo showing ${count} ${count === 1 ? "stroke" : "strokes"}`}
    >
      <image href={`/images/hero-devices/${device}-0.jpg`} width={width} height={height} />
      <image
        href="/images/hero-devices/golf-ball.png"
        x={phone ? 90 : 81}
        y={phone ? 341 : 112}
        width={phone ? 280 : 254}
        height={phone ? 280 : 254}
      />
      <g textAnchor="middle" fontFamily="var(--font-display)" fill="#2b2b2b">
        <text x={center} y={phone ? 470 : 254} fontSize={phone ? 116 : 150}>{count}</text>
        <text
          x={center}
          y={phone ? 506 : 284}
          fontFamily="var(--font-body)"
          fontWeight="900"
          fontSize={phone ? 18 : 22}
          letterSpacing="1.3"
        >STROKES</text>
        <rect
          x={phone ? 172 : 132}
          y={phone ? 534 : 307}
          width={phone ? 116 : 152}
          height={40}
          rx={20}
          fill={phone ? "#4c7258" : "#35614a"}
        />
        <text
          x={phone ? 246 : 240}
          y={phone ? 558 : 334}
          textAnchor="end"
          fontFamily="var(--font-body)"
          fontWeight="700"
          fontSize={phone ? 13 : 19}
          letterSpacing={phone ? 1.2 : 0}
          fill="#f4f7f3"
        >HITTING</text>
        <text x={phone ? 263 : 256} y={phone ? 563 : 335} fontSize={phone ? 28 : 25} fill="#96c41e">
          {count + 1}
        </text>
      </g>
      {phone && (
        <g fontFamily="var(--font-display)" fontSize="25">
          {/* The recording starts on hole 8 with 31 strokes and +3 carried forward. */}
          <rect x="405" y="161" width="36" height="26" fill="#153a27" />
          <text x="438" y="182" textAnchor="end" fill="#fff">{31 + count}</text>
          <rect x="213" y="160" width="35" height="28" fill="#153a27" />
          <text x="230" y="182" textAnchor="middle" fill="#e86170">+{3 + Math.max(0, count - 4)}</text>
          <rect x="395" y="933" width="28" height="33" fill="#9ad425" />
          <text x="409" y="958" textAnchor="middle" fill="#153a27">{count || "–"}</text>
        </g>
      )}
    </svg>
  );
}
