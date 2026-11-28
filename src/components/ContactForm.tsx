import { useState, type FormEvent } from 'react';
import { CONTACT_ENDPOINT, SITE } from '../lib/config';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const n = name.trim();
    const em = senderEmail.trim();
    const msg = message.trim();

    if (!n || !em || !msg) {
      setStatus('error');
      setFeedback('Please fill in your name, email, and message.');
      return;
    }

    if (!EMAIL_RE.test(em)) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    if (!CONTACT_ENDPOINT) {
      setStatus('error');
      setFeedback(
        `Form backend is not configured yet. Your message is preserved — please email ${SITE.email} directly.`,
      );
      return;
    }

    setStatus('sending');
    setFeedback('Sending your message...');

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name: n, email: em, message: msg }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setStatus('success');
      setFeedback('Message delivered. Thank you for reaching out!');
      setName('');
      setSenderEmail('');
      setMessage('');
    } catch (err) {
      const detail = err instanceof Error ? err.message : 'Network error';
      setStatus('error');
      setFeedback(
        `Could not deliver message (${detail}). Your text is preserved — please use ${SITE.email} directly.`,
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-semibold text-[#D4D4D8]"
          >
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border-0 bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#FFFFFF] placeholder:text-[#71717A] focus:ring-1 focus:ring-white/40 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-semibold text-[#D4D4D8]"
          >
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={senderEmail}
            onChange={e => setSenderEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border-0 bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#FFFFFF] placeholder:text-[#71717A] focus:ring-1 focus:ring-white/40 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-semibold text-[#D4D4D8]"
        >
          Project or inquiry details
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Tell me about the backend architecture, APIs, integrations, or freelance scope..."
          className="w-full rounded-xl border-0 bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#FFFFFF] placeholder:text-[#71717A] focus:ring-1 focus:ring-white/40 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="cursor-pointer rounded-full bg-[#FFFFFF] px-6 py-2.5 text-sm font-bold text-[#080808] shadow-md transition-all hover:bg-[#E4E4E7] disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        <div className="text-xs text-[#8E8E93]">
          Fallback:{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-[#FFFFFF] underline hover:text-[#E4E4E7]"
          >
            {SITE.email}
          </a>
        </div>
      </div>

      {feedback && (
        <p
          role={status === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          className={`rounded-xl px-3.5 py-2.5 text-xs font-medium ${
            status === 'success'
              ? 'bg-emerald-500/15 text-emerald-400'
              : 'bg-rose-500/15 text-rose-400'
          }`}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
