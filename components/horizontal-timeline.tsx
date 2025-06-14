'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Book,
  Building,
  Calendar,
  Eye,
  EyeOff,
  Heart,
  MapPin,
  Music,
} from 'lucide-react';
import { useState } from 'react';

// Import the timeline data
import timelineJson from '@/india-timeline.json';

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

type Century = {
  century: number;
  label: string;
  year: number;
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

// Generate centuries from 6th BCE to 21st CE
const centuries: Century[] = [];
for (let i = -6; i <= 21; i++) {
  if (i === 0) continue; // No year 0
  centuries.push({
    century: i,
    label: i < 0 ? `${Math.abs(i)}th BCE` : `${i}th CE`,
    year: i < 0 ? i * 100 + 50 : i * 100 - 50,
  });
}

// Transform the JSON data into the format expected by the component
const transformTimelineData = (): TimelineData => {
  const { categories } = timelineJson;

  return {
    architecture: categories.architecture.temples.map((temple) => ({
      date: temple.period || `${temple.year} CE`,
      year: temple.year,
      title: temple.name,
      description: temple.details || temple.event || 'Built',
      location: 'India', // Could be enhanced with specific locations if available
      category: 'Temple',
    })),
    philosophy: categories.philosophy.thinkers.map((thinker) => ({
      date: thinker.period,
      year: thinker.year,
      title: thinker.name,
      description: thinker.school || thinker.details || 'Philosopher',
      location: thinker.location || 'India',
      category: thinker.school || 'Philosophy',
    })),
    bhaktas: categories.bhaktas.map((bhakta) => ({
      date: bhakta.period,
      year: bhakta.year,
      title: bhakta.name,
      description:
        bhakta.tradition || bhakta.deity || bhakta.details || 'Devotee',
      location: bhakta.location || 'India',
      category: bhakta.tradition || 'Bhakti',
    })),
    music: [
      ...categories.music_dance.carnatic.map((musician) => ({
        date: musician.period,
        year: musician.year,
        title: musician.name,
        description: musician.title || 'Carnatic Musician',
        location: 'South India',
        category: 'Carnatic',
      })),
      ...categories.music_dance.theorists.map((theorist) => ({
        date: theorist.period,
        year: theorist.year,
        title: theorist.name,
        description:
          theorist.works?.join(', ') || theorist.details || 'Music Theorist',
        location: 'India',
        category: 'Theory',
      })),
      {
        date: `${categories.music_dance.hindustani.split.year} CE`,
        year: categories.music_dance.hindustani.split.year,
        title: 'Hindustani-Carnatic Split',
        description:
          categories.music_dance.hindustani.split.details ||
          'Split of Indian Classical Music',
        location: 'India',
        category: 'Music History',
      },
    ],
    literature: [
      ...categories.literature.mahabharata.map((author) => ({
        date: author.period,
        year: author.year,
        title: author.name,
        description: author.works?.join(', ') || 'Mahabharata Author',
        location: 'Andhra Pradesh',
        category: 'Mahabharata',
      })),
      ...categories.literature.ramayana.map((author) => ({
        date: author.period,
        year: author.year,
        title: author.name,
        description: author.works?.join(', ') || 'Ramayana Author',
        location: author.language
          ? `${author.language} Speaking Region`
          : 'India',
        category: 'Ramayana',
      })),
      ...categories.literature.other.map((author) => ({
        date: author.period,
        year: author.year,
        title: author.name,
        description: author.works?.join(', ') || 'Author',
        location: 'India',
        category: 'Literature',
      })),
    ],
  };
};

const timelineData = transformTimelineData();

export default function Component() {
  const [selectedTimelines, setSelectedTimelines] = useState<string[]>([
    'architecture',
  ]);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const toggleTimeline = (timeline: string) => {
    setSelectedTimelines((prev) =>
      prev.includes(timeline)
        ? prev.filter((t) => t !== timeline)
        : [...prev, timeline],
    );
  };

  const allEvents = selectedTimelines
    .flatMap((timeline) =>
      timelineData[timeline].map((event) => ({
        ...event,
        timeline,
      })),
    )
    .sort((a, b) => a.year - b.year);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Timeline of Indian Heritage
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
            Explore the rich cultural heritage of India across different domains
          </p>

          {/* Timeline toggles */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.keys(timelineData).map((timeline) => {
              const IconComponent =
                categoryIcons[timeline as keyof typeof categoryIcons];
              const colors =
                categoryColors[timeline as keyof typeof categoryColors];
              const isSelected = selectedTimelines.includes(timeline);

              return (
                <Button
                  key={timeline}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => toggleTimeline(timeline)}
                  className={`flex items-center gap-2 ${
                    isSelected ? colors.bg : ''
                  }`}
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
        </div>

        {/* Horizontal Timeline */}
        <div className="relative overflow-x-auto pb-8">
          <div className="min-w-[1400px] relative px-8">
            {/* Timeline container */}
            <div className="relative h-[500px] flex items-center">
              {/* Main horizontal timeline line */}
              <div className="absolute w-full h-0.5 bg-slate-800 dark:bg-slate-200 top-1/2 transform -translate-y-1/2 z-10" />

              {/* Century markers on the line */}
              {centuries
                .filter((c) => c.century >= -6 && c.century <= 21)
                .map((century, index) => {
                  const totalCenturies = centuries.filter(
                    (c) => c.century >= -6 && c.century <= 21,
                  ).length;
                  const leftPosition = (index / (totalCenturies - 1)) * 100;

                  return (
                    <div
                      key={century.century}
                      className="absolute top-1/2 transform -translate-y-1/2 z-20"
                      style={{ left: `${leftPosition}%` }}
                    >
                      {/* Century marker dot */}
                      <div className="w-3 h-3 bg-slate-800 dark:bg-slate-200 rounded-full" />
                      {/* Century label */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {century.label}
                      </div>
                    </div>
                  );
                })}

              {/* Events */}
              {allEvents.map((event, index) => {
                const colors =
                  categoryColors[event.timeline as keyof typeof categoryColors];
                const IconComponent =
                  categoryIcons[event.timeline as keyof typeof categoryIcons];
                const isAbove = index % 2 === 0;

                // Calculate position based on year (-600 to 2100 range)
                const minYear = -600;
                const maxYear = 2100;
                const leftPosition =
                  ((event.year - minYear) / (maxYear - minYear)) * 100;

                // Ensure events don't go off screen
                const clampedPosition = Math.max(8, Math.min(92, leftPosition));

                return (
                  <div
                    key={`${event.timeline}-${index}`}
                    className="absolute"
                    style={{ left: `${clampedPosition}%` }}
                    onMouseEnter={() =>
                      setHoveredEvent(`${event.timeline}-${index}`)
                    }
                    onMouseLeave={() => setHoveredEvent(null)}
                  >
                    {/* Event connection point on main line */}
                    <div
                      className={`absolute w-4 h-4 ${colors.bg} rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 border-2 border-white dark:border-slate-900 shadow-lg`}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <IconComponent className="w-2 h-2 text-white" />
                      </div>
                    </div>

                    {/* Vertical connecting line */}
                    <div
                      className={`absolute w-0.5 ${colors.bg} left-1/2 transform -translate-x-1/2 z-20`}
                      style={{
                        height: '120px',
                        [isAbove ? 'bottom' : 'top']: '50%',
                      }}
                    />

                    {/* Event card */}
                    <div
                      className={`absolute ${
                        isAbove ? 'bottom-full mb-32' : 'top-full mt-32'
                      } left-1/2 transform -translate-x-1/2`}
                    >
                      <Card
                        className={`w-72 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border-l-4 ${
                          hoveredEvent === `${event.timeline}-${index}`
                            ? 'ring-2 ring-offset-2 shadow-xl scale-105'
                            : ''
                        }`}
                        style={{
                          borderLeftColor: categoryColors[
                            event.timeline as keyof typeof categoryColors
                          ].bg.replace('bg-', ''),
                        }}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-medium"
                                >
                                  {event.date}
                                </Badge>
                                <Badge
                                  className={`text-xs ${colors.light} ${colors.text} border-0`}
                                >
                                  {event.category}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                                {event.title}
                              </CardTitle>
                            </div>
                            <div
                              className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}
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
                            <span className="font-medium">
                              {event.location}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 text-center">
          <Card className="inline-block p-4 bg-slate-50 dark:bg-slate-800">
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-400 rounded-full" />
                <span>Century Markers</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Toggle timelines to compare</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Hover for details</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
