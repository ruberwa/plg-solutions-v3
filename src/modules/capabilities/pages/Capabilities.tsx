import { capabilitiesContent } from '../book/capabilities-book'
import { CtaSection, SectorRow } from '../../../shared/components/SiteBlocks'
import { usePageMeta } from '../../../shared/hooks/usePlgEffects'

const PlatformVisual = ({ type }: { type: string }) => {
  if (type === 'identity') {
    return (
      <div className="platform-visual identity-visual" aria-hidden="true">
        <div className="identity-ring ring-a"></div>
        <div className="identity-ring ring-b"></div>
        <div className="identity-core">ID</div>
        <span className="identity-node n1">BANK</span>
        <span className="identity-node n2">TELCO</span>
        <span className="identity-node n3">AGENCY</span>
      </div>
    )
  }
  if (type === 'exchange') {
    return (
      <div className="platform-visual exchange-visual" aria-hidden="true">
        <div className="exchange-hub">EXCHANGE</div>
        <span className="exchange-node ex1">01</span>
        <span className="exchange-node ex2">02</span>
        <span className="exchange-node ex3">03</span>
        <span className="exchange-node ex4">04</span>
        <i className="exchange-line l1"></i>
        <i className="exchange-line l2"></i>
        <i className="exchange-line l3"></i>
        <i className="exchange-line l4"></i>
      </div>
    )
  }
  if (type === 'registry') {
    return (
      <div className="platform-visual registry-visual" aria-hidden="true">
        <div className="record-stack r1"><span></span><span></span><span></span></div>
        <div className="record-stack r2"><span></span><span></span><span></span></div>
        <div className="record-stack r3"><span></span><span></span><span></span></div>
        <div className="registry-check">✓</div>
      </div>
    )
  }
  return (
    <div className="platform-visual border-visual" aria-hidden="true">
      <div className="border-lane"><span></span><span></span><span></span></div>
      <div className="border-gate"><i></i><i></i></div>
      <div className="border-scan"></div>
      <small>CLEARANCE / SCREENING / INSPECTION</small>
    </div>
  )
}

const Capabilities = () => {
  const { hero, intro, platforms, support, delivery, africa, cta, meta } = capabilitiesContent
  usePageMeta(meta.title, meta.description)

  return (
    <>
      <section className="cap-hero cap-hero-clean">
        <div className="cap-hero-fallback" aria-hidden="true">
          <div className="cap-hero-globe">
            <div className="cap-hero-globe-texture"></div>
            <div className="cap-hero-globe-gridlines"></div>
          </div>
        </div>
        <video className="cap-hero-video" data-bg-video="" muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={hero.video} type="video/mp4" />
        </video>
        <div className="cap-hero-shade" aria-hidden="true"></div>
        <canvas className="cap-hero-network" data-network-map="" aria-hidden="true"></canvas>
        <div className="cap-hero-grid" aria-hidden="true"></div>
        <div className="container container-ultra cap-hero-inner">
          <span className="eyebrow eyebrow-light">{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.lede}</p>
        </div>
        <div className="cap-hero-status">
          <span>{hero.statusLabel}</span>
          <b>{hero.statusValue}</b>
        </div>
      </section>

      <section className="section cap-national-intro">
        <div className="container container-ultra cap-intro-grid">
          <div>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2>{intro.title}</h2>
          </div>
          <div>
            <p>{intro.lede}</p>
          </div>
        </div>
      </section>

      <section className="section soft cap-platforms-section">
        <div className="container container-ultra">
          <div className="cap-platform-grid">
            {platforms.map((platform) => (
              <article className="platform-card reveal" id={platform.id} key={platform.id}>
                <div className="platform-card-copy">
                  <span className="platform-num">{platform.num}</span>
                  <h2>{platform.title}</h2>
                  <p>{platform.body}</p>
                </div>
                <PlatformVisual type={platform.visual} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section national-scale-block">
        <div className="container container-ultra">
          <div className="section-head national-scale-head reveal">
            <div>
              <span className="eyebrow">{support.eyebrow}</span>
              <h2>{support.title}</h2>
            </div>
            <p>{support.lede}</p>
          </div>
          <div className="support-cap-grid">
            {support.items.map((item) => (
              <article className="support-cap reveal" id={item.id} key={item.id}>
                <span className="support-cap-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="support-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {'status' in item && item.status ? (
                  <div className="support-status">
                    <span>{item.status.label}</span>
                    <b>{item.status.value}</b>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="delivery-operate" id="delivery">
        <div className="container container-ultra delivery-operate-grid">
          <div className="delivery-operate-copy reveal">
            <span className="eyebrow eyebrow-light">{delivery.eyebrow}</span>
            <h2>{delivery.title}</h2>
            <p>{delivery.lede}</p>
          </div>
          <div className="delivery-five reveal" aria-label="PLG Solutions delivery lifecycle">
            {delivery.stages.map((stage) => (
              <div className="delivery-five-stage" key={stage.index}>
                <b>{stage.index}</b>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </div>
            ))}
            <div className="delivery-five-strip">{delivery.strip}</div>
          </div>
        </div>
      </section>

      <section className="section africa-section">
        <div className="container container-ultra">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">{africa.eyebrow}</span>
              <h2>{africa.title}</h2>
            </div>
            <p>{africa.lede}</p>
          </div>
          <div className="africa-point-grid">
            {africa.points.map((point) => (
              <article className="africa-point reveal" key={point.index}>
                <span>{point.index}</span>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectorRow />
      <CtaSection title={cta.title} body={cta.body} />
    </>
  )
}

export default Capabilities
