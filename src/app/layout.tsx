import type { Metadata } from "next";
import { Lato, Lexend, Quicksand } from "next/font/google";
import "./globals.css";
import MeProvider from "@/Providers/MeProvider";
import { meAction } from "@/modules/Authentication/Actions/MeAction";
import { UserType } from "@/modules/Authentication/types";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300","400","700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100","300","400","700","900"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["100","300","400","700","900"],
});

export const metadata: Metadata = {
  title: "Nest  |  Grocery delivery & more",
  description: "grocery delivery & more",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticatedUser = await meAction();
  const userData: UserType | null = authenticatedUser.data ?? null;
  
  return (
    <html lang="en">
      <body 
        className={`${lato.variable} ${quicksand.variable} ${lexend.variable} antialiased font-main`}
      >
        <MeProvider userData={userData}>
          <div className="">
              <div className="">
                <div className="px-[20px]">
                  {children}
                </div>
              </div>
          </div>
        </MeProvider>
      </body>   
    </html>
  );
}
