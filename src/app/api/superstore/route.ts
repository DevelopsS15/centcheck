import { NextResponse } from "next/server";
import axios from "axios";
import { headers } from "next/headers";
import { db } from "~/server/db";
import { Store, StoreLocation } from "@prisma/client";
import { env } from "~/env";

export const dynamic = "force-dynamic";
export async function GET() {
  if (env.NODE_ENV !== "development") {
    return NextResponse.json({ disabled: true });
  }
  const fetchSuperstore = await axios.post(
    "https://api.pcexpress.ca/pcx-bff/api/v1/products/search",
    {
      pagination: { from: 0, size: 100 },
      banner: "superstore",
      cartId: "c22dd690-9fe5-4886-a0e5-13078d19e1b0",
      lang: "en",
      date: "18052024",
      storeId: "1523",
      pcId: null,
      pickupType: "STORE",
      offerType: "ALL",
      term: "t",
      userData: {
        domainUserId: "239e9210-a5c0-416c-ae57-3c4fdc13b9e3",
        sessionId: "0bede00b-3452-413e-bcc0-5828797f304f",
      },
      filter: { categories: ["27985"] },
    },
    {
      headers: {
        "X-Apikey": "C1xujSegT5j3ap3yexJjqhOfELwGKYvz",
      },
    },
  );

  const superstore = await db.store.create({
    data: {
      name: "Real Canadian Superstore",
      imageId: "3cd3009c-30dd-4f63-978e-8edbe54c3d20.png",
    },
  });

  const storeLoc: Omit<StoreLocation, "id"> = {
    number: "45779",
    streetName: "Luckakuck Way",
    zipCode: "V2R 4E8",
    city: "Chilliwack",
    state: "British Columbia",
    country: "Canada",
    storeId: superstore.id,
  };

  const storeLocation = await db.storeLocation.create({
    data: storeLoc,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const productsFromStore = fetchSuperstore.data.results as {
    name: string;
    code: string;
    prices: { price: { value: number } };
    imageAssets: { mediumUrl: string }[];
    upcs: [string];
  }[];

  const allProducts = await db.product.createMany({
    data: productsFromStore
      .map((result) => ({
        name: result.name,
        price: result.prices.price.value,
        barcodeId: result.upcs[0],
        internalStoreId: result.code,
        storeLocationId: storeLocation.id,
        imageIds: [result.imageAssets[0]!.mediumUrl],
        startedTrackingAt: new Date(),
        lastCheckedAt: new Date(),
      }))
      .concat([
        {
          name: "Coca Cola",
          price: 3.21,
          barcodeId: "06731906",
          internalStoreId: "3242342342",
          storeLocationId: storeLocation.id,
          imageIds: ["320ab0bd-1bba-4f6e-99cb-3c741b34bd66.1b61e6dd5afa24ed92e6c36f98fb3ef6.webp"],
          startedTrackingAt: new Date(),
          lastCheckedAt: new Date(),
        },
        {
          name: "Crush Cream Soda",
          price: 2.5,
          barcodeId: "05654503",
          internalStoreId: "6456546",
          storeLocationId: storeLocation.id,
          imageIds: ["00056000005453.jpg"],
          startedTrackingAt: new Date(),
          lastCheckedAt: new Date(),
        },
      ]),
  });

  return NextResponse.json({
    data: fetchSuperstore.data as object[],
    total: allProducts,
  });
}
