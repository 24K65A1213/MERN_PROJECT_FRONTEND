import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Search, AlertCircle, CheckCircle, Printer } from "lucide-react";

function normalizeRoll(roll) {
  return (roll || "").replace(/\s+/g, "").toUpperCase();
}

export default function ExamResultLookup() {
  const [roll, setRoll] = useState("");
  const [queried, setQueried] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const normalized = useMemo(() => normalizeRoll(roll), [roll]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!normalized) return;
    setQueried(true);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/results?roll=${encodeURIComponent(normalized)}`);
      if (!res.ok) throw new Error("Failed to fetch result");
      const data = await res.json();
      if (data && data.result) {
        setResult(data.result);
      } else {
        setError("No result found");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong fetching your result");
    } finally {
      setLoading(false);
    }
  }

  function onPrint() {
    window.print();
  }

  const isValid = normalized.length > 0 && /^[A-Z0-9-]+$/.test(normalized);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-800 flex items-start justify-center p-6 md:p-12">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Exam Results Portal</h1>
            <p className="text-sm text-slate-500">Enter your roll number to view result</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
          <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-3">
            <label className="sr-only" htmlFor="roll">Roll Number</label>
            <input
              id="roll"
              type="text"
              placeholder="e.g., 1001"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-4 focus:ring-slate-200"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              inputMode="numeric"
              autoComplete="off"
              maxLength={20}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-900 shadow-sm"
              aria-label="Search result by roll number"
              disabled={!isValid || loading}
            >
              <Search className="w-5 h-5" />
              {loading ? "Loading..." : "Check Result"}
            </button>
          </form>

          <div className="mt-2 min-h-[1.5rem]">
            {!roll && (
              <p className="text-xs text-slate-500">Tip: Only digits/letters and hyphens are allowed.</p>
            )}
            {roll && !isValid && (
              <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-4 h-4"/>Invalid characters. Use A–Z, 0–9, or hyphen (-).</p>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {queried && (
            <motion.div
              key={result ? "found" : error ? "not-found" : "loading"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              {loading && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
                  Loading result...
                </div>
              )}
              {!loading && error && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{error}</h3>
                    <p className="text-sm text-slate-600">Please check the roll number and try again. If the issue persists, contact your school administration.</p>
                  </div>
                </div>
              )}
              {!loading && result && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${result.status === "Pass" ? "text-emerald-600" : "text-rose-600"}`} />
                      <h2 className="text-lg font-semibold">Result for Roll #{normalized}</h2>
                    </div>
                    <button
                      onClick={onPrint}
                      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50"
                    >
                      <Printer className="w-4 h-4" /> Print
                    </button>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Student" value={result.name} />
                    <InfoRow label="Subject" value={result.subject} />
                    <InfoRow label="Score" value={`${result.score}/100`} />
                    <InfoRow label="Grade" value={result.grade} />
                    <InfoRow label="Status" value={result.status} emphasis={result.status === "Pass" ? "good" : "bad"} />
                  </div>

                  <div className="px-6 py-3 bg-slate-50 text-xs text-slate-500">
                    This is a provisional statement. For official transcripts, contact the examination office.
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-slate-500">
          Connected to backend API at <code>/api/results</code>. Adjust URL as needed.
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value, emphasis }) {
  const emphasisClasses =
    emphasis === "good"
      ? "text-emerald-700"
      : emphasis === "bad"
      ? "text-rose-700"
      : "text-slate-800";

  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide text-slate-500">{label}</span>
      <span className={`text-base md:text-lg font-medium ${emphasisClasses}`}>{value}</span>
    </div>
  );
}
