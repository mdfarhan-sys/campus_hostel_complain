import React from 'react';
import { ArrowRight, Users, Sparkles, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import CampusImage from '../components/CampusImage';
import Button from '../components/Button';
import { CORE_FEATURES, MISSION_VALUES } from '../data/features';

export default function About() {
  return (
    <div className="min-h-screen bg-[#F7F6EE] pb-24">
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-12 pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0DF] border border-[#D5E3CD] text-[#173D2B] text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#4F7F55]" />
                About CampusFix
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#173D2B] tracking-tight leading-[1.12]">
                A Smarter Way to <br className="hidden sm:inline" />
                Build a <span className="text-[#4F7F55]">Better Campus</span>
              </h1>

              <p className="text-base sm:text-lg text-[#68756C] leading-relaxed max-w-xl mx-auto lg:mx-0">
                CampusFix is a student-driven platform designed to simplify complaint management in hostels and colleges. We bridge the gap between students and administration to ensure a cleaner, safer and more comfortable campus for everyone.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Button to="/report" variant="primary" size="lg" icon={ArrowRight}>
                  Report an Issue
                </Button>
                <Button to="/issues" variant="secondary" size="lg">
                  View Public Board
                </Button>
              </div>
            </div>

            {/* Right Side: Large Rounded Campus Visual */}
            <div className="lg:col-span-6">
              <CampusImage variant="about" className="aspect-[4/3] sm:aspect-[16/11]" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-14 sm:py-20 bg-[#F2F6ED]/70 border-y border-[#E2EBE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Why CampusFix"
            title="Core Platform Capabilities"
            subtitle="Engineered to eliminate administrative friction and restore student peace of mind."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_FEATURES.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>

        </div>
      </section>

      {/* 3. MISSION SECTION */}
      <section className="pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <CampusImage
                variant="mission"
                className="aspect-[4/3] sm:aspect-[4/4] lg:aspect-[3/4]"
                alt="Students collaborating on campus"
              />
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0DF] border border-[#D5E3CD] text-[#173D2B] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#4F7F55]" />
                Our Mission
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173D2B] tracking-tight leading-tight">
                Empowering Students, <br />
                <span className="text-[#4F7F55]">Improving Campuses</span>
              </h2>

              <p className="text-base text-[#68756C] leading-relaxed">
                We envision a campus where every student's voice is heard, every issue is addressed, and every facility works better. CampusFix is here to make that vision a reality through transparent accountability and direct communication.
              </p>

              {/* 3 Value Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {MISSION_VALUES.map((val) => (
                  <div
                    key={val.id}
                    className="p-5 bg-white rounded-2xl border border-[#DFE7D8] shadow-subtle hover:border-[#AFC69A] transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#E8F0DF] text-[#173D2B] flex items-center justify-center mb-3">
                      {val.id === 'community' && <Users className="w-4 h-4" />}
                      {val.id === 'innovation' && <Sparkles className="w-4 h-4" />}
                      {val.id === 'impact' && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <h3 className="font-bold text-sm text-[#173D2B] mb-1">
                      {val.title}
                    </h3>
                    <p className="text-xs text-[#68756C] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
