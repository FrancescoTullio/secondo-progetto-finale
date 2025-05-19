// import UseVideoGames from "../Hook/UseVideoGame";

// function SearchBar() {
//   const { searchRef, searchVideogames } = UseVideoGames();

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault(); // Evita il refresh
//     console.log(`sono qui`);
//     searchVideogames(); // Lancia la fetch con il valore corrente
//   }

//   return (
//     <>
//       <h1>Sono la search</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="searchInput">Cerca per titolo</label>
//         <input type="text" id="searchInput" ref={searchRef} />
//         <button className="btn btn-primary" type="submit">Cerca</button>
//       </form>
//     </>
//   );
// }

// export default SearchBar;
