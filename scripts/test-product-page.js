/**
 * Test Product Page Directly
 * Run: node scripts/test-product-page.js
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

async function testProductPage() {
  const testSlugs = ['midnight-blue', 'ocean-wave', 'cherry-blossom', 'rose-garden'];
  
  console.log('🧪 Testing Product Page Queries...\n');
  
  for (const slug of testSlugs) {
    try {
      const query = `*[_type == "product" && slug.current == $slug][0]`;
      const product = await client.fetch(query, { slug });
      
      if (product) {
        console.log(`✅ "${slug}" - FOUND`);
        console.log(`   Name: ${product.name}`);
        console.log(`   Gender: ${product.gender}`);
        console.log(`   Price: $${product.price}`);
        console.log(`   URL: http://localhost:3000/product/${slug}\n`);
      } else {
        console.log(`❌ "${slug}" - NOT FOUND\n`);
      }
    } catch (error) {
      console.log(`❌ "${slug}" - ERROR: ${error.message}\n`);
    }
  }
  
  console.log('💡 If products show "FOUND" above but not on website:');
  console.log('   1. Open browser console (F12)');
  console.log('   2. Click on a product');
  console.log('   3. Check what slug is being passed');
  console.log('   4. Look for "SANITY QUERY DEBUG" logs\n');
}

testProductPage();
