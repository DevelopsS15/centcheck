import { NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";
export async function GET() {
  if (env.NODE_ENV !== "development") {
    return NextResponse.json({ disabled: true });
  }
  await db.product.deleteMany();
  await db.storeLocation.deleteMany();
  await db.store.deleteMany();
  return NextResponse.json({});
}
