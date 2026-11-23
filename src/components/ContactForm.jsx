// Formulaire de contact : validation côté client puis envoi asynchrone au serveur mail
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY_FORM = { name: '', email: '', subject: '', message: '', website: '' };

// Retourne un objet { champ: message d'erreur } (vide si tout est valide)
function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Veuillez indiquer votre nom (2 caractères minimum).';
  if (!EMAIL_REGEX.test(values.email.trim())) errors.email = 'Veuillez indiquer une adresse e-mail valide.';
  if (values.subject.trim().length < 3) errors.subject = 'Veuillez indiquer l’objet (3 caractères minimum).';
  if (values.message.trim().length < 10) errors.message = 'Votre message doit contenir au moins 10 caractères.';
  return errors;
}

function ContactForm({ artisanId }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // L'envoi se fait à la soumission du formulaire (touche Entrée ou bouton)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setStatus('sending');
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, artisanId }),
      });
      if (!response.ok) throw new Error('Envoi refusé');
      setStatus('success');
      setValues(EMPTY_FORM);
    } catch {
      setStatus('error');
    }
  };

  // Petite fonction pour éviter de répéter le code de chaque champ
  const field = (name, label, type = 'text', maxLength = 100) => (
    <div className="mb-3">
      <label htmlFor={`contact-${name}`} className="form-label">{label} <span aria-hidden="true">*</span></label>
      {type === 'textarea' ? (
        <textarea
          id={`contact-${name}`} name={name} rows="6" maxLength={maxLength} required
          className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
          value={values[name]} onChange={handleChange}
          aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `erreur-${name}` : undefined}
        />
      ) : (
        <input
          id={`contact-${name}`} name={name} type={type} maxLength={maxLength} required
          autoComplete={name === 'subject' ? 'off' : name}
          className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
          value={values[name]} onChange={handleChange}
          aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `erreur-${name}` : undefined}
        />
      )}
      {errors[name] && <div id={`erreur-${name}`} className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form bg-white p-4 rounded shadow-sm">
      <p className="small">Les champs marqués d’un astérisque (*) sont obligatoires.</p>
      {field('name', 'Nom')}
      {field('email', 'E-mail', 'email')}
      {field('subject', 'Objet', 'text', 150)}
      {field('message', 'Message', 'textarea', 2000)}

      {/* Champ piège anti-robots : invisible pour les humains, rempli par les robots */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Ne pas remplir ce champ</label>
        <input id="contact-website" name="website" type="text" tabIndex="-1" autoComplete="off" value={values.website} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer'}
      </button>

      {/* Zone annoncée par les lecteurs d'écran */}
      <div aria-live="polite" className="mt-3">
        {status === 'success' && <p className="alert alert-success mb-0">Votre message a bien été envoyé. Une réponse vous sera apportée sous 48h.</p>}
        {status === 'error' && <p className="alert alert-danger mb-0">L’envoi a échoué. Veuillez réessayer plus tard.</p>}
      </div>
    </form>
  );
}

export default ContactForm;
