"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Request = {
  id: string;
  user_id: string;
  manager_id: string | null;
  leave_type: {
    name: string;
  };
  start_date: string;
  end_date: string;
  duration_days: number;
  status: string;
  priority: string;
  created_at: string;
};

type UserSummary = {
  id: string;
  first_name: string;
  last_name: string;
};

interface Props {
  managerId: string;
  onlyPending?: boolean;
  excludePending?: boolean;
}

const statusColor: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const ManagerLeaveRequestsTable: React.FC<Props> = ({
  managerId,
  onlyPending = false,
  excludePending = false,
}) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Record<string, UserSummary>>({});

  const load = async () => {
    setLoading(true);
    const res = await fetch(`/api/leave-requests?managerId=${managerId}`);
    const data: Request[] = await res.json();
    if (res.ok) {
      setRequests(data);

      const employeeIds = Array.from(new Set(data.map((r) => r.user_id).filter(Boolean)));
      if (employeeIds.length) {
        const usersRes = await fetch(`/api/users?ids=${employeeIds.join(",")}`);
        const usersData: UserSummary[] = await usersRes.json();
        if (usersRes.ok && Array.isArray(usersData)) {
          const map: Record<string, UserSummary> = {};
          usersData.forEach((u) => {
            map[u.id] = u;
          });
          setEmployees(map);
        }
      } else {
        setEmployees({});
      }
    } else {
      setRequests([]);
      setEmployees({});
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!managerId) return;
    load();
  }, [managerId]);

  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    const res = await fetch(`/api/leave-requests`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      await load();
    }
    setActionLoading(null);
  };

  const visibleRequests = onlyPending
    ? requests.filter((r) => r.status === "PENDING")
    : excludePending
    ? requests.filter((r) => r.status !== "PENDING")
    : requests;

  if (loading) {
    return <div>Loading assigned leave requests…</div>;
  }

  if (!visibleRequests.length) {
    return (
      <div>
        {onlyPending
          ? "No pending leave requests assigned to you at the moment."
          : excludePending
          ? "No approved or rejected leave requests assigned to you yet."
          : "No leave requests assigned to you yet."}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left text-sm font-semibold text-muted-foreground">
            <th className="px-3 py-2">Employee</th>
            <th className="px-3 py-2">Leave Type</th>
            <th className="px-3 py-2">Date Range</th>
            <th className="px-3 py-2">Duration</th>
            <th className="px-3 py-2">Priority</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleRequests.map((req) => (
            <tr key={req.id} className="border-t">
              <td className="px-3 py-2">
                {employees[req.user_id]
                  ? `${employees[req.user_id].first_name} ${employees[req.user_id].last_name}`
                  : req.user_id}
              </td>
              <td className="px-3 py-2">{req.leave_type.name}</td>
              <td className="px-3 py-2">
                {req.start_date} → {req.end_date}
              </td>
              <td className="px-3 py-2">{req.duration_days}</td>
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
              <td className="px-3 py-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={req.status !== "PENDING" || actionLoading === req.id}
                    onClick={() => updateStatus(req.id, "APPROVED")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={req.status !== "PENDING" || actionLoading === req.id}
                    onClick={() => updateStatus(req.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerLeaveRequestsTable;
