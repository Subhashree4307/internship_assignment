"use client";

import React, { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Request = {
  start_date: string;
  end_date: string;
  status: string;
};

interface Props {
  managerId: string;
}

const ManagerLeaveCalendar: React.FC<Props> = ({ managerId }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(`/api/leave-requests?managerId=${managerId}`);
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
      }
      setLoading(false);
    };

    if (managerId) {
      load();
    }
  }, [managerId]);

  const leaveCountsByDate = useMemo(() => {
    const counts: Record<string, number> = {};

    requests
      .filter((r) => r.status === "APPROVED")
      .forEach((req) => {
        const start = new Date(req.start_date);
        const end = new Date(req.end_date);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const key = d.toISOString().slice(0, 10);
          counts[key] = (counts[key] || 0) + 1;
        }
      });

    return counts;
  }, [requests]);

  if (loading) {
    return <div>Loading team calendar…</div>;
  }

  if (!requests.length) {
    return <div>No leave requests assigned to you yet.</div>;
  }

  return (
    <div className="space-y-4">
      <Calendar
        tileClassName={({ date }) => {
          const key = date.toISOString().slice(0, 10);
          const count = leaveCountsByDate[key] || 0;

          if (count === 0) return "";
          if (count === 1) return "bg-red-100 text-red-900 rounded-full";
          if (count === 2 || count === 3)
            return "bg-red-300 text-red-900 rounded-full";
          return "bg-red-500 text-white rounded-full";
        }}
      />
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">
          Tile color intensity shows how many of your employees are on{" "}
          <span className="font-semibold">approved</span> leave on that day.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full bg-red-100 border border-red-200" />
            <span>1 employee on leave (light red)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full bg-red-300 border border-red-400" />
            <span>2–3 employees on leave (medium red)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full bg-red-500 border border-red-600" />
            <span>4+ employees on leave (dark red)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerLeaveCalendar;

