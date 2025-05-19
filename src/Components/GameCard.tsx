import { TypeVideogameShort } from "../Type/Type"


type Prop = {
    game: TypeVideogameShort
}

function GameCard({ game }: Prop) {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    {game.title}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{game.category}</h5>
                    
                    <a href="#" className="btn btn-primary">vai al dettaglio</a>
                </div>
            </div>
        </>
    )
}

export default GameCard