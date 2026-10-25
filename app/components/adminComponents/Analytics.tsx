"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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
  const itemsPerPage = 20;

  useEffect(() => {
    axios
      .get("/api/track")
      .then((res) => {
        setLogs(res.data.visits);
      })
      .catch(console.error);
  }, []);

  // Filter logs by searchDate if selected
  const filteredLogs = searchDate
    ? logs.filter((log) => {
        // Extract date part from timestamp (yyyy-mm-dd)
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

  // Reset to first page on searchDate change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchDate]);

  if (!logs || logs.length === 0) {
    return <p className="text-center text-gray-500">No logs available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Website Analytics</h2>

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
          max={new Date().toISOString().slice(0, 10)} // disallow future dates
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

      <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700 shadow-md">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
            <tr>
              <th className="p-3">Page</th>
              <th className="p-3">IP</th>
              <th className="p-3">Device</th>
              <th className="p-3">Referrer</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {currentLogs.map((log, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="p-3 font-medium">{log.page}</td>
                <td className="p-3 text-xs">{log.ip}</td>
                <td className="p-3 text-xs max-w-xs truncate" title={log.userAgent}>{log.userAgent}</td>
                <td className="p-3 text-xs">{log.referer || "Direct"}</td>
                <td className="p-3 text-xs whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
            {!currentLogs.length && (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No logs for selected date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
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
    </div>
  );
}
