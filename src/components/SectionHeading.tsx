import Reveal from './Reveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
}

const SectionHeading = ({index, eyebrow, title}: SectionHeadingProps) => {
  return (
    <Reveal className="mb-14">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-accent">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h2 className="display-lg mt-6 text-cloud">{title}</h2>
    </Reveal>
  );
};

export default SectionHeading;
