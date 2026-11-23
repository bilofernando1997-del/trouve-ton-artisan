// Composant racine : définit la mise en page commune et toutes les routes du site
import { Routes, Route } from 'react-router';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ArtisanList from './pages/ArtisanList.jsx';
import ArtisanDetail from './pages/ArtisanDetail.jsx';
import LegalPage from './pages/LegalPage.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <>
      {/* Lien d'évitement pour les utilisateurs au clavier (accessibilité) */}
      <a href="#contenu" className="visually-hidden-focusable skip-link">
        Aller au contenu principal
      </a>
      <Header />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorie/:slug" element={<ArtisanList />} />
          <Route path="/recherche" element={<ArtisanList />} />
          <Route path="/artisan/:id" element={<ArtisanDetail />} />
          <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
          <Route path="/donnees-personnelles" element={<LegalPage title="Données personnelles" />} />
          <Route path="/accessibilite" element={<LegalPage title="Accessibilité" />} />
          <Route path="/cookies" element={<LegalPage title="Cookies" />} />
          {/* Toute autre adresse affiche la page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
