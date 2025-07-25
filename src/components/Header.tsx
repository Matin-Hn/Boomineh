import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, Heart } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              رد بوم | RedBoom
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <a href="#gallery" className="text-foreground hover:text-primary transition-colors">
              گالری
            </a>
            <a href="#artists" className="text-foreground hover:text-primary transition-colors">
              هنرمندان
            </a>
            <a href="#categories" className="text-foreground hover:text-primary transition-colors">
              دسته‌بندی‌ها
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              درباره ما
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="warm" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors">
                گالری
              </a>
              <a href="#artists" className="text-foreground hover:text-primary transition-colors">
                هنرمندان
              </a>
              <a href="#categories" className="text-foreground hover:text-primary transition-colors">
                دسته‌بندی‌ها
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                درباره ما
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;