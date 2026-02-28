/**
 * Test Sanity Connection & Products
 * Run: node scripts/test-sanity.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing Sanity Connection...\n');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('Has Token:', !!process.env.SANITY_API_TOKEN);
console.log('');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testConnection() {
  try {
    // Test 1: Check if we can connect
    console.log('✅ Testing connection...');
    const ping = await client.fetch('*[_type == "product"][0..5]');
    
    console.log('✅ Connection successful!\n');
    console.log(`📦 Found ${ping.length} products:\n`);
    
    if (ping.length === 0) {
      console.log('❌ No products found in Sanity!');
      console.log('\n💡 Run the seed script first:');
      console.log('   node scripts/seed-products.js\n');
    } else {
      ping.forEach((product, i) => {
        console.log(`${i + 1}. ${product.name}`);
        console.log(`   Slug: ${product.slug?.current}`);
        console.log(`   Gender: ${product.gender}`);
        console.log(`   Price: $${product.price}`);
        console.log('');
      });
      
      console.log('✅ Products exist in Sanity!');
      console.log('\n🎉 Now test your website:');
      console.log('   1. Go to http://localhost:3000/men');
      console.log('   2. Click on a product');
      console.log('   3. Product detail page should open!\n');
    }
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Check your .env.local file:');
    console.log('   - NEXT_PUBLIC_SANITY_PROJECT_ID must be set');
    console.log('   - NEXT_PUBLIC_SANITY_DATASET must be set');
    console.log('   - SANITY_API_TOKEN must be set\n');
  }
}

testConnection();
