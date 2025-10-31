import { Bone, Ghost, Skull } from "lucide-react";

import styles from './styles.module.css';



const DecorativeEmojis = () => {
    return (
        <div className={styles.containerFixed}>
            <Ghost
                className={styles.emoji}
                color="#f9731680"
                style={{
                    right: 100,
                    top: 100
                }}
            />

            <Ghost
                color="#ff6b1a66"
                className={styles.emoji}
                style={{
                    left: 100,
                    top: 700
                }}
            />
            <Skull
                color="#ffffff66"
                className={styles.emoji}
                style={{
                    right: 100,
                    top: 400
                }}
            />
            <Skull
                color="#ffffff66"
                className={styles.emoji}
                style={{
                    left: 100,
                    top: 100
                }}
            />
            <Bone
                color="#fde04766"
                className={styles.emoji}
                style={{
                    right: 200,
                    top: 700
                }}
            />

        </div>
    )
}

export default DecorativeEmojis;