const clientLogos = [
  'NovaEdge',
  'BlueOrbit',
  'Zenbyte',
  'Aether Labs',
  'KineticOne',
  'Northstar',
  'PulseGrid',
  'Veridian',
];

const marqueeClients = [...clientLogos, ...clientLogos];

const OurClients = () => {
  return (
    <section id="clients" className="relative py-12 sm:py-14 lg:py-16 section-gradient-1 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Our Clients</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
            Trusted by ambitious teams
          </h2>
          <p className="text-base lg:text-lg text-slate-400 leading-relaxed">
            We partner with growth-focused businesses to build products that scale.
          </p>
        </div>

        <div className="relative scroll-reveal overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 lg:w-28 bg-gradient-to-r from-[var(--theme-page-bg)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 lg:w-28 bg-gradient-to-l from-[var(--theme-page-bg)] to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            {marqueeClients.map((client, index) => (
              <div
                key={`${client}-${index}`}
                className="mx-2 sm:mx-3 lg:mx-4 min-w-[150px] sm:min-w-[180px] rounded-xl border border-white/10 bg-white/[0.05] px-3 sm:px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--theme-accent-purple)] to-[var(--theme-accent-orange)] flex items-center justify-center">
                    <span className="text-xs font-bold text-white keep-white">{client.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-semibold text-white tracking-wide">{client}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
