"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/_components/AuthProvider';
import { useRouter } from 'next/navigation';
import { dashboardApi, onboardingApi } from '@/app/_lib/api';
import { TrendMetric, ReadinessScore, ExamChecklist } from '@/app/_lib/types';
import VitalsForm from './_components/VitalsForm';
import TrendsView from './_components/TrendsView';
import ReadinessCard from './_components/ReadinessCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [trends, setTrends] = useState<TrendMetric[]>([]);
  const [readiness, setReadiness] = useState<ReadinessScore | null>(null);
  const [checklist, setChecklist] = useState<ExamChecklist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!authLoading && user) {
      onboardingApi
        .status()
        .then((res) => {
          if (!res.complete) {
            router.push('/onboarding');
            return;
          }
          setOnboardingComplete(true);
        })
        .finally(() => setCheckingOnboarding(false));
    }
  }, [user, authLoading, router]);

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      const [trendsRes, checklistRes] = await Promise.all([
        dashboardApi.trends(),
        dashboardApi.examChecklist().catch(() => null),
      ]);
      setTrends(trendsRes);
      setChecklist(checklistRes);

      if (user?.tier !== 'free') {
        try {
          const readRes = await dashboardApi.readinessScore();
          setReadiness(readRes);
        } catch {}
      }
    } catch (err) {
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (onboardingComplete) {
      refreshDashboard();
    }
   }, [onboardingComplete, refreshDashboard]);

  if (authLoading || checkingOnboarding || !onboardingComplete) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <div className="mx-auto max-w-7xl p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.display_name || user?.email}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VitalsForm onSuccess={refreshDashboard} />
        </div>
        <div>
          <ReadinessCard score={readiness} isFree={user?.tier === 'free'} />
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {trends.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Trends</h2>
              <TrendsView trends={trends} />
            </div>
          )}

          {checklist && user?.tier !== 'free' && (
            <Card>
              <CardHeader>
                <CardTitle>Exam Prep Checklist</CardTitle>
                <CardDescription>
                  {checklist.days_until_exam ?? 0} days until your next exam
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {checklist.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className={`text-lg ${item.completed ? 'text-green-600' : 'text-gray-300'}`}>
                        {item.completed ? '✓' : '○'}
                      </span>
                      <span className={item.completed ? 'text-gray-700 font-medium' : 'text-gray-500'}>
                        {item.item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}