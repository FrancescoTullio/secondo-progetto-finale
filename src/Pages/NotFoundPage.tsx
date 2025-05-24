import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Crea un effetto di countdown che si riduce ogni secondo
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Reindirizza alla home page quando il conteggio arriva a zero
      navigate('/');
    }
  }, [countdown, navigate]);
  
  return (
    <div className="not-found-container">
      <div className="not-found-content text-center">
        <div className="glitch-container">
          <h1 className="glitch-text">404</h1>
        </div>
        
        <h2>Pagina non trovata</h2>
        
        <div className="not-found-illustration">
          <i className="bi bi-controller"></i>
          <div className="not-found-pacman"></div>
        </div>
        
        <p className="lead">
          Oops! Sembra che tu stia cercando di raggiungere un livello che non esiste.
        </p>
        
        <div className="mt-4 mb-5">
          <p>Possibili cause:</p>
          <ul className="list-unstyled">
            <li><i className="bi bi-dash me-2"></i>Il link che hai seguito potrebbe essere obsoleto</li>
            <li><i className="bi bi-dash me-2"></i>La pagina potrebbe essere stata spostata o rinominata</li>
            <li><i className="bi bi-dash me-2"></i>Potresti aver digitato manualmente un URL errato</li>
          </ul>
        </div>
        
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary me-3">
            <i className="bi bi-house-door me-2"></i>
            Torna alla Home
          </Link>
          
          <Link to="/" className="btn btn-outline-primary">
            <i className="bi bi-controller me-2"></i>
            Esplora i giochi
          </Link>
        </div>
        
        <div className="not-found-redirect mt-4">
          <div className="progress" style={{ height: '4px' }}>
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{ width: `${(10-countdown) * 10}%` }}
              aria-valuenow={(10-countdown) * 10} 
              aria-valuemin={0} 
              aria-valuemax={100}
            ></div>
          </div>
          <p className="mt-2">
            {countdown > 0 ? (
              <>
                Sarai reindirizzato alla Home Page tra <strong>{countdown}</strong> secondi...
              </>
            ) : (
              <span>Reindirizzamento...</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}