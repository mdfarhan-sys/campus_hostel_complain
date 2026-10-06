import React from 'react';
import { Users, FileText, CheckCircle2, Clock } from 'lucide-react';

const statsData = [
  {
    icon: Users,
    value: '1,200+',
    label: 'Active Students',
    subtext: 'Registered campus residents'
  },
  {
    icon: FileText,
    value: '2,800+',
    label: 'Issues Reported',
    subtext: 'Logged via platform'
  },
  {
    icon: CheckCircle2,
    value: '2,500+',
    label: 'Issues Resolved',
    subtext: 'Completed & verified'
  },
  {
    icon: Clock,
    value: '24–48 hrs',
    label: 'Avg. Resolution Time',
    subtext: 'Turnaround benchmark'
  }
];

export default function StatCard({ className = '' }) {
  return (
    <div className={`w-full bg-white rounded-3xl border border-[#E2EBE0] shadow-soft p-6 sm:p-8 md:p-10 ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E8F0DF]">
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                idx > 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''
              } ${idx === 1 ? 'pt-0' : ''}`}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#E8F0DF] text-[#173D2B] flex items-center justify-center mb-3.5 shadow-xs">
                <Icon className="w-5 h-5 text-[#173D2B]" strokeWidth={2} />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173D2B] tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-[#173D2B] mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-[#68756C] mt-0.5">
                {stat.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
