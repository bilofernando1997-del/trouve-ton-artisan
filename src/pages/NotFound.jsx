// Page 404 affichée pour toute adresse inconnue
import { Link } from 'react-router';
import useSeo from '../services/useSeo.js';
import image404 from '../assets/404.svg';

function NotFound() {
  useSeo('Page introuvable', 'La page demandée n’existe pas.');

  return (
    <section className="container py-5 text-center">
      <img src={image404} alt="" className="img-fluid mb-4 not-found-img" width="320" height="220" />
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead">Oups ! La page que vous recherchez n’existe pas.</p>
      <Link to="/" className="btn btn-primary">Retour à l’accueil</Link>
    </section>
  );
}

export default NotFound;
