import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Heart, ImageIcon, ArrowRight, Layers } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

async function getCategoriesWithCount() {
  const categories = await db.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: {
        select: { products: { where: { status: "ACTIVE" } } },
      },
    },
  });
  return categories;
}

async function getActiveProducts(categorySlug?: string) {
  return db.product.findMany({
    where: {
      status: "ACTIVE",
      ...(categorySlug
        ? {
            category: {
              slug: categorySlug,
            },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: { where: { isPrimary: true }, take: 1 },
    },
  });
}

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategorySlug } = await searchParams;

  const [categories, products] = await Promise.all([
    getCategoriesWithCount(),
    getActiveProducts(activeCategorySlug),
  ]);

  const selectedCategory = categories.find((c) => c.slug === activeCategorySlug);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="bg-muted/30 border-b py-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
          {selectedCategory ? selectedCategory.name : "Our Collection"}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {selectedCategory?.description ||
            "Handcrafted furniture built to last a lifetime. Each piece is made with sustainably sourced materials and expert craftsmanship."}
        </p>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
            <Link
              href="/collections"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                !activeCategorySlug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground hover:border-foreground/40"
              }`}
            >
              <Layers className="w-4 h-4" /> All Furniture
            </Link>

            {categories.map((cat) => {
              const isActive = cat.slug === activeCategorySlug;
              return (
                <Link
                  key={cat.id}
                  href={`/collections?category=${cat.slug}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground hover:border-foreground/40"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat._count.products}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20 border rounded-lg bg-muted/20 text-muted-foreground max-w-lg mx-auto">
              <p className="text-lg font-medium mb-1">No products found</p>
              <p className="text-sm">
                There are no active products in this category yet.
              </p>
              {activeCategorySlug && (
                <Link
                  href="/collections"
                  className="inline-block mt-4 text-xs font-semibold text-primary hover:underline"
                >
                  View All Collections
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => {
                const img = product.images[0];
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group block space-y-3"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-md border">
                      {img ? (
                        <Image
                          src={img.url}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
                          <ImageIcon className="w-10 h-10" />
                          <span className="text-xs">No image</span>
                        </div>
                      )}
                      {/* Wishlist hover overlay */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-full p-2 shadow-md">
                          <Heart className="w-4 h-4 text-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1">
                      {product.category && (
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                          {product.category.name}
                        </p>
                      )}
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.material && (
                        <p className="text-xs text-muted-foreground">{product.material}</p>
                      )}
                      <p className="font-semibold text-foreground mt-1">
                        ${product.price?.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary text-primary-foreground py-16 text-center">
        <h2 className="font-serif text-3xl mb-4">
          Can&apos;t find what you&apos;re looking for?
        </h2>
        <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
          We craft bespoke furniture tailored to your exact specifications and space.
        </p>
        <Link
          href="/custom-request"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className:
              "bg-transparent border-white text-white hover:bg-white hover:text-primary",
          })}
        >
          Request Custom Piece <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
