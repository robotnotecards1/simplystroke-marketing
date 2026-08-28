"use client";

import { trackHomepageEvent } from "@/lib/analytics";
import styles from "@/app/home.module.css";

export type HomeFaqItem = { id: string; q: string; a: string };

export default function HomeFaq({ items }: { items: HomeFaqItem[] }) {
  return (
    <div className={styles.faqGrid}>
      {items.map((item, index) => (
        <details
          className={styles.faqItem}
          key={item.id}
          onToggle={(event) => {
            if (event.currentTarget.open) {
              trackHomepageEvent("faq_opened", { question_id: item.id });
            }
          }}
        >
          <summary>
            <span className={styles.faqNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.faqQuestion}>{item.q}</span>
            <span className={styles.faqMark} aria-hidden="true"><i /><i /></span>
          </summary>
          <div className={styles.faqAnswer}><p>{item.a}</p></div>
        </details>
      ))}
    </div>
  );
}
