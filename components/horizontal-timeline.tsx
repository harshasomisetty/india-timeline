'use client';

import {
  categoryColors,
  categoryIcons,
  type TimelineEvent,
} from '@/lib/timeline-utils';
import { useState } from 'react';
import { TimelineEventCard } from './timeline-event-card';

type Century = {
  century: number;
  label: string;
  year: number;
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

interface HorizontalTimelineProps {
  events: (TimelineEvent & { timeline: string })[];
}

export default function HorizontalTimeline({
  events,
}: HorizontalTimelineProps) {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Calculate min and max years from events with padding
  const years = events.map((event) => event.year);
  const minEventYear = Math.min(...years);
  const maxEventYear = Math.max(...years);

  // Add padding of 10% of the total range on each side
  const yearRange = maxEventYear - minEventYear;
  const padding = yearRange * 0.1;
  const minYear = Math.floor(minEventYear - padding);
  const maxYear = Math.ceil(maxEventYear + padding);

  // Filter centuries to only show relevant ones
  const relevantCenturies = centuries.filter(
    (c) => c.year >= minYear && c.year <= maxYear,
  );

  return (
    <div className="relative overflow-x-auto pb-8">
      <div className="min-w-[1400px] relative px-8">
        {/* Timeline container */}
        <div className="relative h-screen flex items-center">
          {/* Main horizontal timeline line */}
          <div className="absolute w-full h-0.5 bg-slate-800 dark:bg-slate-200 top-1/2 transform -translate-y-1/2 z-10" />

          {/* Century markers on the line */}
          {relevantCenturies.map((century, index) => {
            const totalCenturies = relevantCenturies.length;
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
          {events.map((event, index) => {
            const IconComponent =
              categoryIcons[event.timeline as keyof typeof categoryIcons];
            const isAbove = index % 2 === 0;

            // Calculate position based on the dynamic year range
            const leftPosition =
              ((event.year - minYear) / (maxYear - minYear)) * 100;

            // Ensure events don't go off screen
            const clampedPosition = Math.max(8, Math.min(92, leftPosition));

            return (
              <div
                key={`${event.timeline}-${index}`}
                className="absolute"
                style={{
                  left: `${clampedPosition}%`,
                  zIndex:
                    hoveredEvent === `${event.timeline}-${index}` ? 50 : 10,
                }}
                onMouseEnter={() =>
                  setHoveredEvent(`${event.timeline}-${index}`)
                }
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Event connection point on main line */}
                <div
                  className={`absolute w-4 h-4 ${
                    categoryColors[
                      event.timeline as keyof typeof categoryColors
                    ].split(' ')[0]
                  } rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 border-2 border-white dark:border-slate-900 shadow-lg`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent className="w-2 h-2 text-white" />
                  </div>
                </div>

                {/* Vertical connecting line */}
                <div
                  className={`absolute w-0.5 ${
                    categoryColors[
                      event.timeline as keyof typeof categoryColors
                    ].split(' ')[0]
                  } left-1/2 transform -translate-x-1/2 z-20`}
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
                  <TimelineEventCard
                    event={event}
                    isHovered={hoveredEvent === `${event.timeline}-${index}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
