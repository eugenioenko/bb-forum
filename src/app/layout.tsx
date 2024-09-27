import { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AxiosProvider } from "@/contexts/axios-instance";
import { ReactQueryProvider } from "@/contexts/react-query.context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApolloClientProvider } from "@/contexts/apollo-client.context";

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
      <body>
        <ApolloClientProvider>
          <AxiosProvider>
            <ReactQueryProvider>
              <main className="max-w-screen-lg mx-auto p-4">
                <Navbar />
                {children}
              </main>
              <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryProvider>
          </AxiosProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
