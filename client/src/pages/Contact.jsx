import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  Building
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

const EMERGENCY_CONTACTS = [
  { role: 'Campus Security & Gate', contact: '+91 (0) 11 2659-1000', available: '24/7 Hotline' },
  { role: 'Central Electrician Dispatch', contact: '+91 (0) 11 2659-1004', available: '08:00 AM - 10:00 PM' },
  { role: 'Hostel Plumbing Cell', contact: '+91 (0) 11 2659-1007', available: '08:00 AM - 08:00 PM' },
  { role: 'Chief Warden Secretariat', contact: 'warden.office@campus.edu', available: 'Mon-Fri 09:00 AM - 05:00 PM' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7F6EE] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0DF] border border-[#D5E3CD] text-[#173D2B] text-xs font-bold uppercase tracking-wider mb-3">
            Hostel & Administration Helpdesk
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173D2B] tracking-tight">
            Get in Touch with CampusFix
          </h1>
          <p className="text-sm text-[#68756C] mt-2">
            Have a question regarding complaint escalation, warden policies, or feedback? Reach out to our campus liaison team.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E2EBE0] shadow-soft">
            <h2 className="text-xl font-bold text-[#173D2B] mb-1">
              Send an Inquiry or Suggestion
            </h2>
            <p className="text-xs text-[#68756C] mb-6">
              For active maintenance breakdowns, please use the <a href="/report" className="text-[#4F7F55] font-semibold underline">Report Issue</a> form for instant technician dispatch.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-[#F3F6ED] rounded-2xl border border-[#DFE7D8] animate-fade-in space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#4F7F55] mx-auto" />
                <h3 className="text-lg font-bold text-[#173D2B]">Message Transmitted!</h3>
                <p className="text-xs text-[#68756C] max-w-sm mx-auto">
                  Thank you for reaching out. The campus administration desk will review your inquiry and follow up within one working day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Student or Staff Name"
                      className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-xs sm:text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-1.5">
                      University Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rollno@campus.edu"
                      className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-xs sm:text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Feedback on mess menu complaint escalation"
                    className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-xs sm:text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your suggestions or inquiries..."
                    className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-xs sm:text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                  />
                </div>

                <Button type="submit" variant="primary" size="md" icon={Send} className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Emergency & Office Directory */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Emergency Hotlines Card */}
            <div className="bg-[#173D2B] text-white rounded-3xl p-6 sm:p-8 shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-[#AFC69A]" />
                <h3 className="font-bold text-lg text-white">Emergency Duty Roster</h3>
              </div>
              <p className="text-xs text-[#C5DBC0] mb-5">
                For immediate life safety or power emergencies, contact the duty desk directly.
              </p>

              <div className="space-y-3">
                {EMERGENCY_CONTACTS.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#204E38] rounded-2xl border border-[#2B6044] text-xs">
                    <div className="font-bold text-white mb-0.5">{item.role}</div>
                    <div className="text-[#AFC69A] font-mono font-medium">{item.contact}</div>
                    <div className="text-[10px] text-[#9BB7A1] mt-0.5">{item.available}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Location Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2EBE0] shadow-soft text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#173D2B]">
                <Building className="w-4 h-4 text-[#4F7F55]" />
                <span>Dean of Student Affairs Office</span>
              </div>
              <p className="text-[#68756C]">
                Administrative Block B, 2nd Floor, Room 204, Campus South Wing.
              </p>
              <div className="flex items-center gap-2 text-[#4F7F55] font-semibold pt-1">
                <Clock className="w-4 h-4" />
                <span>Open Monday to Saturday: 9:00 AM – 5:30 PM</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
