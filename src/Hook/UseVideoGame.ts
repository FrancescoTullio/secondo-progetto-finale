import { useState, useEffect, useRef } from "react";
import { TypeVideogameShort, isArrayVideogames } from "../Type/Type";

function UseVideoGames() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [videogame, setVideogame] = useState<TypeVideogameShort[] | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  // Carica i videogiochi al montaggio del componente
  useEffect(() => {
    fetchVideogames();
  }, []);

  // Aggiorna l'elenco quando cambiano i filtri
  useEffect(() => {
    fetchVideogames();
  }, [inputSearch, selectedCategory, sortOption]);

  // Estrai le categorie uniche quando cambiano i videogiochi
  useEffect(() => {
    if (videogame) {
      const uniqueCategories = Array.from(
        new Set(videogame.map((game) => game.category))
      ).sort();
      setCategories(uniqueCategories);
    }
  }, [videogame]);

  async function fetchVideogames() {
    try {
      // Costruisci i parametri di query
      const params = new URLSearchParams();
      if (inputSearch) params.append("search", inputSearch);
      if (selectedCategory) params.append("category", selectedCategory);
      if (sortOption) params.append("sort", sortOption);

      const url = `${backUrl}${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Errore nel recupero dei videogiochi");
      }

      const data = await response.json();
      console.log(data);
      
      
      if (!isArrayVideogames(data)) {
        throw new Error("Formato dati non valido");
      }

      setVideogame(data);
    } catch (error) {
      console.error("Errore:", error);
      // Imposta un array vuoto in caso di errore anziché null
      setVideogame([]);
    }
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