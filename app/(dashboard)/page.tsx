"use client";

import type { Column } from '../ui/DataTable';
import { Download, FileText, Printer, TrendingUp, TrendingDown, Package, Store, Layers, List } from 'lucide-react';
import StatCard from '../ui/StatCard';
import { averageTransactions, todayTransactions, topStats, totalTransactions } from '../lib/data/statsData';
import MetricCard from '../ui/MetricCard';
import FilterBar from '../ui/FilterBar';
import DistrictBarChart from '../ui/DistrictBarChart';
import DistrictPieChart from '../ui/DistrictPieChart';
import DataTable from '../ui/DataTable';
import { allTransactionsData, districtTableData } from '../lib/data/transactionData';

type DistrictRow = {
  sl_no: number;
  district_name: string;
  total_indent: number;
  annual_indent: number;
};

type TransactionRow = {
  sl_no: number;
  district_name: string;
  facility_type: string;
  store_name: string;
  status: boolean;
  total_indent: number;
  total_item_issued: number;
  total_receipt: number;
};

export default function DashboardPage() {
const districtColumns: Column<DistrictRow>[] = [
  { 
    header: 'SL NO', 
    accessor: 'sl_no',
    className: "w-20 text-center",
    render: (item) => (
      <span className="text-sm text-gray-500 font-medium">{item.sl_no}</span>
    )
  },
  { 
    header: 'DISTRICT/STORE NAME', 
    accessor: 'district_name',
    render: (item) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
        {item.district_name}
      </span>
    )
  },
  { 
    header: 'NO. OF TOTAL INDENT', 
    accessor: 'total_indent',
    render: (item) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
        {item.total_indent.toLocaleString()}
      </span>
    )
  },
  { 
    header: 'ANNUAL INDENT', 
    accessor: 'annual_indent',
    render: (item) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
        {item.annual_indent.toLocaleString()}
      </span>
    )
  },
];


