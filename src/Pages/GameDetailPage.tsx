import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UseVideoGameDetail from "../Hook/UseVideoGameDetail";
import { useFavorites } from "../Contex/FavoritesContext";

export default function GameDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { videogameDetail, isLoading, error, fetchVideoGameDetail } = UseVideoGameDetail();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    
    // Verifica se il gioco è nei preferiti
    const isGameFavorite = id ? isFavorite(parseInt(id)) : false;

    useEffect(() => {
        if (id) {
            fetchVideoGameDetail(parseInt(id));
        }
    }, [id]);

    const handleGoBack = () => {
        navigate(-1); // Torna alla pagina precedente mantenendo lo stato
    };

    const handleFavoriteClick = () => {
        if (!videogameDetail) return;
        
        // Crea un oggetto TypeVideogameShort dal TypeVideogameLong
        const gameShort = {
            id: videogameDetail.id,
            title: videogameDetail.title,
            category: videogameDetail.category,
            createdAt: videogameDetail.createdAt,
            updatedAt: videogameDetail.updatedAt
        };
        
        if (isGameFavorite) {
            removeFavorite(videogameDetail.id);
        } else {
            addFavorite(gameShort);
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger my-4" role="alert">
                <h4 className="alert-heading">Errore!</h4>
                <p>{error}</p>
                <hr />
                <button className="btn btn-outline-danger" onClick={handleGoBack}>
                    Torna alla home
                </button>
            </div>
        );
    }

    if (!videogameDetail) {
        return null;
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button 
                    className="btn btn-outline-primary" 
                    onClick={handleGoBack}
                >
                    <i className="bi bi-arrow-left"></i> Torna indietro
                </button>
                
                <button 
                    className={`btn ${isGameFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={handleFavoriteClick}
                >
                    <i className={`bi ${isGameFavorite ? 'bi-star-fill' : 'bi-star'} me-2`}></i>
                    {isGameFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                </button>
            </div>

            <div className="card border-0 shadow">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img 
                            src={videogameDetail.img || "/api/placeholder/400/500"} 
                            className="img-fluid rounded-start" 
                            alt={videogameDetail.title}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title">{videogameDetail.title}</h1>
                            <div className="d-flex gap-2 mb-3 flex-wrap">
                                <span className="badge bg-primary">{videogameDetail.category}</span>
                                <span className="badge bg-secondary">PEGI: {videogameDetail.pegi}</span>
                                <span className="badge bg-info">{videogameDetail.year}</span>
                            </div>

                            <div className="mb-3">
                                <h5>Dettagli</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Casa produttrice:</span>
                                        <span className="fw-bold">{videogameDetail.company}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Prezzo:</span>
                                        <span className="fw-bold">{videogameDetail.price.toFixed(2)} €</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Multiplayer:</span>
                                        <span className="fw-bold">{videogameDetail.multiplayer ? 'Sì' : 'No'}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Voto: {videogameDetail.vote}</span>
                                        <div>
                                            {Array.from({ length: Math.floor(videogameDetail.vote) }).map((_, i) => (
                                                <i key={i} className="bi bi-star-fill text-warning"></i>
                                            ))}
                                            {videogameDetail.vote % 1 >= 0.5 && (
                                                <i className="bi bi-star-half text-warning"></i>
                                            )}
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-3">
                                <h5>Piattaforme</h5>
                                <div className="d-flex gap-2 flex-wrap">
                                    {videogameDetail.platform.map((platform, index) => (
                                        <span key={index} className="badge bg-success">{platform}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}