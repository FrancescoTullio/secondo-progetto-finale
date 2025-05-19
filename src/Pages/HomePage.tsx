import GameList from "../Components/GameList";
import UseVideoGames from "../Hook/UseVideoGame";

export default function HomePage() {
    const { 
        inputSearch, 
        setInputSearch, 
        videogame, 
        categories,
        selectedCategory,
        setSelectedCategory
    } = UseVideoGames();

    return (
        <>
            <h1>questa è la home</h1>
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <label htmlFor="searchInput" className="form-label">Cerca per titolo</label>
                    <input 
                        type="text" 
                        id="searchInput"
                        className="form-control"
                        value={inputSearch} 
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="categorySelect" className="form-label">Filtra per categoria</label>
                    <select 
                        id="categorySelect"
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Tutte le categorie</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <GameList videogames={videogame}/>
        </>
    );
}