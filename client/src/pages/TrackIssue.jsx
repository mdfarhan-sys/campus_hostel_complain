import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  User, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import Button from '../components/Button';
import { INITIAL_COMPLAINTS } from '../data/issues';

const TIMELINE_STEPS = [
  'Reported',
  'Under Review',
  'Assigned',
  'In Progress',
  'Resolved'
];

export default function TrackIssue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || 'CF-2026-00124';

  const [searchId, setSearchId] = useState(initialId);
  const [activeIssue, setActiveIssue] = useState(null);
  const [searched, setSearched] = useState(false);

  // Helper to find issue in backend API, localStorage, or initial data
  const findIssue = async (idToFind) => {
    if (!idToFind) return null;
    const cleanId = idToFind.trim().toUpperCase();

    // Query backend API first
    try {
      const res = await fetch(`/api/complaints/${encodeURIComponent(cleanId)}`);
      const json = await res.json();
      if (json.success && json.data) {
        return {
          ...json.data,
          id: json.data.complaintId || json.data.id,
          room: json.data.roomNumber || json.data.room,
        };
      }
    } catch (e) {
      // Fall through to local fallback
    }

    // Check localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('campusfix_complaints') || '[]');
      const foundInStorage = stored.find((item) => (item.id || item.complaintId)?.toUpperCase() === cleanId);
      if (foundInStorage) return foundInStorage;
    } catch (e) {
      console.error(e);
    }

    // Check initial mock complaints
    return INITIAL_COMPLAINTS.find((item) => item.id.toUpperCase() === cleanId) || null;
  };

  useEffect(() => {
    if (initialId) {
      findIssue(initialId).then(found => {
        setActiveIssue(found);
        setSearched(true);
        setSearchId(initialId);
      });
    }
  }, [initialId]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = await findIssue(searchId);
    setActiveIssue(found);
    setSearched(true);
    setSearchParams({ id: searchId.trim().toUpperCase() });
  };

  const handleQuickSelect = async (id) => {
    setSearchId(id);
    const found = await findIssue(id);
    setActiveIssue(found);
    setSearched(true);
    setSearchParams({ id });
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-[#E8F0DF] text-[#173D2B] border-[#D0DEC4]';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6EE] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Title & Search Bar Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2EBE0] shadow-soft mb-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0DF] border border-[#D5E3CD] text-[#173D2B] text-xs font-bold uppercase tracking-wider mb-2">
              <Search className="w-3.5 h-3.5 text-[#4F7F55]" />
              Real-Time Tracking
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#173D2B]">
              Track Your Issue
            </h1>
            <p className="text-sm text-[#68756C] mt-2">
              Enter your unique complaint tracking number to see current stage, assigned caretaker, and technician notes.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter complaint ID (e.g. CF-2026-00124)"
                  className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm font-medium text-[#173D2B] px-4 py-3.5 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Search}
                className="shrink-0 py-3.5"
              >
                Track Issue
              </Button>
            </div>

            {/* Quick Demo ID pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-[#68756C]">
              <span className="font-medium">Try sample IDs:</span>
              {INITIAL_COMPLAINTS.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleQuickSelect(item.id)}
                  className={`font-mono px-2 py-0.5 rounded-md border text-[11px] transition-colors ${
                    activeIssue?.id === item.id
                      ? 'bg-[#173D2B] text-white border-[#173D2B]'
                      : 'bg-[#F7F6EE] hover:bg-[#E8F0DF] text-[#173D2B] border-[#DFE7D8]'
                  }`}
                >
                  {item.id}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Search Results Display */}
        {searched && activeIssue ? (
          <div className="space-y-6 animate-fade-in">
            {/* Header info card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EBE0] shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F2F6EE]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold bg-[#E8F0DF] text-[#173D2B] px-2.5 py-1 rounded-lg">
                      {activeIssue.id}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getPriorityBadgeClass(activeIssue.priority)}`}>
                      {activeIssue.priority} Priority
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#173D2B] text-white">
                      {activeIssue.status}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#173D2B]">
                    {activeIssue.title}
                  </h2>
                </div>

                <div className="text-left sm:text-right text-xs text-[#68756C]">
                  <div>Logged on {activeIssue.createdAt}</div>
                  <div className="font-medium text-[#4F7F55] mt-1">Est. Completion: {activeIssue.expectedResolution}</div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-[#F2F6EE] text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#4F7F55] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#68756C] block">Location</span>
                    <span className="font-semibold text-[#173D2B]">{activeIssue.hostel}</span>
                    <span className="block text-[#68756C]">{activeIssue.room}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-[#4F7F55] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#68756C] block">Reported By</span>
                    <span className="font-semibold text-[#173D2B]">{activeIssue.studentName}</span>
                    <span className="block text-[#68756C] font-mono">{activeIssue.studentId}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#4F7F55] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#68756C] block">Assigned Handler</span>
                    <span className="font-semibold text-[#173D2B]">{activeIssue.assignedTo}</span>
                    <span className="block text-[#68756C]">Campus Operations</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4">
                <span className="text-xs font-bold text-[#173D2B] uppercase tracking-wider block mb-1">
                  Issue Description
                </span>
                <p className="text-xs sm:text-sm text-[#68756C] leading-relaxed bg-[#F7F6EE] p-4 rounded-2xl border border-[#DFE7D8]/70">
                  {activeIssue.description}
                </p>
              </div>
            </div>

            {/* TIMELINE PROGRESS CARD */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EBE0] shadow-soft">
              <h3 className="text-base sm:text-lg font-bold text-[#173D2B] mb-6 flex items-center justify-between">
                <span>Resolution Progress Timeline</span>
                <span className="text-xs font-normal text-[#68756C]">5-Stage Life Cycle</span>
              </h3>

              {/* Desktop Horizontal Timeline */}
              <div className="hidden md:block">
                <div className="relative flex items-center justify-between">
                  {/* Background track line */}
                  <div className="absolute top-5 left-8 right-8 h-1 bg-[#E2EBE0] -z-0" />
                  
                  {/* Filled track line based on current step */}
                  <div 
                    className="absolute top-5 left-8 h-1 bg-[#4F7F55] -z-0 transition-all duration-500"
                    style={{ width: `${(activeIssue.currentStepIndex / (TIMELINE_STEPS.length - 1)) * 88}%` }}
                  />

                  {TIMELINE_STEPS.map((step, idx) => {
                    const isCompleted = idx <= activeIssue.currentStepIndex;
                    const isCurrent = idx === activeIssue.currentStepIndex;

                    return (
                      <div key={step} className="flex flex-col items-center relative z-10 text-center w-28">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                          isCompleted
                            ? 'bg-[#173D2B] text-white shadow-sm ring-4 ring-[#E8F0DF]'
                            : 'bg-white text-[#96A49B] border-2 border-[#DFE7D8]'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-[#AFC69A]" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>

                        <span className={`text-xs font-bold mt-3 ${
                          isCurrent ? 'text-[#173D2B] underline decoration-[#4F7F55] decoration-2' : isCompleted ? 'text-[#173D2B]' : 'text-[#96A49B]'
                        }`}>
                          {step}
                        </span>

                        <span className="text-[10px] text-[#68756C] mt-0.5 line-clamp-2">
                          {activeIssue.timeline?.[idx]?.date || (isCompleted ? 'Logged' : 'Pending')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Vertical Timeline */}
              <div className="md:hidden space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2EBE0]">
                {TIMELINE_STEPS.map((step, idx) => {
                  const isCompleted = idx <= activeIssue.currentStepIndex;
                  const isCurrent = idx === activeIssue.currentStepIndex;
                  const stepDetail = activeIssue.timeline?.[idx];

                  return (
                    <div key={step} className="relative">
                      {/* Node circle */}
                      <div className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-[#173D2B] text-white ring-2 ring-[#E8F0DF]' : 'bg-[#E2EBE0]'
                      }`}>
                        {isCompleted && <div className="w-2 h-2 rounded-full bg-[#AFC69A]" />}
                      </div>

                      <div className="pl-2">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold ${isCompleted ? 'text-[#173D2B]' : 'text-[#8CA092]'}`}>
                            {step}
                          </h4>
                          <span className="text-[11px] text-[#68756C]">
                            {stepDetail?.date || (isCompleted ? 'Completed' : 'Pending')}
                          </span>
                        </div>
                        {stepDetail?.note && (
                          <p className="text-xs text-[#68756C] mt-0.5">
                            {stepDetail.note}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        ) : searched ? (
          /* Not found state */
          <div className="bg-white rounded-3xl p-10 border border-[#E2EBE0] text-center shadow-soft animate-fade-in">
            <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-[#173D2B]">No complaint found</h3>
            <p className="text-sm text-[#68756C] mt-1 max-w-sm mx-auto">
              We couldn't locate any ticket matching <span className="font-mono font-bold text-[#173D2B]">"{searchId}"</span>. Please verify your reference ID or report a new issue.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button to="/report" variant="primary" size="md">
                Report New Issue
              </Button>
              <button
                type="button"
                onClick={() => handleQuickSelect('CF-2026-00124')}
                className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-[#E8F0DF] text-[#173D2B]"
              >
                Load Sample ID
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
}
