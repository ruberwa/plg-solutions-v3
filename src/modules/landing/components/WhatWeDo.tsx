import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { landingContent } from '../book/landing-book'

const { videos } = landingContent

type PanelProps = {
  className: string
  index: string
  count: string
  title: string
  body: string
  href: string
  visual: ReactNode
  copyClassName?: string
  visualFirst?: boolean
}

const Panel = ({
  className,
  index,
  count,
  title,
  body,
  href,
  visual,
  copyClassName = '',
  visualFirst = false,
}: PanelProps) => {
  const copy = (
    <div className={`wwd-copy ${copyClassName}`.trim()}>
      <span className="wwd-index">{index}</span>
      <h2>{title}</h2>
      <p>{body}</p>
      <Link className="home-wwd-link" to={href}>
        {landingContent.whatWeDo.link} <span>→</span>
      </Link>
    </div>
  )

  return (
    <article className={`wwd-panel ${className} home-wwd-panel`} data-wwd-panel="">
      <div className="wwd-panel-shell container-ultra">
        {visualFirst ? visual : copy}
        {visualFirst ? copy : visual}
        <span className="wwd-count">{count}</span>
      </div>
    </article>
  )
}

const WhatWeDo = () => (
  <>
    <section className="home-wwd-intro section">
      <div className="container container-ultra section-head">
        <div>
          <span className="eyebrow">{landingContent.whatWeDo.eyebrow}</span>
          <h2>{landingContent.whatWeDo.title}</h2>
        </div>
        <p>{landingContent.whatWeDo.lede}</p>
      </div>
    </section>

    <section aria-label="What we do" className="wwd-stack home-wwd-stack" data-wwd-stack="">
      <Panel
        className="wwd-panel-digital"
        index="01 / IDENTITY & VERIFICATION"
        count="01 / 06"
        title="Confirm identity once, securely."
        body="Verification infrastructure for banks, telecoms and government agencies, built around consent and reuse."
        href="/capabilities#identity"
        visual={(
          <div aria-label="Identity and verification interface illustration" className="wwd-visual cap-feature-visual visual-ui-system">
            <div className="ui-shell">
              <div className="ui-top"><i></i><i></i><i></i></div>
              <div className="ui-side"><span></span><span></span><span></span><span></span></div>
              <div className="ui-main">
                <div className="ui-card-line"></div>
                <div className="ui-card-line short"></div>
                <div className="ui-panels"><i></i><i></i><i></i></div>
                <div className="ui-progress"><i></i></div>
              </div>
              <div className="ui-cursor"></div>
            </div>
            <span className="wwd-visual-caption">IDENTITY / CONSENT / VERIFICATION</span>
          </div>
        )}
      />

      <Panel
        className="wwd-panel-integration"
        index="02 / SYSTEMS INTEGRATION"
        count="02 / 06"
        title="Connect institutions that have never shared data before."
        body="Connect existing platforms, devices and data sources so information moves reliably between institutions."
        href="/capabilities#integration"
        copyClassName="wwd-copy-glass"
        visualFirst
        visual={(
          <div aria-label="Connected systems globe illustration" className="wwd-globe-stage">
            <canvas aria-hidden="true" data-service-globe=""></canvas>
            <div className="globe-callout globe-callout-a">PLATFORM</div>
            <div className="globe-callout globe-callout-b">DATA</div>
            <div className="globe-callout globe-callout-c">DEVICE</div>
            <div className="globe-callout globe-callout-d">IDENTITY</div>
            <span className="wwd-visual-caption">SYSTEMS INTEGRATION / CONNECTED ENVIRONMENT</span>
          </div>
        )}
      />

      <Panel
        className="wwd-panel-data"
        index="03 / DATA & INTELLIGENCE"
        count="03 / 06"
        title="Turn distributed data into operational intelligence."
        body="Dashboards, analytics and automation for supervisors, analysts and frontline teams."
        href="/capabilities#data"
        copyClassName="wwd-copy-card"
        visualFirst
        visual={(
          <div aria-label="Operational data dashboard illustration" className="wwd-visual cap-feature-visual visual-data-system">
            <div className="data-kpi"><span>OPERATIONS</span><b>MONITORED</b></div>
            <div className="data-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div className="data-stream"><span></span><span></span><span></span><span></span></div>
            <div className="data-scan"></div>
            <span className="wwd-visual-caption">DATA / REPORTING / DECISION SUPPORT</span>
          </div>
        )}
      />

      <Panel
        className="wwd-panel-infrastructure"
        index="04 / INFRASTRUCTURE & CONTINUITY"
        count="04 / 06"
        title="Infrastructure designed for continuity."
        body="Cloud, hybrid and on-premise environments designed for availability, observability and recovery."
        href="/capabilities#infrastructure"
        visualFirst
        visual={(
          <div className="wwd-visual cap-feature-visual visual-video-system">
            <video aria-hidden="true" data-bg-video="" loop muted playsInline preload="none">
              <source src={videos.infrastructure} type="video/mp4" />
            </video>
            <div className="visual-video-shade"></div>
            <div className="server-telemetry">
              <span>PRIMARY ENVIRONMENT</span>
              <span>HYBRID PLATFORM</span>
              <span>RECOVERY PATH</span>
            </div>
            <div className="visual-video-grid"></div>
            <span className="wwd-visual-caption">INFRASTRUCTURE / CLOUD / CONTINUITY</span>
          </div>
        )}
      />

      <Panel
        className="wwd-panel-security"
        index="05 / SECURITY & RESILIENCE"
        count="05 / 06"
        title="Security designed in from the start."
        body="Security architecture aligned to regulatory requirements and operational risk."
        href="/capabilities#security"
        copyClassName="wwd-copy-security"
        visual={(
          <div aria-label="Cyber resilience illustration" className="wwd-visual cap-feature-visual visual-security">
            <div className="security-ring r-a"></div>
            <div className="security-ring r-b"></div>
            <div className="security-ring r-c"></div>
            <div className="security-shield"><i></i><span>PROTECTED</span></div>
            <div className="security-scan"></div>
            <span className="wwd-visual-caption">SECURITY / RESILIENCE / RECOVERY</span>
          </div>
        )}
      />

      <Panel
        className="wwd-panel-delivery"
        index="06 / DELIVERY"
        count="06 / 06"
        title="From plan to operational reality."
        body="Structured implementation, rollout and support that keeps projects grounded in outcomes."
        href="/capabilities#delivery"
        visual={(
          <div aria-label="Delivery roadmap illustration" className="wwd-visual cap-feature-visual visual-delivery">
            <div className="delivery-line"></div>
            <div className="delivery-point p1"><b>01</b><span>STRUCTURE</span></div>
            <div className="delivery-point p2"><b>02</b><span>DEFINE</span></div>
            <div className="delivery-point p3"><b>03</b><span>BUILD</span></div>
            <div className="delivery-point p4"><b>04</b><span>DEPLOY</span></div>
            <div className="delivery-point p5"><b>05</b><span>OPERATE</span></div>
            <div className="delivery-runner"></div>
            <span className="wwd-visual-caption">STRUCTURE / DEFINE / BUILD / DEPLOY / OPERATE</span>
          </div>
        )}
      />
    </section>
  </>
)

export default WhatWeDo
