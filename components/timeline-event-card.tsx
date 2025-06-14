import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  categoryColors,
  categoryIcons,
  type TimelineEvent,
} from '@/lib/timeline-utils';
import { MapPin } from 'lucide-react';

interface TimelineEventCardProps {
  event: TimelineEvent & { timeline: string };
  isHovered: boolean;
}

export function TimelineEventCard({
  event,
  isHovered,
}: TimelineEventCardProps) {
  const IconComponent =
    categoryIcons[event.timeline as keyof typeof categoryIcons];

  return (
    <Card
      className={`w-72 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border-l-4 ${
        isHovered ? 'ring-2 ring-offset-2 shadow-xl scale-105' : ''
      } ${categoryColors[event.timeline as keyof typeof categoryColors]}`}
      style={{
        borderLeftColor: categoryColors[
          event.timeline as keyof typeof categoryColors
        ]
          .split(' ')[0]
          .replace('bg-', ''),
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs font-medium">
                {event.date}
              </Badge>
            </div>
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {event.title}
            </CardTitle>
          </div>
          <div
            className={`w-10 h-10 ${
              categoryColors[
                event.timeline as keyof typeof categoryColors
              ].split(' ')[0]
            } rounded-full flex items-center justify-center flex-shrink-0`}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          {event.description}
        </CardDescription>
        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">{event.location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
