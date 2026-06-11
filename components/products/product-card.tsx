"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/lib/products-data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
}

export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={cn(
              "w-4 h-4",
              isWishlisted ? "fill-primary text-primary" : "text-muted",
            )}
          />
        </button>
        <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-medium px-2 py-1 rounded-md">
          {product.discount}% off
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-serif font-bold text-foreground text-base leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="text-sm text-muted">{product.rating}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-secondary text-lg">
            {product.price} EGP
          </span>
          <span className="text-sm text-muted line-through">
            {product.originalPrice} EGP
          </span>
        </div>

        <button
          type="button"
          className="mt-auto w-full flex items-center justify-center gap-2 bg-secondary text-white py-2.5 rounded-full text-sm font-medium hover:bg-secondary-light transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
