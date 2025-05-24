import GameCard from "./GameCard";
import { GameListProps } from "../Type/Type";

function GameList({ videogames }: GameListProps) {
  if (!videogames) {
    return (
      <div className="alert alert-info">
        Caricamento in corso...
      </div>
    );
  }

  if (videogames.length === 0) {
    return (
      <div className="alert alert-warning">
        Nessun videogioco trovato con i filtri selezionati.
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">
          <span className="badge bg-success">{videogames.length}</span> risultati trovati
        </p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {videogames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </>
  );
}

export default GameList;