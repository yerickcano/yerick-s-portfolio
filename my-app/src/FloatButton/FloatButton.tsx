import styles from './FloatButton.module.scss';

interface FloatButtonProps {  
  text: string;
}

export default function FloatButton({ text }: FloatButtonProps) {
  return <button className={styles.floatButton}>{text}</button>;
}