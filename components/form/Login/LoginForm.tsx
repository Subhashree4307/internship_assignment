"use client";

import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import CustomForm, { FormFieldType } from "../CustomForm";
import { supabase } from "@/lib/supabaseClient";

type LoginFormValues = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [defaultEmail, setDefaultEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem('loginEmail');
    if (email) {
      setDefaultEmail(email);
    }
  }, []);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: defaultEmail,
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const { user } = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("loginEmail", values.email);
        window.location.href = "/dashboard";
      } else {
        const error = await response.json();
        alert(error.error || "Login failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        <div className="space-y-4">
          <CustomForm
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            fieldType={FormFieldType.INPUT}
          />

          <CustomForm
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            fieldType={FormFieldType.PASSWORD}
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;