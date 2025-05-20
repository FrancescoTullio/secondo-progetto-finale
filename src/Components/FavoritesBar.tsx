import { Link } from 'react-router-dom';
import { useFavorites } from '../Contex/FavoritesContext';

export default function FavoritesBar() {
  const { favorites, removeFavorite } = useFavorites();

  // Non mostrare la barra se non ci sono preferiti
  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="favorites-bar py-2 shadow-sm bg-light border-top">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">
            <i className="bi bi-star-fill text-warning me-2"></i>
            I tuoi preferiti
          </h5>
          <div className="favorites-count">
            <span className="badge bg-warning text-dark">{favorites.length}</span>
          </div>
        </div>
        
        <div className="favorites-scroll-container">
          <div className="d-flex gap-3 overflow-auto pb-2">
            {favorites.map(game => (
              <div key={game.id} className="favorite-item" style={{ minWidth: '180px' }}>
                <div className="card">
                  <div className="card-body p-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <Link to={`/game/${game.id}`} className="text-decoration-none">
                        <h6 className="card-title mb-1 text-truncate" style={{ maxWidth: '140px' }}>
                          {game.title}
                        </h6>
                      </Link>
                      <button 
                        onClick={() => removeFavorite(game.id)}
                        className="btn btn-sm btn-outline-danger p-0 px-1"
                        title="Rimuovi dai preferiti"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                    <span className="badge bg-secondary d-inline-block text-truncate" style={{ maxWidth: '100%' }}>
                      {game.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* <style jsx>{`
        .favorites-bar {
          position: sticky;
          bottom: 0;
          width: 100%;
          z-index: 1000;
        }
        
        .favorites-scroll-container {
          overflow-x: auto;
          scrollbar-width: thin;
        }
        
        .favorites-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        
        .favorites-scroll-container::-webkit-scrollbar-thumb {
          background-color: #aaa;
          border-radius: 6px;
        }
      `}</style> */}
    </div>
  );
}