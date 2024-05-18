import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  await db.product.deleteMany();
  await db.storeLocation.deleteMany();
  await db.store.deleteMany();
  return NextResponse.json({});
}
