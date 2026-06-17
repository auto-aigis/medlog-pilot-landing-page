"use client";
import { useAuth } from '@/app/_components/AuthProvider';
import { useRouter } from 'next/navigation';
import { paymentsApi } from '@/app/_lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  id: string;
}

const TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Get started with basic health tracking',
    features: [
      'Daily vital logging',
      'Health trends visualization',
      'Basic health insights',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    description: 'For serious exam preparation',
    features: [
      'Everything in Free',
      'Exam readiness scoring',
      'AI-powered recommendations',
      'Personalized prep checklist',
      'Priority support',
      'Export health reports',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    description: 'For institutions and organizations',
    features: [
      'Everything in Pro',
      'Multi-user management',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced analytics',
      'SLA support',
    ],
  },
];

export default function PricingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = React.useState('');
  const [processing, setProcessing] = React.useState(false);

  const handleUpgrade = async (tierId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.tier === tierId) {
      return;
    }

    setError('');
    setProcessing(true);

    try {
      const response = await paymentsApi.getPaymentLink({ tier: tierId });
      window.location.href = response.payment_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate payment');
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 max-w-2xl mx-auto">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <Card key={tier.id} className={user?.tier === tier.id ? 'ring-2 ring-blue-500' : ''}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">${tier.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleUpgrade(tier.id)}
                  disabled={processing || user?.tier === tier.id}
                  className="w-full"
                >
                  {user?.tier === tier.id ? 'Current Plan' : processing ? 'Processing...' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';