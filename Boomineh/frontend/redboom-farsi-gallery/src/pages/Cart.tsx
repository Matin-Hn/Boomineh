import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchCart, deleteCartItem } from "@/api/cartAPI";

const Cart = () => {
  const [cart, setCart] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        setCart(data);

        // مقداردهی اولیه quantity برای هر آیتم
        const initialQuantities: Record<string, number> = {};
        data.items.forEach((item: any) => {
          initialQuantities[item.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setQuantities(q => ({ ...q, [id]: newQuantity }));
  };

  const removeItem = async (itemId: string) => {
    try {
      await deleteCartItem(itemId);
      setCart({
        ...cart,
        items: cart.items.filter((i: any) => i.id !== itemId),
      });
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-foreground">سبد خرید شما خالی است</h1>
            <p className="text-muted-foreground">هنوز هیچ اثری به سبد خرید خود اضافه نکرده‌اید</p>
            <Link to="/">
              <Button variant="persian" size="lg">
                مشاهده آثار هنری
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalAmount = cart.items.reduce(
    (sum: number, item: any) => sum + item.price_snapshot * (quantities[item.id] || 1),
    0
  );
  const formattedTotal = new Intl.NumberFormat("fa-IR").format(totalAmount);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">گالری</Link>
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span className="text-foreground">سبد خرید</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-foreground mb-6">سبد خرید شما</h1>
            
            <div className="space-y-4">
              {cart.items.map((item: any) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Image */}
                      <Link to={`/painting/${item.painting.id}`}>
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.painting.image}
                            alt={item.painting.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      {/* Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link to={`/painting/${item.painting.id}`}>
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                                {item.painting.title}
                              </h3>
                            </Link>
                            <p className="text-persian-terracotta font-bold text-lg">
                              {new Intl.NumberFormat("fa-IR").format(item.price_snapshot)} تومان
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-border rounded-lg">
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-foreground">خلاصه سفارش</h2>
                
                <div className="space-y-3">
                  {cart.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.painting.title} 
                      </span>
                      <span className="font-medium">
                        {new Intl.NumberFormat("fa-IR").format(item.price_snapshot * (quantities[item.id] || 1))} تومان
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>مجموع کل:</span>
                  <span className="text-persian-terracotta">{formattedTotal} تومان</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button variant="persian" size="lg" className="w-full">
                    تکمیل خرید
                  </Button>
                  {/* <Button variant="outline" size="lg" className="w-full">
                    خرید حضوری
                  </Button> */}
                </div>

                {/* Payment Methods */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-foreground mb-3">روش‌های پرداخت</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-persian-gold rounded"></div>
                      <span>کارت بانکی</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-persian-terracotta rounded"></div>
                      <span>پرداخت نقدی</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-persian-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-4 h-4 bg-persian-gold rounded-full"></div>
                  </div>
                  <h4 className="text-sm font-medium">خرید امن</h4>
                  <p className="text-xs text-muted-foreground">
                    تمامی پرداخت‌ها با رمزنگاری SSL محافظت می‌شوند
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
