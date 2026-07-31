"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";

type Role = "student" | "admin";
type AuthMode = "login" | "signup";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("student");
  const [mode, setMode] = useState<AuthMode>("login");

  // Form states - ID/Reg Number removed
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isSignup = mode === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Payload now only sends name, email, password, and role
    const payload = {
      name: isSignup ? name : undefined,
      email,
      password,
      role, 
    };

    try {
      const endpoint = isSignup ? "/api/auth/register" : "/api/auth/login"; 
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Authentication failed");
      }

      setSuccessMsg(`Successfully ${isSignup ? "signed up" : "logged in"}!`);
      // Optional: Redirect user here 
      
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <section className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 pt-6 pb-5 border-b border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to map
          </Link>

          <div className="mt-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.25} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">Campus Guardian</h1>
              <p className="mt-1 text-xs font-mono uppercase tracking-[0.15em] text-slate-400">
                {role === "student" ? "Student Access" : "Admin Console"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
            {(["student", "admin"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setRole(item)}
                type="button"
                className={`rounded-md px-3 py-2 text-sm font-semibold capitalize transition-colors ${
                  role === item
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            {(["login", "signup"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                type="button"
                className={`text-sm font-semibold transition-colors ${
                  mode === item ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {item === "login" ? "Login" : "Sign up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {errorMsg && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">{errorMsg}</div>}
            {successMsg && <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">{successMsg}</div>}

            {isSignup && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {role === "student" ? "Student email" : "Admin email"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "student" ? "student@vitbhopal.ac.in" : "admin@vitbhopal.ac.in"}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSignup ? "Create account" : "Login"} as {role}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}