import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-center">
              <div className="text-sm font-light tracking-wider">WORLD</div>
              <div className="text-sm font-light tracking-wider">ECONOMIC</div>
              <div className="text-sm font-light tracking-wider">FORUM</div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              Join us
            </Button>
            <Button variant="outline" className="border-gray-400 text-white hover:bg-slate-800 px-6">
              Sign in
            </Button>
          </div>
        </div>
      </div>

      {/* Publications/Series tabs */}
      <div className="bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-4">
            <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-medium">
              Publications
            </button>
            <button className="text-white hover:text-gray-300 px-6 py-2 rounded-full font-medium">
              Series
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
