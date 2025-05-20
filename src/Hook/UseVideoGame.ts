import { useState, useEffect } from "react";
import { ArrayVideoGamesShort, isArrayVideogames } from "../Type/Type";

// Tipo per le opzioni di ordinamento
type SortOption = "title_asc" | "title_desc" | "category_asc" | "category_desc" | "";

function UseVideoGames() {
    const backUrl = import.meta.env.VITE_BACKEND_URL;
    const [videogame, setVideogame] = useState<ArrayVideoGamesShort | null>(null);
    const [allVideogames, setAllVideogames] = useState<ArrayVideoGamesShort | null>(null);
    const [inputSearch, setInputSearch] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [sortOption, setSortOption] = useState<SortOption>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [categories, setCategories] = useState<string[]>([]);

    //funzione che prende tutti i dati in formato semplice solo con le 5 chiavi essenziali
    async function fetchVideogames(searchTerm: string = ""): Promise<void> {
        setIsSearching(true);
        try {
            const res = await fetch(`${backUrl}?search=${searchTerm}`);
            if (!res.ok) throw new Error("Errore nel recupero dati");

            const data: unknown = await res.json();
            
            if (!isArrayVideogames(data)) throw new Error("Tipo dati non conforme");

            setVideogame(data);
            setAllVideogames(data);
            
            // Estrai le categorie uniche
            const uniqueCategories = Array.from(new Set(data.map(game => game.category)));
            setCategories(uniqueCategories);
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

    // Funzione per ordinare i giochi in base all'opzione selezionata
    function sortGames(games: ArrayVideoGamesShort, option: SortOption): ArrayVideoGamesShort {
        const gamesCopy = [...games];
        
        switch (option) {
            case "title_asc":
                return gamesCopy.sort((a, b) => a.title.localeCompare(b.title));
            case "title_desc":
                return gamesCopy.sort((a, b) => b.title.localeCompare(a.title));
            case "category_asc":
                return gamesCopy.sort((a, b) => a.category.localeCompare(b.category));
            case "category_desc":
                return gamesCopy.sort((a, b) => b.category.localeCompare(a.category));
            default:
                return gamesCopy;
        }
    }

    // Applica i filtri (titolo e categoria) e l'ordinamento
    useEffect(() => {
        if (!allVideogames) return;
        
        let filteredGames = [...allVideogames];
        
        // Filtra per titolo
        if (inputSearch.trim() !== "") {
            filteredGames = filteredGames.filter(game => 
                game.title.toLowerCase().includes(inputSearch.toLowerCase())
            );
        }
        
        // Filtra per categoria
        if (selectedCategory !== "") {
            filteredGames = filteredGames.filter(game => 
                game.category === selectedCategory
            );
        }
        
        // Applica l'ordinamento se selezionato
        if (sortOption !== "") {
            filteredGames = sortGames(filteredGames, sortOption);
        }
        
        setVideogame(filteredGames);
    }, [inputSearch, selectedCategory, sortOption, allVideogames]);

    // Caricamento iniziale
    useEffect(() => {
        fetchVideogames();
    }, []);

    return { 
        videogame, 
        inputSearch, 
        setInputSearch,
        selectedCategory,
        setSelectedCategory,
        sortOption,
        setSortOption,
        categories,
        isSearching 
    };
}

export default UseVideoGames;