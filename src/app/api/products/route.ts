import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");
  const barcodeId = searchParams.get("barcodeId");
  let query = {};
  if (typeof barcodeId === `string`) {
    query = {
      where: {
        barcodeId,
      },
    };
  } else if (typeof name === `string` && name.length > 2) {
    query = {
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    };
  }

  const products = await db.product.findMany(
    Object.keys(query).length > 0 ? query : undefined,
  );

  return NextResponse.json({
    data: products,
    success: true,
  });
}
