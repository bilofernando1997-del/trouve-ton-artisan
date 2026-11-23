// Pied de page identique sur toutes les pages : pages légales et adresse de l'antenne de Lyon
import { Link } from 'react-router';

const LEGAL_LINKS = [
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/donnees-personnelles', label: 'Données personnelles' },
  { to: '/accessibilite', label: 'Accessibilité' },
  { to: '/cookies', label: 'Cookies' },
];

function Footer() {
  return (
    <footer className="site-footer text-white py-4 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <h2 className="h5">Antenne de Lyon</h2>
            <address className="mb-0">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </div>
          <div className="col-12 col-md-6">
            <h2 className="h5">Informations</h2>
            <nav aria-label="Pages légales">
              <ul className="list-unstyled mb-0">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
