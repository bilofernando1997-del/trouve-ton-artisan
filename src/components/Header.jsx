// En-tête présent sur toutes les pages : logo, menu des catégories et barre de recherche
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { CATEGORIES } from '../services/artisanService.js';
import logo from '../assets/logo.png';

function Header() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // À la soumission, on va sur la page de résultats avec le terme dans l'URL
  const handleSubmit = (event) => {
    event.preventDefault();
    const term = query.trim();
    if (term) {
      navigate(`/recherche?q=${encodeURIComponent(term)}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="site-header bg-white shadow-sm">
      <div className="container d-flex flex-wrap align-items-center justify-content-between py-2">
        <Link to="/" aria-label="Trouve ton artisan, retour à l'accueil">
          <img src={logo} alt="Trouve ton artisan ! Avec la région Auvergne-Rhône-Alpes" className="site-logo" width="213" height="46" />
        </Link>

        {/* Bouton du menu, visible seulement sur mobile */}
        <button
          type="button"
          className="btn btn-outline-primary d-lg-none"
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>

        <div id="menu-principal" className={`header-menu ${menuOpen ? 'is-open' : ''}`}>
          <nav aria-label="Catégories d'artisans">
            <ul className="nav flex-column flex-lg-row">
              {CATEGORIES.map((category) => (
                <li className="nav-item" key={category.slug}>
                  <NavLink className="nav-link" to={`/categorie/${category.slug}`} onClick={() => setMenuOpen(false)}>
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <form className="d-flex my-2 my-lg-0" role="search" onSubmit={handleSubmit}>
            <label htmlFor="recherche" className="visually-hidden">Rechercher un artisan</label>
            <input
              id="recherche"
              type="search"
              className="form-control"
              placeholder="Nom, spécialité, ville…"
              maxLength={50}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" className="btn btn-primary ms-2">Rechercher</button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
