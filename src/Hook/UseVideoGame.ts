import { useState, useEffect } from "react";
import { ArrayVideoGamesShort, isArrayVideogames } from "../Type/Type";

function UseVideoGames() {
    const backUrl = import.meta.env.VITE_BACKEND_URL;
    const [videogame, setVideogame] = useState<ArrayVideoGamesShort | null>(null);
    const [inputSearch, setInputSearch] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);

    //funzione che prende tutti i dati in formato semplice solo con le 5 chiavi essenziali
    async function fetchVideogames(searchTerm: string = ""): Promise<void> {
        setIsSearching(true);
        try {
            const res = await fetch(`${backUrl}?search=${searchTerm}`);
            if (!res.ok) throw new Error("Errore nel recupero dati");

            const data: unknown = await res.json();
            
            if (!isArrayVideogames(data)) throw new Error("Tipo dati non conforme");

            setVideogame(data);
        } catch (err) {
            if (err instanceof Error) {
                console.error("Errore:", err);
            } else {
                console.error(`errore sconoscito:`, err);
            }
        } finally {
            setIsSearching(false);
        }
    }

    // Effetto che gestisce il debounce per l'input di ricerca
    useEffect(() => {
        // Timer per il debounce
        const debounceTimeout = setTimeout(() => {
            fetchVideogames(inputSearch);
        }, 500); // 500ms di debounce
        
        // Cleanup function per cancellare il timer quando inputSearch cambia nuovamente
        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [inputSearch]);

    // Caricamento iniziale
    useEffect(() => {
        fetchVideogames();
    }, []);

    return { 
        videogame, 
        inputSearch, 
        setInputSearch, 
        isSearching 
    };
}

export default UseVideoGames;