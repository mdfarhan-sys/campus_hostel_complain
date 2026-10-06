import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Send, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  Copy, 
  Check, 
  Clock, 
  ShieldAlert,
  X
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import { ISSUE_CATEGORIES, INITIAL_COMPLAINTS } from '../data/issues';

const HOSTELS = [
  'Boys Hostel 1 (Vindhya)',
  'Boys Hostel 2 (Satpura)',
  'Boys Hostel 3 (Himadri)',
  'Girls Hostel 1 (Aravali)',
  'Girls Hostel 2 (Nilgiri)',
  'Central Dining & Mess Hall',
  'Academic Complex / Classrooms',
  'Central Campus Library',
  'Sports Complex & Gym'
];

export default function ReportIssue() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const preselectedCategory = searchParams.get('category') || '';

  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    hostel: 'Boys Hostel 2 (Satpura)',
    roomNumber: '',
    category: preselectedCategory || 'Water Supply',
    title: '',
    description: '',
    priority: 'Medium'
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedIssue, setSubmittedIssue] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedCategory) {
      setFormData((prev) => ({ ...prev, category: preselectedCategory }));
    }
  }, [preselectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Post to backend API
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          hostel: formData.hostel,
          roomNumber: formData.roomNumber ? `Room ${formData.roomNumber}` : 'General Area',
          studentName: formData.studentName,
          studentId: formData.studentId,
          priority: formData.priority,
          description: formData.description,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const created = {
          ...json.data,
          id: json.data.complaintId || json.data.id,
          room: json.data.roomNumber || json.data.room,
        };
        // Also sync local storage
        try {
          const stored = JSON.parse(localStorage.getItem('campusfix_complaints') || '[]');
          localStorage.setItem('campusfix_complaints', JSON.stringify([created, ...stored]));
        } catch {}

        setIsSubmitting(false);
        setSubmittedIssue(created);
        return;
      }
    } catch (err) {
      console.warn('API error, falling back to local creation:', err);
    }

    // Fallback local creation
    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `CF-2026-${randomIdSuffix}`;

    const newIssue = {
      id: generatedId,
      complaintId: generatedId,
      title: formData.title,
      category: formData.category,
      categorySlug: formData.category.toLowerCase().replace(/\s+/g, '-'),
      hostel: formData.hostel,
      room: formData.roomNumber ? `Room ${formData.roomNumber}` : 'General Area',
      studentName: formData.studentName,
      studentId: formData.studentId,
      priority: formData.priority,
      status: 'Reported',
      currentStepIndex: 0,
      createdAt: 'Just now',
      updatedAt: 'Just now',
      description: formData.description,
      assignedTo: 'Hostel Caretaker Desk (Queued)',
      expectedResolution: 'Within 24–48 hours',
      timeline: [
        { step: 'Reported', date: 'Just now', note: `Submitted by ${formData.studentName}` },
        { step: 'Under Review', date: 'Pending', note: 'Warden Queue' },
        { step: 'Assigned', date: 'Pending', note: 'Maintenance Crew Queue' },
        { step: 'In Progress', date: 'Pending', note: 'Work Orders' },
        { step: 'Resolved', date: 'Pending', note: 'Student Sign-off' }
      ]
    };

    try {
      const stored = JSON.parse(localStorage.getItem('campusfix_complaints') || '[]');
      localStorage.setItem('campusfix_complaints', JSON.stringify([newIssue, ...stored]));
    } catch {}

    setIsSubmitting(false);
    setSubmittedIssue(newIssue);
  };

  const copyId = () => {
    if (submittedIssue) {
      navigator.clipboard.writeText(submittedIssue.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6EE] py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* SUCCESS CARD MODAL / STATE */}
        {submittedIssue ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#C8D6C0] shadow-soft-lg text-center animate-fade-in space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E8F0DF] text-[#173D2B] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-[#4F7F55]" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#E8F0DF] text-[#173D2B] text-xs font-bold uppercase tracking-wider">
                Status: In Queue
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173D2B]">
                Complaint Submitted Successfully
              </h2>
              <p className="text-sm text-[#68756C] max-w-md mx-auto">
                Your request has been logged and assigned an automated tracking ticket. Campus wardens have been notified.
              </p>
            </div>

            {/* Generated Complaint ID Box */}
            <div className="bg-[#F7F6EE] border border-[#DFE7D8] rounded-2xl p-5 max-w-md mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-[#68756C] uppercase font-bold tracking-wider">Complaint ID</span>
                <p className="text-xl sm:text-2xl font-mono font-bold text-[#173D2B]">
                  {submittedIssue.id}
                </p>
              </div>

              <button
                onClick={copyId}
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-[#DFE7D8] hover:border-[#173D2B] text-[#173D2B] transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-[#4F7F55]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy ID'}</span>
              </button>
            </div>

            <div className="text-xs text-[#68756C] flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#4F7F55]" />
              <span>Expected review turnaround: within 4 hours</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button
                to={`/track?id=${submittedIssue.id}`}
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="w-full sm:w-auto"
              >
                Track This Complaint Now
              </Button>

              <button
                type="button"
                onClick={() => {
                  setSubmittedIssue(null);
                  setFormData({
                    studentName: '',
                    studentId: '',
                    hostel: 'Boys Hostel 2 (Satpura)',
                    roomNumber: '',
                    category: 'Water Supply',
                    title: '',
                    description: '',
                    priority: 'Medium'
                  });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold text-[#173D2B] bg-[#E8F0DF] hover:bg-[#DCE9C9] transition-all"
              >
                Submit Another Issue
              </button>
            </div>
          </div>
        ) : (
          /* REPORT FORM */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2EBE0] shadow-soft">
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#E8F0DF] text-[#173D2B] mb-2.5">
                New Complaint Ticket
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173D2B] tracking-tight">
                Report Hostel & Campus Issue
              </h1>
              <p className="text-sm text-[#68756C] mt-1.5">
                Fill in the details below. Our campus facility department will assign a technician immediately.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Student Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                    Student ID / Roll No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    required
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g. 2024CSB1042"
                    className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                  />
                </div>
              </div>

              {/* Section 2: Location Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                    Hostel / Building <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="hostel"
                    value={formData.hostel}
                    onChange={handleChange}
                    className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all cursor-pointer"
                  >
                    {HOSTELS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                    Room / Specific Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="roomNumber"
                    required
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="e.g. Room 304, Wing B"
                    className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                  />
                </div>
              </div>

              {/* Section 3: Category & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                    Issue Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all cursor-pointer"
                  >
                    {ISSUE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                    Urgency Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all cursor-pointer"
                  >
                    <option value="Low">Low (Within 72 hrs)</option>
                    <option value="Medium">Medium (Within 24-48 hrs)</option>
                    <option value="High">High (Within 12-24 hrs)</option>
                    <option value="Urgent">Urgent (Immediate safety hazard)</option>
                  </select>
                </div>
              </div>

              {/* Section 4: Title & Description */}
              <div>
                <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                  Issue Summary / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Geyser tripping circuit breaker on 2nd floor"
                  className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe when the issue started, exact location markers, and any safety concerns..."
                  className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-sm text-[#173D2B] px-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                />
              </div>

              {/* Section 5: Image Upload (Optional) */}
              <div>
                <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-2">
                  Upload Photo (Optional)
                </label>
                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#DFE7D8] max-h-48 w-full bg-[#F7F6EE] flex items-center justify-center">
                    <img src={imagePreview} alt="Issue preview" className="max-h-48 object-contain" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#DFE7D8] hover:border-[#4F7F55] rounded-2xl cursor-pointer bg-[#F7F6EE]/60 hover:bg-[#F7F6EE] transition-all text-center">
                    <UploadCloud className="w-8 h-8 text-[#4F7F55] mb-2" />
                    <span className="text-xs font-semibold text-[#173D2B]">Click to browse or drop photo here</span>
                    <span className="text-[11px] text-[#68756C] mt-0.5">PNG, JPG, or WEBP up to 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Registering Ticket...' : 'Submit Complaint'}
                </Button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
