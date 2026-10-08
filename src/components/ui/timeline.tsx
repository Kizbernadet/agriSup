import styles from "./timeline.module.css";

export type TimelineItem = { label: string; title?: string; text: string };

// Frise chronologique verticale (historique).
export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <span className={styles.label}>{item.label}</span>
          {item.title && <h3 className={styles.title}>{item.title}</h3>}
          <p>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
