"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { certificateApi, authApi } from '@/_lib/api';
import { useAuth } from '@/_components/AuthProvider';
import { Certificate } from '@/_lib/types';
import Link from 'next/link';

export default function SettingsPage() {
  const { user } = useAuth();
  const [certs, setCerts] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    certificate_expiry_date: '',
    next_exam_date: '',
  });

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await certificateApi.get();
        setCerts(data);
        setFormData({
          certificate_expiry_date: data.certificate_expiry_date || '',
          next_exam_date: data.next_exam_date || '',
        });
      } catch (err) {
        console.error('Failed to fetch certificates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      await certificateApi.update(formData.certificate_expiry_date, formData.next_exam_date);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and medical certificate information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <div className="mt-1 px-3 py-2 bg-gray-50 rounded text-gray-700">{user?.email}</div>
          </div>
          <div>
            <Label>Display Name</Label>
            <div className="mt-1 px-3 py-2 bg-gray-50 rounded text-gray-700">{user?.display_name || 'Not set'}</div>
          </div>
          <div>
            <Label>Current Plan</Label>
            <div className="mt-1 px-3 py-2 bg-gray-50 rounded text-gray-700 capitalize">{user?.tier || 'Free'}</div>
          </div>
          {user?.tier === 'free' && (
            <Link href="/pricing" className="block">
              <Button className="w-full">Upgrade to Pro or Plus</Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {!loading && (
        <Card>
          <CardHeader>
            <CardTitle>Medical Certificate</CardTitle>
            <CardDescription>Update your certificate and exam dates</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">✓ Certificate dates updated</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div>
                <Label htmlFor="cert_expiry">Certificate Expiry Date</Label>
                <Input
                  id="cert_expiry"
                  type="date"
                  value={formData.certificate_expiry_date}
                  onChange={(e) => setFormData({ ...formData, certificate_expiry_date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="next_exam">Next Medical Exam Date</Label>
                <Input
                  id="next_exam"
                  type="date"
                  value={formData.next_exam_date}
                  onChange={(e) => setFormData({ ...formData, next_exam_date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}