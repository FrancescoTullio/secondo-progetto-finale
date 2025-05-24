import { useState, useCallback } from "react";
import { TypeVideogameLong, isDetailVideogams, UseVideoGameDetailReturn } from "../Type/Type";

function useVideoGameDetail(): UseVideoGameDetailReturn {
    const backUrl = import.meta.env.VITE_BACKEND_URL;
    const [videogameDetail, setVideogameDetail] = useState<TypeVideogameLong | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Avvolgi fetchVideoGameDetail in useCallback
    const fetchVideoGameDetail = useCallback(async (id: number): Promise<TypeVideogameLong | null> => {
        setIsLoading(true);
        setError(null);
        
        try {
            const res = await fetch(`${backUrl}/${id}`);
            if (!res.ok) {
                throw new Error("Errore nel recupero dati del videogioco");
            }

            const data = await res.json();
            
            if (!isDetailVideogams(data)) {
                throw new Error("Formato dati non valido");
            }

            setVideogameDetail(data.videogame);
            return data.videogame;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Errore sconosciuto durante il recupero dei dettagli");
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [backUrl]);

    return {
        videogameDetail,
        isLoading,
        error,
        fetchVideoGameDetail
    };
}

export default useVideoGameDetail;