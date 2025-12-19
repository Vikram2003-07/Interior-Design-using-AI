import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "./provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "AI-Interior-Design",
  description: "AI-Interior-Design is a platform that uses AI to generate interior design images.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={outfit.className}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
