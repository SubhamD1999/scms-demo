"use client";

import { cn } from "../lib/utils";


interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: {
    label: string;
    options: FilterOption[];
    defaultValue?: string;
  }[];
  buttons?: { label: string; variant?: 'primary' | 'secondary'; onClick?: () => void }[];
  className?: string;
}

export default function FilterBar({ filters, buttons, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-6", className)}>
      {filters.map((filter, index) => (
        <div key={index} className="flex items-center gap-3">
          <label htmlFor={`filter-${index}`} className="text-sm text-green-700 whitespace-nowrap">
            {filter.label}:
          </label>
          <select
            id={`filter-${index}`}
            defaultValue={filter.defaultValue}
            className="px-4 py-2 rounded-lg border border-green-200 bg-white text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  hover:border-gray-300 transition-colors"
          >
            {filter.options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      ))}
      {buttons && (
        <div className="ml-auto flex gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={cn(
                "px-5 py-2.5 text-sm  rounded-lg shadow-md hover:shadow-lg transition-all duration-200",
                button.variant === 'primary'
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}