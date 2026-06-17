"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Heart,
  Activity,
  Moon,
  Eye,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Plane,
  ArrowRight,
  Star,
  Zap,
  BarChart3,
  Bell,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function Page() {
  const [email, setEmail] = useState("");

  const features: Feature[] = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Blood Pressure Tracking",
      description: "Log systolic/diastolic readings and spot trends before your AME does. Get alerts when readings drift toward certification risk zones.",
    },
    {
      icon: <Activity className="h-6 w-6 text-green-500" />,
      title: "Resting Heart Rate",
      description: "Track your resting HR daily and see how shift-work, layovers, and lifestyle changes impact your cardiovascular baseline.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      title: "BMI & Weight Management",
      description: "Monitor your BMI trajectory with pilot-specific targets. Get nutrition tips calibrated for irregular meal schedules.",
    },
    {
      icon: <Moon className="h-6 w-6 text-purple-500" />,
      title: "Sleep Quality Analysis",
      description: "Log sleep duration and quality across time zones. Understand how your roster affects recovery and medical readiness.",
    },
    {
      icon: <Shield className="h-6 w-6 text-amber-500" />,
      title: "Alcohol-Free Day Counter",
      description: "Track your alcohol-free days with smart reminders aligned to DGCA/FAA bottle-to-throttle rules and medical exam prep.",
    },
    {
      icon: <Eye className="h-6 w-6 text-cyan-500" />,
      title: "Vision Health Flags",
      description: "Monitor vision-related symptoms and get timely reminders for ophthalmology checkups before your medical renewal.",
    },
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Log in 60 Seconds",
      description: "Open the app, tap your daily vitals. Blood pressure, weight, sleep hours, and more — all in under a minute between flights.",
      icon: <Clock className="h-8 w-8 text-blue-600" />,
    },
    {
      number: "02",
      title: "See Your Trends",
      description: "Your personalized dashboard shows 30/60/90-day trends for every metric your Aviation Medical Examiner checks.",
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    },
    {
      number: "03",
      title: "Get Early Warnings",
      description: "MedLog Pilot flags drift before it becomes a problem. Know your health readiness score weeks before your medical exam.",
      icon: <Bell className="h-8 w-8 text-blue-600" />,
    },
    {
      number: "04",
      title: "Stay Certified",
      description: "Walk into your medical exam confident. No surprises, no deferrals, no grounding. Just clear skies ahead.",
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
    },
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Get started with basic health tracking",
      features: [
        "Track 3 core metrics",
        "7-day trend view",
        "Daily logging reminders",
        "Basic health tips",
      ],
      popular: false,
      cta: "Start Free",
    },
    {
      name: "Pro Pilot",
      price: "$9",
      period: "/month",
      description: "Full medical readiness tracking",
      features: [
        "All 8 medical metrics",
        "90-day trend analytics",
        "Pre-exam readiness score",
        "Personalized habit plans",
        "Export reports for AME",
        "Priority support",
      ],
      popular: true,
      cta: "Start 14-Day Trial",
    },
    {
      name: "Fleet",
      price: "$6",
      period: "/pilot/month",
      description: "For airlines and flight schools",
      features: [
        "Everything in Pro Pilot",
        "Admin dashboard",
        "Bulk pilot onboarding",
        "Anonymized fleet health insights",
        "Dedicated account manager",
        "Custom integrations",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "Is my health data secure and private?",
      answer: "Absolutely. MedLog Pilot uses end-to-end encryption and is fully compliant with data protection regulations. Your health data is never shared with airlines, insurers, or regulators without your explicit written consent.",
    },
    {
      question: "Which medical certificate standards does MedLog Pilot support?",
      answer: "We support DGCA (India), FAA (USA), EASA (Europe), and CASA (Australia) medical standards. The app automatically adjusts thresholds and alerts based on your selected aviation authority.",
    },
    {
      question: "How long does daily logging actually take?",
      answer: "Most pilots complete their daily log in 45-60 seconds. We designed the interface specifically for quick entries between flights, during layovers, or first thing in the morning.",
    },
    {
      question: "Can I share my reports with my Aviation Medical Examiner?",
      answer: "Yes! Pro Pilot subscribers can generate clean PDF reports showing their health trends over any time period. Many AMEs appreciate seeing proactive health monitoring from their pilot patients.",
    },
    {
      question: "What if I forget to log for a few days?",
      answer: "No problem. MedLog Pilot sends gentle reminders and allows backdating entries. Your trends still calculate accurately even with occasional gaps. Consistency matters more than perfection.",
    },
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Plane className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MedLog Pilot</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Zap className="mr-1 h-3 w-3" />
              Built exclusively for pilots
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Stay medically fit,{" "}
              <span className="text-blue-600">stay flying</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              The personal health dashboard for commercial pilots. Track the metrics your AME checks, spot drift early, and walk into every medical exam with confidence.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="flex w-full max-w-md items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="h-12"
                />
                <Button className="h-12 whitespace-nowrap bg-blue-600 px-6 hover:bg-blue-700">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required. Log your first vitals in under 60 seconds.
            </p>

            {/* Social Proof */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">4.9/5 from 500+ pilots</span>
              </div>
              <Separator orientation="vertical" className="hidden h-5 sm:block" />
              <span className="text-sm text-gray-600">Trusted by pilots across 40+ airlines</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-100 opacity-30 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-indigo-100 opacity-30 blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Every metric your medical examiner checks
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Track the 6-8 key health parameters that determine whether you keep your medical certificate — all in one pilot-focused dashboard.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">How It Works</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From logging to confidence in 4 simple steps
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Designed for the shift-work lifestyle of airline pilots. Quick, intuitive, and always available.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  {step.icon}
                </div>
                <span className="mb-2 block text-sm font-bold text-blue-600">Step {step.number}</span>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Dashboard Preview */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100">Dashboard Preview</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your medical readiness at a glance
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See how your key metrics trend over time with views tailored to aviation medical standards.
            </p>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="overview" className="mx-auto max-w-4xl">
              <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="readiness">Readiness</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-2">
                      <CardDescription className="text-green-700">Blood Pressure</CardDescription>
                      <CardTitle className="text-2xl text-green-900">118/76</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-green-600">Within optimal range</p>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-2">
                      <CardDescription className="text-green-700">Resting HR</CardDescription>
                      <CardTitle className="text-2xl text-green-900">62 bpm</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-green-600">Excellent for age group</p>
                    </CardContent>
                  </Card>
                  <Card className="border-amber-200 bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardDescription className="text-amber-700">BMI</CardDescription>
                      <CardTitle className="text-2xl text-amber-900">25.8</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-amber-600">Slightly above target</p>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-2">
                      <CardDescription className="text-green-700">Sleep Avg</CardDescription>
                      <CardTitle className="text-2xl text-green-900">7.2 hrs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-green-600">On target this week</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="trends" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>30-Day Trend Summary</CardTitle>
                    <CardDescription>Your health metrics are trending in the right direction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-sm font-medium">Blood Pressure</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Improving</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-sm font-medium">Resting Heart Rate</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Stable</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-sm font-medium">BMI</span>
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Watch</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-sm font-medium">Sleep Quality</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Improving</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-sm font-medium">Alcohol-Free Days</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">On Track</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="readiness" className="mt-8">
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Medical Exam Readiness Score</CardTitle>
                    <CardDescription className="text-blue-700">Based on your last 90 days of data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center py-6">
                      <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-blue-200 bg-white">
                        <span className="text-4xl font-bold text-blue-600">87</span>
                      </div>
                      <p className="mt-4 text-lg font-semibold text-blue-900">Good Standing</p>
                      <p className="mt-2 max-w-md text-center text-sm text-blue-700">
                        You{"'"}re well-prepared for your upcoming medical exam. Focus on bringing your BMI down slightly for an even higher score.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Less than a coffee per week to protect your career
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Pilots spend $2,200+ on reactive medical consultations. MedLog Pilot costs less than a single doctor visit — and helps you avoid needing one.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${plan.popular ? "border-2 border-blue-600 shadow-lg" : "border border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100">FAQ</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about MedLog Pilot
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Don{"'"}t let a preventable health issue ground you
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100">
              Join 2,000+ pilots who proactively track their medical fitness. Start logging today — your future self (and your medical examiner) will thank you.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="h-14 bg-white px-8 text-blue-700 hover:bg-blue-50">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 border-blue-300 px-8 text-white hover:bg-blue-500">
                Watch Demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              Free forever plan available. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">MedLog Pilot</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
            </div>
            <p className="text-sm text-gray-500">
              {"© 2024 MedLog Pilot. All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}