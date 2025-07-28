import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";

import artwork1 from "@/assets/artwork-1.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

// Mock favorites data - in real app, this would come from state management
const initialFavorites = [
  {
    id: "1",
    title: "رویای آبی",
    artist: "معصومه شاه رمضانی",
    price: "۲,۵۰۰,۰۰۰ تومان",
    image: artwork1,
    category: "مدرن"
  },
  {
    id: "3",
    title: "سکوت طلایی",
    artist: "معصومه شاه رمضانی", 
    price: "۴,۱۰۰,۰۰۰ تومان",
    image: artwork3,
    category: "معاصر"
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: string) => {
    setFavorites(items => items.filter(item => item.id !== id));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-persian-gold/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-persian-terracotta" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">لیست علاقه‌مندی‌های شما خالی است</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              هنوز هیچ اثری را به لیست علاقه‌مندی‌هایتان اضافه نکرده‌اید. آثار مورد علاقه‌تان را کشف کنید
            </p>
            <Link to="/">
              <Button variant="persian" size="lg">
                <Heart className="ml-2 h-5 w-5" />
                مشاهده آثار هنری
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">گالری</Link>
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span className="text-foreground">علاقه‌مندی‌ها</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">آثار مورد علاقه شما</h1>
            <p className="text-muted-foreground">
              {favorites.length} اثر در لیست علاقه‌مندی‌های شما
            </p>
          </div>
          
          {/* <div className="flex items-center gap-2 text-persian-terracotta">
            <Heart className="h-5 w-5 fill-current" />
            <span className="font-medium">{favorites.length}</span>
          </div> */}
          {/* I muted the heart and len of fav */}

        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
          {favorites.map((artwork) => (
            <div key={artwork.id} className="relative">
              <ArtworkCard artwork={artwork} />
              
              {/* Remove from favorites button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 left-3 bg-white/90 hover:bg-white shadow-sm"
                onClick={() => removeFavorite(artwork.id)}
              >
                <Heart className="h-4 w-4 text-persian-terracotta fill-current" />
              </Button>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="border-t border-border pt-12">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">پیشنهادات ویژه</h2>
            <p className="text-muted-foreground">
              بر اساس علاقه‌مندی‌های شما، این آثار را پیشنهاد می‌دهیم
            </p>
          </div>
          
          <div className="text-center">
            <Link to="/">
              <Button variant="outline" size="lg">
                مشاهده تمام آثار
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;