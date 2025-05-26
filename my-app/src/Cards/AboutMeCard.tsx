import styles from "./Card.module.scss";

export default function AboutMeCard() {
  return (
    <div className={styles.card}>
        <h2>About Me</h2>
        <p>I'm a software developer with a passion for building web applications.</p>
    </div>
  );
}