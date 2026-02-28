/**
 * Test if orders exist in Sanity
 * Run: node scripts/test-sanity-orders.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testOrders() {
  console.log('🔍 Testing Orders in Sanity...\n');
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
  console.log('');

  try {
    // Check if orders exist
    const query = `*[_type == "order"] | order(orderDate desc) {
      orderId,
      customerName,
      customerEmail,
      status,
      total,
      orderDate
    }`;

    const orders = await sanityClient.fetch(query);

    if (orders.length === 0) {
      console.log('❌ No orders found in Sanity!');
      console.log('\n💡 To create orders:');
      console.log('   1. Place an order on your website');
      console.log('   2. Check if order synced to Sanity');
      console.log('   3. Or manually create order in Sanity Studio');
    } else {
      console.log(`✅ Found ${orders.length} order(s) in Sanity:\n`);
      
      orders.forEach((order, i) => {
        console.log(`${i + 1}. Order #${order.orderId}`);
        console.log(`   Customer: ${order.customerName} (${order.customerEmail})`);
        console.log(`   Status: ${order.status}`);
        console.log(`   Total: Rs. ${order.total?.toLocaleString('en-PK')}`);
        console.log(`   Date: ${new Date(order.orderDate).toLocaleDateString('en-PK')}`);
        console.log('');
      });

      console.log('💡 To view/edit orders:');
      console.log('   Go to: http://localhost:3333');
      console.log('   Click "Orders" in sidebar');
    }
  } catch (error) {
    console.error('❌ Error fetching orders:', error.message);
  }
}

testOrders();
