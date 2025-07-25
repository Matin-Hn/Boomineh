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
      title: "رویای آبی",
      artist: "معصومه شاه رمضانی",
      price: "۲,۵۰۰,۰۰۰ تومان",
      image: artwork1,
      category: "معاصر"
    },
    {
      id: "2", 
      title: "باغ خاطرات",
      artist: "معصومه شاه رمضانی",
      price: "۳,۲۰۰,۰۰۰ تومان",
      image: artwork2,
      category: "انتزاعی"
    },
    {
      id: "3",
      title: "سکوت طلایی",
      artist: "معصومه شاه رمضانی",
      price: "۴,۱۰۰,۰۰۰ تومان", 
      image: artwork3,
      category: "مینیمال"
    },
    {
      id: "4",
      title: "نور در تاریکی",
      artist: "معصومه شاه رمضانی",
      price: "۲,۸۰۰,۰۰۰ تومان",
      image: artwork1,
      category: "معاصر"
    },
    {
      id: "5",
      title: "احساس رنگ",
      artist: "معصومه شاه رمضانی",
      price: "۳,۵۰۰,۰۰۰ تومان",
      image: artwork2,
      category: "انتزاعی"
    },
    {
      id: "6",
      title: "آرامش درونی",
      artist: "معصومه شاه رمضانی",
      price: "۳,۹۰۰,۰۰۰ تومان",
      image: artwork3,
      category: "مینیمال"
    }
  ];

  const categories = ["همه", "معاصر", "انتزاعی", "مینیمال"];

  const filteredArtworks = activeFilter === "همه" 
    ? artworks 
    : artworks.filter(artwork => artwork.category === activeFilter);

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            آثار معصومه شاه رمضانی
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            مجموعه‌ای از آثار منتخب هنرمند معاصر ایرانی با سبک منحصر به فرد
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