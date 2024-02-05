import { Inter } from "next/font/google";
import { ClerkProvider as Provider } from "@clerk/nextjs";
import "../globals.css";
export const metadata = {
  title: "Auth",
  description: "Next.js 14 App",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang='en'>
        <body className={`${inter.className} bg-purple-2`}>{children}</body>
      </html>
    </Provider>
  );
}
