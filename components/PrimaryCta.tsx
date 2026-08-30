import type { ComponentProps, ReactNode } from "react";
import TrackedCta from "@/components/TrackedCta";
import { AppleGlyph } from "@/components/icons";
import styles from "./PrimaryCta.module.css";

type PrimaryCtaProps = Omit<ComponentProps<typeof TrackedCta>, "children"> & {
  children: ReactNode;
  subtitle?: string;
  apple?: boolean;
  size?: "default" | "large" | "compact";
  tone?: "dark" | "light";
};

/** One tracked link, including the arrow panel; never two separate tap targets. */
export default function PrimaryCta({
  children,
  subtitle,
  apple = false,
  size = "default",
  tone = "dark",
  className,
  ...props
}: PrimaryCtaProps) {
  return (
    <TrackedCta
      {...props}
      className={[styles.cta, size !== "default" && styles[size], tone === "light" && styles.light, className].filter(Boolean).join(" ")}
    >
      <span className={styles.body}>
        {apple && <span className={styles.apple}><AppleGlyph trim /></span>}
        <span className={styles.copy}>
          <span className={styles.label}>{children}</span>
          {subtitle && <> <span className={styles.subtitle}>{subtitle}</span></>}
        </span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" focusable="false">
          <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </TrackedCta>
  );
}
