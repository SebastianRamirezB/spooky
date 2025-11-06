import { aiApi } from '../api/ai-api';
import type {
    CreateImageResponse,
    Data,
    Meta,
} from '../interfaces/create-image.response';


interface Options {
    prompt: string;
    file: File;
}

export const createImage = async ({
    file,
    prompt,
}: Options): Promise<
    | {
          data: Data | null;
          meta: Meta | null;
          message: string;
      }
    | undefined
> => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('prompt', prompt);

        const { data } = await aiApi.post<CreateImageResponse>(
            '/image-generation',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 60000, // 60 segundos
            }
        );

        return {
            data: data.data,
            meta: data.meta,
            message: 'Creado exitosamente',
        };
    } catch (error: any) {
        if (error.response?.status === 429) {
            const message =
                error.response?.data?.message || 'Ocurrió un error inesperado';
            return {
                data: null,
                meta: null,
                message,
            };
        }

        return {
                data: null,
                meta: null,
                message: 'No se pudo conectar con el servidor. Intenta de nuevo más tarde.',
            };
        
    }
};
