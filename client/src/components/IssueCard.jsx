import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Wifi, 
  Zap, 
  Sparkles, 
  Utensils, 
  Home, 
  Armchair, 
  MoreHorizontal, 
  ArrowRight 
} from 'lucide-react';

const iconMap = {
  Droplets,
  Wifi,
  Zap,
  Sparkles,
  Utensils,
  Home,
  Armchair,
  MoreHorizontal,
};

export default function IssueCard({ category }) {
  const IconComponent = iconMap[category.iconName] || MoreHorizontal;

  return (
    <Link
      to={`/report?category=${encodeURIComponent(category.name)}`}
      className="group relative flex items-center justify-between p-5 sm:p-6 bg-[#F3F6ED] hover:bg-white rounded-2xl sm:rounded-3xl border border-[#DFE7D8] hover:border-[#AFC69A] shadow-xs hover:shadow-soft transition-all duration-300 card-hover"
      title={`Report an issue under ${category.name}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#E8F0DF] group-hover:bg-[#173D2B] text-[#173D2B] group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0">
          <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-[#173D2B] group-hover:text-[#173D2B] transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-[#68756C] line-clamp-1 mt-0.5">
            {category.description || 'Quick assistance available'}
          </p>
        </div>
      </div>

      <div className="w-9 h-9 rounded-full bg-white group-hover:bg-[#E8F0DF] text-[#173D2B] flex items-center justify-center border border-[#DFE7D8] group-hover:border-[#AFC69A] transition-all duration-300 shrink-0 ml-2">
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
