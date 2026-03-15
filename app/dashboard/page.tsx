"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        router.push("/register");
        return;
      }
      setRole(user.role);
    };

    checkAuth();
  }, [router]);

  if (!role) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          {role === "manager" ? "Manager Dashboard" : "Employee Dashboard"}
        </h1>
        <p className="text-gray-700">
          Welcome to your dashboard. This is a placeholder for the {role} dashboard.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;