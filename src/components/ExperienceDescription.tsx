import {experiences} from '../utils/experiences';

type Props = {
  experienceId: number;
  className?: string;
};

const ExperienceDescription = ({experienceId, className}: Props) => {
  const experience = experiences.find((e) => e.id === experienceId);

  if (!experience) return null;

  return (
    <ul className={`space-y-2 ${className ?? ''}`}>
      {experience.description.map((point, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-muted">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
};

export default ExperienceDescription;
