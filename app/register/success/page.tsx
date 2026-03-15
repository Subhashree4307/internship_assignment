"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SuccessPage = () => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    // For demo, assume confirm
    // In real, this would be done via email link
    try {
      const email = localStorage.getItem("pendingEmail");
      if (!email) {
        alert("No pending registration found.");
        return;
      }

      const response = await fetch("/api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setConfirmed(true);
        localStorage.removeItem("pendingEmail");
      } else {
        alert("Confirmation failed.");
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h1>
        {!confirmed ? (
          <>
            <p className="text-gray-700 mb-6">
              A confirmation email has been sent to your email address. Please click on the confirmation link in the email to activate your account and then log in again.
            </p>
            <p className="text-sm text-gray-500 mb-4">For demo purposes:</p>
            <Button onClick={handleConfirm} className="w-full mb-4">
              Confirm Account (Demo)
            </Button>
          </>
        ) : (
          <p className="text-gray-700 mb-6">
            Your account has been confirmed! You can now log in.
          </p>
        )}
        <Link href="/register">
          <Button className="w-full">Go to Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;