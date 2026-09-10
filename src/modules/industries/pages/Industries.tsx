import { industriesContent } from '../book/industries-book'
import { CtaSection, PageHero } from '../../../shared/components/SiteBlocks'
import { usePageMeta } from '../../../shared/hooks/usePlgEffects'

const Industries = () => {
  const { hero, items, cta, meta } = industriesContent
  usePageMeta(meta.title, meta.description)

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />
      <section className="section soft">
        <div className="container container-ultra">
          <div className="industry-grid industry-grid-five">
            {items.map((item) => (
              <article className="industry reveal" id={item.id} key={item.id}>
                <div className="icon">{item.icon}</div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <div className="industry-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaSection title={cta.title} body={cta.body} />
    </>
  )
}

export default Industries
