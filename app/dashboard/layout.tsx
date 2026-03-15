"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const employeeTabs = [
  { key: "apply", label: "Leave Application" },
  { key: "requests", label: "View All Applications" },
  { key: "calendar", label: "Leave Calendar" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const [role, setRole] = useState<"employee" | "manager" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      setRole(null);
      return;
    }
    try {
      const user = JSON.parse(stored) as { role?: string };
      setRole(user.role === "manager" ? "manager" : "employee");
    } catch {
      setRole("employee");
    }
  }, []);

  const isManager = role === "manager";

  const managerTabs = [
    { key: "pending", label: "Pending Approvals" },
    { key: "history", label: "View All Applications" },
    { key: "calendar", label: "Leave Calendar" },
  ] as const;

  const tabs = isManager ? managerTabs : employeeTabs;
  const defaultTab = isManager ? tabs[0].key : "apply";

  const activeTab = params.get("tab") || (defaultTab as string);

  const items = useMemo(() => {
    return tabs.map((tab) => {
      const href = `/dashboard?tab=${tab.key}`;
      const active = activeTab === tab.key;
      return (
        <Link
          key={tab.key}
          href={href}
          className={`block rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/70 ${
            active ? "bg-muted text-foreground" : "text-foreground/80"
          }`}
        >
          {tab.label}
        </Link>
      );
    });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 lg:flex-row lg:items-start">
        <aside className="w-full max-w-sm shrink-0 rounded-xl border bg-white p-6 shadow-sm lg:h-[calc(100vh-80px)] lg:sticky lg:top-10">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <div className="mt-4 space-y-2">{items}</div>
        </aside>

        <main className="w-full rounded-xl bg-white p-6 shadow-sm">{children}</main>
      </div>
    </div>
  );
}
