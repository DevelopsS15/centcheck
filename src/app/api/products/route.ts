import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");

  const products = await db.product.findMany(
    typeof name === `string` && name.length > 2
      ? {
          where: {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },
        }
      : undefined,
  );

  return NextResponse.json({
    data: products,
    success: true,
  });
}
