interface TimelineHeaderProps {
  title: string;
}

export function TimelineHeader({ title }: TimelineHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h1>
    </div>
  );
}
