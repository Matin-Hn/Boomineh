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
            گالری هنری
            <span className="block bg-gradient-to-r from-persian-gold to-persian-gold-light bg-clip-text text-transparent">
              رد بوم
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            مجموعه‌ای بی‌نظیر از آثار هنری ایرانی و بین‌المللی
            <br />
            برای عاشقان هنر و زیبایی
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gallery" size="hero" className="min-w-[200px]">
              مشاهده گالری
            </Button>
            <Button variant="warm" size="hero" className="min-w-[200px]">
              درباره هنرمندان
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-persian-gold mb-2">۲۵۰+</div>
              <div className="text-gray-300">اثر هنری</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-persian-gold mb-2">۵۰+</div>
              <div className="text-gray-300">هنرمند</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-persian-gold mb-2">۱۵+</div>
              <div className="text-gray-300">دسته‌بندی</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-persian-gold mb-2">۱۰۰۰+</div>
              <div className="text-gray-300">مشتری راضی</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;