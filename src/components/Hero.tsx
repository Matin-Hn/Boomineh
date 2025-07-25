import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-gallery.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-persian-navy/60 to-persian-terracotta/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-persian-gold to-persian-gold-light bg-clip-text text-transparent">
              رد بوم
            </span>
            معصومه شاه رمضانی
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            مجموعه آثار منحصر به فرد هنرمند معاصر ایرانی
            <br />
            ترکیبی از سنت و مدرنیته در نقاشی
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gallery" size="hero" className="min-w-[200px]">
              مشاهده آثار
            </Button>
            <a href="/artist">
              <Button variant="warm" size="hero" className="min-w-[200px]">
                درباره هنرمند
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-persian-gold mb-2">۱۲۰+</div>
              <div className="text-gray-300">اثر خلق شده</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-persian-gold mb-2">۱۵</div>
              <div className="text-gray-300">نمایشگاه</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-persian-gold mb-2">۱۵+</div>
              <div className="text-gray-300">سال فعالیت</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-persian-gold mb-2">۸۰+</div>
              <div className="text-gray-300">مجموعه‌دار</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;