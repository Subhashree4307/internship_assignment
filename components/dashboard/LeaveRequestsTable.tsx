"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";

type Request = {
  id: string;
  leave_type: {
    name: string;
  };
  start_date: string;
  end_date: string;
  duration_days: number;
  status: string;
  priority: string;
  manager: {
    first_name: string;
    last_name: string;
  } | null;
  created_at: string;
};

interface Props {
  user: any;
}

const statusColor: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const LeaveRequestsTable: React.FC<Props> = ({ user }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const[error,setError]= useState<string| null>(null)


  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null)
      try {
        const res = await fetch(`/api/leave-requests?userId=${user.id}`);
        const data = await res.json();
        console.log("LeaveRequestsTable data", { ok: res.ok, data });
        if (!res.ok) {
          setError(data?.error || "Failed to load leave requests.");
          setRequests([]);
        } else {
          setRequests(data);
        }
      } catch (e) {
        console.error("LeaveRequestsTable fetch error", e);
        setError("Failed to load leave requests.");
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };


    if (user?.id) {
      load();
    }
  }, [user]);

  if (loading) {
    return <div>Loading requests…</div>;
  }

  if (!requests.length) {
    return <div>No leave requests found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left text-sm font-semibold text-muted-foreground">
            <th className="px-3 py-2">Leave Type</th>
            <th className="px-3 py-2">Date Range</th>
            <th className="px-3 py-2">Duration</th>
            <th className="px-3 py-2">Manager</th>
            <th className="px-3 py-2">Priority</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-t">
              <td className="px-3 py-2">{req.leave_type.name}</td>
              <td className="px-3 py-2">
                {req.start_date} → {req.end_date}
              </td>
              <td className="px-3 py-2">{req.duration_days}</td>
              <td className="px-3 py-2">
                {req.manager ? `${req.manager.first_name} ${req.manager.last_name}` : "-"}
              </td>
              <td className="px-3 py-2">{req.priority}</td>
              <td className="px-3 py-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    statusColor[req.status] ?? "bg-gray-100 text-gray-800"
                  }`}
                >
                  {req.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestsTable;
