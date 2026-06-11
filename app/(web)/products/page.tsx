"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, Recycle, Search, Trophy } from "lucide-react";
import { getStoredToken } from "@/lib/auth-token";
import { useGetUserPointsQuery } from "@/redux/features/profile/profileApi";
import { OffersBanner } from "@/components/products/offers-banner";
import { ProductCard } from "@/components/products/product-card";
import {
  CATEGORIES,
  PRODUCTS,
  type ProductCategory,
} from "@/lib/products-data";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "All" | ProductCategory
  >("All");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const token = getStoredToken();
  const { data: userData } = useGetUserPointsQuery(undefined, {
    skip: !token,
  });

  const userPoints = token ? (userData?.points ?? 0) : 0;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        {/* Offers Section */}
        <section>
          <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold text-center mb-8">
            What we offer today
          </h1>
          <OffersBanner />
        </section>

        {/* User Stats */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-sm p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">My Points</p>
                <p className="text-3xl font-bold text-foreground">
                  {userPoints}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-sm p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">Recycled Items</p>
                <p className="text-3xl font-bold text-foreground">2321</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Recycle className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/rewards"
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-full font-medium hover:bg-secondary-light transition-colors"
            >
              Redeem Points
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Products Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold">
              Most Popular
            </h2>
            <span className="text-sm text-muted">
              {filteredProducts.length} items
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              aria-label="Filter products"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-secondary text-white"
                    : "bg-card border border-border text-muted hover:border-secondary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted">
              <p className="text-lg">No products found</p>
              <p className="text-sm mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
