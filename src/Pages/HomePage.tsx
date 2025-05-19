import GameList from "../Components/GameList";
import UseVideoGames from "../Hook/UseVideoGame";


export default function HomePage() {

    const { inputSearch, setInputSearch,videogame } = UseVideoGames()
    return (
        <>
            <h1>questa è la home</h1>
            <label htmlFor="">cerca per titolo
                <input type="text" value={inputSearch} onChange={(e)=>setInputSearch(e.target.value)}/>
            </label>
            <GameList videogames={videogame}/>
        </>
    )
}