import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const stack = [
  'React',
  'TypeScript',
  'Next.js',
  'Vue',
  'Angular',
  'React Native',
  'Node.js',
  'NestJS',
  'Laravel',
  '.NET',
  'WordPress',
  'Umbraco',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'Prisma',
  'GraphQL',
  'REST APIs',
  'Docker',
  'CI/CD',
  'Nginx',
  'Azure',
  'SCSS / Tailwind',
  'AI tooling',
];

const About = () => {
  return (
    <div className="relative">
      <div className="section-shell">
        <SectionHeading index="01" eyebrow="About" title="A bit about me" />

        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-xl leading-relaxed text-cloud md:text-2xl">
                I'm a full-stack developer in Uppsala with{' '}
                <span className="text-accent">15+ years</span> of experience
                turning complex problems into fast, reliable products — for
                clients across many industries, and end to end on my own
                products.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-muted">
                I'm at home on both sides of the stack. On the front end that
                means maintainable, accessible interfaces in React, Vue and
                Angular, with TypeScript and Next.js at the centre of how I work
                today. On the back end it means APIs and services in NestJS,
                Node.js, Laravel and .NET, designed around the data rather than
                bolted on afterwards.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 leading-relaxed text-muted">
                I work professionally with AI — it's part of my day-to-day
                engineering practice, and I build AI-assisted features and
                internal tooling into the products I ship. I'm equally
                comfortable with the parts that keep software running: CI/CD
                pipelines, Docker, servers behind an Nginx reverse proxy,
                database schema design across PostgreSQL, MongoDB and MySQL, and
                the system architecture that decides how the pieces talk to each
                other.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 leading-relaxed text-muted">
                That range is deliberate. I run a set of live services — payments,
                storage, email and a multi-tenant platform — on my own
                infrastructure, because building and operating something end to
                end is the fastest way I know to understand it properly. I care
                about clean architecture, thoughtful UI/UX and performance you
                can feel.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-ink-card/60 p-7">
                <p className="eyebrow mb-5">Tech I work with</p>
                <div className="flex flex-wrap gap-2.5">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-cloud transition-colors duration-300 hover:border-accent hover:text-accent">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
