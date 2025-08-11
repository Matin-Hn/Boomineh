// src/pages/Favorites.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { fetchFavorites } from "@/api/PaintingsAPI";  

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (err) {
        console.error("خطا در دریافت علاقه‌مندی‌ها:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);



  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500">خطایی در بارگذاری علاقه‌مندی‌ها رخ داد.</p>
      </div>
    );
  }

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
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
          {favorites.map((artwork) => (
            <div key={artwork.id} className="relative">
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
