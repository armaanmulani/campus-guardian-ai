'use client';

import { useState } from 'react';
import { MOCK_REPORTS, Report } from '@/lib/mockReports';

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const pendingCount = reports.filter(report => report.status === 'PENDING').length;

  const handleApprove = (id: string) => {
    setReports(previous =>
      previous.map(report =>
        report.id === id ? { ...report, status: 'APPROVED' } : report
      )
    );
  };

  const handleReject = (id: string) => {
    setReports(previous =>
      previous.map(report =>
        report.id === id ? { ...report, status: 'REJECTED' } : report
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-6 text-slate-800 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-5 rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-200/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-black text-white shadow-lg shadow-indigo-200">
              CG
            </div>
            <div>
              <p className="mb-0.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Campus operations</p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Campus Guardian</h1>
              <p className="mt-1 text-sm text-slate-500">A calmer way to keep your campus moving safely.</p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 ring-1 ring-amber-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-lg font-bold text-amber-950">{pendingCount}</span>
            <div>
              <p className="text-sm font-semibold text-slate-800">Needs your review</p>
              <p className="text-xs text-slate-500">Pending incidents</p>
            </div>
          </div>
        </header>

        <main>
          <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Incoming reports</h2>
              <p className="mt-1 text-sm text-slate-500">Review each report and choose the next best step for students and staff.</p>
            </div>
            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">Live campus feed</span>
          </section>

          <div className="space-y-4">
            {reports.map(report => (
              <article
                key={report.id}
                className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md sm:p-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      report.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-700'
                        : report.severity === 'High'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {report.severity} priority
                    </span>
                    <span className="text-xs font-medium text-slate-400">Reported {report.time}</span>
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-500">{report.nodeId}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {report.category} <span className="font-normal text-slate-400">&mdash;</span> {report.location}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">{report.description}</p>
                </div>

                <div className="flex shrink-0 items-center gap-2 self-end md:self-auto">
                  {report.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleReject(report.id)}
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => handleApprove(report.id)}
                        className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
                      >
                        Approve &amp; reroute
                      </button>
                    </>
                  ) : (
                    <span className={`rounded-full px-3 py-2 text-xs font-bold ${
                      report.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {report.status === 'APPROVED' ? 'Approved' : 'Dismissed'}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
