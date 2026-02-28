/**
 * Debug: Check what's happening with product pages
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 ANALYZING PRODUCT PAGE ISSUE...\n');

// 1. Check if product page exists
const productPagePath = path.join(process.cwd(), 'src', 'app', 'product', '[slug]', 'page.tsx');
console.log('1. Product Page File:');
console.log('   Path:', productPagePath);
console.log('   Exists:', fs.existsSync(productPagePath));
console.log('');

// 2. Check men's page to see how products are linked
const mensPagePath = path.join(process.cwd(), 'src', 'app', 'men', 'page.tsx');
if (fs.existsSync(mensPagePath)) {
  const mensContent = fs.readFileSync(mensPagePath, 'utf8');
  console.log('2. Men\'s Page:');
  console.log('   Path:', mensPagePath);
  console.log('   Uses ProductCard:', mensContent.includes('ProductCard'));
  console.log('   Fetches from Sanity:', mensContent.includes('getProductsByGender'));
  console.log('');
}

// 3. Check ProductCard component
const productCardPath = path.join(process.cwd(), 'src', 'components', 'ProductCard.tsx');
if (fs.existsSync(productCardPath)) {
  const cardContent = fs.readFileSync(productCardPath, 'utf8');
  console.log('3. ProductCard Component:');
  console.log('   Path:', productCardPath);
  
  // Check how link is generated
  const linkMatch = cardContent.match(/href={`\/product\/\$\{([^}]+)\}`}/);
  if (linkMatch) {
    console.log('   ✅ Link generated as: /product/${' + linkMatch[1] + '}');
  } else {
    console.log('   ❌ Link pattern not found!');
  }
  
  // Check what slug variable is used
  const slugMatch = cardContent.match(/const (productSlug|slug) = ([^;]+);/);
  if (slugMatch) {
    console.log('   ✅ Slug variable:', slugMatch[0]);
  }
  console.log('');
}

// 4. Check if products exist in Sanity
console.log('4. Testing Sanity Connection...');
import('dotenv').then((dotenv) => {
  dotenv.config();
  
  import('@sanity/client').then(({ createClient }) => {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: process.env.SANITY_API_TOKEN,
      apiVersion: '2024-01-01',
      useCdn: false,
    });
    
    client.fetch('*[_type == "product"][0..5]').then((products) => {
      console.log('   ✅ Found', products.length, 'products in Sanity\n');
      
      products.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name}`);
        console.log(`      ID: ${p._id}`);
        console.log(`      Slug: ${p.slug?.current}`);
        console.log(`      Gender: ${p.gender}`);
        console.log(`      Expected URL: /product/${p.slug?.current}`);
        console.log('');
      });
      
      console.log('💡 CONCLUSION:');
      console.log('   - If products exist above, Sanity is working ✅');
      console.log('   - Check browser console when clicking product');
      console.log('   - Look for the slug value being passed');
      console.log('   - Make sure dev server is running (npm run dev)');
      
    }).catch((err) => {
      console.log('   ❌ Error fetching products:', err.message);
    });
  }).catch(() => {
    console.log('   ⚠️  Cannot import Sanity client');
  });
}).catch(() => {
  console.log('   ⚠️  Cannot load dotenv');
});
