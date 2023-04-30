import styles from './Card.module.css';

export default function Card(props) {
    return <div className={styles.subCard}>
      {props.children}
    </div>;
  }