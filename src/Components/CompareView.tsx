import { Link } from 'react-router-dom';
import { useCompare } from '../Contex/CompareContext';

export default function CompareView() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  
  // Verifica se almeno uno slot è occupato
  const hasGames = compareList.some(game => game !== null);
  
  if (!hasGames) {
    return null;
  }
  
  // Costruisce gli array di piattaforme uniche per il confronto
  const allPlatforms = Array.from(new Set(
    compareList
      .filter(game => game !== null)
      .flatMap(game => game ? game.platform : [])
  ));

  return (
    <div className="compare-view shadow rounded border p-3 mb-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          <i className="bi bi-bar-chart-fill me-2 text-info"></i>
          Confronto Videogiochi
        </h4>
        <button 
          className="btn btn-outline-secondary btn-sm"
          onClick={clearCompare}
        >
          <i className="bi bi-x-lg me-1"></i>
          Chiudi confronto
        </button>
      </div>
      
      <div className="row">
        {/* Colonna delle etichette */}
        <div className="col-3 fw-bold">
          <div className="py-3 border-bottom">Titolo</div>
          <div className="py-3 border-bottom">Immagine</div>
          <div className="py-3 border-bottom">Categoria</div>
          <div className="py-3 border-bottom">Anno</div>
          <div className="py-3 border-bottom">Casa Produttrice</div>
          <div className="py-3 border-bottom">Prezzo</div>
          <div className="py-3 border-bottom">Multiplayer</div>
          <div className="py-3 border-bottom">PEGI</div>
          <div className="py-3 border-bottom">Voto</div>
          <div className="py-3 border-bottom">Piattaforme</div>
        </div>
        
        {/* Colonne dei giochi */}
        {compareList.map((game, index) => (
          <div key={index} className={`col ${game ? '' : 'opacity-50'}`}>
            {game ? (
              <>
                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <h5 className="mb-0 text-truncate">{game.title}</h5>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCompare(game.id)}
                    title="Rimuovi dal confronto"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
                <div className="py-2 border-bottom text-center">
                  <img 
                    src={game.img || "/api/placeholder/100/150"} 
                    alt={game.title}
                    className="img-thumbnail" 
                    style={{ height: '100px', objectFit: 'cover' }}
                  />
                </div>
                <div className="py-3 border-bottom">
                  <span className="badge bg-secondary">{game.category}</span>
                </div>
                <div className="py-3 border-bottom">{game.year}</div>
                <div className="py-3 border-bottom">{game.company}</div>
                <div className="py-3 border-bottom">{game.price.toFixed(2)} €</div>
                <div className="py-3 border-bottom">
                  {game.multiplayer ? 
                    <span className="text-success"><i className="bi bi-check-lg"></i> Sì</span> : 
                    <span className="text-danger"><i className="bi bi-x-lg"></i> No</span>
                  }
                </div>
                <div className="py-3 border-bottom">{game.pegi}</div>
                <div className="py-3 border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="me-2">{game.vote}</span>
                    <div>
                      {Array.from({ length: Math.floor(game.vote) }).map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning"></i>
                      ))}
                      {game.vote % 1 >= 0.5 && (
                        <i className="bi bi-star-half text-warning"></i>
                      )}
                    </div>
                  </div>
                </div>
                <div className="py-3 border-bottom">
                  <div className="d-flex flex-wrap gap-1">
                    {allPlatforms.map(platform => (
                      <span key={platform} 
                        className={`badge ${game.platform.includes(platform) ? 'bg-success' : 'bg-light text-muted'}`}>
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="py-2 mt-2 text-center">
                  <Link to={`/game/${game.id}`} className="btn btn-outline-primary btn-sm">
                    Vai al dettaglio
                  </Link>
                </div>
              </>
            ) : (
              <div className="h-100 d-flex flex-column justify-content-center align-items-center py-5">
                <div className="text-center text-muted">
                  <i className="bi bi-plus-circle display-4"></i>
                  <p className="mt-2">Aggiungi un gioco da confrontare</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}