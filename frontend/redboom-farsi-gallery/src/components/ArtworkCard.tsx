import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { PaintingsAPI } from "@/api/paintingsAPI";
import { addToCart } from "@/api/cartAPI";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  image: string;
  category: string;
  material?: string;
  availability?: boolean;
  is_liked?: boolean;
}

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // مقداردهی اولیه از artwork.is_liked
  useEffect(() => {
    if (typeof artwork.is_liked === "boolean") {
      setIsLiked(artwork.is_liked);
    }
  }, [artwork.is_liked]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    try {
      if (isLiked) {
        await PaintingsAPI.unlike(artwork.id);
      } else {
        await PaintingsAPI.like(artwork.id);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("خطا در لایک‌کردن:", err);
    }
  };

  return (
    <a href={`/painting/${artwork.id}`}>
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
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button variant="warm" size="icon" className="bg-white/90 hover:bg-white">
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleLikeToggle}
              className={isLiked ? "text-persian-terracotta border-persian-terracotta" : ""}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>

            {artwork.availability && (
            <Button
              variant="persian"
              size="icon"
              onClick={async () => {
                try {
                  const updatedCart = await addToCart(artwork.id, 1);
                  console.log("Cart updated", updatedCart);
                } catch (err) {
                  console.error("Error adding to cart", err);
                }
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3 flex gap-2">
            <span className="bg-persian-gold/90 text-persian-navy px-3 py-1 rounded-full text-sm font-medium">
              {artwork.category}
            </span>
            {!artwork.availability && (
              <span className="bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                فروخته شده
              </span>
            )}
          </div>

          {/* Paint Materials Tooltip */}
          {artwork.material && (
            <div
              className={`absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg text-sm transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="font-medium mb-1">مواد و تکنیک:</div>
              <div className="text-xs leading-relaxed">{artwork.material}</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {artwork.title}
          </h3>
        </div>
      </div>
    </a>
  );
};

export default ArtworkCard;
