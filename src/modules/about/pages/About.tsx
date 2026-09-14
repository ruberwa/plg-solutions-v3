import { aboutContent } from '../book/about-book'
import { usePageMeta } from '../../../shared/hooks/usePlgEffects'
import LocationsMap from '../../../shared/components/LocationsMap'

const About = () => {
  const { hero, statement, origin, mission, vision, values, partners, where, meta } = aboutContent
  usePageMeta(meta.title, meta.description)

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-world" aria-hidden="true">
          <div className="about-hero-sphere">
            <div className="cap-hero-globe-texture" />
            <div className="cap-hero-globe-gridlines" />
          </div>
          <canvas data-about-globe="" />
        </div>
        <div className="container container-ultra about-hero-copy">
          <span className="eyebrow eyebrow-light">{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.lede}</p>
        </div>
      </section>
      <section className="section about-intro">
        <div className="container container-ultra">
          <div className="about-intro-grid reveal">
            <p className="statement">{statement}</p>
            <div className="about-origin">
              <span className="eyebrow">{origin.eyebrow}</span>
              <p>{origin.body}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container container-ultra">
          <div className="grid-2 about-mission-grid">
            <article className="card reveal">
              <span className="card-num">Mission</span>
              <h3>{mission.title}</h3>
              <p>{mission.body}</p>
            </article>
            <article className="card reveal">
              <span className="card-num">Vision</span>
              <h3>{vision.title}</h3>
              <p>{vision.body}</p>
            </article>
          </div>
          <div className="values values-three reveal">
            {values.map((value) => (
              <div className="value" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section leadership-section" hidden>
        <div className="container container-ultra">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Who we are</span>
              <h2>Who we are</h2>
            </div>
            <p>Infrastructure is a long commitment. Who is behind it matters as much as what is built.</p>
          </div>
        </div>
      </section>
      <section className="section soft partners-section">
        <div className="container container-ultra">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">{partners.eyebrow}</span>
              <h2>{partners.title}</h2>
            </div>
            <p>{partners.lede}</p>
          </div>
          <div aria-label="Approved PLG Solutions technology partners" className="partner-logo-row" hidden></div>
        </div>
      </section>
      <section className="section where-operate-section">
        <div className="container container-ultra">
          <div className="where-operate-content reveal">
            <span className="eyebrow">{where.eyebrow}</span>
            <h2>{where.title}</h2>
            <LocationsMap />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
