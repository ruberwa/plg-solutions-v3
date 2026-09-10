import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { sectorLine, sectors } from '../book/shared-sectors-book'

type CtaSectionProps = {
  title: ReactNode
  body: string
  button?: string
}

export const CtaSection = ({ title, body, button = 'Start a conversation' }: CtaSectionProps) => (
  <section className="cta">
    <div className="container container-ultra">
      <div className="cta-box reveal">
        <div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <Link className="btn" to="/contact">{button}</Link>
      </div>
    </div>
  </section>
)

type SectorRowProps = {
  heading?: string
  className?: string
}

export const SectorRow = ({ heading = 'Where we work', className = '' }: SectorRowProps) => (
  <section className={`section soft sector-row-section ${className}`.trim()}>
    <div className="container container-ultra">
      <div className="section-head reveal">
        <div>
          <span className="eyebrow">Where we work</span>
          <h2>{heading}</h2>
        </div>
        <p>{sectorLine}</p>
      </div>
      <div className="sector-icon-row">
        {sectors.map((sector) => (
          <Link className="sector-link reveal" to={sector.to} key={sector.to}>
            <span className="sector-icon">{sector.icon}</span>
            <b>{sector.label}</b>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

type PageHeroProps = {
  eyebrow: string
  title: string
  lede: string
}

export const PageHero = ({ eyebrow, title, lede }: PageHeroProps) => (
  <section className="page-hero">
    <div className="container container-ultra">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{lede}</p>
    </div>
  </section>
)
