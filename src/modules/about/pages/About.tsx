import { aboutContent } from '../book/about-book'
import { PageHero } from '../../../shared/components/SiteBlocks'
import { usePageMeta } from '../../../shared/hooks/usePlgEffects'

const About = () => {
  const { hero, statement, origin, mission, vision, values, partners, where, meta } = aboutContent
  usePageMeta(meta.title, meta.description)

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />
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
          <div className="where-operate-card reveal">
            <span className="eyebrow">{where.eyebrow}</span>
            <h2>{where.title}</h2>
            <div aria-hidden="true" className="where-operate-map">
              <span>KIGALI</span>
              <i></i><i></i><i></i>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
