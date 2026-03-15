import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json([], { status: 200 });
    }

    const ids = idsParam.split(",").map((id) => id.trim()).filter(Boolean);

    if (!ids.length) {
      return NextResponse.json([], { status: 200 });
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, first_name, last_name")
      .in("id", ids);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

