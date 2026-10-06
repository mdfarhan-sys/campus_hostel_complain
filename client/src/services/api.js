// Centralized API client for CampusFix
const BASE_URL = '/api';

export const api = {
  // Auth
  async login(credentials) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  // Complaints
  async getComplaints(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/complaints?${query}`);
    return res.json();
  },

  async getComplaint(id) {
    const res = await fetch(`${BASE_URL}/complaints/${encodeURIComponent(id)}`);
    return res.json();
  },

  async createComplaint(data) {
    const res = await fetch(`${BASE_URL}/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async upvote(id, voterId) {
    const res = await fetch(`${BASE_URL}/complaints/${encodeURIComponent(id)}/upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voterId }),
    });
    return res.json();
  },

  async verifyFix(id, action, feedback) {
    const res = await fetch(`${BASE_URL}/complaints/${encodeURIComponent(id)}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, feedback }),
    });
    return res.json();
  },

  // Stats
  async getStats() {
    const res = await fetch(`${BASE_URL}/stats`);
    return res.json();
  },

  // Contact
  async submitInquiry(data) {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
