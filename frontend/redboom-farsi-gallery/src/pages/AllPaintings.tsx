import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  priceNumeric: number;
  image: string;
  category: string;
  size: string;
  medium: string;
  paintMaterials: string;
}

const AllPaintings = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedMedium, setSelectedMedium] = useState("all");

  const artworks: Artwork[] = [
    {
      id: "1",
      title: "منظره کوهستانی",
      artist: "علی محمدی",
      price: "۱۲,۵۰۰,۰۰۰ تومان",
      priceNumeric: 12500000,
      image: artwork1,
      category: "منظره",
      size: "بزرگ",
      medium: "رنگ روغن",
      paintMaterials: "رنگ روغن بر روی بوم با قطعات چوب طبیعی"
    },
    {
      id: "2",
      title: "چهره زن",
      artist: "فاطمه احمدی",
      price: "۸,۰۰۰,۰۰۰ تومان",
      priceNumeric: 8000000,
      image: artwork2,
      category: "پرتره",
      size: "متوسط",
      medium: "آکریلیک",
      paintMaterials: "رنگ آکریلیک با ورق طلا و مواد معدنی"
    },
    {
      id: "3",
      title: "انتزاعی مدرن",
      artist: "حسن رضایی",
      price: "۱۵,۰۰۰,۰۰۰ تومان",
      priceNumeric: 15000000,
      image: artwork3,
      category: "انتزاعی",
      size: "بزرگ",
      medium: "میکس مدیا",
      paintMaterials: "رنگ اکریلیک، پاستل روغن و عناصر کلاژ"
    },
    {
      id: "4",
      title: "گل‌های بهاری",
      artist: "مریم کریمی",
      price: "۶,۵۰۰,۰۰۰ تومان",
      priceNumeric: 6500000,
      image: artwork1,
      category: "طبیعت بی‌جان",
      size: "کوچک",
      medium: "آبرنگ",
      paintMaterials: "آبرنگ شفاف با جوهر و رنگ‌های طبیعی"
    }
  ];

  const categories = ["all", "منظره", "پرتره", "انتزاعی", "طبیعت بی‌جان"];
  const sizes = ["all", "کوچک", "متوسط", "بزرگ"];
  const mediums = ["all", "رنگ روغن", "آکریلیک", "آبرنگ", "میکس مدیا"];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesPrice = artwork.priceNumeric >= priceRange[0] && artwork.priceNumeric <= priceRange[1];
    const matchesCategory = selectedCategory === "all" || artwork.category === selectedCategory;
    const matchesSize = selectedSize === "all" || artwork.size === selectedSize;
    const matchesMedium = selectedMedium === "all" || artwork.medium === selectedMedium;
    
    return matchesPrice && matchesCategory && matchesSize && matchesMedium;
  });

  const clearFilters = () => {
    setPriceRange([0, 50000000]);
    setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedMedium("all");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">تمام آثار هنری</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            مجموعه کاملی از آثار هنری منتخب با امکان جستجو و فیلتر پیشرفته
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            فیلترها
          </Button>
          <div className="text-sm text-muted-foreground">
            {filteredArtworks.length} اثر هنری یافت شد
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">محدوده قیمت (تومان)</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000000}
                    step={500000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">دسته‌بندی</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه دسته‌ها</SelectItem>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Size */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">ابعاد</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب ابعاد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه ابعاد</SelectItem>
                      {sizes.slice(1).map(size => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Medium */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">نوع متریال</Label>
                  <Select value={selectedMedium} onValueChange={setSelectedMedium}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب متریال" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه متریال‌ها</SelectItem>
                      {mediums.slice(1).map(medium => (
                        <SelectItem key={medium} value={medium}>
                          {medium}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  پاک کردن فیلترها
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        {/* No Results */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">هیچ اثری با این فیلترها یافت نشد</p>
              <p className="text-sm">لطفاً فیلترهای خود را تغییر دهید</p>
            </div>
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