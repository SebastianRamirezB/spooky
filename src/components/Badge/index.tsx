import styles from './styles.module.css';

interface Props {
    text: string;
}


const Badge = ({ text }: Props) => {
  return (
    <div className="center">
        <div className={styles.badge}>
            <span className={styles.badgeText}>{ text }</span>
        </div>       
    </div>
  )
}

export default Badge;