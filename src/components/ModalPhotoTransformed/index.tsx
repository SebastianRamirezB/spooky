import { useEffect, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { toast } from 'sonner';
import { CircleX, Download, RefreshCcw } from 'lucide-react';


import { createImage } from '../../actions/createImage';
import SkeletonCreateImage from '../SkeletonCreateImage';

import styles from './styles.module.css';

interface Props {
    originalImage: string;
    setOriginalImage: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    file: File;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}


const ModalPhotoTransformed = ({ isOpen, setIsModalOpen, file, setFile, originalImage, setOriginalImage }: Props) => {


    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const closeModal = () => {
        setIsModalOpen(false);
        setImage('');
        setOriginalImage('');
        setFile(undefined)
    }


    const onCreateImage = async () => {

        setIsLoading(true);

        //  Opciones de compresión
        const options = {
            maxSizeMB: 4.4, // máximo 1 MB
            maxWidthOrHeight: 1080, // escala si es muy grande
            useWebWorker: true, // mejora rendimiento
        };

        //  Comprimir imagen
        const compressedFile = await imageCompression(file, options);



        const response = await createImage({ file: compressedFile, prompt: 'Toma la imagen que te he proporcionado y transfórmala en una versión de Halloween. Quiero que la imagen resultante sea fotorealista y conserve los elementos principales de la original, pero añadiendo detalles de Halloween como calabazas, telarañas, luces tenues y quizás figuras fantasmales de una manera integrada y creíble, como si la escena original hubiera sido decorada o embrujada para la ocasión. El estilo debe ser auténtico y la iluminación atmosférica para crear una sensación de misterio.' });



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
        const uniqueId = crypto.randomUUID(); // genera un UUID como "d9aef9b6-2c56-4e3c-bf11-bd7a0a05a10c"
        const fileName = `${uniqueId}.png`;

        const link = document.createElement('a');
        link.href = `data:image/png;base64,${image}`;
        link.download = fileName;
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