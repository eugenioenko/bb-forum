import { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AxiosProvider } from "@/contexts/axios-instance";
import { ReactQueryProvider } from "@/contexts/react-query.context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/contexts/theme.context";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "BB Forum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          <AxiosProvider>
            <ReactQueryProvider>
              <main className="max-w-screen-lg mx-auto p-4 pb-24">
                <Navbar />
                {children}
                <Footer />
              </main>
              <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryProvider>
          </AxiosProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
