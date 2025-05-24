import { GameCardProps } from "../Type/Type"
import { Link } from "react-router-dom"
import { useFavorites } from "../Contex/FavoritesContext"
import { useCompare } from "../Contex/CompareContext"
import { useState, memo } from "react"
import UseVideoGameDetail from "../Hook/UseVideoGameDetail"
import CompareButton from "./CompareButton"

function GameCard({ game }: GameCardProps) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const { addToCompare } = useCompare();
    const isGameFavorite = isFavorite(game.id);
    const [fullGameData, setFullGameData] = useState<any>(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const { fetchVideoGameDetail } = UseVideoGameDetail();

    const handleFavoriteClick = () => {
        if (isGameFavorite) {
            removeFavorite(game.id);
        } else {
            addFavorite(game);
        }
    };

    // Carica i dati completi e aggiunge automaticamente al confronto
    const loadAndAddToCompare = async () => {
        if (!fullGameData && !isLoadingDetail) {
            setIsLoadingDetail(true);
            try {
                const gameDetail = await fetchVideoGameDetail(game.id);
                if (gameDetail) {
                    setFullGameData(gameDetail);
                    // Aggiungi automaticamente al confronto dopo aver caricato i dati
                    addToCompare(gameDetail);
                }
            } catch (error) {
                console.error("Errore nel caricamento dettagli gioco:", error);
            } finally {
                setIsLoadingDetail(false);
            }
        }
    };

    return (
        <div className="col">   
            <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-truncate">🎮 {game.title}</h5>
                    <div className="d-flex gap-2">
                        {fullGameData ? (
                            <CompareButton game={fullGameData} />
                        ) : (
                            <button 
                                onClick={loadAndAddToCompare}
                                className="btn btn-sm btn-outline-info"
                                disabled={isLoadingDetail}
                                title="Aggiungi al confronto"
                            >
                                {isLoadingDetail ? '⏳' : '📊'}
                            </button>
                        )}
                        <button 
                            onClick={handleFavoriteClick}
                            className={`btn btn-sm ${isGameFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                            title={isGameFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                        >
                            {isGameFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
                <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                        <span className="badge bg-secondary fs-6">
                            🏷️ {game.category}
                        </span>
                    </div>
                    
                    <div className="mb-3 text-muted">
                        <small>
                            🕒 Aggiornato: {new Date(game.updatedAt).toLocaleDateString('it-IT')}
                        </small>
                    </div>
                    
                    <div className="mt-auto">
                        <Link to={`/game/${game.id}`} className="btn btn-outline-primary w-100">
                            👁️ Visualizza dettagli
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(GameCard)