"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ReadinessScore } from '@/_lib/types';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ReadinessCardProps {
  score?: ReadinessScore | null;
  isFree: boolean;
}

export default function ReadinessCard({ score, isFree }: ReadinessCardProps) {
  if (isFree) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Medical Readiness Score</CardTitle>
          <CardDescription>Locked for Pro users</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Lock size={16} />
            <AlertDescription>
              Upgrade to Pro to see your Medical Readiness Score and advanced health insights.
            </AlertDescription>
          </Alert>
          <Link href="/pricing" className="block mt-4">
            <Button className="w-full">Upgrade to Pro</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (!score) return null;

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Readiness Score</CardTitle>
        <CardDescription>{score.license_type} Class 1</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className={`text-5xl font-bold ${getScoreColor(score.score)}`}>{score.score}</div>
          <div className="text-sm text-gray-600 mt-2">out of 100</div>
        </div>
        <div className="space-y-2 text-sm">
          <div>BP: {score.metrics.systolic_bp}/{score.metrics.diastolic_bp}</div>
          <div>HR: {score.metrics.resting_hr} bpm</div>
          <div>BMI: {score.metrics.bmi?.toFixed(1)}</div>
        </div>
      </CardContent>
    </Card>
  );
}