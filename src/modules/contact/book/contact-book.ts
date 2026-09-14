import { siteContact } from '../../../shared/book/shared-contact-book'

export const contactContent = {
  meta: {
    title: 'Contact | PLG Solutions',
    description: 'Contact PLG Solutions in Kigali about a project, partnership or procurement enquiry.',
  },
  hero: {
    eyebrow: 'Contact',
    title: 'Talk to our team.',
    lede: "Tell us what you're building, and we'll route your enquiry to the right person.",
  },
  info: {
    eyebrow: 'Start a conversation',
    title: 'Send us an enquiry',
    lede: 'Tell us about your project, partnership or procurement enquiry.',
    emailLabel: 'Email',
    email: siteContact.email,
    phoneLabel: 'Phone',
    phone: siteContact.phone,
    phoneDisplay: siteContact.phoneDisplay,
    locationLabel: 'Locations',
    hq: siteContact.hq,
    offices: siteContact.offices,
  },
  form: {
    name: 'contact',
    action: '/',
    enquiryTypes: [
      'Project enquiry',
      'Partnership',
      'Procurement',
      'Media & press',
      'Careers',
      'General enquiry',
    ],
    consentBefore: 'I consent to PLG Solutions storing and using these details to respond to my enquiry. See our ',
    consentLink: 'privacy notice',
    consentAfter: '.',
    submit: 'Start a conversation',
    sending: 'Sending…',
    note: 'We respond to enquiries within two working days.',
    success: "Thank you. We've received your enquiry and will respond within two working days.",
    error: `We couldn't send your enquiry. Please email ${siteContact.email}.`,
  },
}
