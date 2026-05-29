import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Xenura has been a reliable partner for our website and inquiry forms over the past year. Their prompt support and clear communication have helped us stay on track.',
    name: 'Karthik Rajan',
    role: 'HR Manager',
    initials: 'KR',
    avatarClass: 'from-[#5b4fc7] to-[#3d358f]',
    ringClass: 'ring-violet-200/80',
    rating: 5,
  },
  {
    quote:
      'The work on our admin dashboard and lead workflow has been instrumental in streamlining how we handle client requests. Highly recommended.',
    name: 'Divya Krishnan',
    role: 'Director',
    initials: 'DK',
    avatarClass: 'from-[#e85d3a] to-[#c2410c]',
    ringClass: 'ring-orange-200/80',
    rating: 4,
  },
  {
    quote:
      'We engaged Xenura for our company site and digital presence. Their ability to deliver quickly and act on feedback has been valuable for our team.',
    name: 'Venkatesh Reddy',
    role: 'CEO',
    initials: 'VR',
    avatarClass: 'from-[#0d9488] to-[#0f766e]',
    ringClass: 'ring-teal-200/80',
    rating: 5,
  },
  {
    quote:
      'Their consultation on our web platform helped us organise inquiries and follow-ups better. The team is professional and easy to work with.',
    name: 'Amit Khanna',
    role: 'Operations Head',
    initials: 'AK',
    avatarClass: 'from-[#2563eb] to-[#1d4ed8]',
    ringClass: 'ring-blue-200/80',
    rating: 4,
  },
  {
    quote:
      'Xenura helped us set up a clear contact and enquiry process on our site. Response times and handoffs were handled thoughtfully throughout.',
    name: 'Meena Pillai',
    role: 'Legal Head',
    initials: 'MP',
    avatarClass: 'from-[#9333ea] to-[#7e22ce]',
    ringClass: 'ring-purple-200/80',
    rating: 4,
  },
];

type Testimonial = (typeof testimonials)[0];

function TestimonialAvatar({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative shrink-0">
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${testimonial.avatarClass} flex items-center justify-center shadow-lg ring-[3px] ${testimonial.ringClass} ring-offset-2 ring-offset-[var(--theme-surface-bg)]`}
        aria-hidden
      >
        <span className="text-base sm:text-lg font-bold text-white tracking-wide select-none">
          {testimonial.initials}
        </span>
      </div>
      <span
        className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--theme-surface-bg)]"
        title="Verified client"
        aria-hidden
      />
    </div>
  );
}

const TestimonialCard = ({
  testimonial,
  wrapperClassName,
}: {
  testimonial: Testimonial;
  wrapperClassName?: string;
}) => (
  <div
    className={
      wrapperClassName ?? 'flex-shrink-0 w-[84vw] max-w-[340px] sm:w-[360px] lg:w-[400px] mx-2 sm:mx-3'
    }
  >
    <article className="testimonial-card rounded-2xl p-5 sm:p-6 lg:p-7 h-full flex flex-col group transition-all duration-300 hover:shadow-xl">
      <Quote className="w-7 h-7 text-orange-500/40 mb-3 shrink-0" aria-hidden />

      <div className="flex gap-0.5 mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-slate-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>

      <p className="testimonial-quote text-sm sm:text-[15px] leading-relaxed flex-1 mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-[color:var(--theme-glass-border)]">
        <TestimonialAvatar testimonial={testimonial} />
        <div className="min-w-0 flex-1">
          <p className="testimonial-name text-base sm:text-lg font-bold leading-tight truncate">
            {testimonial.name}
          </p>
          <p className="testimonial-role text-sm font-medium mt-0.5 truncate">{testimonial.role}</p>
        </div>
      </div>
    </article>
  </div>
);

const TestimonialMarquee = () => {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="relative py-12 sm:py-14 lg:py-16 section-gradient-1 overflow-hidden">
      <div className="container-custom mb-8 sm:mb-10 scroll-reveal">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Client feedback
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: 'var(--theme-text-strong)' }}
          >
            What clients <span className="gradient-text-accent">say about us</span>
          </h2>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
            Honest feedback from teams we have supported on websites, dashboards, and digital workflows.
          </p>
        </div>
      </div>

      <div className="sm:hidden px-4">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={`mobile-${i}`}
              testimonial={t}
              wrapperClassName="snap-center flex-shrink-0 min-w-[92%] max-w-[92%]"
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:block relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-14 sm:w-20 lg:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--theme-section-1), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-14 sm:w-20 lg:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--theme-section-1), transparent)' }}
        />

        <div className="flex animate-marquee">
          {marqueeItems.map((t, i) => (
            <TestimonialCard key={`marquee-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;
