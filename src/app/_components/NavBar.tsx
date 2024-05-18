"use client";
import { LucideCamera } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";

import Image from "next/image";
import Link from "next/link";
import Html5QrcodePlugin from "./Html5QrcodeScannerPlugin";
import { User } from "@supabase/supabase-js";
import React from "react";
import { cn } from "~/lib/utils";
import { createClient } from "~/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const supabase = createClient();
  const [user, setUser] = React.useState<User | null>(null);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    const run = async () => {
      const user = await supabase.auth.getUser();
      if (user.data !== null) {
        setUser(user.data.user);
      }
    };
    void run();
  }, []);

  return (
    <nav className="sticky start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-sm flex-wrap items-center justify-between p-4">
        <a
          href="/"
          className="flex w-full items-center justify-center rtl:space-x-reverse"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            width={64}
            height={64}
            alt="CentCheck Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            CentCheck
          </span>
        </a>
        <div className="flex space-x-3 max-md:w-full md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center gap-2 max-md:w-11/12 md:hidden">
            <SearchBar />
          </div>
          {user ? (
            <Link href="/dashboard">
              <Image
                className="h-10 w-10 rounded-full"
                width={64}
                height={64}
                alt="User profile image"
                src={
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                }
              />
            </Link>
          ) : (
            <Link
              href="/signup"
              className="hidden rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:block dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={cn(
            menuOpen ? "" : "hidden",
            "w-full items-center justify-between md:order-1 md:flex md:w-auto",
          )}
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
            {/* <li>
            <a
              href="#"
              className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
              aria-current="page"
            >
              Home
            </a>
          </li> */}
            <div className="hidden w-full items-center gap-2 md:flex">
              <SearchBar />
            </div>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:hidden dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function SearchBar() {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const router = useRouter();
  const onSuccessScan = (decodedText: string) => {
    setDialogOpen(false);
    router.push("/search?barcodeId=" + encodeURIComponent(decodedText));
  };

  return (
    <>
      <form action="/search" method="GET" className="relative block">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-navbar"
          name="name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search products..."
        />
      </form>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
        <DialogTrigger asChild>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
            <LucideCamera className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Barcode Scanner</DialogTitle>
            <DialogDescription>
              Point your camera towards the barcode for it to be scanned.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onSuccessScan}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
