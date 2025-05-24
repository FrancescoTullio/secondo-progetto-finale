// GameDetailPage.tsx - Icone migliorate per una UX più intuitiva
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVideoGameDetail from "../Hook/UseVideoGameDetail";
import { useFavorites } from "../Contex/FavoritesContext";
import CompareButton from "../Components/CompareButton";

export default function GameDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { videogameDetail, isLoading, error, fetchVideoGameDetail } = useVideoGameDetail();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    
    const isGameFavorite = id ? isFavorite(parseInt(id)) : false;

    useEffect(() => {
        if (id) {
            fetchVideoGameDetail(parseInt(id));
        }
    }, [id, fetchVideoGameDetail]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleFavoriteClick = () => {
        if (!videogameDetail) return;
        
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
                <h4 className="alert-heading">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Errore!
                </h4>
                <p>{error}</p>
                <hr />
                <button className="btn btn-outline-danger" onClick={handleGoBack}>
                    <i className="bi bi-house-door me-2"></i>
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
                    <i className="bi bi-arrow-left me-2"></i>
                    Torna indietro
                </button>
                
                <div className="d-flex gap-2">
                    {videogameDetail && <CompareButton game={videogameDetail} variant="detail" />}
                    
                    <button 
                        className={`btn ${isGameFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={handleFavoriteClick}
                    >
                        <i className={`bi ${isGameFavorite ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                        {isGameFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                    </button>
                </div>
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
                            <h1 className="card-title">
                                <i className="bi bi-controller me-2"></i>
                                {videogameDetail.title}
                            </h1>
                            <div className="d-flex gap-2 mb-3 flex-wrap">
                                <span className="badge bg-primary">
                                    <i className="bi bi-tag-fill me-1"></i>
                                    {videogameDetail.category}
                                </span>
                                <span className="badge bg-secondary">
                                    <i className="bi bi-shield-check me-1"></i>
                                    PEGI: {videogameDetail.pegi}
                                </span>
                                <span className="badge bg-info">
                                    <i className="bi bi-calendar-event me-1"></i>
                                    {videogameDetail.year}
                                </span>
                            </div>

                            <div className="mb-3">
                                <h5>
                                    <i className="bi bi-info-circle me-2"></i>
                                    Dettagli
                                </h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>
                                            <i className="bi bi-building me-2"></i>
                                            Casa produttrice:
                                        </span>
                                        <span className="fw-bold">{videogameDetail.company}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>
                                            <i className="bi bi-currency-euro me-2"></i>
                                            Prezzo:
                                        </span>
                                        <span className="fw-bold">{videogameDetail.price.toFixed(2)} €</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>
                                            <i className="bi bi-people me-2"></i>
                                            Multiplayer:
                                        </span>
                                        <span className="fw-bold">
                                            {videogameDetail.multiplayer ? (
                                                <><i className="bi bi-check-circle-fill text-success me-1"></i>Sì</>
                                            ) : (
                                                <><i className="bi bi-x-circle-fill text-danger me-1"></i>No</>
                                            )}
                                        </span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>
                                            <i className="bi bi-star me-2"></i>
                                            Voto: {videogameDetail.vote}
                                        </span>
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
                                <h5>
                                    <i className="bi bi-display me-2"></i>
                                    Piattaforme
                                </h5>
                                <div className="d-flex gap-2 flex-wrap">
                                    {videogameDetail.platform.map((platform, index) => (
                                        <span key={index} className="badge bg-success">
                                            <i className="bi bi-joystick me-1"></i>
                                            {platform}
                                        </span>
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