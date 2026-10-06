import React from 'react';
import { Eye, Users, ShieldCheck, HeartHandshake } from 'lucide-react';

const iconMap = {
  Eye,
  Users,
  ShieldCheck,
  HeartHandshake
};

export default function FeatureCard({ feature, index }) {
  const IconComponent = iconMap[feature.iconName] || Users;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2EBE0] shadow-soft card-hover flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-[#E8F0DF] text-[#173D2B] flex items-center justify-center mb-5">
          <IconComponent className="w-6 h-6 text-[#173D2B]" strokeWidth={1.8} />
        </div>
        <h3 className="text-lg font-bold text-[#173D2B] mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-[#68756C] leading-relaxed">
          {feature.description}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-[#F2F6EE] flex items-center justify-between text-xs font-semibold text-[#4F7F55]">
        <span>0{index + 1} Pillar</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#AFC69A]"></span>
      </div>
    </div>
  );
}
