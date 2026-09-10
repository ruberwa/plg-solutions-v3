import { useState } from 'react'
import type { FormEvent } from 'react'
import { contactContent } from '../book/contact-book'
import { PageHero } from '../../../shared/components/SiteBlocks'
import { usePageMeta } from '../../../shared/hooks/usePlgEffects'

const Contact = () => {
  const { hero, info, form, meta } = contactContent
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  usePageMeta(meta.title, meta.description)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formEl = event.currentTarget
    setStatus('idle')
    if (!formEl.reportValidity()) return
    setStatus('sending')
    try {
      const body = new FormData(formEl)
      const response = await fetch(form.action, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      formEl.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />
      <section className="section soft">
        <div className="container container-ultra contact-grid">
          <div className="contact-info reveal">
            <span className="eyebrow">{info.eyebrow}</span>
            <h2>{info.title}</h2>
            <p>{info.lede}</p>
            <p>
              <strong>{info.emailLabel}</strong>
              <br />
              <a href={`mailto:${info.email}`}>{info.email}</a>
            </p>
            <p>
              <strong>{info.locationLabel}</strong>
              <br />
              {info.address[0]}
              <br />
              {info.address[1]}
              <br />
              {info.address[2]}
            </p>
          </div>

          <form className="contact-form reveal" action={form.action} method="post" onSubmit={onSubmit}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required autoComplete="name" placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="org">Organisation</label>
                <input id="org" name="organisation" autoComplete="organization" placeholder="Organisation name" />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@organisation.com" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone <span className="field-optional">optional</span></label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+250 …" />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="country">Country</label>
                <input id="country" name="country" autoComplete="country-name" placeholder="Country" />
              </div>
              <div className="field">
                <label htmlFor="type">Enquiry type</label>
                <select id="type" name="enquiry_type" defaultValue={form.enquiryTypes[0]}>
                  {form.enquiryTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">What can we help with?</label>
              <textarea id="message" name="message" required placeholder="Tell us about the challenge, environment or outcome you need." />
            </div>
            <label className="consent-row" htmlFor="consent">
              <input id="consent" name="consent" type="checkbox" required />
              <span>{form.consent}</span>
            </label>
            <button className="btn primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? form.sending : form.submit}
            </button>
            <p className="form-response-note">{form.note}</p>
            <div className={`form-success${status === 'success' ? ' is-visible' : ''}`} role="status">{form.success}</div>
            <div className={`form-error${status === 'error' ? ' is-visible' : ''}`} role="alert">{form.error}</div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
