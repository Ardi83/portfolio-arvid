import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const stack = [
  'React',
  'TypeScript',
  'Next.js',
  'Vue',
  'Angular',
  'Svelte',
  'Node.js',
  'Firebase',
  'TailwindCSS',
  'Redux / Zustand',
  'Docker',
  'REST APIs',
  'GitHub Actions',
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
                I'm a software engineer with{' '}
                <span className="text-accent">over a decade</span> of experience
                turning complex problems into fast, intuitive products — shipped
                across many industries, both in cross-functional teams and end
                to end on my own.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-muted">
                My core is modern front-end engineering — building maintainable,
                accessible interfaces in React, Vue and Angular, with TypeScript
                and Next.js at the center of how I work today. I'm just as
                comfortable reaching down the stack: Node.js services, serverless
                back-ends on Firebase and Google Cloud, and custom APIs when a
                feature needs them.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 leading-relaxed text-muted">
                That range comes from a broad foundation — native Android in
                Java, desktop apps in C#, and full-stack work with PHP and SQL
                earlier in my career. I care deeply about craft: clean
                architecture, thoughtful UI/UX, and performance you can feel.
                And I keep learning, staying close to where the field is heading.
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
