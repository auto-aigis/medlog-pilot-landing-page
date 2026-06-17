"use client";
import { useState } from 'react';
import { useAuth } from '@/app/_components/AuthProvider';
import { useRouter } from 'next/navigation';
import { onboardingApi } from '@/app/_lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    health_conditions: '',
    medications: '',
    surgeries: '',
    allergies: '',
    family_history: '',
    exam_date: '',
    goals: '',
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload: any = {};
      if (formData.health_conditions) payload.health_conditions = formData.health_conditions;
      if (formData.medications) payload.medications = formData.medications;
      if (formData.surgeries) payload.surgeries = formData.surgeries;
      if (formData.allergies) payload.allergies = formData.allergies;
      if (formData.family_history) payload.family_history = formData.family_history;
      if (formData.exam_date) payload.exam_date = formData.exam_date;
      if (formData.goals) payload.goals = formData.goals;

      await onboardingApi.complete(payload);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete onboarding');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Step {step} of 2 - Health Information</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div>
                    <Label htmlFor="conditions">Health Conditions (optional)</Label>
                    <Textarea
                      id="conditions"
                      placeholder="e.g., hypertension, diabetes"
                      value={formData.health_conditions}
                      onChange={(e) => setFormData({ ...formData, health_conditions: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="meds">Current Medications (optional)</Label>
                    <Textarea
                      id="meds"
                      placeholder="e.g., Lisinopril 10mg daily"
                      value={formData.medications}
                      onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="surgeries">Past Surgeries (optional)</Label>
                    <Textarea
                      id="surgeries"
                      placeholder="e.g., Appendectomy 2015"
                      value={formData.surgeries}
                      onChange={(e) => setFormData({ ...formData, surgeries: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push('/dashboard')} className="w-full">
                      Skip
                    </Button>
                    <Button type="button" onClick={() => setStep(2)} className="w-full">
                      Next
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="allergies">Allergies (optional)</Label>
                    <Textarea
                      id="allergies"
                      placeholder="e.g., Penicillin allergy"
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="family_history">Family History (optional)</Label>
                    <Textarea
                      id="family_history"
                      placeholder="e.g., Father had heart disease"
                      value={formData.family_history}
                      onChange={(e) => setFormData({ ...formData, family_history: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="exam_date">Expected Exam Date (optional)</Label>
                    <Input
                      id="exam_date"
                      type="date"
                      value={formData.exam_date}
                      onChange={(e) => setFormData({ ...formData, exam_date: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="goals">Health Goals (optional)</Label>
                    <Textarea
                      id="goals"
                      placeholder="e.g., Lower blood pressure, improve fitness"
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full">
                      Back
                    </Button>
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? 'Completing...' : 'Complete Onboarding'}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}