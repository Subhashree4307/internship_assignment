"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import CustomForm, { FormFieldType } from "@/components/form/CustomForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type LeaveFormValues = {
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: Date | null;
  endDate: Date | null;
  duration: number;
  managerId: string;
  priority: "NORMAL" | "URGENT";
  reason: string;
};

interface Props {
  user: any;
}

const LeaveApplicationForm: React.FC<Props> = ({ user }) => {
  const [leaveTypes, setLeaveTypes] = useState<{ id: number; name: string }[]>([]);
  const [managers, setManagers] = useState<{ id: string; first_name: string; last_name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const STORAGE_KEY = `leave-form-${user.id}`;

  const form = useForm<LeaveFormValues>({
    defaultValues: {
      employeeName: `${user.first_name} ${user.last_name}`,
      department: user.department,
      leaveType: "",
      startDate: null,
      endDate: null,
      duration: 0,
      managerId: "",
      priority: "NORMAL",
      reason: "",
    },
  });

  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  const duration = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  useEffect(() => {
    form.setValue("duration", duration);
  }, [duration, form]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<LeaveFormValues> & {
        startDate?: string | null;
        endDate?: string | null;
      };

      form.reset({
        employeeName: `${user.first_name} ${user.last_name}`,
        department: user.department,
        leaveType: parsed.leaveType ?? "",
        startDate: parsed.startDate ? new Date(parsed.startDate) : null,
        endDate: parsed.endDate ? new Date(parsed.endDate) : null,
        duration: parsed.duration ?? 0,
        managerId: parsed.managerId ?? "",
        priority: parsed.priority ?? "NORMAL",
        reason: parsed.reason ?? "",
      });
    } catch {
      // ignore invalid stored data
    }
  }, [form, STORAGE_KEY, user.first_name, user.last_name, user.department]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const subscription = form.watch((value) => {
      const { startDate: s, endDate: e, ...rest } = value;
      const toStore = {
        ...rest,
        startDate: s ? s.toISOString() : null,
        endDate: e ? e.toISOString() : null,
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch {
        // ignore storage errors
      }
    });

    return () => subscription.unsubscribe();
  }, [form, STORAGE_KEY]);

  const defaultLeaveTypes = [
    { id: 1, name: "Sick Leave" },
    { id: 2, name: "Casual Leave" },
    { id: 3, name: "Vacation" },
    { id: 4, name: "Maternity/Paternity" },
    { id: 5, name: "Bereavement" },
  ];

  useEffect(() => {
    const load = async () => {
      const [typesRes, mgrRes] = await Promise.all([
        fetch("/api/leave-types"),
        fetch("/api/managers"),
      ]);

      if (typesRes.ok) {
        const data = await typesRes.json();
        setLeaveTypes(data && data.length ? data : defaultLeaveTypes);
      } else {
        setLeaveTypes(defaultLeaveTypes);
      }

      if (mgrRes.ok) {
        const data = await mgrRes.json();
        setManagers(data);
      }
    };
    load();
  }, []);

  const onSubmit: SubmitHandler<LeaveFormValues> = async (values) => {
    setSubmitting(true);
    setMessage(null);

    const payload = {
      user_id: user.id,
      leave_type_id: Number(values.leaveType),
      start_date: values.startDate?.toISOString().slice(0, 10),
      end_date: values.endDate?.toISOString().slice(0, 10),
      duration_days: values.duration,
      manager_id: values.managerId && values.managerId !== "__no_manager__" ? values.managerId : null,
      priority: values.priority,
      reason: values.reason,
    };

    const response = await fetch("/api/leave-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setMessage("Leave request submitted successfully.");
      try {
        if (typeof window !== "undefined") {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // ignore storage errors
      }
      form.reset({
        ...form.getValues(),
        leaveType: "",
        startDate: null,
        endDate: null,
        duration: 0,
        managerId: "",
        priority: "NORMAL",
        reason: "",
      });
    } else {
      const error = await response.json();
      setMessage(error.error || "Failed to submit leave request.");
    }

    setSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <CustomForm
            control={form.control}
            name="employeeName"
            label="Employee Name"
            fieldType={FormFieldType.INPUT}
            disabled
          />
          <CustomForm
            control={form.control}
            name="department"
            label="Department"
            fieldType={FormFieldType.INPUT}
            disabled
          />
        </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CustomForm
          control={form.control}
          name="leaveType"
          label="Leave Type"
          fieldType={FormFieldType.SELECT}
          placeholder="Select a leave type"
          selectOptions={leaveTypes.map((type) => ({
            value: String(type.id),
            label: type.name,
          }))}
        />
        <CustomForm
          control={form.control}
          name="managerId"
          label="Manager"
          fieldType={FormFieldType.SELECT}
          placeholder="Select a manager"
          selectOptions={
            managers.length
              ? managers.map((mgr) => ({
                  value: mgr.id,
                  label: `${mgr.first_name} ${mgr.last_name}`,
                }))
              : [{ value: "__no_manager__", label: "No manager available" }]
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <CustomForm
          control={form.control}
          name="startDate"
          label="Start Date"
          fieldType={FormFieldType.DATE_PICKER}
        />
        <CustomForm
          control={form.control}
          name="endDate"
          label="End Date"
          fieldType={FormFieldType.DATE_PICKER}
        />
        <CustomForm
          control={form.control}
          name="duration"
          label="Duration (days)"
          fieldType={FormFieldType.INPUT}
          disabled
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CustomForm
          control={form.control}
          name="priority"
          label="Priority"
          fieldType={FormFieldType.RADIOGROUP}
          selectOptions={[
            { value: "NORMAL", label: "Normal" },
            { value: "URGENT", label: "Urgent" },
          ]}
        />
      </div>

      <CustomForm
        control={form.control}
        name="reason"
        label="Reason"
        fieldType={FormFieldType.TEXTAREA}
        placeholder="Describe reason for leave"
      />

      {message && <p className="text-sm text-muted-foreground">{message}</p>}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Submitting…" : "Submit Leave Request"}
      </Button>
    </form>
  </Form>
  );
};

export default LeaveApplicationForm;
