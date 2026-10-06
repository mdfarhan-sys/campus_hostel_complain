import React from 'react';
import { CheckCircle2, Shield, Sparkles, Send, Droplets, Wifi, Zap, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CampusImage({
  variant = 'hero',
  className = '',
  src,
  alt = 'Campus architectural building'
}) {
  // Curated clean campus photos with university architecture
  const defaultHeroImg = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"; // Beautiful campus building with students walking
  const defaultAboutImg = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"; // Modern brick/stone university structure
  const defaultMissionImg = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"; // Students collaborating on campus

  const imageSrc = src || (variant === 'about' ? defaultAboutImg : variant === 'mission' ? defaultMissionImg : defaultHeroImg);

  if (variant === 'hero') {
    return (
      <div className={`relative w-full max-w-lg mx-auto lg:max-w-none ${className}`}>
        {/* Main Campus Image Card with soft border and shadow */}
        <div className="relative overflow-hidden rounded-3xl lg:rounded-4xl border-2 border-[#E2EBE0] shadow-soft-lg bg-white aspect-[4/3] sm:aspect-[16/11]">
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.02]"
            loading="eager"
          />
          {/* Subtle warm green tone overlay for perfect aesthetic harmony */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#173D2B]/40 via-transparent to-transparent pointer-events-none" />

          {/* Bottom badge inside the photo */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/95 bg-[#173D2B]/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <span className="flex items-center gap-2 font-medium">
              <Building className="w-4 h-4 text-[#AFC69A]" />
              Central University Hostels & Campus
            </span>
            <span className="text-[11px] text-[#AFC69A] font-semibold tracking-wider uppercase">
              Live Monitor
            </span>
          </div>
        </div>

        {/* Floating Status Card 1: Top Right */}
        <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-[#DFE7D8] shadow-soft-lg rounded-2xl p-3.5 sm:p-4 max-w-[230px] sm:max-w-[260px] animate-fade-in z-10 transition-transform hover:-translate-y-1">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F0DF] text-[#173D2B] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-[#4F7F55]" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#173D2B] flex items-center gap-1.5">
                Your issue matters!
                <span className="w-2 h-2 rounded-full bg-[#4F7F55] animate-pulse"></span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#68756C] mt-0.5 leading-snug">
                A cleaner, safer and better campus experience.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Quick Action / Preview Card 2: Bottom Left */}
        <div className="hidden sm:block absolute -bottom-8 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#DFE7D8] shadow-soft-lg rounded-2xl p-4 w-72 z-10 transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-[#173D2B] uppercase tracking-wider">Quick Ticket</span>
            <span className="text-[10px] bg-[#E8F0DF] text-[#173D2B] px-2 py-0.5 rounded-full font-medium">Fast-track</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs text-[#173D2B] font-medium mb-3">
            <span className="flex items-center gap-1.5 bg-[#F4F7EE] px-2.5 py-1.5 rounded-xl border border-[#DFE7D8]/60">
              <Droplets className="w-3.5 h-3.5 text-[#4F7F55]" /> Water
            </span>
            <span className="flex items-center gap-1.5 bg-[#F4F7EE] px-2.5 py-1.5 rounded-xl border border-[#DFE7D8]/60">
              <Wifi className="w-3.5 h-3.5 text-[#4F7F55]" /> Wi-Fi
            </span>
            <span className="flex items-center gap-1.5 bg-[#F4F7EE] px-2.5 py-1.5 rounded-xl border border-[#DFE7D8]/60">
              <Zap className="w-3.5 h-3.5 text-[#4F7F55]" /> Electricity
            </span>
            <span className="flex items-center gap-1.5 bg-[#F4F7EE] px-2.5 py-1.5 rounded-xl border border-[#DFE7D8]/60">
              <Sparkles className="w-3.5 h-3.5 text-[#4F7F55]" /> Cleanliness
            </span>
          </div>
          <Link
            to="/report"
            className="w-full flex items-center justify-center gap-2 py-2 bg-[#173D2B] hover:bg-[#204E38] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            <span>Submit Issue</span>
            <Send className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  // Generic / About / Mission visual card
  return (
    <div className={`relative overflow-hidden rounded-3xl border-2 border-[#E2EBE0] shadow-soft-lg bg-white ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.02]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#173D2B]/35 via-transparent to-transparent pointer-events-none" />
      
      {variant === 'about' && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DFE7D8] shadow-sm flex items-center gap-1.5 text-xs font-semibold text-[#173D2B]">
          <span>Better Together</span>
          <span className="text-[#4F7F55]">✦</span>
        </div>
      )}
    </div>
  );
}