const transactionColumns: Column<TransactionRow>[] = [
  { 
    header: 'SL NO', 
    accessor: 'sl_no',
    className: "w-16 text-center", 
    render: (item) => (
      <span className="text-sm text-gray-500 font-medium">{item.sl_no}</span>
    )
  },
  { 
    header: 'DISTRICT NAME', 
    render: (item: TransactionRow) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
        {item.district_name}
      </span>
    ) 
  },
  { 
    header: 'FACILITY TYPE', 
    accessor: 'facility_type',
    render: (item) => (
       <span className="text-sm text-gray-600">{item.facility_type}</span>
    )
  },
  { 
    header: 'STORE NAME', 
    render: (item: TransactionRow) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900 leading-tight">
          {item.store_name}
        </span>
        {item.status && (
           <span className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
             Verified
           </span>
        )}
      </div>
    ) 
  },
  { 
    header: 'TOTAL INDENT', 
    accessor: 'total_indent',
    render: (item) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
        {item.total_indent.toLocaleString()}
      </span>
    )
  },
  { 
    header: 'ITEMS ISSUED', 
    accessor: 'total_item_issued',
    render: (item) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
        {item.total_item_issued.toLocaleString()}
      </span>
    )
  },
  { 
    header: 'RECEIPTS', 
    accessor: 'total_receipt',
    render: (item) => (
      <span className="text-sm text-gray-600 tabular-nums">
        {item.total_receipt.toLocaleString()}
      </span>
    )
  },
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white">
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg px-14">
        <div className="px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">SCMS Dashboard</h1>
              <p className="text-blue-100 mt-1 text-sm">Supply Chain Management System</p>
            </div>
            <select className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50">
              <option className="text-gray-800">National Health Mission</option>
              <option className="text-gray-800">AGMC & GBP Hospital</option>
              <option className="text-gray-800">National AYUSH Mission, Tripura</option>
            </select>
          </div>
        </div>
      </header>

      <main className="p-20 space-y-6 max-w-8xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Stores</p>
                <p className="text-4xl font-bold">1,256</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Store size={28} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-100">
              <TrendingUp size={16} className="mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Item Categories</p>
                <p className="text-4xl font-bold">37</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Layers size={28} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-100">
              <TrendingUp size={16} className="mr-1" />
              <span>+3 new categories</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Total Items</p>
                <p className="text-4xl font-bold">5,250</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Package size={28} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-100">
              <TrendingUp size={16} className="mr-1" />
              <span>+8.2% increase</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">EDL Items</p>
                <p className="text-4xl font-bold">804</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <List size={28} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-100">
              <TrendingDown size={16} className="mr-1" />
              <span>-2% from last month</span>
            </div>
          </div>
        </section>

        <section className="mt-12" >
          <h2 className="text-2xl  text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></span>
            Dashboard Overview
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h3 className="text-lg  text-white">Total Transaction</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {totalTransactions.map(metric => (
                  <div key={metric.id} className="group p-4 rounded-xl bg-blue-50 transition-colors duration-200 border border-gray-100 hover:border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                        {metric.iconName === 'FileText' && <FileText size={20} className="text-blue-600" />}
                        {metric.iconName === 'Send' && <TrendingUp size={20} className="text-orange-600" />}
                        {metric.iconName === 'Download' && <Download size={20} className="text-green-600" />}
                        {metric.iconName === 'AlertTriangle' && <TrendingDown size={20} className="text-red-600" />}
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-500">{metric.value}</p>
                        <p className="text-xs text-gray-500 font-medium">{metric.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h3 className="text-lg  text-white">Average Transaction</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {averageTransactions.map(metric => (
                  <div key={metric.id} className="group p-4 rounded-xl bg-purple-50 transition-colors duration-200 border border-gray-100 hover:border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                        {metric.iconName === 'TrendingUp' && <TrendingUp size={20} className="text-green-600" />}
                        {metric.iconName === 'TrendingDown' && <TrendingDown size={20} className="text-red-600" />}
                        {metric.iconName === 'BarChart2' && <TrendingUp size={20} className="text-blue-600" />}
                        {metric.iconName === 'Clock' && <TrendingDown size={20} className="text-orange-600" />}
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-500">{metric.value}</p>
                        <p className="text-xs text-gray-500 font-medium">{metric.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4">
                <h3 className="text-lg  text-white">Today's Transaction</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {todayTransactions.map(metric => (
                  <div key={metric.id} className="group p-4 rounded-xl bg-emerald-50 transition-colors duration-200 border border-gray-100 hover:border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                        {metric.iconName === 'Calendar' && <TrendingUp size={20} className="text-blue-600" />}
                        {metric.iconName === 'Send' && <TrendingUp size={20} className="text-orange-600" />}
                        {metric.iconName === 'Download' && <Download size={20} className="text-green-600" />}
                        {metric.iconName === 'CheckCircle' && <TrendingUp size={20} className="text-emerald-600" />}
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-500">{metric.value}</p>
                        <p className="text-xs text-gray-500 font-medium">{metric.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className=" rounded-2xl  border border-gray-100 p-6 mt-12">
          <FilterBar
            filters={[
              { label: 'Transaction Type', options: [{ value: 'indent', label: 'Indent' }, { value: 'return', label: 'Return' }] },
              { label: 'Status', options: [{ value: 'all', label: 'All Transactions' }, { value: 'trans1', label: ' Transaction1' },  ] },
              { label: 'District', options: [{ value: 'all', label: 'All Districts' },{ value: 'dis1', label: 'District 1' }] },
            ]}
            buttons={[
              { label: 'Indent Details', variant: 'primary' },
              { label: 'In-active Store', variant: 'secondary' },
            ]}
          />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-md  text-gray-600 border-b border-gray-300  p-4">All District Indent Quantity</h3>
            </div>
            <div className="p-6">
              <DistrictBarChart />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-md  text-gray-600 border-b border-gray-300  p-4">District Distribution</h3>
            </div>
            <div className="p-6">
              <DistrictPieChart />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1  gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-lg  text-gray-800">All Transactions Of All Districts</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg">
                  <FileText size={16} />
                  <span className="text-sm font-medium">Excel</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
                  <Printer size={16} />
                  <span className="text-sm font-medium">Print</span>
                </button>
              </div>
            </div>
            <DataTable
              data={districtTableData}
              columns={districtColumns}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-lg  text-gray-800">All Transactions</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg">
                  <FileText size={16} />
                  <span className="text-sm font-medium">PDF</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg">
                  <FileText size={16} />
                  <span className="text-sm font-medium">Excel</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
                  <Printer size={16} />
                  <span className="text-sm font-medium">Print</span>
                </button>
              </div>
            </div>
            <DataTable
              data={allTransactionsData}
              columns={transactionColumns}
            />
          </div>
        </section>
      </main>
    </div>
  );
}