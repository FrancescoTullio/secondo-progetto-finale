import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { TypeVideogameShort, FavoritesContextType } from '../Type/Type';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Carica i preferiti dal localStorage all'avvio
  const [favorites, setFavorites] = useState<TypeVideogameShort[]>(() => {
    const storedFavorites = localStorage.getItem('game-favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Salva i preferiti nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('game-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (game: TypeVideogameShort) => {
    setFavorites(prevFavorites => {
      // Verifica che il gioco non sia già nei preferiti
      if (!prevFavorites.some(fav => fav.id === game.id)) {
        return [...prevFavorites, game];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(game => game.id !== id)
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some(game => game.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizzato per facilitare l'uso del contesto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};