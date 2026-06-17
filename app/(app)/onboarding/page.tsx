"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { onboardingApi } from '@/_lib/api';

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [pilot, setPilot] = useState({
    airline_operator: '',
    license_type: 'DGCA',
    years_flying: '',
    aircraft_type: '',
  });

  const [dates, setDates] = useState({
    certificate_expiry_date: '',
    next_exam_date: '',
  });

  const [baseline, setBaseline] = useState({
    resting_bp_systolic: '',
    resting_bp_diastolic: '',
    resting_hr: '',
    bmi: '',
    sleep_hours_per_night: '',
  });

  const handleNext = async () => {
    setError('');
    if (step === 3) {
      setLoading(true);
      try {
        await onboardingApi.save({
          ...pilot,
          years_flying: parseInt(pilot.years_flying),
          ...dates,
          resting_bp_systolic: parseInt(baseline.resting_bp_systolic),
          resting_bp_diastolic: parseInt(baseline.resting_bp_diastolic),
          resting_hr: parseInt(baseline.resting_hr),
          bmi: parseFloat(baseline.bmi),
          sleep_hours_per_night: parseFloat(baseline.sleep_hours_per_night),
        });
        router.push('/dashboard');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save onboarding');
      } finally {
        setLoading(false);
      }
    } else {
      setStep((step + 1) as Step);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="airline">Airline / Operator</Label>
                <Input
                  id="airline"
                  value={pilot.airline_operator}
                  onChange={(e) => setPilot({ ...pilot, airline_operator: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="license">License Type</Label>
                <Select value={pilot.license_type} onValueChange={(v: any) => setPilot({ ...pilot, license_type: v })}>
                  <SelectTrigger id="license" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DGCA">DGCA (India)</SelectItem>
                    <SelectItem value="FAA">FAA (USA)</SelectItem>
                    <SelectItem value="EASA">EASA (Europe)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="years">Years Flying</Label>
                <Input
                  id="years"
                  type="number"
                  value={pilot.years_flying}
                  onChange={(e) => setPilot({ ...pilot, years_flying: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="aircraft">Aircraft Type</Label>
                <Input
                  id="aircraft"
                  value={pilot.aircraft_type}
                  onChange={(e) => setPilot({ ...pilot, aircraft_type: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cert_expiry">Certificate Expiry Date</Label>
                <Input
                  id="cert_expiry"
                  type="date"
                  value={dates.certificate_expiry_date}
                  onChange={(e) => setDates({ ...dates, certificate_expiry_date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="next_exam">Next Medical Exam Date</Label>
                <Input
                  id="next_exam"
                  type="date"
                  value={dates.next_exam_date}
                  onChange={(e) => setDates({ ...dates, next_exam_date: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bp_sys">BP Systolic</Label>
                  <Input
                    id="bp_sys"
                    type="number"
                    value={baseline.resting_bp_systolic}
                    onChange={(e) => setBaseline({ ...baseline, resting_bp_systolic: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bp_dia">BP Diastolic</Label>
                  <Input
                    id="bp_dia"
                    type="number"
                    value={baseline.resting_bp_diastolic}
                    onChange={(e) => setBaseline({ ...baseline, resting_bp_diastolic: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="hr">Resting HR (bpm)</Label>
                <Input
                  id="hr"
                  type="number"
                  value={baseline.resting_hr}
                  onChange={(e) => setBaseline({ ...baseline, resting_hr: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  type="number"
                  step="0.1"
                  value={baseline.bmi}
                  onChange={(e) => setBaseline({ ...baseline, bmi: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sleep">Sleep Hours per Night</Label>
                <Input
                  id="sleep"
                  type="number"
                  step="0.5"
                  value={baseline.sleep_hours_per_night}
                  onChange={(e) => setBaseline({ ...baseline, sleep_hours_per_night: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setStep((step - 1) as Step)}
              variant="outline"
              disabled={step === 1 || loading}
            >
              Back
            </Button>
            <Button onClick={handleNext} disabled={loading}>
              {loading ? 'Saving...' : step === 3 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}