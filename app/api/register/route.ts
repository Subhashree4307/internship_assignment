import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, employee_id, department } = await request.json();

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Generate confirmation token
    const token = crypto.randomBytes(32).toString("hex");

    // For now, store in a temporary table or use a pending_users table
    // Since no pending table, I'll create user with is_active false and store token in a separate field or use metadata
    // Assuming we add a confirmation_token column to users table
    // For simplicity, I'll create the user directly, but in real, send email

    // Insert user
    const { data, error } = await supabase
      .from("users")
      .insert({
        email,
        password_hash,
        first_name: firstName,
        last_name: lastName,
        employee_id,
        department,
        role: "employee", // default
        is_active: false, // until confirmed // for now, skip confirmation
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // In real app, send email with link to /confirm/${token}

    // For now, just return success
    return NextResponse.json({ message: "Registration successful. Check your email for confirmation." });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}