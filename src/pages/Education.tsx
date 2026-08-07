import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import {education} from '../utils/education';

const Education = () => {
  return (
    <div className="relative">
      <div className="section-shell">
        <SectionHeading
          index="02"
          eyebrow="Education"
          title="Where I learned the craft"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-line bg-ink-card/60 p-7 transition-colors duration-300 hover:border-accent/40">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-cloud">
                    {item.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-accent">
                    {item.year}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{item.field}</p>
                <p className="mt-4 font-mono text-xs text-muted/70">
                  Certified No. {item.certified}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
