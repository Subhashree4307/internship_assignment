import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("leave_types")
    .select("id, name, description, annual_entitlement, is_paid")
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If no leave types exist yet, seed some common ones so employees can submit requests
  if (Array.isArray(data) && data.length === 0) {
    const defaultTypes = [
      {
        name: "Sick Leave",
        description: "Leave for medical / health reasons.",
        annual_entitlement: 12,
        is_paid: true,
        requires_approval: true,
      },
      {
        name: "Casual Leave",
        description: "Short-term leave for personal reasons.",
        annual_entitlement: 10,
        is_paid: true,
        requires_approval: true,
      },
      {
        name: "Vacation",
        description: "Annual paid vacation leave.",
        annual_entitlement: 15,
        is_paid: true,
        requires_approval: true,
      },
    ];

    const { data: inserted, error: insertError } = await supabase
      .from("leave_types")
      .insert(defaultTypes)
      .select("id, name, description, annual_entitlement, is_paid");

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(inserted);
  }

  return NextResponse.json(data);
}
