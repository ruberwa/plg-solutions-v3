# PLG Solutions — implementation notes

The client change list has been applied across Capabilities, Industries, About, Contact, navigation, CTAs, footer copy, sectors and the Homepage references that needed to stay consistent.

## Inputs still required before production launch

The change document requests several items that cannot be completed accurately from the supplied material alone:

1. **Live contact-form inbox / CRM endpoint**
   - The form is wired to `POST /api/contact` and only shows the approved success message after a successful HTTP response.
   - The production deployment must provide that endpoint, or replace the form action with the approved CRM/form-service endpoint.

2. **Approved privacy notice URL/content**
   - The consent checkbox and exact consent wording are present.
   - A privacy-notice link should be added once the approved notice is supplied.

3. **Footer corporate details**
   - Still required: exact registered entity name, company registration number, public phone number, LinkedIn URL, approved privacy-notice URL and terms URL.
   - Known address and email are already included.

4. **Leadership profiles**
   - The leadership section structure is built but held from public display until named leaders, approved photographs and substantive biographies are supplied.

5. **Partner logos**
   - The Partners section copy is present.
   - The logo row is held until written publication permission is confirmed for each partner.
