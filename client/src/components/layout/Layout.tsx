import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AdSlot from "@/components/ads/AdSlot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Ambient gradient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[hsl(var(--brand)/0.12)] via-transparent to-transparent"
      />
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-6 md:py-10">
        <div className="mb-6">
          <AdSlot id="top-banner" format="horizontal" />
        </div>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
};

export default Layout;
