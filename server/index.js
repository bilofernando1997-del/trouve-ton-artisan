// Petit serveur Node/Express qui reçoit le formulaire de contact et envoie l'e-mail.
// En développement, les mails partent vers MailDev (serveur mail local) : aucun artisan n'est dérangé.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import { readFileSync } from 'node:fs';

const {
  PORT = 3001,
  CLIENT_URL = 'http://localhost:5173',
  SMTP_HOST = 'localhost',
  SMTP_PORT = 1025,
  MAIL_FROM = 'no-reply@trouve-ton-artisan.fr',
  MAIL_TO, // adresse de réception définie dans l'environnement
} = process.env;

// Données des artisans (même fichier que le front)
const artisans = JSON.parse(readFileSync(new URL('../public/data/datas.json', import.meta.url), 'utf8'));

const app = express();
app.use(helmet()); // en-têtes HTTP de sécurité
app.use(cors({ origin: CLIENT_URL })); // seul notre site peut appeler l'API
app.use(express.json({ limit: '10kb' })); // refuse les requêtes trop lourdes

// Limite à 5 envois toutes les 15 minutes par adresse IP (anti-spam)
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5 });

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
});

// Échappe les caractères HTML pour éviter toute injection dans le mail
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const isText = (value, min, max) => typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { artisanId, name, email, subject, message, website } = req.body ?? {};

  // Champ piège rempli = robot : on fait semblant que tout va bien
  if (website) return res.status(200).json({ ok: true });

  // Validation côté serveur (on ne fait jamais confiance au navigateur)
  const artisan = artisans.find((a) => a.id === String(artisanId));
  if (
    !artisan ||
    !isText(name, 2, 100) ||
    !isText(email, 5, 100) || !EMAIL_REGEX.test(email.trim()) ||
    !isText(subject, 3, 150) ||
    !isText(message, 10, 2000)
  ) {
    return res.status(400).json({ ok: false, error: 'Données invalides' });
  }

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO || artisan.email,
      replyTo: email.trim(),
      subject: `[Trouve ton artisan] ${subject.trim().replace(/[\r\n]/g, ' ')}`,
      text: `Message pour ${artisan.name}\nDe : ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
      html: `<p>Message pour <strong>${escapeHtml(artisan.name)}</strong></p>
             <p>De : ${escapeHtml(name.trim())} (${escapeHtml(email.trim())})</p>
             <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>`,
    });
    res.json({ ok: true });
  } catch (error) {
    console.error('Erreur envoi mail :', error.message);
    res.status(500).json({ ok: false, error: 'Envoi impossible' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur de contact démarré sur http://localhost:${PORT}`);
});
