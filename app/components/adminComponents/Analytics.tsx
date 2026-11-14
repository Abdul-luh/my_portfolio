"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "./Toast";

type Log = {
  page: string;
  ip: string;
  userAgent: string;
  referer: string;
  timestamp: string;
};

export default function AnalyticsDashboard() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDate, setSearchDate] = useState("");
  const [isPurging, setIsPurging] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const itemsPerPage = 20;

  const fetchLogs = () => {
    axios
      .get("/api/track")
      .then((res) => {
        setLogs(res.data.visits || []);
      })
      .catch((err) => {
        console.error("Failed to fetch logs:", err);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handlePurgeDeveloperLogs = async () => {
    setIsPurging(true);
    try {
      const res = await axios.delete("/api/track", {
        data: { purgeDeveloper: true },
      });
      setToast({
        type: "success",
        message: `Purged ${res.data.deletedCount ?? 0} internal developer visit records!`,
      });
      fetchLogs();
    } catch {
      setToast({ type: "error", message: "Failed to purge developer records." });
    } finally {
      setIsPurging(false);
    }
  };

  const handleDeleteIp = async (ipToDelete: string) => {
    if (!confirm(`Delete all analytics records from IP: ${ipToDelete}?`)) return;
    try {
      const res = await axios.delete("/api/track", {
        data: { ip: ipToDelete },
      });
      setToast({
        type: "success",
        message: `Removed ${res.data.deletedCount ?? 0} records for ${ipToDelete}`,
      });
      fetchLogs();
    } catch {
      setToast({ type: "error", message: "Failed to delete records." });
    }
  };

  // Filter logs by searchDate if selected
  const filteredLogs = searchDate
    ? logs.filter((log) => {
        const logDate = new Date(log.timestamp).toISOString().slice(0, 10);
        return logDate === searchDate;
      })
    : logs;

  // Pagination calculation for filtered logs
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const hasPrevious = currentPage > 1;
  const hasNext = endIndex < filteredLogs.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchDate]);

  return (
    <div>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={2000}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold">Website Analytics</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Real visitor impressions (Localhost, internal networks &amp; developer Linux IPs excluded).
          </p>
        </div>
        <button
          onClick={handlePurgeDeveloperLogs}
          disabled={isPurging}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow transition-colors disabled:opacity-50 self-start sm:self-auto"
        >
          {isPurging ? "Purging..." : "Purge Dev / Internal IPs"}
        </button>
      </div>

      {/* Date filter input */}
      <div className="mb-4 flex items-center flex-wrap gap-2">
        <label htmlFor="dateFilter" className="font-semibold text-sm">
          Filter by Date:
        </label>
        <input
          id="dateFilter"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-lg text-sm"
          max={new Date().toISOString().slice(0, 10)}
        />
        {searchDate && (
          <button
            onClick={() => setSearchDate("")}
            className="text-red-500 hover:text-red-600 text-sm font-semibold !bg-transparent !shadow-none border-0 underline"
          >
            Clear
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <p className="text-gray-500">No external visitor logs recorded yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700 shadow-md">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
              <tr>
                <th className="p-3">Page</th>
                <th className="p-3">IP</th>
                <th className="p-3">Device</th>
                <th className="p-3">Referrer</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {currentLogs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-3 font-medium">{log.page}</td>
                  <td className="p-3 text-xs font-mono">{log.ip}</td>
                  <td className="p-3 text-xs max-w-xs truncate" title={log.userAgent}>
                    {log.userAgent}
                  </td>
                  <td className="p-3 text-xs">{log.referer || "Direct"}</td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3 text-xs text-right">
                    <button
                      onClick={() => handleDeleteIp(log.ip)}
                      title={`Delete visits from ${log.ip}`}
                      className="px-2 py-1 text-[11px] font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-300 dark:border-red-800 rounded transition-colors !shadow-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!currentLogs.length && (
                <tr>
                  <td colSpan={6} className="text-center p-6 text-gray-500">
                    No logs for selected date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Buttons */}
      {filteredLogs.length > itemsPerPage && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            disabled={!hasPrevious}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={!hasNext}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
