"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h1>
        <p className="text-gray-700 mb-6">
          Login again to visit your dashboard.
        </p>
        <Link href="/register">
          <Button className="w-full">Go to Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;