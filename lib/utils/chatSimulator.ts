import { Product, UserProfile } from "../types";

/**
 * Stage 3: Chat Simulator (Mock)
 * Generates contextual AI responses based on product + profile
 */

interface ChatContext {
  product: Product;
  profile: UserProfile;
  risks: string[];
  isUnsafe: boolean;
}

export async function generateChatResponse(
  message: string,
  context: ChatContext
): Promise<string> {
  // Simulate processing delay
  await delay(800 + Math.random() * 700);
  
  const userMessage = message.toLowerCase();
  const { product, profile, risks, isUnsafe } = context;
  
  // Pattern matching for common questions
  
  // Can I/they consume/use it?
  if (
    userMessage.includes("can i") || 
    userMessage.includes("can she") || 
    userMessage.includes("can he") ||
    userMessage.includes("is it safe") ||
    userMessage.includes("should i")
  ) {
    if (isUnsafe) {
      return `No, ${product.name} is not safe for ${profile.name}. ${risks[0] || "It contains ingredients that conflict with the health profile"}. I strongly recommend avoiding this product.`;
    } else {
      return `Yes, ${product.name} is generally safe for ${profile.name}. However, ${risks.length > 0 ? `please note: ${risks[0]}.` : "consume in moderation as part of a balanced lifestyle."} `;
    }
  }
  
  // Why is it unsafe/risky?
  if (
    userMessage.includes("why") && 
    (userMessage.includes("unsafe") || userMessage.includes("risky") || userMessage.includes("bad"))
  ) {
    if (risks.length > 0) {
      return `${product.name} is flagged because: ${risks.join("; ")}. These factors make it unsuitable for ${profile.name}'s health profile.`;
    } else {
      return `Actually, ${product.name} appears to be safe for ${profile.name} based on the current analysis.`;
    }
  }
  
  // What are alternatives?
  if (userMessage.includes("alternative") || userMessage.includes("substitute") || userMessage.includes("instead")) {
    return generateAlternative(product, profile);
  }
  
  // Just a little bit?
  if (
    (userMessage.includes("little") || userMessage.includes("small")) && 
    (userMessage.includes("amount") || userMessage.includes("bit"))
  ) {
    if (isUnsafe && risks.some(r => r.toLowerCase().includes("allergy") || r.toLowerCase().includes("contraindication"))) {
      return `Even a small amount is risky. ${risks[0]}. It's best to completely avoid ${product.name} for ${profile.name}.`;
    } else if (isUnsafe) {
      return `A small amount occasionally might be okay, but it's not ideal. ${risks[0]}. I'd recommend finding a safer alternative if possible.`;
    } else {
      return `Yes, in small amounts it should be fine. Just be mindful of portion sizes and don't make it a daily habit.`;
    }
  }
  
  // Ingredients question
  if (userMessage.includes("ingredient") || userMessage.includes("contains")) {
    const ingredients = product.ingredients.slice(0, 5).join(", ");
    return `${product.name} contains: ${ingredients}${product.ingredients.length > 5 ? ", and more" : ""}. ${risks.length > 0 ? `The concern is: ${risks[0]}.` : "No major concerns with these ingredients for " + profile.name + "."}`;
  }
  
  // Nutrition question
  if (userMessage.includes("nutrition") || userMessage.includes("calories") || userMessage.includes("sugar") || userMessage.includes("sodium")) {
    if (product.nutrition) {
      return `Per ${product.nutrition.servingSize}: ${product.nutrition.calories} calories, ${product.nutrition.sugar} sugar, ${product.nutrition.sodium} sodium, ${product.nutrition.fat} fat. ${generateNutritionAdvice(product, profile)}`;
    } else {
      return `Nutritional information is not available for this ${product.category.toLowerCase()} product.`;
    }
  }
  
  // How to use
  if (userMessage.includes("how to use") || userMessage.includes("how much") || userMessage.includes("dosage")) {
    if (product.category === "Medicine" && product.medicineInfo) {
      return `${product.medicineInfo.purpose}. Dosage: ${product.medicineInfo.dosage}. Maximum daily limit: ${product.medicineInfo.maxDailyDose}. Always follow the instructions on the packaging or consult your doctor.`;
    } else if (product.category === "Food") {
      return `For ${product.name}, stick to ${product.nutrition?.servingSize || "the recommended serving size"}. ${risks.length > 0 ? `Due to ${profile.name}'s profile, limit to once or twice a week.` : "Enjoy as part of a balanced diet."}`;
    } else {
      return `Follow the usage instructions on the product label. For ${profile.name}, ${risks.length > 0 ? "use with caution and do a patch test first." : "it should be safe to use as directed."}`;
    }
  }
  
  // Side effects
  if (userMessage.includes("side effect") || userMessage.includes("reaction")) {
    if (product.category === "Medicine" && product.medicineInfo) {
      const effects = product.medicineInfo.sideEffects.join(", ");
      return `Possible side effects include: ${effects}. If ${profile.name} experiences any severe reactions, discontinue use and consult a doctor immediately.`;
    } else if (risks.length > 0) {
      return `For ${profile.name}, the main concern is: ${risks[0]}. Watch for any unusual symptoms or reactions after use.`;
    } else {
      return `No major side effects are expected for ${profile.name} with normal use. However, everyone reacts differently, so monitor for any unusual symptoms.`;
    }
  }
  
  // Expiry/storage
  if (userMessage.includes("expir") || userMessage.includes("storage") || userMessage.includes("store")) {
    return `${product.name} expires on ${product.expiryDate || "the date printed on the package"}. Store in a cool, dry place away from direct sunlight. ${product.category === "Food" ? "Refrigerate after opening if needed." : ""}`;
  }
  
  // Generic greeting
  if (
    userMessage.includes("hello") || 
    userMessage.includes("hi ") || 
    userMessage.includes("hey")
  ) {
    return `Hello! I'm here to help you understand ${product.name} and how it relates to ${profile.name}'s health profile. What would you like to know?`;
  }
  
  // Thank you
  if (userMessage.includes("thank")) {
    return `You're welcome! Feel free to ask if you have any other questions about ${product.name} or need help with other products.`;
  }
  
  // Default response
  return generateDefaultResponse(product, profile, risks);
}

