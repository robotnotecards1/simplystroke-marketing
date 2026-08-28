import type { Review } from "@/lib/appStore";
import styles from "@/app/home.module.css";

export default function HomeReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className={styles.reviewWall} aria-label="Six verified App Store reviews">
      {reviews.map((review, index) => (
        <figure
          className={`${styles.reviewCard} ${index === 0 ? styles.reviewCardLead : ""}`}
          key={review.author}
        >
          <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
          <h3>{review.title || "5-star review"}</h3>
          <blockquote>“{review.body}”</blockquote>
          <figcaption>{review.author} <span>· App Store</span></figcaption>
        </figure>
      ))}
    </div>
  );
}
