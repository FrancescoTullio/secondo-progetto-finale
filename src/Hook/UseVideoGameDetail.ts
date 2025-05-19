import { useState } from "react";
import { TypeVideogameLong, isVideogameLong } from "../Type/Type";

function UseVideoGameDetail() {
    const backUrl = import.meta.env.VITE_BACKEND_URL;
    const [videogameDetail, setVideogameDetail] = useState<TypeVideogameLong | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchVideoGameDetail(id: number): Promise<void> {
        setIsLoading(true);
        setError(null);
        
        try {
            const res = await fetch(`${backUrl}/${id}`);
            if (!res.ok) {
                throw new Error("Errore nel recupero dati del videogioco");
            }

            const data = await res.json();
            
            if (!data.success || !isVideogameLong(data.videogame)) {
                throw new Error("Formato dati non valido");
            }

            setVideogameDetail(data.videogame);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Errore sconosciuto durante il recupero dei dettagli");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return {
        videogameDetail,
        isLoading,
        error,
        fetchVideoGameDetail
    };
}

export default UseVideoGameDetail;