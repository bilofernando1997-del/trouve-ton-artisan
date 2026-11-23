// Hook qui met à jour le titre et la description de la page (référencement)
import { useEffect } from 'react';

const SITE_NAME = 'Trouve ton artisan';

export default function useSeo(title, description) {
  useEffect(() => {
    if (!title) return; // rien à faire (ex : la page 404 gère son propre titre)
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
