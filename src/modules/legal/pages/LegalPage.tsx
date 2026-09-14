import { PageHero } from '../../../shared/components/SiteBlocks'
import { usePageMeta } from '../../../shared/hooks/usePlgEffects'

type LegalSection = {
  title: string
  body: string
}

type LegalPageProps = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; lede: string }
  updated: string
  sections: LegalSection[]
}

const LegalPage = ({ meta, hero, updated, sections }: LegalPageProps) => {
  usePageMeta(meta.title, meta.description)

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />
      <section className="section">
        <div className="container container-ultra legal-prose">
          <p className="legal-updated">Last updated {updated}</p>
          {sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default LegalPage
