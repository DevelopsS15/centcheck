import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const storeLocationsSchema = z.object({
  ids: z.array(z.string()).min(1).max(20),
});

export async function POST(req: Request) {
  const body = (await req.json()) as {
    ids: string[];
  };
  const parsedBody = storeLocationsSchema.parse(body);

  const storeLocations =
    parsedBody.ids.length > 0
      ? await db.storeLocation.findMany({
          where: {
            id: {
              in: parsedBody.ids,
            },
          },
        })
      : [];

  return NextResponse.json({
    data: storeLocations,
    success: true,
  });
}
