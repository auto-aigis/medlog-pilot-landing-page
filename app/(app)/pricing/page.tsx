"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { paymentApi } from '@/_lib/api';
import { useAuth } from '@/_components/AuthProvider';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Get started with basic logging',
    features: [
      '7-day log history',
      'BP and HR sparklines',
      'Basic status indicators',
      'No Medical Readiness Score',
    ],
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'Full professional pilot tracking',
    features: [
      '90-day log history',
      'All 6 health metrics',
      'Medical Readiness Score',
      'Exam countdown & alerts',
      'Weekly insights',
      'All regulatory standards',
    ],
    featured: true,
  },
  {
    name: 'Plus',
    price: '$22',
    period: '/month',
    description: 'Premium with evidence export',
    features: [
      'Everything in Pro',
      '365-day log history',
      'PDF evidence packet export',
      'Priority support',
      'Early access to features',
    ],
  },
];

export default function PricingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (tier: 'pro' | 'plus') => {
    setLoading(tier);
    try {
      const { checkout_url } = await paymentApi.createCheckout(tier);
      window.location.href = checkout_url;
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upgrade failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-gray-600">Choose the plan that fits your pilot medical readiness needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${tier.featured ? 'ring-2 ring-blue-500 md:scale-105' : ''}`}
          >
            {tier.featured && (
              <div className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold text-center">
                MOST POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                {tier.period && <span className="text-gray-600">{tier.period}</span>}
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {tier.name === 'Free' ? (
                user?.tier === 'free' && (
                  <Badge variant="outline" className="w-full justify-center py-2">
                    Your current plan
                  </Badge>
                )
              ) : (
                <Button
                  onClick={() => handleUpgrade(tier.name.toLowerCase() as 'pro' | 'plus')}
                  disabled={loading === tier.name.toLowerCase()}
                  className="w-full"
                >
                  {loading === tier.name.toLowerCase() ? 'Processing...' : `Upgrade to ${tier.name}`}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}