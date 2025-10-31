import Badge from '../Badge';
import styles from './styles.module.css';


const Hero = () => {
    return (
        <div>

            <Badge text="👻 Laboratorio Embrujado de Imágenes 🎃" />
            <h1 className={styles.title}>Transforma imágenes en <span className="gradient-text">magia de Halloween
            </span> </h1>
            <p className={styles.subtitle}>Arrastra tu foto al caldero y mira cómo la IA le lanza hechizos escalofriantes ⚡</p>
        </div>
    )
}

export default Hero;