import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  ArrowRight, 
  CheckCircle2, 
  Wrench,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Issues', path: '/issues' },
    { name: 'Contact', path: '/contact' },
    { name: 'Track Issue', path: '/track' },
  ];

  const popularIssues = [
    { name: 'Water Supply', path: '/issues?category=Water%20Supply' },
    { name: 'Wi-Fi', path: '/issues?category=Wi-Fi' },
    { name: 'Electricity', path: '/issues?category=Electricity' },
    { name: 'Cleanliness', path: '/issues?category=Cleanliness' },
    { name: 'Room Maintenance', path: '/issues?category=Room%20Maintenance' },
  ];

  return (
    <footer className="bg-[#173D2B] text-white pt-16 pb-8 border-t border-[#123122]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#25523B]">
          
          {/* Column 1: Brand Info (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#173D2B] flex items-center justify-center font-bold text-lg shadow-sm">
                <Wrench className="w-5 h-5 text-[#173D2B]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                CampusFix
              </span>
            </Link>

            <p className="text-sm text-[#AFC69A] font-medium tracking-wide">
              Hotel & Campus Complaint Management System
            </p>

            <p className="text-sm text-[#D1E2C9] leading-relaxed max-w-sm">
              Report It. Track It. Fix It. Empowering student communities with transparent, reliable campus operations.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#204E38] hover:bg-[#AFC69A] text-[#E8F0DF] hover:text-[#173D2B] flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#204E38] hover:bg-[#AFC69A] text-[#E8F0DF] hover:text-[#173D2B] flex items-center justify-center transition-all duration-200"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#204E38] hover:bg-[#AFC69A] text-[#E8F0DF] hover:text-[#173D2B] flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#204E38] hover:bg-[#AFC69A] text-[#E8F0DF] hover:text-[#173D2B] flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#C5DBC0] hover:text-white transition-colors flex items-center justify-between group max-w-[140px]"
                  >
                    <span>{link.name}</span>
                    <span className="text-[#AFC69A] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Issues (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Popular Issues
            </h4>
            <ul className="space-y-2.5 text-sm">
              {popularIssues.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-[#C5DBC0] hover:text-white transition-colors flex items-center justify-between group max-w-[180px]"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#AFC69A] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Stay Connected
            </h4>
            <p className="text-xs text-[#C5DBC0] leading-relaxed">
              Subscribe to hostel maintenance alerts and campus resolution bulletin updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[#204E38] text-white placeholder-[#8CAE96] text-xs px-3.5 py-3 rounded-xl border border-[#2D664A] focus:outline-none focus:border-[#AFC69A] transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#AFC69A] hover:bg-[#C2DAC0] text-[#173D2B] rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#AFC69A] font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed to maintenance bulletin!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9BB7A1]">
          <p>© 2026 CampusFix. All rights reserved.</p>
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#AFC69A]" />
            <span>Better Campuses • Happier Students</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
