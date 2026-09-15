"use client";

import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type CellContent = string | number | boolean | ReactNode;

export interface Column<T> {
  header: string;
  accessor?: keyof T | ((item: T) => string | number | boolean | null | undefined);
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  zebra?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  zebra = true,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full text-left border-collapse">
        <thead className='' >
          <tr className="border-b-2 border-indigo-100 bg-slate-50/70">
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className={cn(
                  "px-6 py-3.5 text-xs bg-blue-600 font-semibold text-white whitespace-nowrap",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-sm text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "group relative transition-colors duration-150 ease-in-out hover:bg-indigo-50/50",
                  zebra && rowIndex % 2 === 1 && "bg-slate-50/50"
                )}
              >
                {columns.map((col, colIndex) => {
                  let content: ReactNode;

                  if (col.render) {
                    content = col.render(item);
                  } else if (col.accessor) {
                    const raw = typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : item[col.accessor];

                    content = (
                      <span className="text-sm font-medium text-gray-700">
                        {raw !== null && raw !== undefined ? String(raw) : '-'}
                      </span>
                    );
                  } else {
                    content = null;
                  }

                  return (
                    <td
                      key={colIndex}
                      className={cn(
                        "relative px-6 py-3.5 align-middle",
                        colIndex === 0 && "before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:scale-y-0 before:bg-indigo-500 before:transition-transform group-hover:before:scale-y-100",
                        col.className
                      )}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {data.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3 text-xs text-gray-400">
          <span>Showing {data.length} {data.length === 1 ? 'record' : 'records'}</span>
        </div>
      )}
    </div>
  );
}