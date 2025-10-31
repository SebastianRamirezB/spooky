import { Ghost } from 'lucide-react';
import styles from './styles.module.css';

const SkeletonCreateImage = () => {
  return (
    <div className={styles.container}>
        <Ghost size={60} className={styles.emoji} />
        <p className={`${styles.text} gradient-text`}> Conjurando tu imagen... <br /> ✨ Aguarda un momento mientras la magia hace efecto.</p>
    </div>
  )
}

export default SkeletonCreateImage;