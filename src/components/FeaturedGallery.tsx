import { useState } from "react";
import ArtworkCard from "./ArtworkCard";
import { Button } from "@/components/ui/button";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const FeaturedGallery = () => {
  const [activeFilter, setActiveFilter] = useState("همه");

  const artworks = [
    {
      id: "1",
      title: "نقاشی سنتی ایرانی",
      artist: "محمد کاظمی",
      price: "۱۲,۵۰۰,۰۰۰ تومان",
      image: artwork1,
      category: "سنتی"
    },
    {
      id: "2", 
      title: "اثر انتزاعی مدرن",
      artist: "سارا احمدی",
      price: "۸,۰۰۰,۰۰۰ تومان",
      image: artwork2,
      category: "مدرن"
    },
    {
      id: "3",
      title: "خوشنویسی فارسی",
      artist: "علی رضایی",
      price: "۶,۲۰۰,۰۰۰ تومان", 
      image: artwork3,
      category: "خوشنویسی"
    },
    {
      id: "4",
      title: "نقاشی سنتی ایرانی",
      artist: "فاطمه نوری",
      price: "۱۵,۰۰۰,۰۰۰ تومان",
      image: artwork1,
      category: "سنتی"
    },
    {
      id: "5",
      title: "اثر انتزاعی نو",
      artist: "رضا محمدی",
      price: "۹,۵۰۰,۰۰۰ تومان",
      image: artwork2,
      category: "مدرن"
    },
    {
      id: "6",
      title: "خوشنویسی کلاسیک",
      artist: "حسن عباسی",
      price: "۷,۸۰۰,۰۰۰ تومان",
      image: artwork3,
      category: "خوشنویسی"
    }
  ];

  const categories = ["همه", "سنتی", "مدرن", "خوشنویسی", "معاصر"];

  const filteredArtworks = activeFilter === "همه" 
    ? artworks 
    : artworks.filter(artwork => artwork.category === activeFilter);

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            آثار منتخب گالری
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            مجموعه‌ای از برترین آثار هنری ایرانی و بین‌المللی که با دقت انتخاب شده‌اند
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "persian" : "warm"}
              size="lg"
              onClick={() => setActiveFilter(category)}
              className="min-w-[120px]"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button variant="gallery" size="hero">
            مشاهده همه آثار
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGallery;