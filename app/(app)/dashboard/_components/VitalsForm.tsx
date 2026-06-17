"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { vitalsApi } from '@/_lib/api';

interface VitalsFormProps {
  onSuccess: () => void;
}

export default function VitalsForm({ onSuccess }: VitalsFormProps) {
  const [formData, setFormData] = useState({
    systolic_bp: '',
    diastolic_bp: '',
    resting_hr: '',
    weight_kg: '',
    bmi: '',
    sleep_hours: '',
    sleep_quality: '3',
    alcohol_free_day: 'true',
    stress_level: '3',
    note: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const payload: any = {};
      if (formData.systolic_bp) payload.systolic_bp = parseInt(formData.systolic_bp);
      if (formData.diastolic_bp) payload.diastolic_bp = parseInt(formData.diastolic_bp);
      if (formData.resting_hr) payload.resting_hr = parseInt(formData.resting_hr);
      if (formData.weight_kg) payload.weight_kg = parseFloat(formData.weight_kg);
      if (formData.bmi) payload.bmi = parseFloat(formData.bmi);
      if (formData.sleep_hours) payload.sleep_hours = parseFloat(formData.sleep_hours);
      if (formData.sleep_quality) payload.sleep_quality = parseInt(formData.sleep_quality);
      payload.alcohol_free_day = formData.alcohol_free_day === 'true';
      if (formData.stress_level) payload.stress_level = parseInt(formData.stress_level);
      if (formData.note) payload.note = formData.note;

      await vitalsApi.log(payload);
      setSuccess(true);
      setFormData({
        systolic_bp: '',
        diastolic_bp: '',
        resting_hr: '',
        weight_kg: '',
        bmi: '',
        sleep_hours: '',
        sleep_quality: '3',
        alcohol_free_day: 'true',
        stress_level: '3',
        note: '',
      });
      setTimeout(() => setSuccess(false), 3000);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log vitals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Daily Vitals</CardTitle>
        <CardDescription>Take under 60 seconds to log your daily health metrics</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">✓ Vitals logged successfully</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sys_bp">Systolic BP</Label>
              <Input
                id="sys_bp"
                type="number"
                placeholder="120"
                value={formData.systolic_bp}
                onChange={(e) => setFormData({ ...formData, systolic_bp: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dia_bp">Diastolic BP</Label>
              <Input
                id="dia_bp"
                type="number"
                placeholder="80"
                value={formData.diastolic_bp}
                onChange={(e) => setFormData({ ...formData, diastolic_bp: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="hr">Heart Rate</Label>
              <Input
                id="hr"
                type="number"
                placeholder="70"
                value={formData.resting_hr}
                onChange={(e) => setFormData({ ...formData, resting_hr: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="75"
                value={formData.weight_kg}
                onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bmi">BMI</Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                placeholder="24.5"
                value={formData.bmi}
                onChange={(e) => setFormData({ ...formData, bmi: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sleep">Sleep (hours)</Label>
              <Input
                id="sleep"
                type="number"
                step="0.5"
                placeholder="8"
                value={formData.sleep_hours}
                onChange={(e) => setFormData({ ...formData, sleep_hours: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sleep_qual">Sleep Quality (1-5)</Label>
              <Select value={formData.sleep_quality} onValueChange={(v) => setFormData({ ...formData, sleep_quality: v })}>
                <SelectTrigger id="sleep_qual" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Poor</SelectItem>
                  <SelectItem value="2">Fair</SelectItem>
                  <SelectItem value="3">Good</SelectItem>
                  <SelectItem value="4">Very Good</SelectItem>
                  <SelectItem value="5">Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alcohol">Alcohol-Free Day</Label>
              <Select value={formData.alcohol_free_day} onValueChange={(v) => setFormData({ ...formData, alcohol_free_day: v })}>
                <SelectTrigger id="alcohol" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stress">Stress Level (1-5)</Label>
              <Select value={formData.stress_level} onValueChange={(v) => setFormData({ ...formData, stress_level: v })}>
                <SelectTrigger id="stress" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Very Low</SelectItem>
                  <SelectItem value="2">Low</SelectItem>
                  <SelectItem value="3">Medium</SelectItem>
                  <SelectItem value="4">High</SelectItem>
                  <SelectItem value="5">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="note">Notes (optional)</Label>
            <Textarea
              id="note"
              placeholder="Any additional notes..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="mt-1"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Logging...' : 'Log Vitals'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}