import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  iconName: keyof typeof Icons;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  Object.entries(Icons).filter(([key, value]) => 
    key !== 'createLucideIcon' && 
    typeof value === 'function' && 
    'displayName' in value
  )
) as Record<string, LucideIcon>;

export default function StatCard({ value, label, iconName, className }: StatCardProps) {
  const IconComponent = iconMap[iconName] || Icons.HelpCircle;

  return (
    <div className={cn("bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4", className)}>
      <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
        <IconComponent size={24} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}