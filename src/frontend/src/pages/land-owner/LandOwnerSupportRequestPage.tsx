import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import TopBar from '../../components/TopBar';
import { ArrowLeft, Send } from 'lucide-react';

export default function LandOwnerSupportRequestPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate({ to: '/land-owner' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <button
          onClick={() => navigate({ to: '/land-owner' })}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        <h1 className="text-2xl font-bold text-foreground">Raise Support Request</h1>

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
            <p className="text-green-800 dark:text-green-200 font-semibold mb-2">Request Submitted!</p>
            <p className="text-sm text-green-700 dark:text-green-300">Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-5 shadow-sm border border-border space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground"
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground h-32 resize-none"
                placeholder="Describe your issue in detail"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
