"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendMetric } from '@/_lib/types';

interface TrendsViewProps {
  trends: TrendMetric[];
}

const statusColors = {
  green: 'bg-green-100 text-green-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-800',
};

export default function TrendsView({ trends }: TrendsViewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {trends.map((trend) => (
        <Card key={trend.metric}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="capitalize">{trend.metric}</CardTitle>
                <CardDescription>Current: {trend.current_value?.toFixed(1) ?? 'N/A'}</CardDescription>
              </div>
              <Badge className={statusColors[trend.status]}>
                {trend.status.charAt(0).toUpperCase() + trend.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <div>7-day: {trend.trend_7days.length} entries</div>
              <div>30-day: {trend.trend_30days.length} entries</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}