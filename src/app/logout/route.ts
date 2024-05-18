import { NextResponse } from "next/server";
import { createClient } from "~/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = createClient();
  const signout = await supabase.auth.signOut();
  if (signout.error) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.redirect(new URL("/login", req.url));
}
