import GameList from "../Components/GameList";
import UseVideoGames from "../Hook/UseVideoGame";

export default function HomePage() {
    const { 
        inputSearch, 
        setInputSearch, 
        videogame, 
        categories = [], // Fornisce un valore predefinito vuoto
        selectedCategory,
        setSelectedCategory,
        sortOption,
        setSortOption
    } = UseVideoGames();

    return (
        <>
            <h1>questa è la home</h1>
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <label htmlFor="searchInput" className="form-label">Cerca per titolo</label>
                    <input 
                        type="text" 
                        id="searchInput"
                        className="form-control"
                        value={inputSearch} 
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="categorySelect" className="form-label">Filtra per categoria</label>
                    <select 
                        id="categorySelect"
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Tutte le categorie</option>
                        {categories && categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="sortSelect" className="form-label">Ordina per</label>
                    <select 
                        id="sortSelect"
                        className="form-select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as any)}
                    >
                        <option value="">Nessun ordinamento</option>
                        <option value="title_asc">Titolo (A-Z)</option>
                        <option value="title_desc">Titolo (Z-A)</option>
                        <option value="category_asc">Categoria (A-Z)</option>
                        <option value="category_desc">Categoria (Z-A)</option>
                    </select>
                </div>
            </div>
            <GameList videogames={videogame}/>
        </>
    );
}