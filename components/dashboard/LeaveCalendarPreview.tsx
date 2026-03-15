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
  user: any;
}

const LeaveCalendarPreview: React.FC<Props> = ({ user }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(`/api/leave-requests?userId=${user.id}`);
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
      }
      setLoading(false);
    };

    if (user?.id) {
      load();
    }
  }, [user]);

  const leaveDates = useMemo(() => {
    const dates: string[] = [];
    requests
      .filter((r) => r.status === "APPROVED")
      .forEach((req) => {
        const start = new Date(req.start_date);
        const end = new Date(req.end_date);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.push(d.toISOString().slice(0, 10));
        }
      });
    return new Set(dates);
  }, [requests]);

  if (loading) {
    return <div>Loading calendar…</div>;
  }

  if (!requests.length) {
    return <div>No leaves scheduled.</div>;
  }

  return (
    <div className="space-y-4">
      <Calendar
        tileClassName={({ date }) => {
          const key = date.toISOString().slice(0, 10);
          if (leaveDates.has(key)) {
            return "bg-secondary/20 rounded";
          }
          return "";
        }}
      />
      <div className="text-sm text-muted-foreground">
        <p>
          Highlighted dates are days you are on <span className="font-semibold">approved</span> leave. Click on "View All Applications" to see current status.
        </p>
      </div>
    </div>
  );
};

export default LeaveCalendarPreview;
