import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, ShieldCheck, CheckCircle2, Wrench } from 'lucide-react';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student'); // 'student' | 'warden'
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleDemoFill = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmailOrId('aarav.sharma@campus.edu');
      setPassword('studentPass2026');
    } else {
      setEmailOrId('warden.satpura@campus.edu');
      setPassword('wardenPass2026');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      name: role === 'student' ? 'Aarav Sharma' : 'Dr. K. Mehta (Warden)',
      role: role,
      id: role === 'student' ? '2023CSB1042' : 'FAC-WAR-09',
      hostel: 'Boys Hostel 2 (Satpura)'
    };
    setLoggedInUser(user);
    setTimeout(() => {
      navigate('/issues');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F7F6EE] py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#173D2B] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#173D2B]">
              CampusFix
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-[#173D2B]">
            Welcome Back
          </h1>
          <p className="text-xs text-[#68756C] mt-1">
            Access your hostel complaint dashboard and tracking portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EBE0] shadow-soft">
          
          {loggedInUser ? (
            <div className="py-8 text-center space-y-3 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-[#4F7F55] mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-[#173D2B]">Authentication Successful</h3>
              <p className="text-xs text-[#68756C]">
                Logged in as <strong>{loggedInUser.name}</strong>. Redirecting to issue board...
              </p>
            </div>
          ) : (
            <>
              {/* Role Toggle Pills */}
              <div className="grid grid-cols-2 p-1 bg-[#F7F6EE] rounded-2xl border border-[#DFE7D8] mb-6">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    role === 'student'
                      ? 'bg-[#173D2B] text-white shadow-xs'
                      : 'text-[#68756C] hover:text-[#173D2B]'
                  }`}
                >
                  Student Portal
                </button>
                <button
                  type="button"
                  onClick={() => setRole('warden')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    role === 'warden'
                      ? 'bg-[#173D2B] text-white shadow-xs'
                      : 'text-[#68756C] hover:text-[#173D2B]'
                  }`}
                >
                  Warden / Staff
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#173D2B] uppercase tracking-wider mb-1.5">
                    {role === 'student' ? 'Student ID or Campus Email' : 'Staff University Email'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#68756C] absolute left-4 top-3.5" />
                    <input
                      type="text"
                      required
                      value={emailOrId}
                      onChange={(e) => setEmailOrId(e.target.value)}
                      placeholder={role === 'student' ? 'e.g. 2024CSB1042 or name@campus.edu' : 'warden@campus.edu'}
                      className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-xs sm:text-sm text-[#173D2B] pl-10 pr-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#173D2B] uppercase tracking-wider">
                      Password
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact Campus IT Helpdesk to reset university credentials.'); }} className="text-[11px] text-[#4F7F55] hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#68756C] absolute left-4 top-3.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-[#F7F6EE] border border-[#DFE7D8] focus:border-[#4F7F55] focus:bg-white text-xs sm:text-sm text-[#173D2B] pl-10 pr-4 py-3 rounded-2xl outline-none transition-all placeholder-[#96A49B]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#68756C]">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-[#173D2B]"
                    />
                    <span>Remember my device</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  className="w-full py-3"
                >
                  Sign In to CampusFix
                </Button>
              </form>

              {/* Demo Credentials Helper for Quick Evaluation */}
              <div className="mt-6 pt-5 border-t border-[#F2F6EE] text-center">
                <span className="text-[11px] text-[#68756C] block mb-2 font-medium">Quick Demo Credentials:</span>
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoFill('student')}
                    className="px-3 py-1.5 rounded-xl bg-[#E8F0DF] hover:bg-[#DCE9C9] text-[#173D2B] text-xs font-semibold transition-all"
                  >
                    Auto-Fill Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('warden')}
                    className="px-3 py-1.5 rounded-xl bg-[#E8F0DF] hover:bg-[#DCE9C9] text-[#173D2B] text-xs font-semibold transition-all"
                  >
                    Auto-Fill Warden
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
