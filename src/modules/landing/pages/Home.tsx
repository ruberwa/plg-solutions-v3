import { Link } from 'react-router-dom'
import { landingContent } from '../book/landing-book'
import { CtaSection, SectorRow } from '../../../shared/components/SiteBlocks'
import { usePageMeta } from '../../../shared/hooks/usePlgEffects'
import WhatWeDo from '../components/WhatWeDo'

const Home = () => {
  const { hero, signals, connected, approach, cta, videos } = landingContent
  usePageMeta(landingContent.meta.title, landingContent.meta.description)

  return (
    <>
      <section className="hero hero-full">
        <div aria-hidden="true" className="hero-globe-fallback">
          <div className="hero-globe-orbit orbit-one"></div>
          <div className="hero-globe-orbit orbit-two"></div>
          <div className="hero-globe-sphere">
            <div className="hero-globe-texture"></div>
            <div className="hero-globe-gridlines"></div>
            <div className="hero-globe-light"></div>
          </div>
        </div>
        <video aria-hidden="true" autoPlay className="hero-bg-video" data-bg-video="" loop muted playsInline preload="metadata">
          <source src={videos.hero} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="hero-full-scrim"></div>
        <div aria-hidden="true" className="hero-full-grid"></div>
        <div className="container container-ultra hero-full-inner">
          <div className="hero-full-copy reveal visible">
            <h1 className="display hero-statement">
              <span className="hero-title-primary">{hero.titlePrimary}</span>
              <span className="hero-title-secondary">{hero.titleSecondary}</span>
            </h1>
            <p className="lede">{hero.lede}</p>
            <div className="btns">
              <Link className="btn hero-primary" to="/capabilities">{hero.primaryCta} <span>→</span></Link>
              <Link className="btn hero-secondary" to="/contact">{hero.secondaryCta}</Link>
            </div>
          </div>
          <div aria-label="Illustrative delivery indicators" className="hero-telemetry">
            {hero.telemetry.map((item) => (
              <div key={item.label} className={item.live ? 'hero-live' : undefined}>
                <span>{item.label}</span>
                <b>{item.value}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="container container-ultra hero-brandline hero-brandline-dark">
          <span>{hero.brandline}</span>
          <small>{hero.brandlineSmall}</small>
        </div>
      </section>

      <section aria-label="PLG Solutions delivery principles" className="signal-strip">
        <div className="container container-ultra signal-grid">
          {signals.map((signal) => (
            <div key={signal.index}>
              <span>{signal.index}</span>
              <b>{signal.title}</b>
              <small>{signal.body}</small>
            </div>
          ))}
          <div className="signal-status"><b>DEPENDABLE BY DESIGN</b></div>
        </div>
      </section>

      <WhatWeDo />

      <section className="connected-stage">
        <video aria-hidden="true" className="connected-bg-video" data-bg-video="" loop muted playsInline preload="none">
          <source src={videos.infrastructure} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="connected-stage-shade"></div>
        <canvas aria-hidden="true" className="connected-network" data-network-map=""></canvas>
        <div aria-hidden="true" className="connected-stage-grid"></div>
        <div className="container container-ultra connected-stage-inner">
          <div className="connected-topline reveal">
            <span className="eyebrow eyebrow-light">{connected.eyebrow}</span>
            <div className="connected-live">{connected.live}</div>
          </div>
          <div className="connected-message reveal">
            <h2>{connected.title}</h2>
            <p>{connected.lede}</p>
          </div>
          <div className="connected-cards">
            {connected.cards.map((card, index) => (
              <article className="connected-card reveal" key={card.index}>
                {index === 0 && <div className="connected-card-signal"><i></i><i></i><i></i></div>}
                {index === 1 && <div className="connected-card-wave"><i></i><i></i><i></i><i></i></div>}
                {index === 2 && <div className="connected-card-decision"><i></i><i></i><i></i></div>}
                <b>{card.index}</b>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectorRow heading={landingContent.sectorsHeading} className="home-sector-row" />

      <section className="section dark">
        <div className="container container-ultra approach">
          <div className="approach-copy reveal">
            <span className="eyebrow" style={{ color: '#7ea8cc' }}>{approach.eyebrow}</span>
            <h2>{approach.title}</h2>
            <p style={{ color: '#b7c4d3' }}>{approach.lede}</p>
            <div className="approach-image">
              <img alt="Institutional operations centre" loading="lazy" src={approach.image} />
              <span>{approach.imageCaption}</span>
            </div>
          </div>
          <div className="steps">
            {approach.steps.map((step) => (
              <div className="step reveal" key={step.index}>
                <b>{step.index}</b>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={<>{cta.title}<br />{cta.titleLine2}</>}
        body={cta.body}
      />
    </>
  )
}

export default Home
