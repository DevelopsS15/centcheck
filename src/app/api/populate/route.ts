import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  await db.productPrice.deleteMany();
  await db.product.deleteMany();
  await db.storeLocation.deleteMany();
  await db.store.deleteMany();
  const stores = await db.store.create({
    data: {
      name: "FreshCo",
    },
  });

  const storesSaleOnFoods = await db.store.create({
    data: {
      name: "Sale On Foods",
    },
  });

  const cocacola = await db.product.create({
    data: {
      name: "Coca Cola",
      barcodeId: "123456",
      trackedAt: new Date(),
      imageIds: [
        "320ab0bd-1bba-4f6e-99cb-3c741b34bd66.1b61e6dd5afa24ed92e6c36f98fb3ef6.webp",
      ],
    },
  });

  const cheeto = await db.product.create({
    data: {
      name: "Cheetos",
      barcodeId: "73434",
      trackedAt: new Date(),
    },
  });

  const storeLocations = await db.storeLocation.create({
    data: {
      number: "1234",
      zipCode: "12345",
      city: "Abbotsford",
      state: "British Columbia",
      country: "Canada",
      storeId: stores.id,
    },
  });

  const productPrices = await db.productPrice.createMany({
    data: [
      {
        price: 10.22,
        checkedAt: new Date(),
        productId: cocacola.id,
        storeLocationId: storeLocations.id,
      },
      {
        price: 25.12,
        checkedAt: new Date(),
        productId: cheeto.id,
        storeLocationId: storeLocations.id,
      },
    ],
  });
  return NextResponse.json({ ok: true });
}
