import { SITE_CONFIG } from '../constants/site';

export function formatPrice(amount) {
  return `${amount.toLocaleString('en-US')} ${SITE_CONFIG.currency}`;
}

export function formatPriceShort(amount) {
  return `${amount.toLocaleString('en-US')}`;
}