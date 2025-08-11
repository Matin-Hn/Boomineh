import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPainting } from "@/api/paintingsAPI";
import { PaintingsAPI } from "../api/PaintingsAPI";
import LoginPopup from "@/components/ui/login-popup";

const PaintingDetail = () => {
  const { id } = useParams();
  const [painting, setPainting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const data = await getPainting(id);
        setPainting(data);
        if (typeof data.is_liked === "boolean") {
          setIsLiked(data.is_liked);
        }
      } catch (err) {
        console.error("خطا در دریافت اطلاعات اثر:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPainting();
  }, [id]);

  const handleLikeToggle = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    if (!painting) {
      console.warn("painting is null");
      return;
    }

    try {
      if (isLiked) {
        await PaintingsAPI.unlike(painting.id);
      } else {
        await PaintingsAPI.like(painting.id);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("خطا در لایک‌کردن:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-center py-24">
        <p className="text-xl text-muted-foreground">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error || !painting) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            اثر مورد نظر یافت نشد
          </h1>
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
          <Link to="/" className="hover:text-foreground transition-colors">
            گالری
          </Link>
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
              {!painting.availability && (
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
                onClick={handleLikeToggle}
                className={isLiked ? "text-persian-terracotta border-persian-terracotta" : ""}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>

              {showLoginPopup && (
                <LoginPopup
                  open={true}
                  onClose={() => setShowLoginPopup(false)}
                  onLogin={() => setShowLoginPopup(false)}
                />
              )}
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
                  <Badge variant={painting.availability ? "default" : "destructive"}>
                    {painting.availability ? "موجود" : "فروخته شده"}
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
              {painting.availability ? (
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
