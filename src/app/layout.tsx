import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Quicksand } from "next/font/google";
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
        className={`${lato.variable} ${quicksand.variable} antialiased font-main`}
      >
        <MeProvider userData={userData}>
          {children}
        </MeProvider>
      </body>   
    </html>
  );
}
