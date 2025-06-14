'use client';

import HorizontalTimeline from '@/components/horizontal-timeline';
import { TimelineHeader } from '@/components/timeline-header';
import { TimelineLegend } from '@/components/timeline-legend';
import { TimelineTabs } from '@/components/timeline-tabs';
import { TimelineEvent, timelineData } from '@/lib/timeline-utils';
import { useState } from 'react';

export default function Page() {
  const [selectedTimelines, setSelectedTimelines] = useState<string[]>([
    'architecture',
  ]);

  // Filter events based on selected timelines
  const filteredEvents = Object.entries(timelineData)
    .filter(([category]) => selectedTimelines.includes(category))
    .flatMap(([category, events]) =>
      events.map((event: TimelineEvent) => ({
        ...event,
        timeline: category,
      })),
    );

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <TimelineHeader title="Timeline of Indian Heritage" />
        <TimelineTabs
          timelineData={timelineData}
          selectedTimelines={selectedTimelines}
          onToggleTimeline={(timeline: string) => {
            setSelectedTimelines((prev) =>
              prev.includes(timeline)
                ? prev.filter((t) => t !== timeline)
                : [...prev, timeline],
            );
          }}
        />
        <HorizontalTimeline events={filteredEvents} />
        <TimelineLegend />
      </div>
    </main>
  );
}
