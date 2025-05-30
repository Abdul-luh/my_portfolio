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
      <div className="mb-4">
        <label htmlFor="dateFilter" className="mr-2 font-semibold">
          Filter by Date:
        </label>
        <input
          id="dateFilter"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border p-1 rounded"
          max={new Date().toISOString().slice(0, 10)} // disallow future dates
        />
        {searchDate && (
          <button
            onClick={() => setSearchDate("")}
            className="ml-2 text-red-600 underline"
          >
            Clear
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Page</th>
              <th className="p-2">IP</th>
              <th className="p-2">Device</th>
              <th className="p-2">Referrer</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{log.page}</td>
                <td className="p-2">{log.ip}</td>
                <td className="p-2">{log.userAgent}</td>
                <td className="p-2">{log.referer}</td>
                <td className="p-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
            {!currentLogs.length && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
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
