"use client";
import { ProductPrice, StoreLocation, type Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import { Skeleton } from "~/components/ui/skeleton";
import { GetProductImage } from "~/utils/supabase/bucket";

export default function Page() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetch("/api/products")
      .then((data) => data.json())
      .then((data) => {
        console.log(`Success products`, data);
        setProducts(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoadingProducts(false);
      });
  }, []);

  const madeupStores: StoreLocation[] = [
    {
      id: "2222",
      number: "123",
      zipCode: "V2S7A9",
      city: "Abbotsford",
      state: "BC",
      country: "Canada",
      storeId: "999",
    },
    {
      id: "3333",
      number: "456",
      zipCode: "7A9V2S",
      city: "Chilliwack",
      state: "BC",
      country: "Canada",
      storeId: "777",
    },
  ];

  const madeupPricing: ProductPrice[] = [
    {
      id: "23",
      price: 22.55,
      checkedAt: new Date(),
      productId: "664856bbe6b3575a48f72891",
      storeLocationId: "2222",
    },
    {
      id: "234",
      price: 20,
      checkedAt: new Date(),
      productId: "664856bbe6b3575a48f72891",
      storeLocationId: "3333",
    },
  ];

  return (
    <div className="mx-auto w-11/12 max-w-screen-lg">
      <div>
        <input type="text" />
      </div>
      {!loadingProducts ? (
        <div>
          {products.map((product) => (
            <div
              className="grid grid-cols-2 gap-4 border-b border-slate-200 py-2 dark:border-slate-800"
              key={product.id}
            >
              <div>
                {product.imageIds.length > 0 ? (
                  <Carousel>
                    <CarouselContent>
                      {product.imageIds.map((imageId) => (
                        <CarouselItem key={imageId}>
                          <Image
                            src={GetProductImage(imageId)}
                            width={256}
                            height={256}
                            alt={`${product.name} image`}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious
                      style={{
                        marginLeft: 48,
                      }}
                    />
                    <CarouselNext
                      style={{
                        marginRight: 48,
                      }}
                    />
                  </Carousel>
                ) : (
                  <div>No image</div>
                )}
                <div>Debug: {product.id}</div>
                <div className="text-lg font-bold">{product.name}</div>
                <div>Barcode: {product.barcodeId}</div>
              </div>
              <div>
                <div className="max-h-64 overflow-auto">
                  {madeupPricing
                    .filter((pricing) => pricing.productId === product.id)
                    .sort(
                      (pricing1, pricing2) => pricing1.price - pricing2.price,
                    )
                    .map((pricing) => (
                      <div
                        className="flex border-b border-slate-300 py-2"
                        key={pricing.id}
                      >
                        <Image
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnr5myw4oQutT2y93TAh2L0yRyN6MTliJms8eoGNb5w&s"
                          width={24}
                          height={24}
                          alt="Store logo"
                        />
                        <div className="flex-1 text-right">
                          ${pricing.price}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-2">
                  <button className="mb-2 me-2 rounded-lg bg-green-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1">
          {Array(8)
            .fill(undefined)
            .map((a, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-1">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-4 w-9/12" />
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {Array(4)
                    .fill(undefined)
                    .map((a, index2) => (
                      <Skeleton className="h-12 w-full" key={index2} />
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
