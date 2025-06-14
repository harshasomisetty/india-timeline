import { Card } from '@/components/ui/card';
import { Calendar, Eye } from 'lucide-react';

export function TimelineLegend() {
  return (
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
  );
}
