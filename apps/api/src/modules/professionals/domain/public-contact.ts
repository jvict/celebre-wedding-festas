import { ValidationError } from '../../../shared/domain/domain-error.js';

export const CONTACT_CHANNELS = ['whatsapp', 'instagram', 'email', 'site'] as const;

export type ContactChannel = (typeof CONTACT_CHANNELS)[number];

function isContactChannel(value: string): value is ContactChannel {
  return (CONTACT_CHANNELS as readonly string[]).includes(value);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INSTAGRAM_PATTERN = /^[A-Za-z0-9._]{1,30}$/;

/**
 * Canal de contato público do profissional (RF05).
 * É o único contato exibido na vitrine; dados de clientes nunca passam por aqui (RN01).
 */
export class PublicContact {
  private constructor(
    readonly channel: ContactChannel,
    readonly value: string,
  ) {}

  static create(channel: string, rawValue: string): PublicContact {
    if (!isContactChannel(channel)) {
      throw new ValidationError(`Canal de contato inválido: ${channel}.`);
    }
    return new PublicContact(channel, PublicContact.normalize(channel, rawValue.trim()));
  }

  private static normalize(channel: ContactChannel, value: string): string {
    switch (channel) {
      case 'whatsapp': {
        const digits = value.replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 13) {
          throw new ValidationError('WhatsApp deve ter entre 10 e 13 dígitos (com DDD).');
        }
        return digits;
      }
      case 'instagram': {
        const handle = value.replace(/^@/, '');
        if (!INSTAGRAM_PATTERN.test(handle)) {
          throw new ValidationError('Usuário do Instagram inválido.');
        }
        return handle;
      }
      case 'email': {
        if (!EMAIL_PATTERN.test(value)) {
          throw new ValidationError('E-mail de contato inválido.');
        }
        return value.toLowerCase();
      }
      case 'site': {
        if (!isHttpUrl(value)) {
          throw new ValidationError('O site deve ser uma URL http(s) válida.');
        }
        return value;
      }
    }
  }
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
