import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className="container">
                <Link to="/" className="logo text-decoration-none text-white">
                    <i className="bi bi-controller"></i>
                    GameZone
                </Link>
                
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/categories">Categorie</Link>
                    <Link to="/new-releases">Novità</Link>
                    <Link to="/top-rated">Top Rated</Link>
                </nav>
                
                
            </div>
        </header>
    );
}