import { Users, TrendingUp, Rocket } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Team',
    description: '2+ years of hands-on delivery in modern web, cloud, and AI technologies.',
    gradient: 'from-[#3c66ad] to-[#5f8bd4]',
    highlight: 'border-[#3c66ad]/30',
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    description: '12 successful projects with measurable business impact.',
    gradient: 'from-[#6f48d7] to-[#9b6bf2]',
    highlight: 'border-[#6f48d7]/30',
  },
  {
    icon: Rocket,
    title: 'End-to-End Support',
    description: 'From concept to deployment and ongoing maintenance.',
    gradient: 'from-[#ff6b35] to-[#ff9e5c]',
    highlight: 'border-orange-500/30',
  },
];

const FeatureGrid = () => {
  return (
    <section id="features" className="relative py-12 sm:py-14 lg:py-16 section-gradient-dark">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
            top: '-20%',
            left: '-20%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            bottom: '-10%',
            right: '-10%',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Why Choose Xenura?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            Let's build the future together
          </h2>
          <p className="text-base lg:text-lg text-slate-400 leading-relaxed">
            Ready to transform your vision into reality? Our experts are here to help
            you create exceptional digital experiences.
          </p>
        </div>

        {/* Features Grid - Bento Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => {
            const FIcon = feature.icon;
            return (
              <div key={feature.title} className={`scroll-reveal delay-${(index + 1) * 100}`}>
                <div className={`rounded-2xl p-5 sm:p-6 lg:p-8 h-full border ${feature.highlight} hover:border-opacity-60 transition-all duration-500 group relative overflow-hidden bg-[#0b2a5a]/65 hover:bg-[#113873]/72 backdrop-blur-md shadow-[0_18px_48px_rgba(3,12,34,0.38)]`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <FIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-sm lg:text-base text-slate-200 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;