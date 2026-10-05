import { CATEGORY_LABELS } from '../categories';
import type { ContactChannel, Professional } from '../professional.types';

interface ProfessionalCardProps {
  professional: Professional;
}

const CHANNEL_LABELS: Record<ContactChannel, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  email: 'E-mail',
  site: 'Site',
};

function contactHref(channel: ContactChannel, value: string): string {
  switch (channel) {
    case 'whatsapp':
      return `https://wa.me/${value}`;
    case 'instagram':
      return `https://instagram.com/${value}`;
    case 'email':
      return `mailto:${value}`;
    case 'site':
      return value;
  }
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
      {professional.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- domínios das imagens ainda não definidos
        <img
          src={professional.coverImageUrl}
          alt=""
          loading="lazy"
          className="h-44 w-full object-cover"
        />
      ) : (
        <div aria-hidden="true" className="h-44 w-full bg-sand" />
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          {CATEGORY_LABELS[professional.category]}
        </p>
        <h2 className="mt-2 font-display text-xl">{professional.businessName}</h2>
        <p className="mt-2 flex-1 text-sm text-muted">{professional.shortDescription}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {professional.contacts.map((contact) => (
            <li key={`${contact.channel}-${contact.value}`}>
              <a
                href={contactHref(contact.channel, contact.value)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-ink px-3 py-1 text-sm text-gold hover:bg-ink hover:text-white"
              >
                {CHANNEL_LABELS[contact.channel]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
