import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = '',
  light = false
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-12 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3.5 ${
          light 
            ? 'bg-white/15 text-[#E8F0DF] border border-white/20' 
            : 'bg-[#E8F0DF] text-[#173D2B] border border-[#D3E0C8]'
        }`}>
          {badge}
        </div>
      )}
      
      {title && (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 ${
          light ? 'text-white' : 'text-[#173D2B]'
        } ${titleClassName}`}>
          {title}
        </h2>
      )}

      {subtitle && (
        <p className={`text-sm sm:text-base leading-relaxed ${
          light ? 'text-[#C9DFC2]' : 'text-[#68756C]'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
