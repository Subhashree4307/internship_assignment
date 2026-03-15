"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import LeaveBalanceSummary from "./LeaveBalanceSummary";
import LeaveApplicationForm from "./LeaveApplicationForm";
import LeaveRequestsTable from "./LeaveRequestsTable";
import LeaveCalendarPreview from "./LeaveCalendarPreview";

const EmployeeDashboard = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "apply";

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const title = useMemo(() => {
    switch (tab) {
      case "requests":
        return "My Leave Requests";
      case "calendar":
        return "Leave Calendar";
      default:
        return "Leave Application";
    }
  }, [tab]);

  const subtitle = useMemo(() => {
    switch (tab) {
      case "requests":
        return "Track the status and history of all your leave applications.";
      case "calendar":
        return "Visual overview of your upcoming and past leave days.";
      default:
        return "Submit a new leave request for approval.";
    }
  }, [tab]);

  const cardClasses = useMemo(() => {
    switch (tab) {
      case "requests":
        return "rounded-lg border border-blue-100 bg-blue-50/60 shadow-sm p-6";
      case "calendar":
        return "rounded-lg border border-emerald-100 bg-emerald-50/60 shadow-sm p-6";
      default:
        return "rounded-lg border border-purple-100 bg-purple-50/60 shadow-sm p-6";
    }
  }, [tab]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {user.first_name}.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="rounded-full bg-muted px-4 py-2 text-sm">
            Role: {user.role}
          </span>
          <span className="rounded-full bg-muted px-4 py-2 text-sm">
            Department: {user.department}
          </span>
        </div>
      </div>

      <LeaveBalanceSummary userId={user.id} />

      <div className={cardClasses}>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {tab === "apply" && <LeaveApplicationForm user={user} />}
        {tab === "requests" && <LeaveRequestsTable user={user} />}
        {tab === "calendar" && <LeaveCalendarPreview user={user} />}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
