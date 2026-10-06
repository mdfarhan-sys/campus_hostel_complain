import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  ArrowRight, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import { ISSUE_CATEGORIES, INITIAL_COMPLAINTS } from '../data/issues';

export default function Issues() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [upvotes, setUpvotes] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('/api/complaints');
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map(item => ({
            ...item,
            id: item.complaintId || item.id,
            room: item.roomNumber || item.room,
          }));
          setComplaints(mapped);
          return;
        }
      } catch (e) {
        // Fallback to local storage if API is unreachable
      }

      try {
        const stored = JSON.parse(localStorage.getItem('campusfix_complaints') || '[]');
        const all = [...stored, ...INITIAL_COMPLAINTS];
        const unique = Array.from(new Map(all.map(item => [item.id, item])).values());
        setComplaints(unique);
      } catch {
        setComplaints(INITIAL_COMPLAINTS);
      }
    };

    fetchComplaints();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    if (catName === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catName });
    }
  };

  const handleUpvote = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setUpvotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    try {
      await fetch(`/api/complaints/${encodeURIComponent(id)}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voterId: `voter_${Date.now()}` })
      });
    } catch (err) {
      // Handled silently
    }
  };

  // Filter complaints
  const filteredComplaints = complaints.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus = selectedStatus === 'All' || item.status.toLowerCase() === selectedStatus.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.hostel.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    return matchesCategory && matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-[#E8F0DF] text-[#173D2B] border border-[#C5DBC0]';
      case 'In Progress':
        return 'bg-blue-50 text-blue-800 border border-blue-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-800 border border-amber-200';
      case 'Assigned':
        return 'bg-purple-50 text-purple-800 border border-purple-200';
      default:
        return 'bg-stone-100 text-stone-700 border border-stone-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6EE] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0DF] border border-[#D5E3CD] text-[#173D2B] text-xs font-bold uppercase tracking-wider mb-3">
              Campus Transparency Board
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173D2B] tracking-tight">
              Reported Issues
            </h1>
            <p className="text-sm text-[#68756C] mt-1.5 max-w-xl">
              Real-time feed of maintenance and infrastructure tickets across all hostels. Upvote related issues to raise warden visibility.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button to="/track" variant="secondary" size="md">
              Track by Ticket ID
            </Button>
            <Button to="/report" variant="primary" size="md" icon={PlusCircle}>
              Report Issue
            </Button>
          </div>
        </div>

        {/* Filters and Search Bar Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2EBE0] shadow-soft mb-8 space-y-4">
          
          {/* Top Row: Search input & Status dropdown */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#68756C] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search issues by keyword, hostel, or ID (e.g. CF-2026-00124)..."
                className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-xs sm:text-sm text-[#173D2B] pl-10 pr-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#173D2B] uppercase tracking-wider shrink-0 pl-1">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#F7F6EE] border border-[#DFE7D8] text-xs sm:text-sm font-semibold text-[#173D2B] px-3.5 py-3 rounded-2xl outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Reported">Reported</option>
                <option value="Under Review">Under Review</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button
              onClick={() => handleCategoryClick('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-[#173D2B] text-white shadow-xs'
                  : 'bg-[#F7F6EE] hover:bg-[#E8F0DF] text-[#173D2B] border border-[#DFE7D8]'
              }`}
            >
              All Categories
            </button>
            {ISSUE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#173D2B] text-white shadow-xs'
                    : 'bg-[#F7F6EE] hover:bg-[#E8F0DF] text-[#173D2B] border border-[#DFE7D8]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Complaints List / Grid */}
        {filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-3xl p-6 border border-[#E2EBE0] shadow-soft card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Top line with Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#173D2B] bg-[#E8F0DF] px-2 py-0.5 rounded-md">
                      {issue.id}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getStatusBadge(issue.status)}`}>
                      {issue.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base text-[#173D2B] mb-2 line-clamp-2">
                    {issue.title}
                  </h3>

                  {/* Description snippet */}
                  <p className="text-xs text-[#68756C] line-clamp-2 mb-4 leading-relaxed">
                    {issue.description}
                  </p>
                </div>

                {/* Footer details */}
                <div className="pt-4 border-t border-[#F2F6EE] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#68756C]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#4F7F55]" />
                      <span className="line-clamp-1">{issue.hostel}</span>
                    </span>
                    <span className="shrink-0">{issue.room}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {/* Upvote button */}
                    <button
                      type="button"
                      onClick={(e) => handleUpvote(issue.id, e)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F7F6EE] hover:bg-[#E8F0DF] text-[#173D2B] border border-[#DFE7D8] transition-all"
                      title="Mark as also affected"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-[#4F7F55]" />
                      <span>{12 + (upvotes[issue.id] || 0)} affected</span>
                    </button>

                    {/* Track Link */}
                    <Link
                      to={`/track?id=${issue.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#173D2B] hover:text-[#4F7F55] transition-colors"
                    >
                      <span>Timeline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E2EBE0] shadow-soft max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-[#AFC69A] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#173D2B]">No matching complaints found</h3>
            <p className="text-xs text-[#68756C] mt-1 mb-6">
              Try adjusting your category filter, clearing your search query, or report a new issue if you need help.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              variant="secondary"
              size="sm"
            >
              Reset Filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
