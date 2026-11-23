// Service d'accès aux données des artisans.
// Pour l'instant les données viennent du fichier JSON ; quand l'API sera prête,
// il suffira de changer DATA_URL sans toucher aux composants.

const DATA_URL = '/data/datas.json';

// Les 4 catégories du menu : slug utilisé dans l'URL -> nom dans les données
export const CATEGORIES = [
  { slug: 'batiment', name: 'Bâtiment' },
  { slug: 'services', name: 'Services' },
  { slug: 'fabrication', name: 'Fabrication' },
  { slug: 'alimentation', name: 'Alimentation' },
];

// Mise en cache pour ne charger le fichier qu'une seule fois
let cache = null;

// Récupère tous les artisans de manière asynchrone (fetch = AJAX)
export async function getArtisans() {
  if (cache) return cache;
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error('Impossible de charger les artisans');
  }
  cache = await response.json();
  return cache;
}

// Enlève les accents et met en minuscules pour comparer facilement ("Électricien" = "electricien")
export function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// Les 3 artisans du mois (champ "top" à true)
export async function getTopArtisans() {
  const artisans = await getArtisans();
  return artisans.filter((artisan) => artisan.top).slice(0, 3);
}

// Artisans d'une catégorie
export async function getArtisansByCategory(categoryName) {
  const artisans = await getArtisans();
  return artisans.filter((artisan) => artisan.category === categoryName);
}

// Recherche dans le nom, la spécialité et la ville uniquement
export async function searchArtisans(query) {
  const artisans = await getArtisans();
  const q = normalize(query);
  if (!q) return [];
  return artisans.filter(
    (artisan) =>
      normalize(artisan.name).includes(q) ||
      normalize(artisan.specialty).includes(q) ||
      normalize(artisan.location).includes(q)
  );
}

// Un artisan par son identifiant (undefined s'il n'existe pas)
export async function getArtisanById(id) {
  const artisans = await getArtisans();
  return artisans.find((artisan) => artisan.id === String(id));
}
