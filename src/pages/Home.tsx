import {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import arvid from '../assets/images/arvid.webp';

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax: layers move at different speeds as you scroll past the hero
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yGlow = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* Parallax photo layer */}
      <motion.div
        style={{y: yImage, scale: scaleImage}}
        className="absolute inset-0 z-0">
        <img
          src={arvid}
          alt="Arvid Nasirabadi"
          className="h-full w-full object-cover object-right opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </motion.div>

      {/* Parallax glow */}
      <motion.div
        style={{y: yGlow}}
        className="glow left-[-10%] top-[20%] h-[420px] w-[420px] bg-accent"
      />

      {/* Foreground content */}
      <motion.div
        style={{y: yTitle, opacity}}
        className="relative z-10 mx-auto flex min-h-screen max-w-content flex-col justify-center px-6 md:px-10">
        <motion.p
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, ease}}
          className="eyebrow mb-6">
          Arvid Nasirabadi — Uppsala, Sweden
        </motion.p>

        <h1 className="display-xl text-cloud">
          {['Full-stack', 'Developer'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{y: '110%'}}
                animate={{y: 0}}
                transition={{duration: 0.9, delay: 0.15 + i * 0.12, ease}}>
                {i === 1 ? (
                  <span className="text-accent">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.5, ease}}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Full-stack developer with{' '}
          <span className="text-cloud">15+ years</span> shipping fast, reliable
          web applications — from polished React and Next.js interfaces to the
          NestJS services, databases and CI/CD pipelines behind them. I work
          professionally with AI, and I run everything I build myself.
        </motion.p>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.6, ease}}
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            {value: '15+', label: 'Years experience'},
            {value: 'React · NestJS · .NET', label: 'Front end to back end'},
            {value: 'Docker · CI/CD · AI', label: 'Ship it and run it'},
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display text-lg font-semibold text-cloud">
                {stat.value}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.7, ease}}
          className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#experiences"
            className="rounded-full bg-accent px-7 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform duration-300 hover:-translate-y-0.5">
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-widest text-cloud transition-colors duration-300 hover:border-accent hover:text-accent">
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-line p-1.5">
          <span className="h-2 w-1 animate-scroll-hint rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
};

export default Home;