// Helper functions

function generateAlternative(product: Product, profile: UserProfile): string {
  if (product.category === "Food") {
    if (product.name.includes("Jam")) {
      return `For ${profile.name}, consider sugar-free fruit spreads or fresh fruit puree. Brands like "Diabetic Choice" or homemade jam with natural sweeteners would be safer alternatives.`;
    } else if (product.name.includes("Noodles") || product.name.includes("Maggi")) {
      return `Try whole wheat pasta, vegetable-based noodles, or brands with lower sodium content. Homemade ramen with fresh ingredients is also a healthier option.`;
    } else if (product.name.includes("Milk")) {
      return `If dairy is a concern, try lactose-free milk, almond milk, oat milk, or soy milk. Choose unsweetened varieties for better health.`;
    } else if (product.name.includes("Dew") || product.name.toLowerCase().includes("soda")) {
      return `Switch to water, unsweetened sparkling water, fresh coconut water, or herbal teas. These are much healthier choices, especially for ${profile.name}.`;
    }
    return `Look for organic, low-sodium, low-sugar alternatives. Check stores like Whole Foods or specialty health food shops.`;
  } else if (product.category === "Cosmetic") {
    return `For ${profile.name}, consider products labeled "hypoallergenic," "fragrance-free," or "for sensitive skin." Brands like CeraVe, Cetaphil, or Vanicream are good options. Always do a patch test first.`;
  } else if (product.category === "Medicine") {
    return `I cannot recommend alternative medications. Please consult ${profile.name}'s doctor or pharmacist for safer options that won't conflict with the health conditions.`;
  }
  return `Consider consulting with a healthcare professional for personalized alternatives suitable for ${profile.name}.`;
}

function generateNutritionAdvice(product: Product, profile: UserProfile): string {
  if (!product.nutrition) return "";
  
  const advice: string[] = [];
  
  if (profile.chronicConditions.includes("Type 2 Diabetes") || profile.chronicConditions.includes("Type 1 Diabetes")) {
    const sugar = parseFloat(product.nutrition.sugar);
    if (sugar > 10) {
      advice.push("High sugar content - avoid or limit strictly");
    } else if (sugar > 5) {
      advice.push("Moderate sugar - consume occasionally");
    }
  }
  
  if (profile.chronicConditions.includes("Hypertension (High BP)")) {
    const sodium = parseFloat(product.nutrition.sodium);
    if (sodium > 300) {
      advice.push("High sodium - not recommended");
    } else if (sodium > 140) {
      advice.push("Moderate sodium - limit frequency");
    }
  }
  
  if (advice.length > 0) {
    return `For ${profile.name}: ${advice.join("; ")}.`;
  }
  
  return `Nutritionally acceptable for ${profile.name} in moderation.`;
}

function generateDefaultResponse(product: Product, profile: UserProfile, risks: string[]): string {
  const responses = [
    `I'm analyzing ${product.name} for ${profile.name}. ${risks.length > 0 ? `Key concern: ${risks[0]}.` : "No major health concerns detected."} What specific aspect would you like to know more about?`,
    `${product.name} by ${product.brand} is a ${product.category.toLowerCase()} product. ${risks.length > 0 ? `For ${profile.name}, please note: ${risks[0]}.` : `It appears safe for ${profile.name}.`} Any specific questions?`,
    `Based on ${profile.name}'s health profile, ${risks.length > 0 ? `${product.name} has some concerns: ${risks[0]}.` : `${product.name} should be safe to use.`} Would you like more details?`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


