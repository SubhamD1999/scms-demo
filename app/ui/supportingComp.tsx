// app/ui/TransactionView.tsx
"use client";

import { ArrowRight, Activity, Zap, FileText, Download, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricItem {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

interface TransactionViewProps {
  title: string;
  data: MetricItem[];
  gradient: string;
  accentColor: 'blue' | 'purple' | 'emerald';
  showFlow?: boolean;
}

// Explicit color maps so Tailwind can detect them at build time
const colorStyles = {
  blue: {
    bg: 'bg-blue-50', borderHover: 'hover:border-blue-300', 
    text: 'text-blue-600', badgeBg: 'bg-blue-50', badgeText: 'text-blue-600',
    progressFrom: 'from-blue-400', progressTo: 'to-blue-600', arrowBg: 'bg-blue-100'
  },
  purple: {
    bg: 'bg-purple-50', borderHover: 'hover:border-purple-300', 
    text: 'text-purple-600', badgeBg: 'bg-purple-50', badgeText: 'text-purple-600',
    progressFrom: 'from-purple-400', progressTo: 'to-purple-600', arrowBg: 'bg-purple-100'
  },
  emerald: {
    bg: 'bg-emerald-50', borderHover: 'hover:border-emerald-300', 
    text: 'text-emerald-600', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-600',
    progressFrom: 'from-emerald-400', progressTo: 'to-emerald-600', arrowBg: 'bg-emerald-100'
  }
};

export default function TransactionView({ 
  title, 
  data, 
  gradient, 
  accentColor,
  showFlow = true 
}: TransactionViewProps) {
  
  const styles = colorStyles[accentColor];

  // Find the primary metric (largest value) for hero display
  const primaryMetric = data.reduce((max, item) => {
    const val = parseInt(item.value.replace(/,/g, ''));
    const maxVal = parseInt(max.value.replace(/,/g, ''));
    return val > maxVal ? item : max;
  }, data[0]);

  const totalValue = data.reduce((sum, item) => sum + parseInt(item.value.replace(/,/g, '')), 0);

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'FileText': return <FileText size={18} className={styles.text} />;
      case 'Send': return <ArrowRight size={18} className={styles.text} />;
      case 'Download': return <Download size={18} className={styles.text} />;
      case 'AlertTriangle': return <Activity size={18} className={styles.text} />;
      case 'TrendingUp': return <TrendingUp size={18} className={styles.text} />;
      case 'TrendingDown': return <TrendingDown size={18} className={styles.text} />;
      case 'BarChart2': return <Activity size={18} className={styles.text} />;
      case 'Clock': return <Activity size={18} className={styles.text} />;
      case 'Calendar': return <Activity size={18} className={styles.text} />;
      case 'CheckCircle': return <Activity size={18} className={styles.text} />;
      default: return <Activity size={18} className={styles.text} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Metric Card */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 sm:p-8 text-white shadow-2xl`}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-white/80" />
            <span className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">Primary Metric</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-bold mb-2 tracking-tight">
            {primaryMetric.value}
          </h3>
          <p className="text-sm sm:text-base text-white/90 font-medium">{primaryMetric.label}</p>
          
          {/* Mini stats row */}
          <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap gap-4 sm:gap-8">
            {data.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xs text-white/60 uppercase tracking-wider">{metric.label.split(' ')[0]}</span>
                <span className="text-lg sm:text-xl font-bold">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Visualization */}
      {showFlow && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {data.map((metric, idx) => {
            const percentage = totalValue > 0 
              ? (parseInt(metric.value.replace(/,/g, '')) / totalValue * 100).toFixed(1)
              : 0;
            
            return (
              <div 
                key={metric.id}
                className={`
                  group relative bg-white rounded-xl p-4 sm:p-5 border-2 border-gray-100
                  ${styles.borderHover} hover:shadow-lg transition-all duration-300
                `}
              >
                {/* Progress bar at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-lg overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${styles.progressFrom} ${styles.progressTo} transition-all duration-1000`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${styles.bg} group-hover:scale-110 transition-transform`}>
                    {getIcon(metric.iconName)}
                  </div>
                  <span className={`text-xs font-bold ${styles.badgeText} ${styles.badgeBg} px-2 py-1 rounded-full`}>
                    {percentage}%
                  </span>
                </div>

                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">{metric.label}</p>
                </div>

                {/* Flow arrow between cards */}
                {idx < data.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className={`${styles.arrowBg} p-1 rounded-full`}>
                      <ArrowRight size={14} className={styles.text} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}