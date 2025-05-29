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

  useEffect(() => {
    axios
      .get("/api/track") // ← Your endpoint to fetch logs
      .then((res) => setLogs(res.data.logs))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Website Analytics</h2>
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
            {logs.map((log, i) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
