interface TimelineHeaderProps {
  title: string;
  subtitle: string;
}

export function TimelineHeader({ title, subtitle }: TimelineHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
        {subtitle}
      </p>
    </div>
  );
}
