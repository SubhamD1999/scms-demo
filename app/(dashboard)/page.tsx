"use client";



import { useState, useEffect } from 'react';
import type { Column } from '../ui/DataTable';
import { Download, FileText, Printer, TrendingUp, TrendingDown, Package, Store, Layers, List } from 'lucide-react';
import StatCard from '../ui/StatCard';
import { averageTransactions, todayTransactions, topStats, totalTransactions } from '../lib/data/statsData';
import MetricCard from '../ui/MetricCard';
import FilterBar from '../ui/FilterBar';
import DistrictBarChart from '../ui/DistrictBarChart';
import DistrictPieChart from '../ui/DistrictPieChart';
import DataTable from '../ui/DataTable';
import TransactionView from '../ui/supportingComp';
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('total');
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const districtColumns: Column<DistrictRow>[] = [
    {
      header: 'SL NO',
      accessor: 'sl_no',
      className: "w-16 text-center", // Narrower for mobile
      render: (item) => <span className="text-sm text-gray-500 font-medium">{item.sl_no}</span>
    },
    {
      header: 'DISTRICT NAME', // Shortened header for mobile
      accessor: 'district_name',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap">
          {item.district_name}
        </span>
      )
    },
    {
      header: 'TOTAL INDENT',
      accessor: 'total_indent',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100 whitespace-nowrap">
          {item.total_indent.toLocaleString()}
        </span>
      )
    },
    {
      header: 'ANNUAL', // Shortened header
      accessor: 'annual_indent',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100 whitespace-nowrap">
          {item.annual_indent.toLocaleString()}
        </span>
      )
    },
  ];

  const transactionColumns: Column<TransactionRow>[] = [
    {
      header: 'SL',
      accessor: 'sl_no',
      className: "w-12 text-center",
      render: (item) => <span className="text-sm text-gray-500 font-medium">{item.sl_no}</span>
    },
    {
      header: 'DISTRICT',
      render: (item: TransactionRow) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap">
          {item.district_name}
        </span>
      )
    },
    {
      header: 'TYPE',
      accessor: 'facility_type',
      render: (item) => <span className="text-sm text-gray-600 whitespace-nowrap">{item.facility_type}</span>
    },
    {
      header: 'STORE NAME',
      render: (item: TransactionRow) => (
        <div className="flex flex-col min-w-[150px]"> {/* Min width prevents crushing */}
          <span className="text-sm font-medium text-gray-900 leading-tight truncate max-w-[200px]" title={item.store_name}>
            {item.store_name}
          </span>
          {item.status && (
            <span className="text-xs text-green-600 mt-0.5 flex items-center gap-1 whitespace-nowrap">
              Verified
            </span>
          )}
        </div>
      )
    },
    {
      header: 'INDENT',
      accessor: 'total_indent',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100 whitespace-nowrap">
          {item.total_indent.toLocaleString()}
        </span>
      )
    },
    {
      header: 'ISSUED',
      accessor: 'total_item_issued',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100 whitespace-nowrap">
          {item.total_item_issued.toLocaleString()}
        </span>
      )
    },
    {
      header: 'RECEIPTS',
      accessor: 'total_receipt',
      render: (item) => (
        <span className="text-sm text-gray-600 tabular-nums whitespace-nowrap">
          {item.total_receipt.toLocaleString()}
        </span>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white pb-10">

      {/* Mobile-Friendly Header */}
      <header
        className={`
          w-[95%] sm:w-[90%] flex justify-center items-center fixed top-3 sm:top-5 left-1/2 transform -translate-x-1/2 z-50 shadow-md
          transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'}
        `}
      >
        <section className="bg-gradient-to-r rounded-xl from-blue-600 via-blue-700 to-indigo-700 text-white w-full shadow-lg px-4 sm:px-8" >
          <div className="py-3 sm:py-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold tracking-tight">SCMS Dashboard</h1>
                <p className="text-blue-100 mt-0.5 sm:mt-1 text-xs sm:text-sm">Supply Chain Management System</p>
              </div>
              <select className="w-full sm:w-auto px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50 text-sm">
                <option className="text-gray-800">National Health Mission</option>
                <option className="text-gray-800">AGMC & GBP Hospital</option>
                <option className="text-gray-800">National AYUSH Mission, Tripura</option>
              </select>
            </div>
          </div>
        </section>
      </header>

      {/* Responsive Main Content */}
      <main className='w-full flex justify-center' >
      <div className="px-0 sm:px-0 lg:px-0 pt-36 sm:pt-46 space-y-6 w-[95%] sm:w-[90%] ">

        {/* Stats Cards - Stacks on mobile, 2 cols on tablet, 4 on desktop */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { color: 'blue', label: 'Total Stores', value: '1,256', icon: Store, trend: '+12%', trendIcon: TrendingUp },
            { color: 'purple', label: 'Item Categories', value: '37', icon: Layers, trend: '+3 new', trendIcon: TrendingUp },
            { color: 'emerald', label: 'Total Items', value: '5,250', icon: Package, trend: '+8.2%', trendIcon: TrendingUp },
            { color: 'red', label: 'EDL Items', value: '804', icon: List, trend: '-2%', trendIcon: TrendingDown },
          ].map((stat, idx) => (
            <div key={idx} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 p-4 sm:p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-${stat.color}-100 text-xs sm:text-sm font-medium mb-1`}>{stat.label}</p>
                  <p className="text-2xl sm:text-4xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <stat.icon size={20} className="sm:w-7 sm:h-7" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-white/80">
                <stat.trendIcon size={14} className="mr-1" />
                <span>{stat.trend} from last month</span>
              </div>
            </div>
          ))}
        </section>

        {/* Dashboard Overview */}
        


{/* Dashboard Overview */}
<section className="mt-8 sm:mt-12">

  {/* Section Heading */}
  <div className="flex items-center justify-between mb-5 sm:mb-6">
    <div className="flex items-center gap-3">
      <div className="w-1 h-7 sm:h-8 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
          Dashboard Overview
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Overview of transaction activity and performance
        </p>
      </div>
    </div>
  </div>

  {/* Overview Cards */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

    {[
      {
        title: 'Total Transaction',
        subtitle: 'Overall transaction summary',
        data: totalTransactions,
        theme: {
          accent: 'bg-blue-500',
          iconBg: 'bg-blue-50',
          iconText: 'text-blue-600',
          value: 'text-gray-800',
          hover: 'hover:border-blue-200',
          shadow: 'hover:shadow-blue-100/60',
        },
      },
      {
        title: 'Average Transaction',
        subtitle: 'Average transaction metrics',
        data: averageTransactions,
        theme: {
          accent: 'bg-purple-500',
          iconBg: 'bg-purple-50',
          iconText: 'text-purple-600',
          value: 'text-gray-800',
          hover: 'hover:border-purple-200',
          shadow: 'hover:shadow-purple-100/60',
        },
      },
      {
        title: "Today's Transaction",
        subtitle: 'Transaction activity for today',
        data: todayTransactions,
        theme: {
          accent: 'bg-emerald-500',
          iconBg: 'bg-emerald-50',
          iconText: 'text-emerald-600',
          value: 'text-gray-800',
          hover: 'hover:border-emerald-200',
          shadow: 'hover:shadow-emerald-100/60',
        },
      },
    ].map((section, idx) => (

      <div
        key={idx}
        className={`
          relative bg-white rounded-2xl
          border border-gray-100
          shadow-md
          overflow-hidden
          transition-all duration-300
          hover:shadow-lg
          ${section.theme.hover}
          ${section.theme.shadow}
        `}
      >

        {/* Top Accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${section.theme.accent}`} />

        {/* Card Header */}
        <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4">

          <div className="flex items-start justify-between">

            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">
                {section.title}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                {section.subtitle}
              </p>
            </div>

            {/* Small indicator */}
            <div
              className={`
                w-2.5 h-2.5 rounded-full
                ${section.theme.accent}
                mt-1.5
              `}
            />
          </div>

        </div>

        {/* Metrics */}
        <div className="px-4 sm:px-5 pb-5 sm:pb-6">

          <div className="grid grid-cols-2 gap-3">

            {section.data.map((metric) => (

              <div
                key={metric.id}
                className="
                  group
                  relative
                  rounded-xl
                  border border-gray-100
                  bg-gray-50/70
                  p-3.5 sm:p-4
                  transition-all duration-200
                  hover:bg-white
                  hover:shadow-sm
                  hover:border-gray-200
                "
              >

                <div className="flex items-start gap-3">

                  {/* Icon */}
                  <div
                    className={`
                      shrink-0
                      w-9 h-9 sm:w-10 sm:h-10
                      rounded-lg
                      ${section.theme.iconBg}
                      ${section.theme.iconText}
                      flex items-center justify-center
                      transition-transform duration-200
                      group-hover:scale-105
                    `}
                  >

                    {metric.iconName === 'FileText' && (
                      <FileText size={18} />
                    )}

                    {metric.iconName === 'Send' && (
                      <TrendingUp size={18} />
                    )}

                    {metric.iconName === 'Download' && (
                      <Download size={18} />
                    )}

                    {metric.iconName === 'AlertTriangle' && (
                      <TrendingDown size={18} />
                    )}

                    {metric.iconName === 'TrendingUp' && (
                      <TrendingUp size={18} />
                    )}

                    {metric.iconName === 'TrendingDown' && (
                      <TrendingDown size={18} />
                    )}

                    {metric.iconName === 'BarChart2' && (
                      <TrendingUp size={18} />
                    )}

                    {metric.iconName === 'Clock' && (
                      <TrendingDown size={18} />
                    )}

                    {metric.iconName === 'Calendar' && (
                      <TrendingUp size={18} />
                    )}

                    {metric.iconName === 'CheckCircle' && (
                      <TrendingUp size={18} />
                    )}

                  </div>

                  {/* Text */}
                  <div className="min-w-0 pt-0.5">

                    <p className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      text-gray-800
                      tracking-tight
                      leading-none
                      tabular-nums
                    ">
                      {metric.value}
                    </p>

                    <p className="
                      text-[11px]
                      sm:text-xs
                      text-gray-500
                      font-medium
                      mt-1.5
                      leading-tight
                    ">
                      {metric.label}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    ))}

  </div>

</section>


        {/* <section className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl text-gray-500 mb-4 sm:mb-6 flex items-center font-semibold">
            <span className="w-1 h-6  sm:h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></span>
            Dashboard Overview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: 'Total Transaction', data: totalTransactions, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', border: 'hover:border-blue-200' },
              { title: 'Average Transaction', data: averageTransactions, gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', border: 'hover:border-purple-200' },
              { title: "Today's Transaction", data: todayTransactions, gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', border: 'hover:border-emerald-200' },
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${section.gradient} px-4 sm:px-6 py-3 sm:py-4`}>
                  <h3 className="text-base sm:text-lg text-white font-semibold">{section.title}</h3>
                </div>
                <div className="p-4 sm:p-6 grid grid-cols-2 gap-3 sm:gap-4">
                  {section.data.map(metric => (
                    <div key={metric.id} className={`group p-3 sm:p-4 rounded-xl ${section.bg} transition-colors duration-200 border border-gray-100 ${section.border}`}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadows shrink-0">
                          {metric.iconName === 'FileText' && <FileText size={16} className="sm:w-5 sm:h-5 text-blue-600" />}
                          {metric.iconName === 'Send' && <TrendingUp size={16} className="sm:w-5 sm:h-5 text-orange-600" />}
                          {metric.iconName === 'Download' && <Download size={16} className="sm:w-5 sm:h-5 text-green-600" />}
                          {metric.iconName === 'AlertTriangle' && <TrendingDown size={16} className="sm:w-5 sm:h-5 text-red-600" />}
                          {metric.iconName === 'TrendingUp' && <TrendingUp size={16} className="sm:w-5 sm:h-5 text-green-600" />}
                          {metric.iconName === 'TrendingDown' && <TrendingDown size={16} className="sm:w-5 sm:h-5 text-red-600" />}
                          {metric.iconName === 'BarChart2' && <TrendingUp size={16} className="sm:w-5 sm:h-5 text-blue-600" />}
                          {metric.iconName === 'Clock' && <TrendingDown size={16} className="sm:w-5 sm:h-5 text-orange-600" />}
                          {metric.iconName === 'Calendar' && <TrendingUp size={16} className="sm:w-5 sm:h-5 text-blue-600" />}
                          {metric.iconName === 'CheckCircle' && <TrendingUp size={16} className="sm:w-5 sm:h-5 text-emerald-600" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-lg sm:text-xl font-bold text-gray-700 truncate">{metric.value}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">{metric.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section> */}




        {/* Filter Bar - Stack on mobile */}
        <div className="rounded-2xl border border-gray-100 p-4 sm:p-6 mt-8 sm:mt-12">
          <FilterBar
            filters={[
              { label: 'Type', options: [{ value: 'indent', label: 'Indent' }, { value: 'return', label: 'Return' }] },
              { label: 'Status', options: [{ value: 'all', label: 'All Transactions' }, { value: 'trans1', label: 'Transaction 1' }] },
              { label: 'District', options: [{ value: 'all', label: 'All Districts' }, { value: 'dis1', label: 'District 1' }] },
            ]}
            buttons={[
              { label: 'Indent Details', variant: 'primary' },
              { label: 'In-active Store', variant: 'secondary' },
            ]}
          />
        </div>

        {/* Charts - Stack on mobile */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <h3 className="text-sm sm:text-xl text-gray-600 font-semibold border-b border-gray-300 pb-2">All District Indent Quantity</h3>
            </div>
            <div className="p-4 sm:p-6">
              <DistrictBarChart />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <h3 className="text-sm sm:text-xl text-gray-600 font-semibold border-b border-gray-300 pb-2">District Distribution</h3>
            </div>
            <div className="p-4 sm:p-6">
              <DistrictPieChart />
            </div>
          </div>
        </section>

        {/* Tables - Horizontal Scroll on Mobile */}
        <section className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-base sm:text-xl  text-gray-800">All Transactions Of All Districts</h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-medium">
                  <FileText size={14} className="sm:w-4 sm:h-4" />
                  <span>Excel</span>
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-medium">
                  <Printer size={14} className="sm:w-4 sm:h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>
            {/* Horizontal scroll wrapper for mobile tables */}
            <div className="overflow-x-auto">
              <DataTable
                data={districtTableData}
                columns={districtColumns}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-base sm:text-xl text-gray-800">All Transactions</h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-medium">
                  <FileText size={14} className="sm:w-4 sm:h-4" />
                  <span>PDF</span>
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-medium">
                  <FileText size={14} className="sm:w-4 sm:h-4" />
                  <span>Excel</span>
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm font-medium">
                  <Printer size={14} className="sm:w-4 sm:h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <DataTable
                data={allTransactionsData}
                columns={transactionColumns}
              />
            </div>
          </div>
        </section>
      </div>
      </main>
    </div>
  );
}