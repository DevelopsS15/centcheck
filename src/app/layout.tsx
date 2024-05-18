import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "./_components/NavBar";
import { Suspense } from "react";
import { LucideLoader2 } from "lucide-react";

export const metadata = {
  title: "CentCheck",
  description: "Saving Every Cent",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NavBar />
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                <LucideLoader2 className="animate-spin" />
              </div>
            }
          >
            {children}
          </Suspense>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
