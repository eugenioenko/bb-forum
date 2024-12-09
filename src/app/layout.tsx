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
  description: "Bulletin Board Forum powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Squada+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Squada+One&display=swap"
          rel="stylesheet"
        />
      </head>
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
