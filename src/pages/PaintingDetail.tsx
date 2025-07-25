import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Share2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data - in real app, this would come from a database
const paintings = [
  {
    id: "1",
    title: "رویای آبی",
    price: "۲,۵۰۰,۰۰۰ تومان",
    dimensions: "۷۰ × ۵۰ سانتی‌متر",
    medium: "رنگ روغن روی بوم",
    description: "این اثر بازتابی از احساسات عمیق و رنگ‌های آرام آسمان در شب است. با استفاده از تکنیک‌های مدرن نقاشی و ترکیب رنگ‌های آبی و نقره‌ای، فضایی آرامش‌بخش و تأمل‌برانگیز خلق شده است.",
    image: "/src/assets/artwork-1.jpg",
    year: "۱۴۰۲",
    available: true
  },
  {
    id: "2", 
    title: "باغ خاطرات",
    price: "۳,۲۰۰,۰۰۰ تومان",
    dimensions: "۸۰ × ۶۰ سانتی‌متر", 
    medium: "آکریلیک روی بوم",
    description: "مجموعه‌ای از خاطرات شیرین دوران کودکی که در قالب باغی رنگارنگ و پر از حیات به تصویر کشیده شده. هر گل و برگ نمادی از لحظه‌ای خاص و فراموش‌نشدنی است.",
    image: "/src/assets/artwork-2.jpg",
    year: "۱۴۰۱",
    available: true
  },
  {
    id: "3",
    title: "سکوت طلایی", 
    price: "۴,۱۰۰,۰۰۰ تومان",
    dimensions: "۹۰ × ۷۰ سانتی‌متر",
    medium: "رنگ روغن و ورق طلا روی بوم",
    description: "اثری معاصر که سکوت و آرامش درونی را با استفاده از رنگ‌های گرم و ورق طلای واقعی نمایش می‌دهد. این تابلو در نور مختلف، جلوه‌های متفاوتی به خود می‌گیرد.",
    image: "/src/assets/artwork-3.jpg", 
    year: "۱۴۰۲",
    available: false
  }
];

const PaintingDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const painting = paintings.find(p => p.id === id);

  if (!painting) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">اثر مورد نظر یافت نشد</h1>
          <Link to="/">
            <Button variant="persian">بازگشت به گالری</Button>
          </Link>
        </div>
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
          <span className="text-foreground">{painting.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src={painting.image}
                alt={painting.title}
                className="w-full h-full object-cover"
              />
              {!painting.available && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    فروخته شده
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-persian-terracotta border-persian-terracotta" : ""}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-foreground">{painting.title}</h1>
                <Badge variant="secondary">{painting.year}</Badge>
              </div>
              <p className="text-xl text-persian-terracotta font-bold mb-6">{painting.price}</p>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">مشخصات اثر</h3>
              <div className="grid gap-3">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">اندازه:</span>
                  <span className="font-medium">{painting.dimensions}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">متریال:</span>
                  <span className="font-medium">{painting.medium}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">سال تولید:</span>
                  <span className="font-medium">{painting.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">وضعیت:</span>
                  <Badge variant={painting.available ? "default" : "destructive"}>
                    {painting.available ? "موجود" : "فروخته شده"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">توضیحات</h3>
              <p className="text-muted-foreground leading-relaxed">{painting.description}</p>
            </div>

            {/* Purchase Buttons */}
            <div className="space-y-3 pt-6">
              {painting.available ? (
                <>
                  <Button variant="persian" size="lg" className="w-full">
                    <ShoppingCart className="ml-2 h-5 w-5" />
                    افزودن به سبد خرید
                  </Button>
                  <Button variant="gold" size="lg" className="w-full">
                    خرید مستقیم
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="lg" className="w-full" disabled>
                  این اثر فروخته شده است
                </Button>
              )}
            </div>

            {/* Artist Info */}
            <div className="bg-card rounded-lg p-6 border border-border/50">
              <h4 className="font-semibold text-foreground mb-2">درباره هنرمند</h4>
              <p className="text-sm text-muted-foreground mb-3">
                معصومه شاه رمضانی، نقاش معاصر ایرانی با بیش از ۱۵ سال تجربه در زمینه نقاشی مدرن و سنتی
              </p>
              <Link to="/artist">
                <Button variant="outline" size="sm">
                  مشاهده بیوگرافی کامل
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaintingDetail;