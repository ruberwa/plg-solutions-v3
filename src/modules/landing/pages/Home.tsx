import { landingContent } from '../../..';

const Home: React.FC = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primaryBg to-secondaryBg py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary">
            {landingContent.hero.title}
          </h1>
          <p className="mt-6 text-lg text-primaryLight max-w-2xl mx-auto">
            {landingContent.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-secondary text-primaryDark font-semibold hover:bg-secondaryLight transition-colors"
            >
              {landingContent.hero.primaryCta}
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white text-primary font-semibold shadow-amazon hover:bg-gray-100 transition-colors"
            >
              {landingContent.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-primary">
              {landingContent.features.title}
            </h2>
            <p className="mt-4 text-primaryLight">
              {landingContent.features.subtitle}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {landingContent.features.items.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl shadow-amazon p-6"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-primaryLight leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary">
            {landingContent.about.title}
          </h2>
          <p className="mt-6 text-primaryLight leading-relaxed">
            {landingContent.about.description}
          </p>
        </div>
      </section>

      <section id="cta" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">
            {landingContent.cta.title}
          </h2>
          <p className="mt-4 text-gray-300">
            {landingContent.cta.subtitle}
          </p>
          <a
            href="#features"
            className="inline-block mt-8 px-8 py-3 rounded-xl bg-secondary text-primaryDark font-semibold hover:bg-secondaryLight transition-colors"
          >
            {landingContent.cta.button}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
