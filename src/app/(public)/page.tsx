import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 2. HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000"
            alt="Luxurious living room furniture"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle overlay for text legibility */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center text-white mt-16">
          <span className="text-sm tracking-[0.2em] uppercase mb-4 opacity-90 font-medium">
            Casa Wood Studio
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight max-w-4xl leading-tight mb-8 drop-shadow-sm">
            Elegance Crafted for Your Space
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-90 mb-10 font-light drop-shadow-sm">
            Discover our collection of premium, handcrafted furniture designed to
            elevate your everyday living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/collections"
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-white text-primary hover:bg-white/90 text-base h-14 px-8 rounded-none transition-all",
              })}
            >
              Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/custom"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className:
                  "bg-transparent text-white border-white hover:bg-white/10 hover:text-white text-base h-14 px-8 rounded-none transition-all",
              })}
            >
              Custom Design
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY DISCOVERY */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Shop by Room
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Curated collections designed to harmonize with your lifestyle and
                architecture.
              </p>
            </div>
            <Link
              href="/collections"
              className="group flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              View all categories
              <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Living",
                img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Dining",
                img: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800",
              },
              {
                title: "Bedroom",
                img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
              },
            ].map((category, i) => (
              <Link
                key={i}
                href={`/collections/${category.title.toLowerCase()}`}
                className="group relative h-[400px] overflow-hidden bg-muted"
              >
                <Image
                  src={category.img}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent transition-opacity group-hover:opacity-80" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-serif text-2xl mb-1">{category.title}</h3>
                  <span className="text-sm uppercase tracking-wider opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex items-center">
                    Explore <MoveRight className="ml-2 h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EDITORIAL COLLECTION */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative h-[600px] lg:h-[700px] w-full order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000"
                alt="The Artisan Collection Chair"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <span className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
                Featured Collection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
                The Artisan <br />
                <span className="italic text-muted-foreground">Series</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                A celebration of raw materials and meticulous craftsmanship. The
                Artisan Series strips away the unnecessary, focusing on the pure
                geometry of form and the natural warmth of sustainably sourced
                solid walnut.
              </p>
              <Link
                href="/collections/artisan"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "w-fit rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background h-12 px-8",
                })}
              >
                Discover the Series
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CRAFTSMANSHIP */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1610815250917-8e1003460e51?auto=format&fit=crop&q=80&w=1200"
            alt="Woodworking texture"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              Rooted in Tradition, <br /> Crafted for Today.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed font-light">
              We believe furniture should outlast trends. That&apos;s why every
              piece at Casa Wood is built by master craftsmen using traditional
              joinery techniques and hand-selected sustainable hardwoods. We
              don&apos;t just build furniture; we create heirlooms.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-sm uppercase tracking-widest font-medium hover:text-white/70 transition-colors border-b border-primary-foreground/30 pb-1"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CUSTOM FURNITURE CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
            Bespoke Services
          </span>
          <h2 className="font-serif text-4xl md:text-6xl mb-6 text-foreground">
            Made for your space.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 mx-auto max-w-2xl">
            Have a specific vision in mind? Work directly with our design team
            and master craftsmen to bring your unique furniture concepts to life.
          </p>
          <Link
            href="/custom"
            className={buttonVariants({
              size: "lg",
              className:
                "rounded-none bg-foreground text-background hover:bg-foreground/90 h-14 px-10 text-base",
            })}
          >
            Start a Custom Request
          </Link>
        </div>
      </section>

      {/* 8. LOOKBOOK / INSPIRATION */}
      <section className="py-4 bg-muted/20 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px]">
            <div className="col-span-2 row-span-2 relative group overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200"
                alt="Home Office Inspiration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative group overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600"
                alt="Detail shot"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative group overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=600"
                alt="Material shot"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="col-span-2 relative group overflow-hidden bg-muted flex items-center justify-center p-8 text-center border">
              <div className="z-10">
                <h3 className="font-serif text-2xl mb-3">The Lookbook</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Explore curated spaces featuring our latest collections.
                </p>
                <Link
                  href="/journal"
                  className="text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors flex items-center justify-center"
                >
                  Get Inspired <MoveRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SHOWROOM CTA */}
      <section className="py-24 bg-background border-t">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Experience it in person.
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Visit our flagship showroom to feel the materials, test the
              comfort, and consult with our design specialists.
            </p>
            <div className="flex gap-4">
              <Link
                href="/showroom"
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-none h-12 px-6",
                })}
              >
                View Location
              </Link>
              <Link
                href="/showroom/book"
                className={buttonVariants({
                  className: "rounded-none h-12 px-6",
                })}
              >
                Book Consultation
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
              alt="Casa Wood Showroom"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
