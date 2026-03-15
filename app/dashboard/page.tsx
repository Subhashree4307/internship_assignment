"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/register");
      return;
    }

    const user = JSON.parse(stored);
    setRole(user.role);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return role === "manager" ? <ManagerDashboard /> : <EmployeeDashboard />;
};

export default Dashboard;
