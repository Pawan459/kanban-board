import styles from './InlineCard.module.scss';

export default function InlineCard({
  title
}) {
  return (
    <div className={styles['inline-card']}>
      <h2 className={styles["title"]}>{title}</h2>
    </div>
  )
}
