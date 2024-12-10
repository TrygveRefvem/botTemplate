import { ReactNode } from "react";
import { CoopLogo } from "@/components/icons/CoopLogo";
import { Search, Heart, Receipt, User, MapPin, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header>
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center h-16 px-4 gap-8">
              <CoopLogo className="h-6 w-auto text-[#00205B]" />
              <div className="relative flex-1 max-w-md">
                <Input 
                  type="search" 
                  placeholder="Hva leter du etter?" 
                  className="pl-4 pr-10 rounded-full border-gray-300"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#" className="flex items-center gap-1 hover:text-[#00205B]">Coop.no</a>
                <a href="#" className="hover:text-[#00205B]"><Heart className="h-5 w-5" /></a>
                <a href="#" className="hover:text-[#00205B]"><Receipt className="h-5 w-5" /></a>
                <a href="#" className="flex items-center gap-1 hover:text-[#00205B]">
                  <User className="h-5 w-5" />
                  Min side
                </a>
                <a href="#" className="flex items-center gap-1 hover:text-[#00205B]">
                  <MapPin className="h-5 w-5" />
                  Våre butikker
                </a>
                <a href="#" className="hover:text-[#00205B]">Medlem</a>
                <a href="#" className="flex items-center gap-1 hover:text-[#00205B]">
                  Coop Kjeder
                  <ChevronRight className="h-4 w-4" />
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-[#E8F1F9] text-sm">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center h-10 px-4 gap-6">
              <a href="#" className="hover:text-[#00205B]">UKENS KUNDEAVIS</a>
              <a href="#" className="hover:text-[#00205B]">OPPSKRIFTER</a>
              <a href="#" className="hover:text-[#00205B]">AKTUELT</a>
              <a href="#" className="hover:text-[#00205B]">OM COOP</a>
              <a href="#" className="hover:text-[#00205B]">JUL</a>
              <a href="#" className="hover:text-[#00205B]">OBS.NO</a>
              <a href="#" className="hover:text-[#00205B]">OBSBYGG.NO</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="min-h-[calc(100vh-7rem)] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted to-background/90">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
