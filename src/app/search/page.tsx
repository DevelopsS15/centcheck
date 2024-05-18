"use client";
import { type Product } from "@prisma/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import { Skeleton } from "~/components/ui/skeleton";
import { GetProductImageURL } from "~/utils/supabase/bucket";

export default function Page() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = React.useState<boolean>(true);

  const searchParams = useSearchParams();
  const searchName = searchParams.get("name");
  const searchBarcodeId = searchParams.get("barcodeId");

  React.useEffect(() => {
    setLoadingProducts(true);
    fetch(
      "/api/products" +
        (searchBarcodeId
          ? `?barcodeId=${searchBarcodeId}`
          : searchName
            ? `?name=${encodeURIComponent(searchName)}`
            : ""),
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(`Success products`, data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setProducts(data.data as Product[]);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoadingProducts(false);
      });
  }, [searchName, searchBarcodeId]);

  return (
    <div className="mx-auto w-11/12 max-w-screen-md">
      <div>
        <input type="text" />
      </div>
      {!loadingProducts ? (
        <div>
          {products.length === 0 ? (
            <div>Sorry, this product has not been checked yet.</div>
          ) : (
            products.map((product) => (
              <div
                className="grid grid-cols-1 gap-4 border-b border-slate-200 py-2 md:grid-cols-2 dark:border-slate-800"
                key={product.id}
              >
                <div>
                  {product.imageIds.length > 0 ? (
                    <Carousel>
                      <CarouselContent>
                        {product.imageIds.map((imageId) => (
                          <CarouselItem key={imageId}>
                            <Image
                              className="mx-auto"
                              src={
                                imageId.startsWith("https://")
                                  ? imageId
                                  : GetProductImageURL(imageId)
                              }
                              width={256}
                              height={256}
                              alt={`${product.name} image`}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {product.imageIds.length > 1 && (
                        <>
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
                        </>
                      )}
                    </Carousel>
                  ) : (
                    <div className="flex size-32 items-center justify-center bg-slate-400">
                      No image
                    </div>
                  )}
                  <div className="text-lg font-bold" data-debug-id={product.id}>
                    {product.name}
                  </div>
                  <div>
                    <Image
                      src={`https://barcode.tec-it.com/barcode.ashx?data=${product.barcodeId}&code=Code128&translate-esc=on`}
                      width={128}
                      height={48}
                      alt={`Barcode ${product.barcodeId}`}
                    />
                    {product.barcodeId}
                  </div>
                </div>
                <ProductPricingDisplay
                  productId={product.id}
                  price={product.price}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1">
          {Array(8)
            .fill(undefined)
            .map((a, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div className="grid grid-cols-1 gap-1">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-4 w-9/12" />
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {Array(4)
                    .fill(undefined)
                    .map((a, index2) => (
                      <Skeleton className="h-4 w-full" key={index2} />
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function ProductPricingDisplay({
  productId,
  price,
}: {
  productId: string;
  price: number;
}) {
  //   const pricingOptionsForProduct = React.useMemo(
  //     () =>
  //       pricingOptions
  //         .filter((pricing) => pricing.productId === productId)
  //         .sort((pricing1, pricing2) => pricing1.price - pricing2.price),
  //     [pricingOptions, productId],
  //   );

  const productPrices = [
    {
      id: productId,
      price: price,
    },
  ];
  if (productId === "6648bd84248c51a4b5a0eaa8") {
    productPrices.push({
      id: "43534503535",
      price: 4.51,
    });
  } else if (productId === "6648bd84248c51a4b5a0eb02") {
    productPrices.push({
      id: "4535353",
      price: 3.1,
    });
  }

  return (
    <div>
      <div className="max-h-64 overflow-auto">
        {productPrices.map((pricing, index) => (
          <div className="flex border-b border-slate-300 py-2" key={pricing.id}>
            <Image
              src={
                index === 0
                  ? "https://ptcbwcoovdzlkuettdbm.supabase.co/storage/v1/object/public/StoreLogos/3cd3009c-30dd-4f63-978e-8edbe54c3d20.png?t=2024-05-18T15%3A05%3A22.115Z"
                  : "https://www.pegasustoronto.ca/website/wp-content/uploads/Freshco-Logo-Resized.jpg"
              }
              width={24}
              height={24}
              alt="Store logo"
            />
            <div className="flex-1 text-right">
              {new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "CAD",
              }).format(pricing.price)}
            </div>
          </div>
        ))}
      </div>
      {[1].length > 0 ? (
        <div className="mt-2 flex justify-end">
          <button className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Add to Cart
          </button>
        </div>
      ) : (
        <div>Unable to find any pricing for this product.</div>
      )}
    </div>
  );
}
