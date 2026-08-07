import {useEffect, useState} from 'react';
import {motion, useScroll, useSpring} from 'framer-motion';
import {useMediaQuery} from 'usehooks-ts';

const items = [
  {title: 'Home', id: 'home'},
  {title: 'About', id: 'about'},
  {title: 'Education', id: 'education'},
  {title: 'Work', id: 'experiences'},
  {title: 'Contact', id: 'contact'},
];

const Navbar = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  const {scrollYProgress} = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {rootMargin: '-45% 0px -50% 0px'}
    );
    items.forEach(({id}) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-accent"
        style={{scaleX: progress}}
      />

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#home"
            className="font-display text-lg font-bold tracking-tight text-cloud">
            CN<span className="text-accent">.</span>
          </a>

          {isDesktop ? (
            <nav className="flex items-center gap-1 rounded-full border border-line bg-ink-soft/70 px-2 py-1 backdrop-blur">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                    active === item.id
                      ? 'text-ink'
                      : 'text-muted hover:text-cloud'
                  }`}>
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{type: 'spring', stiffness: 380, damping: 30}}
                    />
                  )}
                  {item.title}
                </a>
              ))}
              <a
                href="https://cristian-blog.web.app"
                target="_blank"
                rel="noreferrer"
                className="ml-1 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-accent">
                Blog ↗
              </a>
            </nav>
          ) : (
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-ink-soft/70 backdrop-blur">
              <span
                className={`h-[2px] w-5 bg-cloud transition-transform duration-300 ${
                  open ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-cloud transition-opacity duration-300 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-cloud transition-transform duration-300 ${
                  open ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {!isDesktop && open && (
          <motion.nav
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            className="mx-6 mb-4 overflow-hidden rounded-2xl border border-line bg-ink-card/95 p-2 backdrop-blur">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors ${
                  active === item.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted hover:text-cloud'
                }`}>
                {item.title}
              </a>
            ))}
            <a
              href="https://cristian-blog.web.app"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-widest text-muted hover:text-accent">
              Blog ↗
            </a>
          </motion.nav>
        )}
      </header>
    </>
  );
};

export default Navbar;
