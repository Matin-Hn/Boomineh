import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-persian-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-persian-gold to-persian-gold-light bg-clip-text text-transparent mb-4">
              بومیـنه | Boomineh
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              گالری هنری بومیـنه، مکانی برای عاشقان هنر و زیبایی. ما با افتخار بهترین آثار هنری ایرانی و بین‌المللی را به شما عرضه می‌کنیم.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-persian-gold">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-persian-gold">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-persian-gold">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-persian-gold mb-4">
              دسترسی سریع
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
                  گالری آثار
                </a>
              </li>
              <li>
                <a href="#artists" className="text-gray-300 hover:text-white transition-colors">
                  هنرمندان
                </a>
              </li>
              <li>
                <a href="#categories" className="text-gray-300 hover:text-white transition-colors">
                  دسته‌بندی‌ها
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-persian-gold mb-4">
              تماس با ما
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-persian-gold" />
                <span className="text-gray-300">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-persian-gold" />
                <span className="text-gray-300">info@redboom.ir</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-persian-gold" />
                <span className="text-gray-300">تهران، خیابان ولیعصر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-persian-gold mb-4">
              عضویت در خبرنامه
            </h4>
            <p className="text-gray-300 mb-4">
              از جدیدترین آثار هنری و رویدادهای گالری با خبر شوید
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder="آدرس ایمیل شما"
                className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-persian-gold"
              />
              <Button variant="gold" className="min-w-[120px]">
                عضویت
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-persian-navy/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © ۱۴۰۳ گالری هنری بومیـنه. تمامی حقوق محفوظ است.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                حریم خصوصی
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                شرایط استفاده
              </a>
              <a href="#support" className="text-gray-400 hover:text-white transition-colors">
                پشتیبانی
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;