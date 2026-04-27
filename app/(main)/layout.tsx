import { Navbar } from "@/components/web/layout/navbar";
import { Footer } from "@/components/web/layout/footer";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
        <Toaster position="bottom-right" />
      </main>
      <Footer />
    </div>
  );
}