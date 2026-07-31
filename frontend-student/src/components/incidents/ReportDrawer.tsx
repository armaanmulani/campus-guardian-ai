"use client";

import { useState, useRef } from "react";
import {
  X,
  Upload,
  MapPin,
  ChevronDown,
  CheckCircle,
  Loader2,
  Camera,
} from "lucide-react";
import type { IncidentCategory, ReportForm } from "@/lib/types";

interface ReportDrawerProps {
  open: boolean;
  onClose: () => void;
}

const categories: { value: IncidentCategory; label: string }[] = [
  { value: "theft", label: "Theft" },
  { value: "assault", label: "Assault" },
  { value: "harassment", label: "Harassment"},
  { value: "suspicious_activity", label: "Suspicious Activity"},
  { value: "medical", label: "Medical Emergency"},
  { value: "fire", label: "Fire / Hazard"},
  { value: "infrastructure", label: "Infrastructure"},
  { value: "other", label: "Other"},
];

const EMPTY_FORM: ReportForm = {
  category: "suspicious_activity",
  title: "",
  description: "",
  location: "",
};

type SubmitState = "idle" | "submitting" | "success";

export default function ReportDrawer({ open, onClose }: ReportDrawerProps) {
  const [form, setForm] = useState<ReportForm>(EMPTY_FORM);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, photo: file }));
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location) return;
    setSubmitState("submitting");
    
    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to submit");
      
      setSubmitState("success");
      setTimeout(() => {
        setSubmitState("idle");
        setForm(EMPTY_FORM);
        setPhotoPreview(null);
        onClose();
        // Option: we could trigger a mutate() here if using SWR/ReactQuery
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmitState("idle");
      alert("Failed to submit report. Please try again.");
    }
  };

  const isValid = form.title.trim() && form.description.trim() && form.location.trim();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="drawer-enter fixed right-0 top-0 h-full w-[420px] bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Report an Incident</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Anonymous · Reviewed by Campus Security
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success state */}
        {submitState === "success" ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-semibold text-gray-900">Report Submitted</h3>
              <p className="text-sm text-gray-500 mt-1">
                Campus security has been notified. Thank you for keeping campus safe.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-5 space-y-5">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Incident Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, category: cat.value }))}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-all ${
                        form.category === cat.value
                          ? "border-blue-400 bg-blue-50 text-blue-700 text-lg"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-lg"
                      }`}
                    >
                      
                      <span className="truncate text-xs">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Brief summary of the incident"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  maxLength={80}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-400 bg-gray-50 transition-colors"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Location <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. Main Library, North Entrance"
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-400 bg-gray-50 transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  placeholder="Describe what happened in detail…"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-400 bg-gray-50 resize-none transition-colors"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Photo (Optional)
                </label>
                {photoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => { setPhotoPreview(null); setForm((f) => ({ ...f, photo: undefined })); }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 py-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 text-gray-400 hover:text-blue-500 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Upload a photo</p>
                      <p className="text-xs mt-0.5">PNG, JPG up to 10MB</p>
                    </div>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              {/* Anonymity notice */}
              <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-[10px] text-gray-500 font-bold">i</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your report is completely anonymous. Campus security will review it before it appears on the map.
                </p>
              </div>
            </div>

            {/* Submit footer */}
            <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-gray-100">
              <button
                type="submit"
                disabled={!isValid || submitState === "submitting"}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {submitState === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
