import { TypeVideogameShort } from "../Type/Type"
import { Link } from "react-router-dom"
import { useFavorites } from "../Contex/FavoritesContext"

type Prop = {
    game: TypeVideogameShort
}

function GameCard({ game }: Prop) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const isGameFavorite = isFavorite(game.id);

    const handleFavoriteClick = () => {
        if (isGameFavorite) {
            removeFavorite(game.id);
        } else {
            addFavorite(game);
        }
    };

    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-truncate">{game.title}</h5>
                    <button 
                        onClick={handleFavoriteClick}
                        className={`btn btn-sm ${isGameFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                        title={isGameFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                    >
                        <i className={`bi ${isGameFavorite ? 'bi-star-fill' : 'bi-star'}`}></i>
                    </button>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-3 text-muted">
                        <span className="badge bg-secondary">{game.category}</span>
                    </h6>
                    <p className="card-text">
                        <small className="text-muted">
                            Aggiornato: {new Date(game.updatedAt).toLocaleDateString()}
                        </small>
                    </p>
                    <Link to={`/game/${game.id}`} className="btn btn-outline-primary">Vai al dettaglio</Link>
                </div>
            </div>
        </div>
    )
}

export default GameCard