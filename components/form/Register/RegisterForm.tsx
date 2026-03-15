"use client";

import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomForm, { FormFieldType } from "../CustomForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";



const registerSchema = z.object({
  // Step 1
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
    employee_id: z.string().regex(/^[A-Z0-9]{8}$/, "Employee ID must be 8 characters and contain only uppercase letters and numbers."),
    department: z.string().min(1, "Department is required"),


 
  
 
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [defaultValues, setDefaultValues] = useState<Partial<RegisterFormValues>>({});

  useEffect(() => {
    const data = localStorage.getItem('registerFormData');
    if (data) {
      const parsed = JSON.parse(data);
      // Parse date if exists
      if (parsed.fiscalYearStart) {
        parsed.fiscalYearStart = new Date(parsed.fiscalYearStart);
      }
      setDefaultValues(parsed);
    }
  }, []);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      employee_id: "",
      department: "",
      
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    localStorage.setItem('registerFormData', JSON.stringify(watchedValues));
  }, [watchedValues]);

  useEffect(() => {
    if (Object.keys(defaultValues).length > 0) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);


  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          employee_id: values.employee_id,
          department: values.department,
        }),
      });

      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem('registerFormData');
        localStorage.setItem('pendingEmail', values.email);
        // Redirect to success page
        window.location.href = "/register/success";
      } else {
        const error = await response.json();
        alert(error.error || "Registration failed");
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
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            fieldType={FormFieldType.INPUT}
          />

          <CustomForm
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            fieldType={FormFieldType.INPUT}
          />

          <CustomForm
            control={form.control}
            name="employee_id"
            label="Employee ID"
            placeholder="Enter your employee ID"
            fieldType={FormFieldType.INPUT}
          />

          <CustomForm
            control={form.control}
            name="department"
            label="Department"
            placeholder="Enter your department"
            fieldType={FormFieldType.INPUT}
          />

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
          Register
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </Form>
  );
};



export default RegisterForm;