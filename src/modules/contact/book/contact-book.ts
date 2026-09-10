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
    email: 'hello@plgsolutions.com',
    locationLabel: 'Location',
    address: ['PLG Building, KN 3 Ave', 'Opposite Kigali Serena Hotel', 'Kigali, Rwanda'],
  },
  form: {
    action: '/api/contact',
    enquiryTypes: [
      'Project enquiry',
      'Partnership',
      'Procurement',
      'Media & press',
      'Careers',
      'General enquiry',
    ],
    consent: 'I consent to PLG Solutions storing and using these details to respond to my enquiry.',
    submit: 'Start a conversation',
    sending: 'Sending…',
    note: 'We respond to enquiries within two working days.',
    success: "Thank you. We've received your enquiry and will respond within two working days.",
    error: "We couldn't send your enquiry. Please email hello@plgsolutions.com while the web form connection is being completed.",
  },
}
