import GameCard from "./GameCard";
import { TypeVideogameShort } from "../Type/Type";

type Props = {
  videogames: TypeVideogameShort[] | null;
};

function GameList({ videogames }: Props) {
  if (!videogames || videogames.length === 0) {
    return <p>Nessun videogioco trovato.</p>;
  }

  return (
    <>
      <div>
        <p>{videogames.length} risultati trovati</p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-2 justify-content-center">
        {videogames.map((curElem) => (
          <GameCard key={curElem.id} game={curElem} />
        ))}
      </div>
    </>
  );
}

export default GameList;
