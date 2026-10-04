import styles from "./timeline.module.css";

export type TimelineItem = { label: string; text: string };

// Frise chronologique verticale (historique).
export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <span className={styles.label}>{item.label}</span>
          <p>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
