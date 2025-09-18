import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { fetchPaintings } from "@/api/paintingsAPI";

interface Artwork {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  liked_by: string[];
  is_liked: boolean;
  likes_count: number;
  year: number;
  price: number;
  size: string;
  material: string;
  availability: boolean;
  category: string;
}

const AllPaintings = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");

  const categories = ["all", "منظره", "پرتره", "انتزاعی", "طبیعت بی‌جان"];
  const sizes = ["all", "کوچک", "متوسط", "بزرگ"];
  const materials = ["all", "رنگ روغن", "آکریلیک", "آبرنگ", "میکس مدیا"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPaintings();
        setArtworks(data);
      } catch (err) {
        setError("مشکلی در بارگذاری داده‌ها پیش آمد");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesPrice = artwork.price >= priceRange[0] && artwork.price <= priceRange[1];
    const matchesCategory = selectedCategory === "all" || artwork.category === selectedCategory;
    const matchesSize = selectedSize === "all" || artwork.size === selectedSize;
    const matchesMaterial = selectedMaterial === "all" || artwork.material === selectedMaterial;

    return matchesPrice && matchesCategory && matchesSize && matchesMaterial;
  });

  const clearFilters = () => {
    setPriceRange([0, 50000000]);
    setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedMaterial("all");
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('fa-IR').format(price);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">تمام آثار هنری</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            مجموعه‌ای از آثار هنری با قابلیت جستجو و فیلتر
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            فیلترها
          </Button>
          <div className="text-sm text-muted-foreground">
            {filteredArtworks.length} اثر هنری یافت شد
          </div>
        </div>

        {showFilters && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price */}
                <div>
                  <Label>محدوده قیمت (تومان)</Label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={50000000} step={500000} />
                  <div className="flex justify-between text-xs">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label>دسته‌بندی</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Size */}
                <div>
                  <Label>ابعاد</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب ابعاد" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Material */}
                <div>
                  <Label>متریال</Label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب متریال" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                  <X className="h-4 w-4" /> پاک کردن فیلترها
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && <p className="text-center">در حال بارگذاری...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}

        {filteredArtworks.length === 0 && !loading && (
          <div className="text-center py-12">
            <p>هیچ اثری با این فیلترها یافت نشد</p>
            <Button variant="outline" onClick={clearFilters}>
              پاک کردن همه فیلترها
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllPaintings;
