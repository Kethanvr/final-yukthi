import { ProductCategory } from "../types";
import { 
  BeakerIcon, 
  SparklesIcon, 
  HeartIcon 
} from "@heroicons/react/24/outline";

export const PRODUCT_CATEGORIES: ProductCategory[] = ["Food", "Cosmetic", "Medicine"];

export const CATEGORY_ICONS = {
  Food: "🥗",
  Cosmetic: "💄",
  Medicine: "💊",
} as const;

export const CATEGORY_HEROICONS = {
  Food: BeakerIcon,
  Cosmetic: SparklesIcon,
  Medicine: HeartIcon,
} as const;

export const CATEGORY_COLORS = {
  Food: "bg-green-100 text-green-700",
  Cosmetic: "bg-pink-100 text-pink-700",
  Medicine: "bg-blue-100 text-blue-700",
} as const;


