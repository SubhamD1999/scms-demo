"use client";

import type { LucideIcon } from 'lucide-react';

type ValidIconName = 
  | 'Store' | 'Layers' | 'Package' | 'List'
  | 'FileText' | 'Send' | 'Download' | 'AlertTriangle'
  | 'TrendingUp' | 'TrendingDown' | 'BarChart2' | 'Clock'
  | 'Calendar' | 'CheckCircle';

interface BaseStat {
  id: string;
  value: string;
  label: string;
  iconName: ValidIconName; 
}

export const topStats: BaseStat[] = [
  { id: 'stores', value: '1,256', label: 'Stores', iconName: 'Store' },
  { id: 'categories', value: '37', label: 'Item Categories', iconName: 'Layers' },
  { id: 'items', value: '5,250', label: 'Items', iconName: 'Package' },
  { id: 'edl', value: '804', label: 'EDL', iconName: 'List' },
];

export const totalTransactions: BaseStat[] = [
  { id: 'indent', value: '2,42,230', label: 'Indent', iconName: 'FileText' },
  { id: 'issue', value: '1,86,417', label: 'Issue', iconName: 'Send' },
  { id: 'receive', value: '9,40,851', label: 'Receive', iconName: 'Download' },
  { id: 'expiry', value: '23', label: 'Short Expiry', iconName: 'AlertTriangle' },
];

export const averageTransactions: BaseStat[] = [
  { id: 'avg-indent', value: '88', label: 'Avg Indent', iconName: 'TrendingUp' },
  { id: 'avg-issue', value: '80', label: 'Avg Issue', iconName: 'TrendingDown' },
  { id: 'avg-receive', value: '9', label: 'Avg Receive', iconName: 'BarChart2' },
  { id: 'avg-expiry', value: '247', label: 'Avg Short Expiry', iconName: 'Clock' },
];

export const todayTransactions: BaseStat[] = [
  { id: 'today-indent', value: '49', label: "Today's Indent", iconName: 'Calendar' },
  { id: 'today-issue', value: '15', label: "Today's Issue", iconName: 'Send' },
  { id: 'today-receive', value: '85', label: "Today's Receive", iconName: 'Download' },
  { id: 'today-expiry', value: '0', label: "Today's Short Expiry", iconName: 'CheckCircle' },
];