import { ProductCategory } from "../types";

export const PRODUCT_CATEGORIES: ProductCategory[] = ["Food", "Cosmetic", "Medicine"];

export const CATEGORY_ICONS = {
  Food: "🥗",
  Cosmetic: "💄",
  Medicine: "💊",
} as const;

export const CATEGORY_COLORS = {
  Food: "bg-green-100 text-green-700",
  Cosmetic: "bg-pink-100 text-pink-700",
  Medicine: "bg-blue-100 text-blue-700",
} as const;


