import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  const products = await db.product.findMany();

  return NextResponse.json({
    data: products,
    success: true,
  });
}
