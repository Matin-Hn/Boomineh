import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/api/authAPI"; 
import { useNavigate } from "react-router-dom"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              بومیـنه | Boomineh
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 rtl:space-x-reverse">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              گالری
            </a>
            <a href="/paintings" className="text-foreground hover:text-primary transition-colors">
              تمام آثار
            </a>
            <a href="/artist" className="text-foreground hover:text-primary transition-colors">
              درباره هنرمند
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              تماس
            </a>
            <a href="/admin-panel" className="text-foreground hover:text-primary transition-colors">
              پنل مدیریت
            </a>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline transition-colors"
              >
                خروج
              </button>
            ) : (
              <a href="/login" className="text-foreground hover:text-primary transition-colors">
                ورود
              </a>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <a href="/favorites">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </a>
            <a href="/cart">
              <Button variant="warm" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </a>

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
              <a href="/" className="text-foreground hover:text-primary transition-colors">
                گالری
              </a>
              <a href="/paintings" className="text-foreground hover:text-primary transition-colors">
                تمام آثار
              </a>
              <a href="/artist" className="text-foreground hover:text-primary transition-colors">
                درباره هنرمند
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                تماس
              </a>
              <a href="/admin" className="text-foreground hover:text-primary transition-colors">
                پنل مدیریت
              </a>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline transition-colors"
                >
                  خروج
                </button>
              ) : (
                <a href="/login" className="text-foreground hover:text-primary transition-colors">
                  ورود
                </a>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;