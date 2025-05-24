import { useState, useEffect, useRef, useCallback } from "react";
import { TypeVideogameShort, isArrayVideogames } from "../Type/Type";

function UseVideoGames() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [videogame, setVideogame] = useState<TypeVideogameShort[] | null>(null);
  const [originalVideogames, setOriginalVideogames] = useState<TypeVideogameShort[] | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  // Carica i videogiochi al montaggio del componente
  useEffect(() => {
    fetchVideogames();
  }, []);

  // Applica filtri e ordinamento quando cambiano i parametri con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFiltersAndSort();
    }, 500); // Debounce di 500ms

    return () => clearTimeout(timeoutId);
  }, [inputSearch, selectedCategory, sortOption, originalVideogames]);

  // Estrai le categorie uniche quando cambiano i videogiochi originali
  useEffect(() => {
    if (originalVideogames) {
      const uniqueCategories = Array.from(
        new Set(originalVideogames.map((game) => game.category))
      ).sort();
      setCategories(uniqueCategories);
    }
  }, [originalVideogames]);

  async function fetchVideogames() {
    try {
      const response = await fetch(backUrl);
      
      if (!response.ok) {
        throw new Error("Errore nel recupero dei videogiochi");
      }

      const data = await response.json();
      console.log(data);
      
      if (!isArrayVideogames(data)) {
        throw new Error("Formato dati non valido");
      }

      // Salva i dati originali e applica filtri
      setOriginalVideogames(data);
    } catch (error) {
      console.error("Errore:", error);
      // Imposta un array vuoto in caso di errore anziché null
      setOriginalVideogames([]);
      setVideogame([]);
    }
  }

  function applyFiltersAndSort() {
    if (!originalVideogames) return;

    let filteredGames = [...originalVideogames];

    // Applica filtro per ricerca
    if (inputSearch.trim()) {
      filteredGames = filteredGames.filter(game =>
        game.title.toLowerCase().includes(inputSearch.toLowerCase())
      );
    }

    // Applica filtro per categoria
    if (selectedCategory) {
      filteredGames = filteredGames.filter(game =>
        game.category === selectedCategory
      );
    }

    // Applica ordinamento
    if (sortOption) {
      filteredGames.sort((a, b) => {
        switch (sortOption) {
          case "title_asc":
            return a.title.localeCompare(b.title);
          case "title_desc":
            return b.title.localeCompare(a.title);
          case "category_asc":
            return a.category.localeCompare(b.category);
          case "category_desc":
            return b.category.localeCompare(a.category);
          default:
            return 0;
        }
      });
    }

    setVideogame(filteredGames);
  }

  async function searchVideogames() {
    if (searchRef.current) {
      setInputSearch(searchRef.current.value);
    }
  }

  return {
    videogame,
    searchVideogames,
    searchRef,
    inputSearch,
    setInputSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption
  };
}

export default UseVideoGames;