"use client";
import { useAuth } from '@/app/_components/AuthProvider';
import { useRouter } from 'next/navigation';
import { authApi } from '@/app/_lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SettingsPage() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  if (loading) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Email:</span>{' '}
                  <span className="text-gray-600">{user.email}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Display Name:</span>{' '}
                  <span className="text-gray-600">{user.display_name || 'Not set'}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Current Tier:</span>{' '}
                  <span className="text-gray-600 capitalize">{user.tier}</span>
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <Button variant="outline" onClick={() => router.push('/pricing')} className="mr-2">
                View Pricing
              </Button>
              <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:text-red-700">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React from 'react';