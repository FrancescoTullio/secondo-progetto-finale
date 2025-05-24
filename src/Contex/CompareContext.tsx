import { createContext, useState, useContext, ReactNode } from 'react';
import { TypeVideogameLong, CompareContextType } from '../Type/Type';

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  // Array di due slots per confrontare i giochi
  const [compareList, setCompareList] = useState<(TypeVideogameLong | null)[]>([null, null]);

  const addToCompare = (game: TypeVideogameLong) => {
    setCompareList(prev => {
      // Verifica se il gioco è già presente nella lista
      if (prev.some(item => item && item.id === game.id)) {
        return prev;
      }
      
      // Trova lo slot libero
      const firstNullIndex = prev.findIndex(item => item === null);
      if (firstNullIndex !== -1) {
        const newList = [...prev];
        newList[firstNullIndex] = game;
        return newList;
      }
      
      // Se non ci sono slot liberi, sostituisce il primo
      const newList = [...prev];
      newList[0] = game;
      return newList;
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareList(prev => 
      prev.map(item => (item && item.id === id) ? null : item)
    );
  };

  const isInCompare = (id: number) => {
    return compareList.some(item => item && item.id === id);
  };

  const clearCompare = () => {
    setCompareList([null, null]);
  };

  const canAddMore = () => {
    return compareList.some(item => item === null);
  };

  return (
    <CompareContext.Provider value={{ 
      compareList, 
      addToCompare, 
      removeFromCompare, 
      isInCompare, 
      clearCompare,
      canAddMore
    }}>
      {children}
    </CompareContext.Provider>
  );
};

// Hook personalizzato per facilitare l'uso del contesto
export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};