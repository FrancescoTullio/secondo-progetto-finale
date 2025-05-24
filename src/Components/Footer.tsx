import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-col">
                    <h5>GameZone</h5>
                    <p>La tua destinazione definitiva per scoprire, confrontare e trovare i migliori videogiochi. Naviga tra le nostre categorie e crea la tua collezione ideale.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
                        <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                        <a href="#" aria-label="Discord"><i className="bi bi-discord"></i></a>
                    </div>
                </div>
                
                <div className="footer-col">
                    <h5>Navigazione</h5>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/categories">Categorie</Link></li>
                        <li><Link to="/new-releases">Nuove Uscite</Link></li>
                        <li><Link to="/top-rated">Meglio Votati</Link></li>
                    </ul>
                </div>
                
                <div className="footer-col">
                    <h5>Informazioni</h5>
                    <ul>
                        <li><Link to="/about">Chi Siamo</Link></li>
                        <li><Link to="/contact">Contattaci</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Termini di Servizio</Link></li>
                    </ul>
                </div>
                
                <div className="copyright">
                    &copy; {new Date().getFullYear()} GameZone. Tutti i diritti riservati.
                </div>
            </div>
        </footer>
    );
}