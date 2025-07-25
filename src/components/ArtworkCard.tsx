import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  image: string;
  category: string;
}

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="gallery-card bg-card rounded-lg overflow-hidden shadow-gallery hover:shadow-artwork border border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="artwork-image w-full h-full object-cover"
        />
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button variant="warm" size="icon" className="bg-white/90 hover:bg-white">
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="warm" 
            size="icon" 
            className={`transition-colors ${isLiked ? 'bg-persian-terracotta text-white' : 'bg-white/90 hover:bg-white'}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="persian" size="icon">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-persian-gold/90 text-persian-navy px-3 py-1 rounded-full text-sm font-medium">
          {artwork.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {artwork.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            اثر: {artwork.artist}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-persian-terracotta font-bold text-xl">
            {artwork.price}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              مشاهده جزئیات
            </Button>
            <Button variant="persian" size="sm">
              افزودن به سبد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;