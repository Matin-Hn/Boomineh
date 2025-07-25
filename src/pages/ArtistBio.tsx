import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Instagram, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ArtistBio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden bg-gradient-warm">
              <img
                src="/src/assets/hero-gallery.jpg"
                alt="معصومه شاه رمضانی"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">معصومه شاه رمضانی</h1>
            <p className="text-xl text-muted-foreground mb-6">نقاش معاصر ایرانی</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">نقاشی مدرن</Badge>
              <Badge variant="secondary">رنگ روغن</Badge>
              <Badge variant="secondary">آکریلیک</Badge>
              <Badge variant="secondary">تکنیک مخلوط</Badge>
            </div>
          </div>

          {/* Biography Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">داستان هنری</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    معصومه شاه رمضانی، متولد ۱۳۶۸ در تهران، از همان کودکی با دنیای رنگ‌ها و قلم‌موها آشنا شد. 
                    پدرش که خود نقاش و مینیاتوریست بود، اولین الهام‌بخش او در مسیر هنر بود.
                  </p>
                  <p>
                    تحصیلات دانشگاهی او در رشته نقاشی از دانشگاه هنرهای زیبای تهران آغاز شد و در سال ۱۳۹۲ 
                    موفق به دریافت مدرک کارشناسی ارشد نقاشی شد. در طول دوران تحصیل، تحت تأثیر اساتیدی 
                    چون استاد محمود فرشچیان و مریم صالحی قرار گرفت.
                  </p>
                  <p>
                    سبک نقاشی معصومه ترکیبی منحصر به فرد از تکنیک‌های مدرن و عناصر سنتی ایرانی است. 
                    او معتقد است که هنر باید پلی باشد میان گذشته و آینده، میان سنت و مدرنیته.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">نمایشگاه‌ها و دستاوردها</h2>
                <div className="space-y-6">
                  <div className="border-r-4 border-persian-gold pr-4">
                    <h3 className="font-semibold text-foreground">نمایشگاه انفرادی "رنگ‌های درون"</h3>
                    <p className="text-sm text-muted-foreground">گالری آتبین - تهران - ۱۴۰۲</p>
                  </div>
                  <div className="border-r-4 border-persian-gold pr-4">
                    <h3 className="font-semibold text-foreground">نمایشگاه گروهی "نقاشان معاصر ایران"</h3>
                    <p className="text-sm text-muted-foreground">موزه هنرهای معاصر - تهران - ۱۴۰۱</p>
                  </div>
                  <div className="border-r-4 border-persian-gold pr-4">
                    <h3 className="font-semibold text-foreground">برنده جایزه بهترین اثر نقاشی</h3>
                    <p className="text-sm text-muted-foreground">بیست و یکمین بینال نقاشی ایران - ۱۴۰۰</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">فلسفه هنری</h2>
                <blockquote className="bg-card border-r-4 border-persian-terracotta p-6 rounded-lg">
                  <p className="text-foreground italic leading-relaxed mb-4">
                    "برای من نقاشی زبانی است که با آن احساساتم را بیان می‌کنم. هر رنگ، هر خط، هر فرم 
                    بخشی از داستان درونی من است که در قالب اثر هنری جان می‌گیرد. هنر پلی است میان 
                    دنیای درونی و بیرونی، میان خیال و واقعیت."
                  </p>
                  <cite className="text-sm text-muted-foreground">معصومه شاه رمضانی</cite>
                </blockquote>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <section className="bg-card rounded-lg p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-4">اطلاعات تماس</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">info@redboom.art</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">۰۲۱-۸۸۷۷۶۶۵۵</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">@masoomeh.shahramezani</span>
                  </div>
                </div>
                <Button variant="persian" className="w-full mt-4">
                  تماس با هنرمند
                </Button>
              </section>

              <section className="bg-card rounded-lg p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-4">آمار</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">آثار خلق شده:</span>
                    <span className="font-semibold">۱۲۰+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نمایشگاه‌ها:</span>
                    <span className="font-semibold">۱۵</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">سال فعالیت:</span>
                    <span className="font-semibold">۱۵+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">مجموعه‌داران:</span>
                    <span className="font-semibold">۸۰+</span>
                  </div>
                </div>
              </section>

              <section className="bg-card rounded-lg p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-4">تحصیلات</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">کارشناسی ارشد نقاشی</div>
                    <div className="text-muted-foreground">دانشگاه هنرهای زیبا - ۱۳۹۲</div>
                  </div>
                  <div>
                    <div className="font-medium">کارشناسی نقاشی</div>
                    <div className="text-muted-foreground">دانشگاه تهران - ۱۳۹۰</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistBio;