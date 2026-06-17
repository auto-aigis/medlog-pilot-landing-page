export interface User {
  id: string;
  email: string;
  display_name?: string;
  tier: 'free' | 'pro' | 'plus';
  onboarding_complete: boolean;
}

export interface Subscription {
  tier: 'free' | 'pro' | 'plus';
  status: string;
  current_period_end?: string;
}

export interface PilotProfile {
  airline_operator: string;
  license_type: 'DGCA' | 'FAA' | 'EASA';
  years_flying: number;
  aircraft_type: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  certificate_expiry_date?: string;
  next_exam_date?: string;
}

export interface VitalsLog {
  id: string;
  user_id: string;
  logged_at: string;
  systolic_bp?: number;
  diastolic_bp?: number;
  resting_hr?: number;
  weight_kg?: number;
  bmi?: number;
  sleep_hours?: number;
  sleep_quality?: number;
  alcohol_free_day?: boolean;
  stress_level?: number;
  note?: string;
}

export interface TrendMetric {
  metric: string;
  trend_7days: Array<{ timestamp: string; value?: number }>;
  trend_30days: Array<{ timestamp: string; value?: number }>;
  current_value?: number;
  status: 'green' | 'amber' | 'red';
}

export interface ReadinessScore {
  score: number;
  license_type: 'DGCA' | 'FAA' | 'EASA';
  metrics: {
    systolic_bp?: number;
    diastolic_bp?: number;
    resting_hr?: number;
    bmi?: number;
  };
}

export interface Insight {
  metric: string;
  trend: string;
  recommendation: string;
}

export interface InsightsResponse {
  insights: Insight[];
  last_updated: string;
}

export interface ChecklistItem {
  item: string;
  completed: boolean;
}

export interface ExamChecklist {
  items: ChecklistItem[];
  days_until_exam?: number;
}