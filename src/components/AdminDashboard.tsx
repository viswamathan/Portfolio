import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, User, MessageSquare, Eye, Archive, CheckCircle, Clock } from 'lucide-react';
import { getContactSubmissions, updateSubmissionStatus, type ContactSubmission } from '../lib/supabase';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await getContactSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: ContactSubmission['status']) => {
    try {
      await updateSubmissionStatus(id, status);
      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status } : sub)
      );
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(prev => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredSubmissions = submissions.filter(sub => 
    filter === 'all' || sub.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'read': return <Eye className="w-4 h-4 text-yellow-500" />;
      case 'replied': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'archived': return <Archive className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'read': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'replied': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Form Submissions</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{submissions.length}</div>
                <div className="text-gray-400">Total Submissions</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {submissions.filter(s => s.status === 'new').length}
                </div>
                <div className="text-gray-400">New</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">
                  {submissions.filter(s => s.status === 'read').length}
                </div>
                <div className="text-gray-400">Read</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {submissions.filter(s => s.status === 'replied').length}
                </div>
                <div className="text-gray-400">Replied</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex gap-2">
            {['all', 'new', 'read', 'replied', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  filter === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                className={`bg-gray-800 p-6 rounded-lg cursor-pointer transition-all ${
                  selectedSubmission?.id === submission.id
                    ? 'ring-2 ring-purple-500'
                    : 'hover:bg-gray-750'
                }`}
                onClick={() => setSelectedSubmission(submission)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{submission.name}</h3>
                    <p className="text-gray-400 text-sm">{submission.email}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1 ${getStatusColor(submission.status)}`}>
                    {getStatusIcon(submission.status)}
                    {submission.status}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {submission.message}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(submission.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(submission.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submission Detail */}
          <div className="bg-gray-800 p-6 rounded-lg">
            {selectedSubmission ? (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedSubmission.name}</h2>
                    <p className="text-gray-400">{selectedSubmission.email}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1 ${getStatusColor(selectedSubmission.status)}`}>
                    {getStatusIcon(selectedSubmission.status)}
                    {selectedSubmission.status}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Message:</h3>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Details:</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p><strong>Submitted:</strong> {new Date(selectedSubmission.created_at).toLocaleString()}</p>
                    <p><strong>IP Address:</strong> {selectedSubmission.ip_address || 'Unknown'}</p>
                    <p><strong>User Agent:</strong> {selectedSubmission.user_agent || 'Unknown'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Update Status:</h3>
                  <div className="flex gap-2">
                    {['new', 'read', 'replied', 'archived'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedSubmission.id, status as any)}
                        className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${
                          selectedSubmission.status === status
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;