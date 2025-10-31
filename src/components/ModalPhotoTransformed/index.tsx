import { useEffect, useState } from 'react';
import { createImage } from '../../api/createImage';
import styles from './styles.module.css';
import { CircleX, Download, RefreshCcw } from 'lucide-react';
import SkeletonCreateImage from '../SkeletonCreateImage';
import { toast } from 'sonner';

interface Props {
    originalImage: string;
    setOriginalImage: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    file: File;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}


const ModalPhotoTransformed = ({ isOpen, setIsModalOpen, file, setFile, originalImage, setOriginalImage }: Props) => {


    const [image, setImage] = useState('')
    const [isLoading, setIsLoading] = useState(false);



    const closeModal = () => {
        setIsModalOpen(false);
        setImage('');
        setOriginalImage('');
        setFile(undefined)
    }


    const onCreateImage = async () => {

        setIsLoading(true);

        const response = await createImage({ file: file, prompt: 'convierte esta imagen en una con estilo halloween' });


        // console.log(response?.message);

        if (!response?.data || !response?.meta) {
            setIsLoading(false);
            toast.error(response?.message);
            return;
        }

        // Ahora sí puedes desestructurar
        const { data } = response;


        if (!data) return;

        setImage(data.base64)
        setIsLoading(false)


    }


    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${image}`;
        link.download = 'gemini-generated.png';
        link.click();
    };


    useEffect(() => {
        document.body.style.overflow = 'hidden';


        // Limpia al desmontar (cuando el modal se cierra)
        return () => {
            document.body.style.overflow = '';
        };
    }, [])


    return (
        <>
            {
                isOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContainer}>

                            <div className={styles.imageContainer}>
                                <button disabled={isLoading} onClick={closeModal} className={styles.closedButton}><CircleX /></button>

                                {

                                    isLoading ? (<SkeletonCreateImage />) : !image ? (
                                        <img className={styles.image} src={`data:image/png;base64,${originalImage}`} alt="" />
                                    ) :
                                        (
                                            <img className={styles.image} src={`data:image/png;base64,${image}`} alt="" />
                                        )


                                }




                            </div>

                            {
                                !image
                                    ?
                                    (
                                        <>
                                            <button disabled={isLoading} className={styles.creationButton} onClick={onCreateImage} >Crear imagen embrujada! 👻</button>

                                            <button disabled={isLoading} className={styles.changeImageButton} onClick={closeModal} > <RefreshCcw /> Cambiar Imagen</button>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <button className={styles.creationButton} onClick={handleDownload}> <Download /> Descargar imagen</button>

                                            <button disabled={isLoading} className={styles.changeImageButton} onClick={closeModal} > <RefreshCcw /> Crear otra imagen</button>

                                        </>
                                    )
                            }

                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ModalPhotoTransformed;