export const siteContact = {
  email: 'info@plgsolutions.com',
  phone: '+250781409013',
  phoneDisplay: '+250 781 409 013',
  hq: {
    label: 'HQ — Rwanda, Kigali',
    lines: ['PLG Building, KN 3rd street, Kiyovu'],
  },
  offices: [
    { label: 'Nigeria', line: 'Lagos' },
    { label: 'UAE', line: 'Dubai' },
  ],
}

export const officeLocations = [
  { country: 'Rwanda', code: 'rw', city: 'Kigali', latitude: -1.9441, longitude: 30.0619, detail: siteContact.hq.lines.join(', '), headquarters: true },
  { country: 'Nigeria', code: 'ng', city: 'Lagos', latitude: 6.5244, longitude: 3.3792, detail: 'Lagos office', headquarters: false },
  { country: 'United Arab Emirates', code: 'ae', city: 'Dubai', latitude: 25.2048, longitude: 55.2708, detail: 'Dubai office', headquarters: false },
]
