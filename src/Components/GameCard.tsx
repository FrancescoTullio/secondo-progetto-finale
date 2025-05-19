import { TypeVideogameShort } from "../Type/Type"
import { Link } from "react-router-dom"

type Prop = {
    game: TypeVideogameShort
}

function GameCard({ game }: Prop) {
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">{game.title}</h5>
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