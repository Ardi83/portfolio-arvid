import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useMediaQuery} from 'usehooks-ts';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ExperienceDescription from '../components/ExperienceDescription';
import {experiences} from '../utils/experiences';
import {projects} from '../utils/projects';

const Experiences = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = experiences.find((e) => e.id === activeId) ?? null;

  return (
    <div className="relative">
      {/* decorative glow */}
      <div className="glow right-[-10%] top-[30%] h-[360px] w-[360px] bg-accent-2" />

      <div className="section-shell">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where I've worked"
        />

        {isDesktop ? (
          <div className="grid grid-cols-12 gap-12">
            {/* Timeline list */}
            <div className="col-span-5">
              <ul className="relative border-l border-line">
                {experiences.map((item) => {
                  const isActive = item.id === activeId;
                  return (
                    <li key={item.id} className="relative">
                      <button
                        onClick={() => setActiveId(item.id)}
                        className="block w-full py-4 pl-8 pr-2 text-left">
                        <span
                          className={`absolute left-0 top-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full border transition-colors duration-300 ${
                            isActive
                              ? 'border-accent bg-accent'
                              : 'border-muted bg-ink'
                          }`}
                        />
                        <span className="font-mono text-xs text-accent">
                          {item.year}
                        </span>
                        <h3
                          className={`font-display text-xl font-semibold transition-colors duration-300 ${
                            isActive ? 'text-cloud' : 'text-muted'
                          }`}>
                          {item.company}
                        </h3>
                        <p className="text-sm text-muted">
                          {item.job} · {item.location}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Detail panel */}
            <div className="col-span-7">
              <div className="sticky top-28 rounded-2xl border border-line bg-ink-card/60 p-9">
                <AnimatePresence mode="wait">
                  {!active ? (
                    <motion.div
                      key="empty"
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      className="flex h-40 items-center justify-center">
                      <p className="font-mono text-sm text-muted">
                        ← Pick a role
                      </p>
                    </motion.div>
                  ) : (
                  <motion.div
                    key={active.id}
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -16}}
                    transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}>
                    <p className="eyebrow mb-2">{active.year}</p>
                    <h3 className="display-lg text-2xl text-cloud md:text-3xl">
                      {active.company}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-accent">
                      {active.job} · {active.location}
                    </p>
                    <ExperienceDescription
                      experienceId={active.id}
                      className="mt-6"
                    />
                  </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile accordion */
          <div className="space-y-3">
            {experiences.map((item, i) => {
              const isOpen = item.id === activeId;
              return (
                <Reveal key={item.id} delay={i * 0.04}>
                  <div className="overflow-hidden rounded-2xl border border-line bg-ink-card/60">
                    <button
                      onClick={() => setActiveId(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left">
                      <div>
                        <span className="font-mono text-xs text-accent">
                          {item.year}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-cloud">
                          {item.company}
                        </h3>
                        <p className="text-sm text-muted">{item.job}</p>
                      </div>
                      <span
                        className={`text-accent transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}>
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{height: 0, opacity: 0}}
                          animate={{height: 'auto', opacity: 1}}
                          exit={{height: 0, opacity: 0}}
                          transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}>
                          <ExperienceDescription
                            experienceId={item.id}
                            className="px-5 pb-5"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Side projects — all self-hosted and live */}
        <div className="mt-24">
          <Reveal>
            <p className="eyebrow mb-3">Built and running</p>
            <h3 className="display-lg text-2xl text-cloud md:text-3xl">
              Things I run myself
            </h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              Products and services I designed, built and deploy on my own
              infrastructure — containerised behind an Nginx reverse proxy with
              PostgreSQL and Cloudflare TLS. All of these are live.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-ink-card/60 p-7 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-display text-xl font-semibold text-cloud">
                      {project.name}
                    </h4>
                    <span className="shrink-0 font-mono text-xs text-accent">
                      {project.tagline}
                    </span>
                  </div>

                  <p className="mt-4 flex-1 leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs uppercase tracking-widest text-accent transition-opacity duration-300 hover:opacity-70">
                      Visit ↗
                    </a>
                    {project.docsUrl && (
                      <a
                        href={project.docsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-accent">
                        API docs ↗
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
