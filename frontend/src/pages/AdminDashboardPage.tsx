import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trash2,
  CheckCircle2,
  Download,
  Search,
  Eye,
  Clock,
  Inbox,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { AdminLayout, AdminStatCard, AdminEmptyState } from '@/components/admin/AdminLayout';
import { DonutChart, BarChart } from '@/components/admin/LeadAnalyticsCharts';
import { LeadProfileCard } from '@/components/admin/LeadProfileCard';
import { LeadDetailModal } from '@/components/admin/LeadDetailModal';
import { api, Submission } from '@/lib/api';
import { exportLeadsToExcel } from '@/lib/exportLeadsExcel';
import {
  buildBudgetSegments,
  buildSourceSegments,
  buildStatusSegments,
} from '@/lib/leadUtils';

const AdminDashboardPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    if (!api.isAuthenticated()) {
      toast.error('Please sign in to access the dashboard.');
      navigate('/admin/login');
      return;
    }
    loadSubmissions();
  }, [navigate]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const data = await api.fetchSubmissions();
      setSubmissions(
        data.sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        )
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load submissions.';
      toast.error(message);
      if (message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('token')) {
        api.removeToken();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.removeToken();
    toast.success('Signed out successfully.');
    navigate('/admin/login');
  };

  const handleStatusChange = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
    try {
      await api.updateStatus(id, newStatus);
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
      );
      if (selectedSub?.id === id) {
        setSelectedSub((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      toast.success(`Marked as ${newStatus === 'replied' ? 'contacted' : newStatus}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this lead permanently?')) return;
    try {
      await api.deleteSubmission(id);
      setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
      setSelectedIds((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      if (selectedSub?.id === id) setSelectedSub(null);
      toast.success('Lead deleted.');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete.');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Delete ALL leads? This cannot be undone.')) return;
    try {
      await api.clearAll();
      setSubmissions([]);
      setSelectedSub(null);
      clearSelection();
      toast.success('All leads cleared.');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to clear.');
    }
  };

  const exportLeads = (leads: Submission[], suffix: 'all' | 'selected') => {
    if (leads.length === 0) {
      toast.error('No leads to export.');
      return;
    }
    exportLeadsToExcel(leads, suffix);
    toast.success(
      `Downloaded Excel file with ${leads.length} lead${leads.length === 1 ? '' : 's'}.`
    );
  };

  const handleExportAll = () => exportLeads(submissions, 'all');

  const handleExportSelected = () => {
    const leads = submissions.filter((s) => selectedIds.has(s.id));
    exportLeads(leads, 'selected');
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllFiltered = () => {
    const ids = filteredSubmissions.map((s) => s.id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allSelected = ids.length > 0 && ids.every((id) => next.has(id));
      if (allSelected) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const handleDeleteSelected = async () => {
    const count = selectedIds.size;
    if (count === 0) return;
    if (!window.confirm(`Delete ${count} selected lead${count === 1 ? '' : 's'} permanently?`)) return;

    try {
      await Promise.all([...selectedIds].map((id) => api.deleteSubmission(id)));
      setSubmissions((prev) => prev.filter((s) => !selectedIds.has(s.id)));
      if (selectedSub && selectedIds.has(selectedSub.id)) setSelectedSub(null);
      clearSelection();
      toast.success(`Deleted ${count} lead${count === 1 ? '' : 's'}.`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete selected leads.');
      loadSubmissions();
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      sub.name.toLowerCase().includes(q) ||
      sub.email.toLowerCase().includes(q) ||
      sub.company.toLowerCase().includes(q) ||
      sub.message.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesBudget = budgetFilter === 'all' || sub.budget === budgetFilter;
    return matchesSearch && matchesStatus && matchesBudget;
  });

  const countByStatus = (status: string) =>
    submissions.filter((s) => s.status === status).length;

  const filteredIds = filteredSubmissions.map((s) => s.id);
  const allFilteredSelected =
    filteredIds.length > 0 && filteredIds.every((id) => selectedIds.has(id));
  const selectedCount = selectedIds.size;

  const chartSegments = useMemo(
    () => ({
      status: buildStatusSegments(submissions),
      source: buildSourceSegments(submissions),
      budget: buildBudgetSegments(submissions),
    }),
    [submissions]
  );

  const headerActions = (
    <>
      <button
        type="button"
        onClick={loadSubmissions}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 shrink-0 whitespace-nowrap"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        Refresh
      </button>
      <button
        type="button"
        onClick={handleExportSelected}
        disabled={selectedCount === 0}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-orange-200 bg-orange-50 text-orange-800 text-xs font-semibold hover:bg-orange-100 disabled:opacity-50 shrink-0 whitespace-nowrap"
        title="Export only checked leads"
      >
        <Download className="w-3.5 h-3.5" />
        Export selected{selectedCount > 0 ? ` (${selectedCount})` : ''}
      </button>
      <button
        type="button"
        onClick={handleExportAll}
        disabled={submissions.length === 0}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 shrink-0 whitespace-nowrap"
      >
        <Download className="w-3.5 h-3.5 text-blue-600" />
        Export all
      </button>
      <button
        type="button"
        onClick={handleClearAll}
        disabled={submissions.length === 0}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 disabled:opacity-50 shrink-0 whitespace-nowrap"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Clear all
      </button>
    </>
  );

  return (
    <AdminLayout
      title="Leads & Inquiries"
      subtitle={`${submissions.length} total · ${countByStatus('new')} new`}
      onLogout={handleLogout}
      actions={headerActions}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <AdminStatCard label="Total leads" value={submissions.length} icon={Inbox} accent="orange" />
        <AdminStatCard label="New" value={countByStatus('new')} icon={Clock} accent="emerald" />
        <AdminStatCard label="Read" value={countByStatus('read')} icon={Eye} accent="blue" />
        <AdminStatCard
          label="Contacted"
          value={countByStatus('replied')}
          icon={CheckCircle2}
          accent="violet"
        />
      </div>

      {/* Analytics charts */}
      {submissions.length > 0 && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          <DonutChart title="Lead status" segments={chartSegments.status} />
          <DonutChart title="Lead source" segments={chartSegments.source} />
          <div className="md:col-span-2 xl:col-span-1">
            <BarChart title="Budget range" segments={chartSegments.budget} />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="py-2.5 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Contacted</option>
            </select>
            <select
              className="py-2.5 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
            >
              <option value="all">All budgets</option>
              <option value="below-5">Below 5L</option>
              <option value="5-15">5-15L</option>
              <option value="15-50">15-50L</option>
              <option value="50-plus">50L+</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-orange-900">
              {selectedCount} lead{selectedCount === 1 ? '' : 's'} selected
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleExportSelected}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700"
              >
                <Download className="w-3.5 h-3.5" />
                Export selected
              </button>
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-300 bg-white text-red-700 text-xs font-semibold hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete selected
              </button>
              <button
                type="button"
                onClick={clearSelection}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-200 bg-white text-orange-800 text-xs font-semibold hover:bg-orange-100"
              >
                Clear selection
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 py-20 flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            <p className="text-sm text-slate-500">Loading leads from database...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200">
            <AdminEmptyState
              title="No leads found"
              description="New contact form submissions will appear here automatically."
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleSelectAllFiltered}
                  className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                Select all ({filteredSubmissions.length})
              </label>
              <p className="text-xs text-slate-500">Click a row to open details</p>
            </div>

            <div className="hidden sm:grid grid-cols-[auto_auto_1fr] gap-3 px-4 py-2 bg-slate-50/80 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wide text-slate-500">
              <span className="w-4" />
              <span className="w-9" />
              <div className="grid grid-cols-[minmax(128px,1fr)_minmax(88px,0.85fr)_minmax(112px,1fr)_minmax(80px,0.75fr)_58px_52px_minmax(0,1.1fr)_76px] gap-x-2.5">
                <span>Lead</span>
                <span>Company</span>
                <span>Email</span>
                <span>Phone</span>
                <span>Source</span>
                <span>Budget</span>
                <span>Message</span>
                <span className="text-right">Date</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredSubmissions.map((sub) => (
                <LeadProfileCard
                  key={sub.id}
                  lead={sub}
                  selected={selectedSub?.id === sub.id}
                  checked={selectedIds.has(sub.id)}
                  onSelect={() => setSelectedSub(sub)}
                  onToggleCheck={() => toggleSelect(sub.id)}
                  onDelete={() => handleDelete(sub.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedSub && (
        <LeadDetailModal
          lead={selectedSub}
          onClose={() => setSelectedSub(null)}
          onStatusChange={handleStatusChange}
          onDelete={() => handleDelete(selectedSub.id)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminDashboardPage;
