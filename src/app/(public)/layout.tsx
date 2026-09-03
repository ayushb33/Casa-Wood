import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/brand/casa-wood-symbol.png"
              alt="Casa Wood Logo"
              width={70}
              height={70}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/collections" className="hover:text-primary transition-colors">
              Collections
            </Link>
            <Link href="/#about" className="hover:text-primary transition-colors">
              Our Story
            </Link>
            <Link href="/custom-request" className="hover:text-primary transition-colors">
              Custom Furniture
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/wishlist" className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent transition-colors">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <Image
                src="/brand/casa-wood-logo.png"
                alt="Casa Wood Logo"
                width={120}
                height={35}
                className="brightness-0 invert object-contain"
              />
              <p className="text-primary-foreground/80 text-sm max-w-xs">
                Crafting timeless furniture that brings natural elegance and enduring quality to your space.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg font-serif">Explore</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link href="/collections" className="hover:text-white transition-colors">All Collections</Link></li>
                <li><Link href="/custom" className="hover:text-white transition-colors">Custom Designs</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link href="/journal" className="hover:text-white transition-colors">Journal</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg font-serif">Support</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                <li><Link href="/care" className="hover:text-white transition-colors">Furniture Care</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg font-serif">Showroom</h4>
              <address className="not-italic text-sm text-primary-foreground/80 space-y-2">
                <p>123 Artisan Boulevard</p>
                <p>Design District, CA 90210</p>
                <p className="pt-2">Mon-Sat: 10am — 7pm</p>
                <p>Sun: 11am — 5pm</p>
              </address>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Casa Wood Studio. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
