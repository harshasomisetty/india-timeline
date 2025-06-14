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

// Helper to assign levels to events to reduce overlap
function assignEventLevels(
  events: (TimelineEvent & { timeline: string })[],
  minYear: number,
  maxYear: number,
) {
  const positions: number[] = [];
  const levels: number[] = [];
  const minDistance = 6; // percent, minimum horizontal distance between events before staggering
  const maxLevels = 16; // 16 above, 16 below

  events.forEach((event, i) => {
    const leftPosition = ((event.year - minYear) / (maxYear - minYear)) * 100;
    let level = 0;
    // Check previous events for overlap
    for (let prev = i - 1; prev >= 0; prev--) {
      if (Math.abs(leftPosition - positions[prev]) < minDistance) {
        // If overlap, increase level
        level = (levels[prev] + 1) % maxLevels;
        // Alternate direction (above/below)
        if (level === 0) level = 1;
      }
    }
    positions.push(leftPosition);
    levels.push(level);
  });
  return levels;
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

  // Assign levels to events to stagger them vertically
  const eventLevels = assignEventLevels(events, minYear, maxYear);

  return (
    <div className="relative overflow-x-auto pb-8">
      <div className="min-w-[1400px] relative px-2">
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
            // Use assigned level for staggering
            const level = eventLevels[index];
            const isAbove = index % 2 === 0;

            // Calculate position based on the dynamic year range
            const leftPosition =
              ((event.year - minYear) / (maxYear - minYear)) * 100;

            // Ensure events don't go off screen
            const clampedPosition = Math.max(8, Math.min(92, leftPosition));

            // Stagger: increase vertical offset based on level
            const baseOffset = 96; // px
            const verticalOffset = baseOffset * (level + 1);

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
                    height: `${120 + (verticalOffset - 96)}px`,
                    [isAbove ? 'bottom' : 'top']: '50%',
                  }}
                />

                {/* Event card */}
                <div
                  className={`absolute ${
                    isAbove ? 'bottom-full' : 'top-full'
                  } left-1/2 transform -translate-x-1/2`}
                  style={{
                    marginBottom: isAbove ? `${verticalOffset}px` : undefined,
                    marginTop: !isAbove ? `${verticalOffset}px` : undefined,
                  }}
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
