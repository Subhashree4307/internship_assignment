import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const managerId = searchParams.get("managerId");

    const query = supabase
      .from("leave_requests")
      .select(
        `
        id,
        user_id,
        manager_id,
        leave_type:leave_types(name),
        start_date,
        end_date,
        duration_days,
        status,
        priority,
        created_at,
        manager_id
      `
      )
      .order("created_at", { ascending: false });

    if (userId) {
      query.eq("user_id", userId);
    }

    if (managerId) {
      query.eq("manager_id", managerId);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      user_id,
      leave_type_id,
      start_date,
      end_date,
      duration_days,
      manager_id,
      priority,
      reason,
    } = await request.json();

    const { error } = await supabase.from("leave_requests").insert({
      user_id,
      leave_type_id,
      start_date,
      end_date,
      duration_days,
      manager_id,
      priority,
      reason,
      status: "PENDING",
      requested_date: new Date().toISOString().slice(0, 10),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Leave request created." });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    const { error } = await supabase
      .from("leave_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Leave request updated." });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
