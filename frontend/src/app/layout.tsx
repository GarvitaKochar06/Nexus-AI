import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Nexus AI — Personal Intelligence Operating System",
  description: "Your Personal Intelligence. One Connected Workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090D16] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
