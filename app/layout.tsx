import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ReduxProvider from "./ReduxProvider";

export const metadata: Metadata = {
  title: "To Do",
  description: "Created by Nikhil",
};

const poppin = Poppins({
  subsets: ["latin"],
  weight: "400"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppin.className}`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
