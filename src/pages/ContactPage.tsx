import { type FormEvent, useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { SITE } from '../config/site';

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get('subject') || 'JSON Viewer question'));
    const body = encodeURIComponent(
      `Name: ${String(data.get('name') || 'Not provided')}\n\n${String(data.get('message') || '')}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <article className="legal-page">
      <PageMeta
        title={`Contact — ${SITE.name}`}
        description={`Contact the ${SITE.name} team at ${SITE.email}.`}
        path="/contact"
      />

      <p className="eyebrow">Contact</p>
      <h1>Contact us</h1>
      <p className="lede">
        Use this page for questions about the viewer, the guides, privacy, or a problem with the
        site. We read email from people, not automated JSON dumps.
      </p>

      <p>
        Email:{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <p>
        Please do not send passwords, access tokens, or production customer data. The contact form
        opens your email app; the message is not stored in the viewer.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" autoComplete="name" />
        </label>
        <label>
          Subject
          <input type="text" name="subject" required placeholder="Question about JSON Viewer" />
        </label>
        <label>
          Message
          <textarea name="message" required rows={6} placeholder="How can we help?" />
        </label>
        <button type="submit" className="btn btn--primary">
          Open email
        </button>
        {sent && <p className="form-note">Your email app should open with the message filled in.</p>}
      </form>
    </article>
  );
}
