import { siteContact } from './shared-contact-book'

export const footerContent = {
  logoSrc: '/assets/plg-logo.jpeg',
  logoAlt: 'PLG Solutions',
  blurb: 'PLG Solutions · Kigali, Rwanda · Building digital infrastructure for African institutions.',
  exploreTitle: 'Explore',
  contactTitle: 'Contact',
  legalTitle: 'Legal',
  email: siteContact.email,
  phone: siteContact.phone,
  phoneDisplay: siteContact.phoneDisplay,
  hq: siteContact.hq,
  offices: siteContact.offices,
  tagline: 'Advanced technology, grounded delivery.',
  links: [
    { label: 'Capabilities', to: '/capabilities' },
    { label: 'Industries', to: '/industries' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  legalLinks: [
    { label: 'Privacy notice', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
  ],
}
