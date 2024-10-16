import { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AxiosProvider } from "@/contexts/axios-instance";
import { ReactQueryProvider } from "@/contexts/react-query.context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/contexts/theme.context";
import { Footer } from "@/components/footer";
import { Toasts } from "@/components/toasts";
import { bbfName } from "@/environment";

export const metadata: Metadata = {
  title: bbfName,
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
              <Toasts />
              <main className="max-w-screen-lg min-h-dvh mx-auto p-4 flex flex-col">
                <Navbar />
                <div className="flex flex-col flex-grow">{children}</div>
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
