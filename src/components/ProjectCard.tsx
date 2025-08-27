export interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
}

export default function ProjectCard({ title, description, link, tags = [] }: ProjectCardProps) {
  return (
    <a
      href={link ?? "#"}
      target={link ? "_blank" : undefined}
      rel={link ? "noreferrer" : undefined}
      className="card p-5 block no-underline hover:-translate-y-0.5 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <span className="text-xs text-neutral-600 dark:text-neutral-400">{link ? "Ver" : "—"}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{description}</p>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="text-xs rounded-full border border-neutral-300/60 dark:border-neutral-700/60 px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
