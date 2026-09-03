import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString: connectionString.includes("?")
    ? connectionString.split("?")[0]
    : connectionString,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SEED_DATA = [
  {
    category: {
      name: "Dining Tables",
      slug: "dining-tables",
      description: "Handcrafted solid wood dining tables designed for memorable gatherings.",
    },
    products: [
      {
        name: "Artisan Live-Edge Dining Table",
        slug: "artisan-live-edge-dining-table",
        price: 2450,
        description: "Solid Sheesham wood live-edge dining table with industrial powder-coated steel legs. Each slab retains its natural tree edge curve.",
        material: "Solid Sheesham & Powder-coated Steel",
        dimensions: "210 x 95 x 76 cm",
        images: [
          "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800",
        ],
      },
      {
        name: "Nordic Minimalist Oak Table",
        slug: "nordic-minimalist-oak-table",
        price: 1850,
        description: "Clean Scandinavian aesthetics crafted from sustainable white oak with soft rounded edges and tapered legs.",
        material: "Solid White Oak",
        dimensions: "180 x 90 x 75 cm",
        images: [
          "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800",
        ],
      },
    ],
  },
  {
    category: {
      name: "Chairs & Seating",
      slug: "chairs-seating",
      description: "Ergonomic dining chairs, armchairs, and lounge seating.",
    },
    products: [
      {
        name: "Imperial Velvet Dining Chair Set",
        slug: "imperial-velvet-dining-chair-set",
        price: 890,
        description: "Pair of luxurious dining chairs upholstered in stain-resistant velvet fabric with brass-tipped solid teak legs.",
        material: "Teak Wood & Upholstered Velvet",
        dimensions: "52 x 58 x 86 cm",
        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800",
        ],
      },
      {
        name: "Kenshō Rattan Accent Armchair",
        slug: "kensho-rattan-accent-armchair",
        price: 640,
        description: "Hand-woven natural cane rattan armchair with solid ash wood framework and high-density foam cushion.",
        material: "Solid Ash Wood & Natural Cane",
        dimensions: "68 x 72 x 78 cm",
        images: [
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=800",
        ],
      },
    ],
  },
  {
    category: {
      name: "Living Room",
      slug: "living-room",
      description: "Sofas, coffee tables, and media units designed for sophisticated living.",
    },
    products: [
      {
        name: "Elysian Linen 3-Seater Sofa",
        slug: "elysian-linen-3-seater-sofa",
        price: 3200,
        description: "Deep-seated luxury sofa upholstered in breathable Belgian linen with feather-filled cushions and hidden hardwood frame.",
        material: "Belgian Linen & Solid Hardwood",
        dimensions: "230 x 98 x 82 cm",
        images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=800",
        ],
      },
      {
        name: "Kyoto Floating Coffee Table",
        slug: "kyoto-floating-coffee-table",
        price: 780,
        description: "Low-profile Japanese inspired round coffee table with open display tier and hand-oiled finish.",
        material: "Solid Walnut",
        dimensions: "100 x 100 x 38 cm",
        images: [
          "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
        ],
      },
      {
        name: "Solstice Brass & Teak Credenza",
        slug: "solstice-brass-teak-credenza",
        price: 1950,
        description: "Mid-century sideboard featuring hand-carved slat doors, brushed brass hardware, and integrated cable routing.",
        material: "Teak Wood & Brass Hardware",
        dimensions: "180 x 45 x 75 cm",
        images: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800",
        ],
      },
    ],
  },
  {
    category: {
      name: "Bedroom",
      slug: "bedroom",
      description: "Bed frames, nightstands, and wardrobes built from premium solid hardwoods.",
    },
    products: [
      {
        name: "Serengeti Canopied King Bed",
        slug: "serengeti-canopied-king-bed",
        price: 2890,
        description: "Architectural solid teak canopy bed frame with hand-sanded smooth posts and supportive slatted wooden base.",
        material: "Solid Teak Wood",
        dimensions: "215 x 195 x 210 cm",
        images: [
          "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1540518614846-7ede433c517a?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
        ],
      },
      {
        name: "Monolith Walnut Nightstand Pair",
        slug: "monolith-walnut-nightstand-pair",
        price: 720,
        description: "Set of 2 floating-look nightstands with soft-close drawers and warm integrated LED strip alcove.",
        material: "American Walnut & Soft-close Hardware",
        dimensions: "50 x 40 x 50 cm",
        images: [
          "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=800",
        ],
      },
      {
        name: "Aura 4-Door Hardwood Wardrobe",
        slug: "aura-4-door-hardwood-wardrobe",
        price: 3450,
        description: "Spacious master wardrobe with full-length interior mirror, velvet-lined jewelry drawer, and brass hanging rails.",
        material: "Solid Mango Wood & Brass",
        dimensions: "200 x 60 x 210 cm",
        images: [
          "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
        ],
      },
    ],
  },
];

async function seed() {
  console.log("🌱 Seeding Categories & 10 Sample Products with multi-images...\n");

  for (const group of SEED_DATA) {
    const category = await prisma.category.upsert({
      where: { slug: group.category.slug },
      update: { name: group.category.name, description: group.category.description },
      create: group.category,
    });

    console.log(`📁 Category: ${category.name}`);

    for (const prodData of group.products) {
      const product = await prisma.product.upsert({
        where: { slug: prodData.slug },
        update: {
          name: prodData.name,
          price: prodData.price,
          description: prodData.description,
          material: prodData.material,
          dimensions: prodData.dimensions,
          status: "ACTIVE",
          categoryId: category.id,
        },
        create: {
          name: prodData.name,
          slug: prodData.slug,
          price: prodData.price,
          description: prodData.description,
          material: prodData.material,
          dimensions: prodData.dimensions,
          status: "ACTIVE",
          categoryId: category.id,
        },
      });

      // Clear existing images for clean re-seed
      await prisma.productImage.deleteMany({ where: { productId: product.id } });

      // Add 2-3 images per product
      await prisma.productImage.createMany({
        data: prodData.images.map((url, idx) => ({
          productId: product.id,
          url,
          altText: `${product.name} view ${idx + 1}`,
          isPrimary: idx === 0,
          sortOrder: idx,
        })),
      });

      console.log(`   ✨ Created Product: ${product.name} (${prodData.images.length} images)`);
    }
  }

  console.log("\n✅ Successfully seeded categories and 10 multi-image products!");
  await pool.end();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
