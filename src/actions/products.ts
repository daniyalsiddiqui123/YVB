import { client } from "@/lib/sanity";
import { Product } from "@/types";

export async function getAllProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    slug,
    gender,
    price,
    description,
    image,
    bestseller,
    category,
    inStock
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getBestSellingProducts(): Promise<Product[]> {
  const query = `*[_type == "product" && bestseller == true] | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    slug,
    gender,
    price,
    description,
    image,
    bestseller,
    category,
    inStock
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching best selling products:", error);
    return [];
  }
}

export async function getProductsByGender(gender: "men" | "women"): Promise<Product[]> {
  const query = `*[_type == "product" && gender == $gender] | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    slug,
    gender,
    price,
    description,
    image,
    bestseller,
    category,
    inStock
  }`;

  try {
    const products = await client.fetch(query, { gender });
    return products;
  } catch (error) {
    console.error("Error fetching products by gender:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  console.log("=== SANITY QUERY DEBUG ===");
  console.log("Looking for slug:", slug);
  
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  
  console.log("Query:", query);
  console.log("Params:", { slug });

  try {
    const product = await client.fetch(query, { slug });
    console.log("Result:", product ? `Found: ${product.name}` : "Not found");
    return product || null;
  } catch (error) {
    console.error("Sanity query error:", error);
    return null;
  }
}
