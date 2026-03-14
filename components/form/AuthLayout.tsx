"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AuthLayoutBase from "@/components/AuthLayout";

import RegisterForm from "./Register/RegisterForm";
import LoginForm from "./Login/LoginForm";
import { div } from "framer-motion/client";

type AuthMode = "register" | "login";

const AuthLayout: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("register");

  const reverse = authMode === "login";

  const textContent =
    authMode === "register" ? (
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-muted-foreground">
          Get started in just two quick steps. Your details are saved as you
          move between steps.
        </p>
      </div>
    ) : (
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Log in to access your dashboard and continue where you left off.
        </p>
      </div>
    );

  return (
    <AuthLayoutBase reverse={reverse} text={textContent}>
      <AnimatePresence mode="wait">
        {authMode === "register" ? (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reverse ? -20 : 20 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center"
          >
            <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reverse ? 20 : -20 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center"
          >
            <LoginForm onSwitchToRegister={() => setAuthMode("register")} />
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayoutBase>
  );
};

export default AuthLayout;