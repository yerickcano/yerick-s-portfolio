import { useState } from "react";
import styles from "./Card.module.scss";

export default function CallToAction() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <h2>Let's Work Together!</h2>
      <p>If you're looking for a passionate developer to join your team or help bring your idea to life, feel free to reach out.</p>
      <a href="mailto:you@example.com">Get in Touch</a>
    </div>
  );
}

