import { Button } from '@/components/ui/button';
import { Book, Building, Eye, EyeOff, Heart, Music } from 'lucide-react';

// Define types for our data
type TimelineEvent = {
  date: string;
  year: number;
  title: string;
  description: string;
  location: string;
  category: string;
};

type TimelineData = {
  [key: string]: TimelineEvent[];
};

const categoryColors = {
  architecture: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    light: 'bg-blue-100',
  },
  philosophy: {
    bg: 'bg-purple-500',
    text: 'text-purple-500',
    light: 'bg-purple-100',
  },
  bhaktas: { bg: 'bg-pink-500', text: 'text-pink-500', light: 'bg-pink-100' },
  music: { bg: 'bg-green-500', text: 'text-green-500', light: 'bg-green-100' },
  literature: {
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    light: 'bg-orange-100',
  },
};

const categoryIcons = {
  architecture: Building,
  philosophy: Book,
  bhaktas: Heart,
  music: Music,
  literature: Book,
};

interface TimelineTabsProps {
  timelineData: TimelineData;
  selectedTimelines: string[];
  onToggleTimeline: (timeline: string) => void;
}

export function TimelineTabs({
  timelineData,
  selectedTimelines,
  onToggleTimeline,
}: TimelineTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {Object.keys(timelineData).map((timeline) => {
        const IconComponent =
          categoryIcons[timeline as keyof typeof categoryIcons];
        const colors = categoryColors[timeline as keyof typeof categoryColors];
        const isSelected = selectedTimelines.includes(timeline);

        return (
          <Button
            key={timeline}
            variant={isSelected ? 'default' : 'outline'}
            onClick={() => onToggleTimeline(timeline)}
            className={`flex items-center gap-2 ${isSelected ? colors.bg : ''}`}
          >
            {isSelected ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            <IconComponent className="w-4 h-4" />
            {timeline.charAt(0).toUpperCase() + timeline.slice(1)}
          </Button>
        );
      })}
    </div>
  );
}

// Export types and constants for use in other components
export { categoryColors, categoryIcons };
export type { TimelineData, TimelineEvent };
