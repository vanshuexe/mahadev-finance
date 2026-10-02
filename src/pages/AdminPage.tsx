import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  Search,
  Download,
  Trash2,
  Edit,
  Plus,
  CheckCircle2,
  AlertCircle,
  Eye,
  Building2,
  BookOpen,
  Coins,
  Settings,
  Phone,
  FileText,
  RefreshCw,
  LogOut,
  X
} from 'lucide-react';
import {
  dbService,
  ApplicationRecord,
  ApplicationStatus,
  LoanCategoryItem,
  PropertyListingItem,
  LibraryConfig,
  SiteSettings
} from '../services/db';

export const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'applications' | 'loans' | 'properties' | 'library' | 'settings' | 'content'>('applications');

  // Database reactive state
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loans, setLoans] = useState<LoanCategoryItem[]>([]);
  const [properties, setProperties] = useState<PropertyListingItem[]>([]);
  const [libraryConfig, setLibraryConfig] = useState<LibraryConfig>(dbService.getLibraryConfig());
  const [settings, setSettings] = useState<SiteSettings>(dbService.getSettings());
  const [content, setContent] = useState<any>(dbService.getContent());

  // Applications filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Application detail modal
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Loan Category edit/create modal
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<LoanCategoryItem | null>(null);

  // Property edit/create modal
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyListingItem | null>(null);

  // Success message toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const refreshData = () => {
    setApplications(dbService.getApplications());
    setLoans(dbService.getLoans());
    setProperties(dbService.getProperties());
    setLibraryConfig(dbService.getLibraryConfig());
    setSettings(dbService.getSettings());
    setContent(dbService.getContent());
  };

  useEffect(() => {
    setIsLoggedIn(dbService.isAdminLoggedIn());
    refreshData();
    const unsub = dbService.subscribe(() => refreshData());
    return unsub;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await dbService.adminLogin(pinInput)) {
      setIsLoggedIn(true);
      setLoginError(false);
      setPinInput('');
      showToast('Admin Session Authenticated');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    dbService.adminLogout();
    setIsLoggedIn(false);
    setSelectedApp(null);
  };

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.mobile.includes(searchQuery) ||
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat = categoryFilter === 'All' || app.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || app.status === statusFilter;

      return matchSearch && matchCat && matchStatus;
    });
  }, [applications, searchQuery, categoryFilter, statusFilter]);

  // Status Chip styling
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'New':
        return 'bg-[#e8b820]/20 text-[#e8b820] border-[#e8b820]/40 font-semibold';
      case 'In Review':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold';
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-semibold';
      case 'Follow-up':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40 font-semibold';
      case 'Closed':
        return 'bg-gray-800 text-gray-400 border-gray-700';
      case 'Rejected':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      default:
        return 'bg-[#07111f] text-gray-300 border-[#c9902a]/30';
    }
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Category', 'Customer Name', 'Mobile', 'City', 'Status', 'Details'];
    const rows = filteredApps.map((a) => [
      a.id,
      new Date(a.createdAt).toLocaleString(),
      a.type,
      a.category,
      `"${a.customerName.replace(/"/g, '""')}"`,
      a.mobile,
      `"${a.city.replace(/"/g, '""')}"`,
      a.status,
      `"${JSON.stringify(a.details).replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mahadev_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV dossier successfully');
  };

  // Add Note handler
  const handleAddNote = () => {
    if (!selectedApp || !newNoteText.trim()) return;
    dbService.addApplicationNote(selectedApp.id, newNoteText.trim(), 'Executive Desk');
    setNewNoteText('');
    const updated = dbService.getApplications().find((a) => a.id === selectedApp.id);
    if (updated) setSelectedApp(updated);
    showToast('Note entered in docket');
  };

  // Handle status update
  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    dbService.updateApplicationStatus(appId, newStatus);
    if (selectedApp && selectedApp.id === appId) {
      const updated = dbService.getApplications().find((a) => a.id === appId);
      if (updated) setSelectedApp(updated);
    }
    showToast(`Status updated to "${newStatus}"`);
  };

  // Handle delete app
  const handleDeleteApp = (id: string) => {
    if (window.confirm(`Delete application record ${id}?`)) {
      dbService.deleteApplication(id);
      if (selectedApp?.id === id) setSelectedApp(null);
      showToast('Record deleted');
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto shadow-xs p-1 overflow-hidden">
              <img
                src="https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-27%20at%206.19.21%20PM.jpeg"
                alt="Mahadev Group Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Admin Authentication</h2>
            <p className="text-xs text-blue-700 font-semibold">
              Mahadev Group Management Terminal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Security Passcode PIN
              </label>
              <input
                type="password"
                required
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin Password"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center text-lg font-mono tracking-widest text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
              />
            </div>

            {loginError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Invalid credentials. Access denied.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold uppercase tracking-wider rounded-xl text-xs shadow-xs cursor-pointer transition-colors"
            >
              Authorize Executive Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#090d16] text-white min-h-screen pb-20">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f1d38] text-white border border-[#c9902a]/50 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Top Bar */}
      <div className="bg-[#0b1628] text-white border-b border-[#c9902a]/20 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center p-0.5 shrink-0 overflow-hidden shadow-xs">
              <img
                src="https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-27%20at%206.19.21%20PM.jpeg"
                alt="Mahadev Group Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">
                Mahadev Group Operations Terminal
              </h1>
              <p className="text-[11px] font-mono text-[#e8b820]">
                Institutional Ledger · Finance, Property & Study Wings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                refreshData();
                showToast('Records Refreshed');
              }}
              className="p-2 rounded-xl bg-[#07111f] border border-[#c9902a]/30 hover:border-[#c9902a] text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#07111f] border border-[#c9902a]/30 hover:border-[#c9902a] text-gray-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Navigation & Content Layout */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full min-h-[calc(100vh-80px)]">
        
        {/* Sidebar Menu Bar */}
        <aside className="w-full md:w-64 shrink-0 bg-[#0b1628] md:bg-transparent border-b md:border-b-0 md:border-r border-[#c9902a]/20">
          <nav className="flex md:flex-col overflow-x-auto scrollbar-none p-3 md:p-6 gap-2 md:gap-3">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-3 md:py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-3 text-xs md:text-sm font-semibold ${
                activeTab === 'applications'
                  ? 'bg-white md:bg-[#0B1321] text-[#07111f] md:text-stone-100 shadow-md'
                  : 'text-gray-300 md:text-stone-600 hover:text-white md:hover:text-stone-900 hover:bg-[#0f1d38] md:hover:bg-stone-100'
              }`}
            >
              <FileText className="w-4 h-4 md:w-4 md:h-4" />
              <span>Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('loans')}
              className={`px-4 py-3 md:py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-3 text-xs md:text-sm font-semibold ${
                activeTab === 'loans'
                  ? 'bg-white md:bg-[#0B1321] text-[#07111f] md:text-stone-100 shadow-md'
                  : 'text-gray-300 md:text-stone-600 hover:text-white md:hover:text-stone-900 hover:bg-[#0f1d38] md:hover:bg-stone-100'
              }`}
            >
              <Coins className="w-4 h-4 md:w-4 md:h-4" />
              <span>Loan Portfolio ({loans.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`px-4 py-3 md:py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-3 text-xs md:text-sm font-semibold ${
                activeTab === 'properties'
                  ? 'bg-white md:bg-[#0B1321] text-[#07111f] md:text-stone-100 shadow-md'
                  : 'text-gray-300 md:text-stone-600 hover:text-white md:hover:text-stone-900 hover:bg-[#0f1d38] md:hover:bg-stone-100'
              }`}
            >
              <Building2 className="w-4 h-4 md:w-4 md:h-4" />
              <span>Properties ({properties.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-3 md:py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-3 text-xs md:text-sm font-semibold ${
                activeTab === 'library'
                  ? 'bg-white md:bg-[#0B1321] text-[#07111f] md:text-stone-100 shadow-md'
                  : 'text-gray-300 md:text-stone-600 hover:text-white md:hover:text-stone-900 hover:bg-[#0f1d38] md:hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4 md:w-4 md:h-4" />
              <span>Library Desks</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 md:py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-3 text-xs md:text-sm font-semibold ${
                activeTab === 'settings'
                  ? 'bg-white md:bg-[#0B1321] text-[#07111f] md:text-stone-100 shadow-md'
                  : 'text-gray-300 md:text-stone-600 hover:text-white md:hover:text-stone-900 hover:bg-[#0f1d38] md:hover:bg-stone-100'
              }`}
            >
              <Settings className="w-4 h-4 md:w-4 md:h-4" />
              <span>Configuration</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-3 md:py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-3 text-xs md:text-sm font-semibold ${
                activeTab === 'content'
                  ? 'bg-white md:bg-[#0B1321] text-[#07111f] md:text-stone-100 shadow-md'
                  : 'text-gray-300 md:text-stone-600 hover:text-white md:hover:text-stone-900 hover:bg-[#0f1d38] md:hover:bg-stone-100'
              }`}
            >
              <FileText className="w-4 h-4 md:w-4 md:h-4" />
              <span>Website Content</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-full overflow-x-hidden">
        {/* ================= TAB 1: APPLICATIONS & ENQUIRIES ================= */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#0b1628] rounded-xl border border-[#c9902a]/20 shadow-lg">
                <span className="text-xs text-[#e8b820]/70 font-mono">Total Registrations</span>
                <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
                  {applications.length}
                </div>
              </div>
              <div className="p-4 bg-[#0b1628] rounded-xl border border-[#c9902a]/20 shadow-lg">
                <span className="text-xs text-[#e8b820]/70 font-mono">Unprocessed / New</span>
                <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
                  {applications.filter((a) => a.status === 'New').length}
                </div>
              </div>
              <div className="p-4 bg-[#0b1628] rounded-xl border border-[#c9902a]/20 shadow-lg">
                <span className="text-xs text-[#e8b820]/70 font-mono">Under Review</span>
                <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
                  {applications.filter((a) => a.status === 'In Review' || a.status === 'Follow-up').length}
                </div>
              </div>
              <div className="p-4 bg-[#0b1628] rounded-xl border border-[#c9902a]/20 shadow-lg">
                <span className="text-xs text-[#e8b820]/70 font-mono">Executed / Approved</span>
                <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
                  {applications.filter((a) => a.status === 'Approved').length}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-[#0b1628] rounded-xl border border-[#c9902a]/20 p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by customer name, mobile, reference ID, city..."
                  className="w-full pl-9 pr-4 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 placeholder-gray-600 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs font-semibold text-gray-300 focus:border-[#e8b820]/50 focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Finance">Finance</option>
                  <option value="Property">Property</option>
                  <option value="Rental">Rental Hub</option>
                  <option value="Library">Library</option>
                  <option value="General">General</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs font-semibold text-gray-300 focus:border-[#e8b820]/50 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Approved">Approved</option>
                  <option value="Closed">Closed</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  onClick={exportToCSV}
                  className="px-3 py-2 bg-[#07111f] hover:bg-[#0f1d38] border border-[#c9902a]/30 text-gray-300 hover:text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-[#e8b820]" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-[#0b1628] rounded-xl border border-[#c9902a]/20 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#07111f] border-b border-[#c9902a]/20 text-[#e8b820]/70 font-mono uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Ref ID & Time</th>
                      <th className="py-3 px-4">Client Dossier</th>
                      <th className="py-3 px-4">Subject Division</th>
                      <th className="py-3 px-4">Review Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c9902a]/10">
                    {filteredApps.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-gray-500 font-mono text-xs">
                          No matching applications found in the ledger.
                        </td>
                      </tr>
                    ) : (
                      filteredApps.map((app) => (
                        <tr key={app.id} className="hover:bg-[#07111f] transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-[#e8b820] block">{app.id}</span>
                            <span className="text-[10px] text-gray-500 font-mono">
                              {new Date(app.createdAt).toLocaleDateString()} {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <strong className="text-white text-xs block">{app.customerName}</strong>
                            <div className="flex items-center gap-2 text-gray-400 font-mono text-[11px] mt-0.5">
                              <span>{app.mobile}</span>
                              <span>·</span>
                              <span>{app.city}</span>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-medium text-gray-200 block">{app.title}</span>
                            <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-[#07111f] text-[#e8b820]/80 border border-[#c9902a]/30 inline-block mt-0.5">
                              {app.category}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                              className={`px-2 py-1 rounded text-xs font-semibold border outline-none cursor-pointer ${getStatusBadge(
                                app.status
                              )}`}
                            >
                              <option value="New">New</option>
                              <option value="In Review">In Review</option>
                              <option value="Follow-up">Follow-up</option>
                              <option value="Approved">Approved</option>
                              <option value="Closed">Closed</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="px-2.5 py-1.5 bg-[#0B1321] text-stone-100 hover:bg-[#16243A] rounded-xs font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3 text-[#DFB262]" />
                                <span>Docket</span>
                              </button>
                              <button
                                onClick={() => handleDeleteApp(app.id)}
                                className="p-1.5 text-stone-400 hover:text-rose-700 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LOAN CATEGORIES ================= */}
        {activeTab === 'loans' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#c9902a]/20 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#e8b820] uppercase tracking-wider block">Portfolio Architecture</span>
                <h2 className="text-xl font-brand-serif font-bold text-white mt-0.5">Loan Categories & Tariff Parameters</h2>
                <p className="text-xs text-gray-400">Configure interest matrices, maximum sanction thresholds, and verification mandates.</p>
              </div>
              <button
                onClick={() => {
                  setEditingLoan({
                    id: `loan-${Date.now()}`,
                    name: '',
                    slug: '',
                    shortDescription: '',
                    interestRate: '',
                    loanRange: '',
                    tenure: '',
                    eligibility: ['Standard KYC & ID proof'],
                    documents: ['Aadhaar & PAN Card'],
                    features: ['Fast Disbursal'],
                    active: true
                  });
                  setLoanModalOpen(true);
                }}
                className="px-4 py-2 bg-[#0B1321] hover:bg-[#16243A] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer border border-[#c9902a]/30"
              >
                <Plus className="w-3.5 h-3.5 text-[#e8b820]" />
                <span>Add Loan Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loans.map((loan) => (
                <div key={loan.id} className="p-6 bg-[#0b1628] rounded-xl border border-[#c9902a]/20 shadow-lg space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded bg-[#e8b820]" />
                        <h3 className="font-semibold text-base text-white">{loan.name}</h3>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#e8b820] bg-[#07111f] border border-[#c9902a]/30 px-2 py-0.5 rounded inline-block mt-1">
                        {loan.interestRate}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingLoan({ ...loan });
                          setLoanModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${loan.name}?`)) {
                            dbService.deleteLoan(loan.id);
                            showToast('Loan category deleted');
                          }
                        }}
                        className="p-1.5 text-gray-500 hover:text-rose-400 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">{loan.shortDescription}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#07111f] p-3 rounded-lg border border-[#c9902a]/15 font-mono">
                    <div>
                      <span className="text-gray-500 block text-[10px] font-sans">Range Limit</span>
                      <span className="font-semibold text-gray-200">{loan.loanRange}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] font-sans">Sanction Tenure</span>
                      <span className="font-semibold text-gray-200">{loan.tenure}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PROPERTIES MANAGEMENT ================= */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#c9902a]/20 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#e8b820] uppercase tracking-wider block">DC Property Vala Inventory</span>
                <h2 className="text-xl font-brand-serif font-bold text-white mt-0.5">Real Estate Asset Management</h2>
                <p className="text-xs text-gray-400">Curate commercial showroom spaces, bank leasing sites, plots, and residential listings.</p>
              </div>
              <button
                onClick={() => {
                  setEditingProperty({
                    id: `PROP-${Math.floor(100 + Math.random() * 900)}`,
                    title: '',
                    type: 'Commercial',
                    purpose: 'Rent',
                    location: '',
                    price: '',
                    area: '',
                    suitableForBank: true,
                    features: ['Prime Location', 'Wide Road Frontage'],
                    status: 'Available',
                    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
                    phone: settings.phone
                  });
                  setPropertyModalOpen(true);
                }}
                className="px-4 py-2 bg-[#0B1321] hover:bg-[#16243A] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer border border-[#c9902a]/30"
              >
                <Plus className="w-3.5 h-3.5 text-[#e8b820]" />
                <span>Add Property Asset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <div key={prop.id} className="p-6 bg-[#0b1628] rounded-xl border border-[#c9902a]/20 shadow-lg space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#07111f] text-[#e8b820]/80 border border-[#c9902a]/30 px-2 py-0.5 rounded">
                        {prop.type} · {prop.purpose}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProperty({ ...prop });
                            setPropertyModalOpen(true);
                          }}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${prop.title}?`)) {
                              dbService.deleteProperty(prop.id);
                              showToast('Property deleted');
                            }
                          }}
                          className="p-1 text-gray-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-sm text-white line-clamp-2">{prop.title}</h3>
                    <p className="text-xs text-gray-400 truncate">{prop.location}</p>

                    <div className="flex justify-between items-center text-xs pt-2 border-t border-[#c9902a]/15 font-mono">
                      <span className="font-bold text-[#e8b820]">{prop.price}</span>
                      <span className="text-gray-400">{prop.area}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <select
                      value={prop.status}
                      onChange={(e) => {
                        const updated = { ...prop, status: e.target.value as any };
                        dbService.saveProperty(updated);
                        showToast(`Status updated to ${e.target.value}`);
                      }}
                      className="w-full text-xs font-semibold py-1.5 px-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-gray-200 outline-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Booked">Booked</option>
                      <option value="Sold/Rented">Sold / Rented</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: LIBRARY CONFIGURATION ================= */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="border-b border-[#c9902a]/20 pb-3">
              <span className="text-[10px] font-mono text-[#e8b820] uppercase tracking-wider block">Academic Branch Control</span>
              <h2 className="text-xl font-brand-serif font-bold text-white mt-0.5">Library Wings & Seat Inventory</h2>
              <p className="text-xs text-gray-400">
                Calibrate real-time desk counts, monthly shift dues, and banner notice broadcasts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Saraswati Girls Wing */}
              <div className="bg-[#0b1628] rounded-xl border border-[#c9902a]/20 p-6 shadow-lg space-y-4">
                <h3 className="font-brand-serif font-bold text-base text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8b820] inline-block"></span>
                  <span>Saraswati Girls Library</span>
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-gray-400 block mb-1">Total Desks</label>
                    <input
                      type="number"
                      value={libraryConfig.girlsLibrary.totalSeats}
                      onChange={(e) =>
                        setLibraryConfig({
                          ...libraryConfig,
                          girlsLibrary: {
                            ...libraryConfig.girlsLibrary,
                            totalSeats: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-400 block mb-1">Occupied Desks</label>
                    <input
                      type="number"
                      value={libraryConfig.girlsLibrary.occupiedSeats}
                      onChange={(e) =>
                        setLibraryConfig({
                          ...libraryConfig,
                          girlsLibrary: {
                            ...libraryConfig.girlsLibrary,
                            occupiedSeats: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#07111f] border border-[#c9902a]/15 text-gray-300 text-xs font-mono">
                  Vacant Desks: <strong className="text-[#e8b820]">{libraryConfig.girlsLibrary.totalSeats - libraryConfig.girlsLibrary.occupiedSeats}</strong>
                </div>
              </div>

              {/* Mahadev Boys Wing */}
              <div className="bg-[#0b1628] rounded-xl border border-[#c9902a]/20 p-6 shadow-lg space-y-4">
                <h3 className="font-brand-serif font-bold text-base text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8b820] inline-block"></span>
                  <span>Mahadev Boys Library</span>
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-gray-400 block mb-1">Total Desks</label>
                    <input
                      type="number"
                      value={libraryConfig.boysLibrary.totalSeats}
                      onChange={(e) =>
                        setLibraryConfig({
                          ...libraryConfig,
                          boysLibrary: {
                            ...libraryConfig.boysLibrary,
                            totalSeats: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-400 block mb-1">Occupied Desks</label>
                    <input
                      type="number"
                      value={libraryConfig.boysLibrary.occupiedSeats}
                      onChange={(e) =>
                        setLibraryConfig({
                          ...libraryConfig,
                          boysLibrary: {
                            ...libraryConfig.boysLibrary,
                            occupiedSeats: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#07111f] border border-[#c9902a]/15 text-gray-300 text-xs font-mono">
                  Vacant Desks: <strong className="text-[#e8b820]">{libraryConfig.boysLibrary.totalSeats - libraryConfig.boysLibrary.occupiedSeats}</strong>
                </div>
              </div>
            </div>

            {/* Announcement Banner */}
            <div className="bg-[#0b1628] rounded-xl border border-[#c9902a]/20 p-6 shadow-lg space-y-3">
              <label className="font-semibold text-xs text-white block">
                Library Announcement Banner (Displayed on Student Library Page)
              </label>
              <input
                type="text"
                value={libraryConfig.announcement}
                onChange={(e) => setLibraryConfig({ ...libraryConfig, announcement: e.target.value })}
                className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Shifts & Monthly Fees */}
            <div className="bg-[#0b1628] rounded-xl border border-[#c9902a]/20 p-6 shadow-lg space-y-4">
              <h3 className="font-brand-serif font-bold text-base text-white">Study Shift Schedules & Monthly Dues</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {libraryConfig.shifts.map((s, idx) => (
                  <div key={s.id} className="p-4 rounded-lg bg-[#07111f] border border-[#c9902a]/15 space-y-2 text-xs">
                    <div className="font-semibold text-white">{s.name}</div>
                    <div className="text-gray-400 font-mono text-[11px]">{s.timings}</div>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-medium text-gray-400">Dues (₹/mo):</span>
                      <input
                        type="number"
                        value={s.monthlyFee}
                        onChange={(e) => {
                          const updatedShifts = [...libraryConfig.shifts];
                          updatedShifts[idx].monthlyFee = Number(e.target.value);
                          setLibraryConfig({ ...libraryConfig, shifts: updatedShifts });
                        }}
                        className="w-24 px-2 py-1 bg-[#0b1628] border border-[#c9902a]/25 rounded font-mono font-bold text-[#e8b820] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                dbService.saveLibraryConfig(libraryConfig);
                showToast('Library configuration updated successfully');
              }}
              className="py-2.5 px-6 bg-[#024089] hover:bg-[#012d61] text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
            >
              Commit Library Revisions
            </button>
          </div>
        )}

        {/* ================= TAB 5: WEBSITE SETTINGS & CONTACT ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="border-b border-[#c9902a]/20 pb-3">
              <span className="text-[10px] font-mono text-[#e8b820] uppercase tracking-wider block">Global Properties</span>
              <h2 className="text-xl font-brand-serif font-bold text-white mt-0.5">Corporate & Administrative Settings</h2>
              <p className="text-xs text-gray-400">Edit telephone channels, WhatsApp dispatch destination, registered address, and Admin passcode.</p>
            </div>

            <div className="bg-[#0b1628] rounded-xl border border-[#c9902a]/20 p-6 sm:p-8 shadow-lg space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Primary Telephone / Gold Loan Desk</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Secondary / Property Desk (Kudi Sector 5)</label>
                  <input
                    type="text"
                    value={settings.phoneSecondary}
                    onChange={(e) => setSettings({ ...settings, phoneSecondary: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Library Admissions Desk (Saraswati Nagar)</label>
                  <input
                    type="text"
                    value={settings.phoneTertiary || ''}
                    onChange={(e) => setSettings({ ...settings, phoneTertiary: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Executive Director / Senior Officer Direct Line</label>
                  <input
                    type="text"
                    value={settings.phoneExecutive || ''}
                    onChange={(e) => setSettings({ ...settings, phoneExecutive: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-400 block mb-1">WhatsApp International Number (e.g. 919829012345)</label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs font-mono text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-400 block mb-1">Official Registry Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Central Corporate Address (Jalori Gate Head Office)</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Founder Profile Photo URL (About Page)</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    value={settings.founderImageUrl || ''}
                    onChange={(e) => setSettings({ ...settings, founderImageUrl: e.target.value })}
                    className="flex-1 px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                    placeholder="https://ik.imagekit.io/..."
                  />
                  {settings.founderImageUrl && (
                    <img
                      src={settings.founderImageUrl}
                      alt="Founder Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-stone-300"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Office Hero Banner URL (About Page)</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    value={settings.officeBannerUrl || ''}
                    onChange={(e) => setSettings({ ...settings, officeBannerUrl: e.target.value })}
                    className="flex-1 px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 font-mono focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                    placeholder="https://ik.imagekit.io/..."
                  />
                  {settings.officeBannerUrl && (
                    <img
                      src={settings.officeBannerUrl}
                      alt="Office Banner Preview"
                      className="w-16 h-10 rounded-lg object-cover border border-stone-300"
                    />
                  )}
                </div>
              </div>

              {/* 3 Jodhpur Branch Details */}
              <div className="bg-[#07111f] border border-[#c9902a]/20 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#e8b820]/80 font-mono">
                  Registered Jodhpur Branches ({settings.branches?.length || 3})
                </h4>
                <div className="space-y-3 text-xs">
                  {settings.branches?.map((branch, bIdx) => (
                    <div key={branch.id || bIdx} className="bg-[#0b1628] p-3 rounded-lg border border-[#c9902a]/15 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#e8b820]">{branch.name}</span>
                        <span className="text-[10px] bg-[#024089]/30 text-blue-300 px-2 py-0.5 rounded font-semibold border border-blue-700/30">{branch.tag}</span>
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-500 block mb-0.5">Address</label>
                        <input
                          type="text"
                          value={branch.address}
                          onChange={(e) => {
                            const updated = [...(settings.branches || [])];
                            updated[bIdx] = { ...updated[bIdx], address: e.target.value };
                            setSettings({ ...settings, branches: updated });
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#07111f] border border-[#c9902a]/20 rounded text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-500 block mb-0.5">Landmark</label>
                        <input
                          type="text"
                          value={branch.landmark}
                          onChange={(e) => {
                            const updated = [...(settings.branches || [])];
                            updated[bIdx] = { ...updated[bIdx], landmark: e.target.value };
                            setSettings({ ...settings, branches: updated });
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#07111f] border border-[#c9902a]/20 rounded text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Top Announcement Banner</label>
                <input
                  type="text"
                  value={settings.noticeBanner}
                  onChange={(e) => setSettings({ ...settings, noticeBanner: e.target.value })}
                  className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                />
              </div>

              {/* 3 Official Instagram Accounts */}
              <div className="bg-[#07111f] border border-[#c9902a]/20 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#e8b820]/80 font-mono">
                  Official Instagram Accounts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-gray-400 block mb-1 text-[11px]">
                      1. DC Property Vala (@dcpropertyvala_jodhpur)
                    </label>
                    <input
                      type="text"
                      value={settings.instagramUrl || ''}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                      placeholder="https://www.instagram.com/dcpropertyvala_jodhpur..."
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-400 block mb-1 text-[11px]">
                      2. Mahadev Finance (@mahadev_finance_jodhpur93)
                    </label>
                    <input
                      type="text"
                      value={settings.instagramFinanceUrl || ''}
                      onChange={(e) => setSettings({ ...settings, instagramFinanceUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                      placeholder="https://www.instagram.com/mahadev_finance_jodhpur93..."
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-400 block mb-1 text-[11px]">
                      3. Founder Personal (@ekshivbhaktt___)
                    </label>
                    <input
                      type="text"
                      value={settings.instagramPersonalUrl || ''}
                      onChange={(e) => setSettings({ ...settings, instagramPersonalUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                      placeholder="https://www.instagram.com/ekshivbhaktt___..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">Admin Access Security PIN</label>
                <input
                  type="text"
                  value={settings.adminPin}
                  onChange={(e) => setSettings({ ...settings, adminPin: e.target.value })}
                  className="w-full max-w-xs px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs font-mono text-gray-100 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#c9902a]/15">
                <button
                  onClick={() => {
                    dbService.saveSettings(settings);
                    showToast('Website configurations saved');
                  }}
                  className="py-2.5 px-6 bg-[#024089] hover:bg-[#012d61] text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  Save Global Parameters
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo data back to default initial seed?')) {
                      dbService.resetToDefaults();
                      refreshData();
                      showToast('Database reset to defaults');
                    }
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 hover:underline font-medium"
                >
                  Reset Demo Data Seed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: WEBSITE CONTENT ================= */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#c9902a]/20 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#e8b820] uppercase tracking-wider block">CMS Management</span>
                <h2 className="text-xl font-brand-serif font-bold text-white mt-0.5">Website Content Editor</h2>
                <p className="text-xs text-gray-400">Edit text, descriptions, and images for ALL public pages: Home, About, Loans, Properties, Library, Contact, Rental.</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    if (window.confirm('Reset ALL website content to factory defaults? Your custom edits will be lost.')) {
                      dbService.resetContent();
                      setContent(dbService.getContent());
                      showToast('Website content reset to defaults');
                    }
                  }}
                  className="px-3 py-2 text-rose-400 hover:bg-rose-900/30 border border-rose-700/50 font-semibold text-xs rounded-xl cursor-pointer transition-colors"
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={() => {
                    dbService.saveContent(content);
                    showToast('Website content saved successfully');
                  }}
                  className="px-4 py-2 bg-[#024089] hover:bg-[#012d61] text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {Object.entries(content).map(([pageName, pageSections]: [string, any]) => (
                <div key={pageName} className="bg-[#0b1628] rounded-xl border border-[#c9902a]/20 overflow-hidden shadow-lg">
                  <div className="bg-[#07111f] border-b border-[#c9902a]/20 px-6 py-4 flex items-center justify-between">
                    <h3 className="font-bold text-white text-base capitalize flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8b820] inline-block"></span>
                      {pageName} Page
                    </h3>
                  </div>
                  <div className="p-6 space-y-8">
                    {Object.entries(pageSections).map(([sectionName, fields]: [string, any]) => (
                      <div key={sectionName} className="space-y-4">
                        <h4 className="font-semibold text-[#e8b820]/80 text-xs border-b border-[#c9902a]/15 pb-2 capitalize tracking-wider uppercase font-mono">
                          {sectionName} Section
                        </h4>
                        <div className="grid grid-cols-1 gap-5">
                          {Object.entries(fields).map(([fieldKey, field]: [string, any]) => (
                            <div key={fieldKey} className="space-y-1.5">
                              <label className="text-xs font-semibold text-gray-400 block">
                                {field.label}
                              </label>
                              
                              {field.type === 'text' && (
                                <input
                                  type="text"
                                  value={field.value}
                                  onChange={(e) => {
                                    setContent({
                                      ...content,
                                      [pageName]: {
                                        ...content[pageName],
                                        [sectionName]: {
                                          ...content[pageName][sectionName],
                                          [fieldKey]: { ...field, value: e.target.value }
                                        }
                                      }
                                    });
                                  }}
                                  className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 placeholder-gray-600 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                                />
                              )}

                              {field.type === 'textarea' && (
                                <textarea
                                  value={field.value}
                                  onChange={(e) => {
                                    setContent({
                                      ...content,
                                      [pageName]: {
                                        ...content[pageName],
                                        [sectionName]: {
                                          ...content[pageName][sectionName],
                                          [fieldKey]: { ...field, value: e.target.value }
                                        }
                                      }
                                    });
                                  }}
                                  rows={3}
                                  className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 placeholder-gray-600 focus:border-[#e8b820]/50 focus:outline-none transition-colors resize-none"
                                />
                              )}

                              {field.type === 'image' && (
                                <div className="space-y-2">
                                  <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => {
                                      setContent({
                                        ...content,
                                        [pageName]: {
                                          ...content[pageName],
                                          [sectionName]: {
                                            ...content[pageName][sectionName],
                                            [fieldKey]: { ...field, value: e.target.value }
                                          }
                                        }
                                      });
                                    }}
                                    className="w-full px-3 py-2 bg-[#07111f] border border-[#c9902a]/25 rounded-lg text-xs text-gray-100 placeholder-gray-600 focus:border-[#e8b820]/50 focus:outline-none transition-colors"
                                    placeholder="Image URL"
                                  />
                                  {field.value && (
                                    <div className="w-32 h-20 rounded-lg border border-[#c9902a]/30 overflow-hidden bg-[#07111f]">
                                      <img src={field.value} alt={field.label} className="w-full h-full object-cover" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      </div>

      {/* ================= APPLICATION DETAIL MODAL ================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-xs shadow-2xl border border-stone-300 overflow-hidden my-8">
            {/* Header */}
            <div className="bg-[#0B1321] text-stone-100 p-5 border-b border-stone-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#DFB262] font-semibold">{selectedApp.id}</span>
                <h3 className="font-brand-serif font-bold text-lg text-stone-100 mt-0.5">{selectedApp.title}</h3>
                <span className="text-[11px] text-stone-400 font-mono">
                  Recorded: {new Date(selectedApp.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-xs hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs max-h-[75vh] overflow-y-auto">
              {/* Customer info strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF9F6] p-4 rounded-xs border border-stone-300">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-mono">Applicant Name</span>
                  <strong className="text-stone-900 text-sm">{selectedApp.customerName}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-mono">Mobile Contact</span>
                  <a
                    href={`tel:${selectedApp.mobile}`}
                    className="font-mono font-bold text-stone-900 hover:underline text-sm block"
                  >
                    {selectedApp.mobile}
                  </a>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-mono">Docket Status</span>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleStatusChange(selectedApp.id, e.target.value as ApplicationStatus)}
                    className={`mt-0.5 px-2 py-1 rounded-xs text-xs font-semibold border outline-none cursor-pointer ${getStatusBadge(
                      selectedApp.status
                    )}`}
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Approved">Approved</option>
                    <option value="Closed">Closed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Form Submission Details */}
              <div className="space-y-2">
                <h4 className="font-semibold text-xs text-stone-900 uppercase tracking-wider font-mono border-b border-stone-200 pb-1">
                  Submitted Parameters & Form Disclosures
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(selectedApp.details).map(([key, val]) => (
                    <div key={key} className="p-2.5 rounded-xs bg-[#FAF9F6] border border-stone-200">
                      <span className="text-stone-500 block text-[10px] capitalize font-mono">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-semibold text-stone-800 break-words">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes & Activity History */}
              <div className="space-y-3">
                <h4 className="font-semibold text-xs text-stone-900 uppercase tracking-wider font-mono border-b border-stone-200 pb-1">
                  Internal Officer Notes & Action Log
                </h4>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedApp.notes.map((note) => (
                    <div key={note.id} className="p-2.5 rounded-xs bg-stone-50 border border-stone-300 text-xs">
                      <div className="flex justify-between items-center text-[10px] text-stone-700 font-semibold mb-1">
                        <span>{note.author}</span>
                        <span className="text-stone-400 font-mono">
                          {new Date(note.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-stone-800 leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>

                {/* Add new note */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Enter case note (e.g. customer visited, purity verified at 22K)..."
                    className="flex-1 px-3 py-2 border border-stone-300 rounded-xs text-xs text-stone-900 outline-none focus:border-[#D6A555]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddNote();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-[#0B1321] hover:bg-[#16243A] text-stone-100 font-semibold rounded-xs text-xs transition-colors cursor-pointer"
                  >
                    Log Note
                  </button>
                </div>
              </div>

              {/* Quick WhatsApp / Call Link */}
              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <a
                  href={`https://wa.me/${selectedApp.mobile}?text=Namaste%20${encodeURIComponent(
                    selectedApp.customerName
                  )},%20this%20is%20regarding%20your%20Mahadev%20Group%20application%20(${selectedApp.id}).`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-[#0B1321] hover:bg-[#16243A] text-stone-100 font-semibold rounded-xs text-center text-xs transition-colors"
                >
                  Initiate WhatsApp Communication
                </a>
                <a
                  href={`tel:${selectedApp.mobile}`}
                  className="py-2.5 px-4 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold rounded-xs text-xs transition-colors"
                >
                  Dial Number
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT / CREATE LOAN MODAL ================= */}
      {loanModalOpen && editingLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-xs shadow-2xl p-6 space-y-4 my-8 text-xs border border-stone-300">
            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
              <h3 className="font-brand-serif font-bold text-base text-stone-900">
                {editingLoan.id ? 'Edit Loan Product' : 'New Loan Product'}
              </h3>
              <button onClick={() => setLoanModalOpen(false)}>
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Loan Title</label>
                <input
                  type="text"
                  value={editingLoan.name}
                  onChange={(e) => setEditingLoan({ ...editingLoan, name: e.target.value })}
                  placeholder="e.g. Gold Loan"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  value={editingLoan.shortDescription}
                  onChange={(e) => setEditingLoan({ ...editingLoan, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs text-stone-900 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Interest Rate</label>
                  <input
                    type="text"
                    value={editingLoan.interestRate}
                    onChange={(e) => setEditingLoan({ ...editingLoan, interestRate: e.target.value })}
                    placeholder="e.g. From 0.79% / mo"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Amount Range</label>
                  <input
                    type="text"
                    value={editingLoan.loanRange}
                    onChange={(e) => setEditingLoan({ ...editingLoan, loanRange: e.target.value })}
                    placeholder="e.g. ₹10,000 - ₹50 Lakhs"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Sanction Tenure</label>
                <input
                  type="text"
                  value={editingLoan.tenure}
                  onChange={(e) => setEditingLoan({ ...editingLoan, tenure: e.target.value })}
                  placeholder="e.g. 3 to 36 Months"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs text-stone-900"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
              <button
                onClick={() => setLoanModalOpen(false)}
                className="px-4 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dbService.saveLoan(editingLoan);
                  setLoanModalOpen(false);
                  showToast('Loan category saved');
                }}
                className="px-4 py-2 bg-[#0B1321] text-stone-100 font-semibold rounded-xs hover:bg-[#16243A]"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT / CREATE PROPERTY MODAL ================= */}
      {propertyModalOpen && editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-xs shadow-2xl p-6 space-y-4 my-8 text-xs border border-stone-300">
            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
              <h3 className="font-brand-serif font-bold text-base text-stone-900">
                {editingProperty.id ? 'Edit Property Dossier' : 'New Property Listing'}
              </h3>
              <button onClick={() => setPropertyModalOpen(false)}>
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Property Title</label>
                <input
                  type="text"
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                  placeholder="e.g. 3-Storey Commercial Showroom Building"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category Type</label>
                  <select
                    value={editingProperty.type}
                    onChange={(e) => setEditingProperty({ ...editingProperty, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Building">Building</option>
                    <option value="Shop">Shop</option>
                    <option value="Plot">Plot</option>
                    <option value="House">House</option>
                    <option value="Residential">Residential</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Transaction Purpose</label>
                  <select
                    value={editingProperty.purpose}
                    onChange={(e) => setEditingProperty({ ...editingProperty, purpose: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs"
                  >
                    <option value="Rent">Rent</option>
                    <option value="Sell">Sell</option>
                    <option value="Buy">Buy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Price / Valuation</label>
                  <input
                    type="text"
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
                    placeholder="e.g. ₹1,25,000 / mo"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Carpet Area</label>
                  <input
                    type="text"
                    value={editingProperty.area}
                    onChange={(e) => setEditingProperty({ ...editingProperty, area: e.target.value })}
                    placeholder="e.g. 4,500 sq ft"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Address / Landmark</label>
                <input
                  type="text"
                  value={editingProperty.location}
                  onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                  placeholder="e.g. Main Market Road, Near Bus Stand"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xs text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="suitableBank"
                  checked={editingProperty.suitableForBank || false}
                  onChange={(e) => setEditingProperty({ ...editingProperty, suitableForBank: e.target.checked })}
                  className="rounded-xs"
                />
                <label htmlFor="suitableBank" className="font-semibold text-stone-700 cursor-pointer">
                  Bank / Institutional Grade Specification
                </label>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
              <button
                onClick={() => setPropertyModalOpen(false)}
                className="px-4 py-2 text-stone-600 font-semibold hover:bg-stone-100 rounded-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dbService.saveProperty(editingProperty);
                  setPropertyModalOpen(false);
                  showToast('Property listing saved');
                }}
                className="px-4 py-2 bg-[#0B1321] hover:bg-[#16243A] text-stone-100 font-semibold rounded-xs"
              >
                Commit Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


