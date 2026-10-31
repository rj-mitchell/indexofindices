// Where methodology feedback goes (shown publicly on the site). While empty, the beta notice
// shows without a contact link and the other feedback links are hidden.
export const FEEDBACK_EMAIL = 'admin@wherelivesstand.com';

export const feedbackMailto = (subject = 'Where Lives Stand: methodology feedback') =>
  FEEDBACK_EMAIL ? `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}` : null;
