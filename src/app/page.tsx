import { LucideDollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <div className="font-lightbold mx-auto grid w-full max-w-screen-lg grid-cols-1 gap-2 text-xl md:text-3xl lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center max-lg:order-2">
          <div>In a time where every cent counts,</div>
          <div>
            <span className="font-bold">CentCheck</span> has your back.
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <Image
            src="/CentCheck.png"
            width={256}
            height={256}
            alt="CentCheck logo"
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <Link
            href="/search"
            className="max-w-max mx-auto rounded-lg bg-blue-700 px-5 py-2.5 text-center text-md font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Today
          </Link>
        </div>
      </div>
    </main>
  );
}
