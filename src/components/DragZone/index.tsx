import { Upload } from 'lucide-react';


import styles from './styles.module.css';
import ModalPhotoTransformed from '../ModalPhotoTransformed';
import { useState } from 'react';
import { toast } from 'sonner';




const DragZone = () => {

    const [originalImage, setOriginalImage] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string>('');



    const processFile = async (file: File) => {

        if (!file) return;

        // Validaciones
        if (!file.type.startsWith('image/')) {
            setError('Por favor, selecciona una imagen válida');
            toast.error('Por favor, selecciona una imagen válida');

            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('La imagen es muy grande. Máximo 10MB');
            toast.error('La imagen es muy grande. Máximo 10MB');

            return;
        }

        setError('');

        const reader = new FileReader();
        reader.onload = (e) => {

            const result = e.target?.result as string;
            setOriginalImage(result.split(',')[1]);
           
            setIsModalOpen(true);

        };
        reader.readAsDataURL(file);


         setFile(file);




    };



    const handleDrag = (e: React.DragEvent) => {
        console.log(e.type);
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);

    }


    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];

        if (file) processFile(file);


    }


    return (
        <>
            <div
                className={styles.dragZone}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    className={styles.inputDrag}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    onClick={(e) => {e.currentTarget.value = ''}}
                />
                <div className={styles.uploadIcon}>
                    <Upload width={40} height={40} />
                </div>
                <p>Arrastra tu imagen aquí o haz clic para seleccionar</p>
                <p>PNG, JPG, WEBP hasta 10MB</p>
            </div>

            {file && <ModalPhotoTransformed
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                file={file}
                setFile={setFile}
                setOriginalImage={setOriginalImage}
                originalImage={originalImage}
            />}
        </>

    )
}

export default DragZone;