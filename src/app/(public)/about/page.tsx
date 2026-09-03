import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, TreePine, Hammer, HeartHandshake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-muted/30 border-b overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-4 block">
            Our Heritage & Values
          </span>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-foreground mb-6">
            Handcrafting Heirlooms <br />
            <span className="italic font-normal text-muted-foreground">For Generations</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            Founded with a passion for natural timber and timeless design, Casa Wood crafts modern furniture designed to last a lifetime and tell a story in every grain.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border">
              <Image
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1000"
                alt="Master Woodworker at Casa Wood Studio"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Rooted in Craftsmanship, <br /> Dedicated to Quality
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At Casa Wood, every piece begins with a commitment to uncompromised material quality. We source only sustainably harvested hardwoods — including Teak, Sheesham, Oak, and American Walnut.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Rather than mass-producing disposable furniture, our master artisans utilize time-honored joinery techniques combined with modern design principles. The result is furniture that grows more beautiful with age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/20 border-y">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">What Guides Us</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our core principles ensure every Casa Wood creation elevates your living sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-background p-8 rounded-xl border space-y-4 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl">Sustainably Sourced</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                100% certified sustainable timber from responsibly managed forests.
              </p>
            </div>

            <div className="bg-background p-8 rounded-xl border space-y-4 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl">Artisan Handcrafted</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Built using mortise-and-tenon joinery without reliance on cheap veneers.
              </p>
            </div>

            <div className="bg-background p-8 rounded-xl border space-y-4 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl">Built for Generations</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Durability guaranteed with structural integrity designed to outlast decades.
              </p>
            </div>

            <div className="bg-background p-8 rounded-xl border space-y-4 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl">Bespoke Options</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tailored dimensions and finishes to perfectly match your architectural vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl">Explore Our Creations</h2>
          <p className="text-muted-foreground">
            Browse our full furniture collection or request a custom piece tailored to your home.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/collections" className={buttonVariants({ size: "lg" })}>
              View Collection <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/custom-request" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Request Custom Piece
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
