import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import IssueCard from '../components/IssueCard';
import CampusImage from '../components/CampusImage';
import SectionHeading from '../components/SectionHeading';
import { ISSUE_CATEGORIES } from '../data/issues';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F6EE]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0DF] border border-[#D5E3CD] text-[#173D2B] text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#4F7F55]" />
                HOSTEL & CAMPUS COMPLAINT MANAGEMENT SYSTEM
              </div>

              {/* Large Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#173D2B] tracking-tight leading-[1.08]">
                Report It. <br />
                Track It. <br />
                <span className="text-[#4F7F55]">Fix It.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#68756C] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                CampusFix helps students report hostel and campus issues easily and get them resolved faster.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Button
                  to="/report"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  className="w-full sm:w-auto"
                >
                  Report an Issue
                </Button>

                <Button
                  to="/track"
                  variant="secondary"
                  size="lg"
                  icon={Search}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Track Issue
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#68756C]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4F7F55]" />
                  <span>Verified Hostel Wardens</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4F7F55]" />
                  <span>Strict SLA Turnaround</span>
                </div>
              </div>
            </div>

            {/* Right Column: Campus Image Card with floating badges */}
            <div className="lg:col-span-6 relative">
              <CampusImage variant="hero" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatCard />
        </div>
      </section>

      {/* 3. ISSUE CATEGORIES SECTION */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="How It Works"
            title="What can you report?"
            subtitle="From basic facilities to hostel services — we’ve got you covered."
            align="center"
          />

          {/* Responsive 8-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {ISSUE_CATEGORIES.map((category) => (
              <IssueCard key={category.id} category={category} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/issues"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#173D2B] hover:text-[#4F7F55] transition-colors group"
            >
              <span>Explore all reported issues on campus</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. CTA BANNER SECTION */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#173D2B] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-soft-lg">
            
            {/* Subtle background glow effect (no flowers/leaves) */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#255A3E] rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#255A3E] rounded-full blur-3xl opacity-30 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#204E38] border border-[#2D664A] text-[#AFC69A] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Take Action Today
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Small Issues, Big Changes.
                </h2>
                <p className="text-sm sm:text-base text-[#CDE0C7] leading-relaxed">
                  Your voice builds a better campus. Report. Track. See the change.
                </p>
              </div>

              <div className="shrink-0">
                <Button
                  to="/report"
                  variant="white"
                  size="lg"
                  icon={ArrowRight}
                  className="shadow-md"
                >
                  Report Now
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
