import { Product } from "../types";
import { getAllProducts, mockProducts } from "../mockData/products";

/**
 * Stage 1: Product Extractor (Mock)
 * Simulates Gemini Vision + Google Search extracting product data
 */

// Simulate extraction with delay
export async function extractProductData(imageFile: File | null): Promise<Product | null> {
  // Simulate processing time (2-3 seconds)
  await delay(2000 + Math.random() * 1000);
  
  // For demo purposes, randomly select a product
  // In a real app, this would use OCR + AI to identify the product
  const products = getAllProducts();
  
  // 90% success rate
  if (Math.random() < 0.9) {
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  }
  
  // 10% chance of "not recognized"
  return null;
}

// Simulate extraction by product name (for search/manual entry)
export async function extractProductByName(productName: string): Promise<Product | null> {
  await delay(1000);
  
  const lowerName = productName.toLowerCase();
  const product = mockProducts.find((p) => 
    p.name.toLowerCase().includes(lowerName) ||
    p.brand.toLowerCase().includes(lowerName)
  );
  
  return product || null;
}

// Simulate extraction by product ID (for history re-analysis)
export function getProductDataById(productId: string): Product | null {
  const product = mockProducts.find((p) => p.id === productId);
  return product || null;
}

// Helper delay function
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simulate camera capture (returns a mock file)
export async function captureProductImage(): Promise<File | null> {
  await delay(500);
  
  // Create a mock file
  const blob = new Blob(['mock image data'], { type: 'image/jpeg' });
  return new File([blob], 'product-photo.jpg', { type: 'image/jpeg' });
}

