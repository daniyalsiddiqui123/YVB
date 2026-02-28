/**
 * Seed Script - Adds Demo Products to Sanity
 * Run: node scripts/seed-products.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const demoProducts = [
  {
    _id: 'midnight-blue',
    _type: 'product',
    name: 'Midnight Blue',
    slug: {
      _type: 'slug',
      current: 'midnight-blue',
    },
    gender: 'men',
    price: 12999,
    description: 'A sophisticated fragrance for the modern man. Notes of bergamot, lavender, and sandalwood create an unforgettable scent that lasts all day.',
    bestseller: true,
    category: 'eau_de_parfum',
    inStock: true,
  },
  {
    _id: 'ocean-wave',
    _type: 'product',
    name: 'Ocean Wave',
    slug: {
      _type: 'slug',
      current: 'ocean-wave',
    },
    gender: 'men',
    price: 10999,
    description: 'Fresh aquatic notes with a hint of citrus. Perfect for daytime wear and summer occasions.',
    bestseller: false,
    category: 'eau_de_toilette',
    inStock: true,
  },
  {
    _id: 'cherry-blossom',
    _type: 'product',
    name: 'Cherry Blossom',
    slug: {
      _type: 'slug',
      current: 'cherry-blossom',
    },
    gender: 'women',
    price: 13999,
    description: 'An elegant floral fragrance with notes of cherry blossom, jasmine, and white musk. Perfect for any occasion.',
    bestseller: true,
    category: 'eau_de_parfum',
    inStock: true,
  },
  {
    _id: 'rose-garden',
    _type: 'product',
    name: 'Rose Garden',
    slug: {
      _type: 'slug',
      current: 'rose-garden',
    },
    gender: 'women',
    price: 11999,
    description: 'Romantic rose scent with hints of vanilla and amber. A timeless classic for the elegant woman.',
    bestseller: false,
    category: 'eau_de_toilette',
    inStock: true,
  },
];

async function seedProducts() {
  console.log('🌱 Starting to seed demo products...\n');

  for (const product of demoProducts) {
    try {
      const created = await client.createOrReplace(product);
      console.log(`✅ Created/Updated: ${product.name} (${product.gender}) - $${product.price}`);
    } catch (error) {
      console.error(`❌ Error creating ${product.name}:`, error.message);
    }
  }

  console.log('\n✨ Seeding complete!');
  console.log('\n🎉 Next steps:');
  console.log('1. Go to http://localhost:3000/men or /women');
  console.log('2. Click on any product');
  console.log('3. Test Add to Cart and Buy Now buttons!');
  console.log('\n💡 To add images, go to http://localhost:3333 and edit products\n');
}

seedProducts().catch(console.error);
