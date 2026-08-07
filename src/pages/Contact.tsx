import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

const links = [
  {label: 'Email', value: 'cristian.tirdad@gmail.com', href: 'mailto:cristian.tirdad@gmail.com'},
  {label: 'LinkedIn', value: 'linkedin.com/in/cristnass', href: 'https://linkedin.com/in/cristnass'},
  {label: 'GitHub', value: 'github.com/cristian-nass', href: 'https://github.com/cristian-nass'},
  {label: 'Phone', value: '+46 76 293 18 96', href: 'tel:+46762931896'},
];

const Contact = () => {
  return (
    <div className="relative">
      <div className="glow left-1/2 top-0 h-[400px] w-[500px] -translate-x-1/2 bg-accent" />

      <div className="section-shell text-center">
        <SectionHeading index="04" eyebrow="Contact" title="" />

        <Reveal>
          <p className="eyebrow mb-6 justify-center">Let's build something</p>
          <h2 className="display-xl text-cloud">
            Get in <span className="text-accent">touch</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted">
            Based in Uppsala, Sweden — open to interesting front-end and
            full-stack opportunities. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="mailto:cristian.tirdad@gmail.com"
            className="mt-10 inline-block rounded-full bg-accent px-9 py-4 font-mono text-sm uppercase tracking-widest text-ink transition-transform duration-300 hover:-translate-y-0.5">
            Say hello
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-16 grid max-w-2xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group bg-ink-card/80 p-6 text-left transition-colors duration-300 hover:bg-ink-card">
                <p className="eyebrow mb-2">{link.label}</p>
                <p className="font-display text-cloud transition-colors duration-300 group-hover:text-accent">
                  {link.value}
                </p>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-muted md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} Cristian Nass</span>
          <span>Built with React, TypeScript & Framer Motion</span>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
