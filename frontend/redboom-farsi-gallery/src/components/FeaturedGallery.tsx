import { useEffect, useState } from "react";
import ArtworkCard from "./ArtworkCard";
import { Button } from "@/components/ui/button";
import { fetchPaintings } from "@/api/paintingsAPI"; // اتصال به API

const FeaturedGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("همه");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPaintings = async () => {
      try {
        const data = await fetchPaintings();
        setArtworks(data);
      } catch (err) {
        console.error("🛑 خطا در دریافت آثار:", err);
        setError("خطا در دریافت اطلاعات آثار");
      } finally {
        setLoading(false);
      }
    };

    loadPaintings();
  }, []);

  const categories = ["همه", "معاصر", "انتزاعی", "مینیمال"];

  const filteredArtworks =
    activeFilter === "همه"
      ? artworks
      : artworks.filter((artwork) => artwork.category === activeFilter);

  if (loading) {
    return <p className="text-center text-lg">در حال بارگذاری آثار...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            آثار
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
          <a href="/all-paintings">
            <Button variant="gallery" size="hero">
              مشاهده همه آثار
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGallery;
