import { useState } from 'react';
import { useCompare } from '../Contex/CompareContext';
import { CompareButtonProps } from '../Type/Type';

export default function CompareButton({ game, variant = 'card' }: CompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  const [showTooltip, setShowTooltip] = useState(false);
  
  const inCompare = isInCompare(game.id);
  const canAdd = canAddMore() || inCompare;

  const handleClick = () => {
    if (inCompare) {
      removeFromCompare(game.id);
    } else if (canAdd) {
      addToCompare(game);
    } else {
      // Mostra tooltip di avviso se non si possono aggiungere altri giochi
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  if (variant === 'detail') {
    return (
      <div className="position-relative">
        <button 
          className={`btn ${inCompare ? 'btn-info' : 'btn-outline-info'}`}
          onClick={handleClick}
          disabled={!canAdd && !inCompare}
        >
          📊
          {inCompare ? 'Rimuovi dal confronto' : 'Aggiungi al confronto'}
        </button>
        
        {showTooltip && (
          <div className="position-absolute top-100 start-0 mt-2 p-2 bg-dark text-white rounded shadow" style={{ zIndex: 1050, fontSize: '0.85rem', width: 'max-content' }}>
            Puoi confrontare solo 2 giochi. Rimuovi un gioco prima di aggiungerne un altro.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="position-relative">
      <button 
        onClick={handleClick}
        className={`btn btn-sm ${inCompare ? 'btn-info' : 'btn-outline-info'}`}
        disabled={!canAdd && !inCompare}
        title={inCompare ? "Rimuovi dal confronto" : "Aggiungi al confronto"}
      >
        📊
      </button>
      
      {showTooltip && (
        <div className="position-absolute top-100 start-50 translate-middle-x mt-2 p-2 bg-dark text-white rounded shadow" style={{ zIndex: 1050, fontSize: '0.75rem', width: 'max-content' }}>
          Limite di 2 giochi raggiunto
        </div>
      )}
    </div>
  );
}