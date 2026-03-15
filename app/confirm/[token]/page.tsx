"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ConfirmPage = () => {
  const { token } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await fetch(`/api/confirm/${token}`, {
          method: "POST",
        });
        if (response.ok) {
          setStatus("success");
          setMessage("Your account has been confirmed! You can now log in.");
        } else {
          setStatus("error");
          setMessage("Confirmation failed. The link may be invalid or expired.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred. Please try again.");
      }
    };

    if (token) {
      confirmAccount();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {status === "loading" && <p>Confirming your account...</p>}
        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Account Confirmed!</h1>
            <p className="text-gray-700 mb-6">{message}</p>
            <Button onClick={() => router.push("/register")} className="w-full">
              Go to Login
            </Button>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Confirmation Failed</h1>
            <p className="text-gray-700 mb-6">{message}</p>
            <Button onClick={() => router.push("/register")} className="w-full">
              Back to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmPage;