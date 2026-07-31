'use client';

import { FormEvent, useState, useSyncExternalStore } from 'react';
import { MOCK_REPORTS, Report } from '@/lib/mockReports';

const severityClass: Record<Report['severity'], string> = { Critical: 'critical', High: 'high', Medium: 'medium', Low: 'low' };
const priority: Record<Report['severity'], number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
type ComplaintGroup = Report & { reportIds: string[]; complaintCount: number };

const AUTH_STORAGE_KEY = 'campus-guardian-admin';
const AUTH_CHANGE_EVENT = 'campus-guardian-auth-change';

function subscribeToAuthentication(callback: () => void) {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  return () => window.removeEventListener(AUTH_CHANGE_EVENT, callback);
}

function getAuthenticationSnapshot() {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

function getServerAuthenticationSnapshot() {
  return false;
}

function notifyAuthenticationChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

function groupComplaints(items: Report[]): ComplaintGroup[] {
  const groups = new Map<string, ComplaintGroup>();
  items.forEach(report => {
    const key = `${report.category}|${report.location}`;
    const group = groups.get(key);
    if (!group) { groups.set(key, { ...report, reportIds: [report.id], complaintCount: 1 }); return; }
    group.reportIds.push(report.id);
    group.complaintCount += 1;
    if (priority[report.severity] > priority[group.severity]) group.severity = report.severity;
  });
  return [...groups.values()];
}

export default function AdminDashboard() {
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuthentication,
    getAuthenticationSnapshot,
    getServerAuthenticationSnapshot,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'ALL' | Report['status']>('ALL');
  const pendingCount = reports.filter(({ status }) => status === 'PENDING').length;
  const visibleReports = groupComplaints(activeFilter === 'ALL' ? reports : reports.filter(({ status }) => status === activeFilter)).toSorted((a, b) => priority[b.severity] - priority[a.severity]);
  const updateStatus = (ids: string[], status: 'APPROVED' | 'REJECTED') => setReports(current => current.map(report => ids.includes(report.id) ? { ...report, status } : report));

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setLoginError('');

  if (!email.trim() || !password) {
    setLoginError('Enter your admin email and password.');
    return;
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_LOGIN_URL!,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      setLoginError('Invalid email or password.');
      return;
    }

    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    notifyAuthenticationChange();
  } catch {
    setLoginError('Cannot connect to the login server.');
  }
};

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    notifyAuthenticationChange();
    setPassword('');
  };

  if (!isAuthenticated) return <main className="login-screen">
    <form className="login-card" onSubmit={handleLogin}>
      <div className="login-mark">CG</div>
      <p className="login-eyebrow">CAMPUS GUARDIAN</p>
      <h1>Admin login</h1>
      <label>Admin email<input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" placeholder="admin@campusguardian.com" /></label>
      <label>Password<input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" placeholder="Enter password" /></label>
      {loginError && <p className="login-error">{loginError}</p>}
      <button type="submit">Log in</button>
    </form>
  </main>;

  return <div className="admin-screen">
    <header className="admin-topbar"><div className="admin-brand"><div className="admin-brand-mark">CG</div><div><h1>Campus Guardian</h1><p>ADMIN SAFETY PORTAL</p></div></div><div className="admin-actions"><span className="admin-user">Administrator</span><button className="admin-bell" aria-label="Notifications">o<i /></button><button className="admin-report" onClick={handleLogout}>Log out</button></div></header>
    {noticeVisible && <div className="admin-alert"><span>!</span><b>HIGH</b><strong>{pendingCount} incident{pendingCount === 1 ? '' : 's'} need review right now.</strong><button onClick={() => setNoticeVisible(false)} aria-label="Dismiss alert">x</button></div>}
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-heading"><span>#</span><div><p>CONTROL CENTER</p><h2>Safety overview</h2></div></div>
        <div className="metric metric-pending"><span>{pendingCount}</span><div><strong>Awaiting review</strong><small>New incident reports</small></div></div>
        <div className="metric"><span>{reports.filter(r => r.status === 'APPROVED').length}</span><div><strong>Reroutes active</strong><small>Approved safety actions</small></div></div>
        <div className="metric"><span>24</span><div><strong>Monitored zones</strong><small>Live campus coverage</small></div></div>
        <div className="filter-title">REPORT STATUS</div>
        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`admin-filter ${activeFilter === filter ? 'active' : ''}`}><span>{filter === 'ALL' ? 'o' : filter === 'PENDING' ? '~' : filter === 'APPROVED' ? '+' : 'x'}</span>{filter === 'ALL' ? 'All reports' : filter[0] + filter.slice(1).toLowerCase()}</button>)}
        <div className="sidebar-live"><i /> Live data - Updated just now</div>
      </aside>
      <section className="admin-content">
        <div className="content-heading"><div><p>INCIDENT MANAGEMENT - PRIORITY QUEUE</p><h2>Incoming reports</h2><span>Critical issues appear first, followed by high, medium, and low priority reports.</span></div><div className="heading-total"><b>{visibleReports.length}</b> issues shown</div></div>
        <div className="report-list">
          {visibleReports.map(report => <article className="admin-card" key={report.id}>
            <div className="report-main"><div className="report-meta"><span className={`severity-badge ${severityClass[report.severity]}`}>{report.severity}</span><span>Reported {report.time}</span><code>{report.nodeId}</code></div><h3>{report.category} <i>-</i> {report.location}</h3><p>{report.description}</p></div>
            <div className="report-side" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, flexShrink: 0 }}><span className="complaint-count" style={{ padding: '5px 9px', border: '1px solid #dae8fb', borderRadius: 14, color: '#52769e', background: '#f2f8ff', fontSize: 11, whiteSpace: 'nowrap' }}><b style={{ color: '#2879e9', fontSize: 13 }}>{report.complaintCount}</b> complaint{report.complaintCount === 1 ? '' : 's'}</span><div className="report-action">{report.status === 'PENDING' ? <><button onClick={() => updateStatus(report.reportIds, 'REJECTED')} className="dismiss">Dismiss</button><button onClick={() => updateStatus(report.reportIds, 'APPROVED')} className="approve">Approve &amp; reroute</button></> : <span className={`status-pill ${report.status === 'APPROVED' ? 'approved' : 'rejected'}`}>{report.status === 'APPROVED' ? 'Approved' : 'Dismissed'}</span>}</div></div>
          </article>)}
          {visibleReports.length === 0 && <div className="empty-state">No reports in this group.</div>}
        </div>
      </section>
    </main>
  </div>;
}
