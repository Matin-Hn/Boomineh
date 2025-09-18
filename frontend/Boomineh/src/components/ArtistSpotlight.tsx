import { Button } from "@/components/ui/button";
import { Palette, Award, Heart } from "lucide-react";

const ArtistSpotlight = () => {
  const artists = [
    {
      name: "محمد کاظمی",
      specialty: "نقاشی سنتی ایرانی",
      description: "هنرمندی با بیش از ۲۰ سال تجربه در نقاشی سنتی و مینیاتور ایرانی",
      works: "۴۵ اثر",
      awards: "۸ جایزه",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "سارا احمدی", 
      specialty: "هنر مدرن و انتزاعی",
      description: "هنرمند جوان و خلاق که آثارش ترکیبی از سنت و مدرنیته است",
      works: "۳۲ اثر",
      awards: "۵ جایزه",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "علی رضایی",
      specialty: "خوشنویسی فارسی",
      description: "استاد خوشنویسی که آثارش در موزه‌های معتبر جهان به نمایش درآمده",
      works: "۶۷ اثر", 
      awards: "۱۲ جایزه",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            هنرمندان برجسته
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            آشنایی با هنرمندانی که با استعداد و خلاقیت خود، زیبایی را به تصویر می‌کشند
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {artists.map((artist, index) => (
            <div key={index} className="bg-card rounded-lg p-8 shadow-gallery hover:shadow-artwork transition-gallery text-center">
              {/* Artist Image */}
              <div className="relative mb-6">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-persian-gold/20"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-persian-gold text-persian-navy px-3 py-1 rounded-full text-sm font-medium">
                  ویژه
                </div>
              </div>

              {/* Artist Info */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {artist.name}
              </h3>
              <p className="text-persian-terracotta font-medium mb-4">
                {artist.specialty}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {artist.description}
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Palette className="h-4 w-4 text-persian-terracotta" />
                  <span>{artist.works}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-persian-gold" />
                  <span>{artist.awards}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">
                  مشاهده آثار
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistSpotlight;