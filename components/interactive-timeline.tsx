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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  categoryColors,
  categoryIcons,
  timelineData,
} from '@/lib/timeline-utils';
import { Calendar, Globe, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

export default function Component() {
  const [selectedTimeline, setSelectedTimeline] = useState('architecture');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const IconComponent =
    categoryIcons[selectedTimeline as keyof typeof categoryIcons];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Interactive Timeline of Indian Heritage
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Explore the rich tapestry of Indian culture through different lenses
          </p>
        </div>

        <Tabs
          value={selectedTimeline}
          onValueChange={setSelectedTimeline}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger
              value="architecture"
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="philosophy" className="flex items-center gap-2">
              <IconComponent className="w-4 h-4" />
              Philosophy
            </TabsTrigger>
            <TabsTrigger value="bhaktas" className="flex items-center gap-2">
              <IconComponent className="w-4 h-4" />
              Bhaktas
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-2">
              <IconComponent className="w-4 h-4" />
              Music/Dance
            </TabsTrigger>
            <TabsTrigger value="literature" className="flex items-center gap-2">
              <IconComponent className="w-4 h-4" />
              Literature
            </TabsTrigger>
          </TabsList>

          {Object.entries(timelineData).map(([category, events]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="flex items-center gap-3 mb-6">
                <IconComponent className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 capitalize">
                  {category} Timeline
                </h2>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600" />

                <div className="space-y-8">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="relative flex items-start gap-6"
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 rounded-full shadow-lg">
                        <Calendar className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                      </div>

                      {/* Event card */}
                      <Card
                        className="flex-1 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-l-4 border-l-slate-400 dark:border-l-slate-500"
                        onClick={() =>
                          setSelectedEvent(
                            selectedEvent === index ? null : index,
                          )
                        }
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-medium"
                                >
                                  {event.date}
                                </Badge>
                                <Badge
                                  className={`text-xs ${
                                    categoryColors[
                                      category as keyof typeof categoryColors
                                    ]
                                  }`}
                                >
                                  {event.category}
                                </Badge>
                              </div>
                              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                                {event.title}
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {event.description}
                          </CardDescription>
                          {selectedEvent === index && (
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                              >
                                Learn More
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Globe className="w-4 h-4 mr-1" />
                                Explore Location
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-slate-50 dark:bg-slate-800 border-dashed">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Users className="w-5 h-5" />
              <span className="text-sm">
                Click on any event to explore more details and related
                information
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
