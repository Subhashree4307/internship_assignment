"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ManagerLeaveRequestsTable from "./ManagerLeaveRequestsTable";
import ManagerLeaveCalendar from "./ManagerLeaveCalendar";

const ManagerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "pending";

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const title = useMemo(() => {
    switch (tab) {
      case "history":
        return "All assigned leave applications";
      case "calendar":
        return "Team leave calendar";
      default:
        return "Pending approvals";
    }
  }, [tab]);

  const subtitle = useMemo(() => {
    switch (tab) {
      case "history":
        return "View every leave request that has ever been assigned to you, including approved and rejected ones.";
      case "calendar":
        return "Large calendar view showing when your team members are on approved leave, with intensity based on how many are off.";
      default:
        return "Review, approve, or reject leave requests that are still awaiting your decision.";
    }
  }, [tab]);

  const cardClasses = useMemo(() => {
    switch (tab) {
      case "history":
        return "rounded-lg border border-blue-100 bg-blue-50/70 shadow-sm p-6";
      case "calendar":
        return "rounded-lg border border-emerald-100 bg-emerald-50/70 shadow-sm p-6";
      default:
        return "rounded-lg border border-amber-100 bg-amber-50/70 shadow-sm p-6";
    }
  }, [tab]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Manager Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user.first_name}. Use the tabs to switch between pending approvals, history, and calendar view.
        </p>
      </div>

      <div className={cardClasses}>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>

        {tab === "pending" && (
          <ManagerLeaveRequestsTable managerId={user.id} onlyPending />
        )}
        {tab === "history" && (
          <ManagerLeaveRequestsTable managerId={user.id} excludePending />
        )}
        {tab === "calendar" && <ManagerLeaveCalendar managerId={user.id} />}
      </div>
    </div>
  );
};

export default ManagerDashboard;
