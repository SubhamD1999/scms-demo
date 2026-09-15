"use client";

import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface MetricCardProps {
  value: string;
  label: string;
  iconName: keyof typeof Icons;
  className?: string;
}

// Same safe icon map pattern
const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  Object.entries(Icons).filter(([key, value]) => 
    key !== 'createLucideIcon' && 
    typeof value === 'function' && 
    'displayName' in value
  )
) as Record<string, LucideIcon>;

export default function MetricCard({ value, label, iconName, className }: MetricCardProps) {
  const IconComponent = iconMap[iconName] || Icons.HelpCircle;

  return (
    <div className={cn("flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100", className)}>
      <div className="p-2 bg-gray-100 text-gray-600 rounded-md">
        <IconComponent size={20} />
      </div>
      <div>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}