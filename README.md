# Trouve ton artisan

Plateforme de la région Auvergne-Rhône-Alpes permettant aux particuliers de trouver un artisan et de le contacter via un formulaire.

## Technologies

- React 19 + React Router 7 (projet créé avec Vite)
- Bootstrap 5.3 et Sass
- Node.js / Express + Nodemailer pour l'envoi du formulaire de contact
- MailDev comme serveur de mail local en développement

## Prérequis

- Node.js 20.6 ou plus récent (avec npm)
- Git
- MailDev (installé globalement ou via Docker)

## Installation

```bash
git clone https://github.com/<votre-compte>/trouve-ton-artisan.git
cd trouve-ton-artisan
npm install
cp .env.example .env
cp server/.env.example server/.env
```

## Lancement en développement

Ouvrir trois terminaux :

```bash
# 1. Serveur de mail local (interface sur http://localhost:1080)
npx maildev
# ou : docker run -p 1080:1080 -p 1025:1025 maildev/maildev

# 2. Serveur d'envoi du formulaire de contact (http://localhost:3001)
npm run server

# 3. Site React (http://localhost:5173)
npm run dev
```

Les messages envoyés depuis le formulaire apparaissent dans l'interface MailDev.

## Variables d'environnement

| Fichier | Variable | Rôle |
|---|---|---|
| `.env` | `VITE_API_URL` | Adresse du serveur de contact |
| `server/.env` | `PORT` | Port du serveur de contact |
| `server/.env` | `CLIENT_URL` | Seule origine autorisée à appeler l'API (CORS) |
| `server/.env` | `SMTP_HOST`, `SMTP_PORT` | Serveur SMTP (MailDev : localhost / 1025) |
| `server/.env` | `MAIL_FROM` | Expéditeur des e-mails |
| `server/.env` | `MAIL_TO` | Adresse qui reçoit les messages (si vide : e-mail de l'artisan) |

## Production

```bash
npm run build     # génère le dossier dist/
npm run preview   # prévisualise le build
```

Le site est hébergé sur Netlify (configuration dans `netlify.toml` : redirections pour le router et en-têtes de sécurité).

## Structure du projet

```
public/data/datas.json   Données des artisans (en attendant l'API)
src/components/          Composants réutilisables (Header, Footer, ArtisanCard, Stars, ContactForm)
src/pages/               Pages (Home, ArtisanList, ArtisanDetail, LegalPage, NotFound)
src/services/            Accès aux données et référencement (artisanService, useSeo)
src/styles/main.scss     Styles Sass + personnalisation de Bootstrap
server/index.js          Serveur d'envoi des e-mails
```
