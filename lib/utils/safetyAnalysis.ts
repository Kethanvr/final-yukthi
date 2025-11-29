import { Product, UserProfile, ScanResult, SafetyVerdict, DataPoint, SafetyBadge } from "../types";

/**
 * Stage 2: Safety Analyst (Mock)
 * Compares product data against user profile to generate safety verdict
 */

export function analyzeSafety(product: Product, profile: UserProfile): ScanResult {
  const dataPoints: DataPoint[] = [];
  let riskScore = 0; // 0 = no risk, 100 = maximum risk
  let criticalIssues: string[] = [];
  let warnings: string[] = [];
  let recommendations: string[] = [];
  
  // ALLERGY CHECKS (Critical)
  if (product.category === "Food") {
    checkFoodAllergies(product, profile, dataPoints, criticalIssues);
  } else if (product.category === "Cosmetic") {
    checkCosmeticAllergies(product, profile, dataPoints, criticalIssues);
  } else if (product.category === "Medicine") {
    checkDrugAllergies(product, profile, dataPoints, criticalIssues);
  }
  
  // CONDITION-SPECIFIC CHECKS
  if (product.category === "Food") {
    checkFoodConditions(product, profile, dataPoints, warnings, recommendations);
  } else if (product.category === "Cosmetic") {
    checkCosmeticConditions(product, profile, dataPoints, warnings, recommendations);
  } else if (product.category === "Medicine") {
    checkMedicineConditions(product, profile, dataPoints, warnings, recommendations);
  }
  
  // LIFE STAGE CHECKS
  checkLifeStageCompatibility(product, profile, dataPoints, criticalIssues, warnings);
  
  // Calculate risk score
  riskScore = calculateRiskScore(dataPoints);
  
  // Determine badge
  const badge: SafetyBadge = determineBadge(riskScore, criticalIssues.length);
  
  // Generate summary
  const summaryText = generateSummary(product, profile, badge, criticalIssues, warnings);
  
  // Generate recommendation
  const recommendation = generateRecommendation(badge, criticalIssues, warnings, recommendations);
  
  const verdict: SafetyVerdict = {
    badge,
    score: Math.max(0, 100 - riskScore),
    summaryText,
    recommendation,
  };
  
  const scanResult: ScanResult = {
    id: `scan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    productId: product.id,
    product,
    profileId: profile.id,
    profileName: profile.name,
    category: product.category,
    verdict,
    dataPoints,
    scannedAt: new Date().toISOString(),
  };
  
  return scanResult;
}

// Food Allergy Checks
function checkFoodAllergies(
  product: Product,
  profile: UserProfile,
  dataPoints: DataPoint[],
  criticalIssues: string[]
): void {
  const ingredientsLower = product.ingredients.map((i) => i.toLowerCase());
  
  profile.foodAllergies.forEach((allergen) => {
    const allergenLower = allergen.toLowerCase();
    const found = ingredientsLower.some((ing) => ing.includes(allergenLower) || 
      (allergen === "Peanuts" && ing.includes("groundnut")) ||
      (allergen === "Dairy/Lactose" && (ing.includes("milk") || ing.includes("whey") || ing.includes("lactose"))) ||
      (allergen === "Gluten/Wheat" && (ing.includes("wheat") || ing.includes("gluten")))
    );
    
    if (found) {
      dataPoints.push({
        label: "Allergen Detected",
        value: allergen,
        status: "CRITICAL",
        explanation: `Contains ${allergen}, which you are allergic to.`,
      });
      criticalIssues.push(`Contains allergen: ${allergen}`);
    }
  });
  
  // Dietary preference check
  if (profile.dietaryPreferences.includes("Vegetarian") && product.fssai && !product.fssai.isVeg) {
    dataPoints.push({
      label: "Dietary Conflict",
      value: "Non-Vegetarian",
      status: "CRITICAL",
      explanation: "This is a non-vegetarian product.",
    });
    criticalIssues.push("Non-vegetarian product");
  }
}

// Food Condition Checks
function checkFoodConditions(
  product: Product,
  profile: UserProfile,
  dataPoints: DataPoint[],
  warnings: string[],
  recommendations: string[]
): void {
  if (!product.nutrition) return;
  
  // Diabetes check
  if (profile.chronicConditions.includes("Type 1 Diabetes") || 
      profile.chronicConditions.includes("Type 2 Diabetes")) {
    const sugarAmount = parseFloat(product.nutrition.sugar);
    if (sugarAmount > 10) {
      dataPoints.push({
        label: "Sugar Content",
        value: product.nutrition.sugar,
        status: "HIGH_RISK",
        explanation: "High sugar content - risky for diabetic profile.",
      });
      warnings.push(`High sugar (${product.nutrition.sugar})`);
      recommendations.push("Choose sugar-free alternatives.");
    } else if (sugarAmount > 5) {
      dataPoints.push({
        label: "Sugar Content",
        value: product.nutrition.sugar,
        status: "WARNING",
        explanation: "Moderate sugar - consume in limited quantities.",
      });
      warnings.push("Moderate sugar content");
      recommendations.push("Limit to 1 serving per day.");
    }
  }
  
  // Hypertension check
  if (profile.chronicConditions.includes("Hypertension (High BP)")) {
    const sodiumAmount = parseFloat(product.nutrition.sodium);
    if (sodiumAmount > 300) {
      dataPoints.push({
        label: "Sodium Content",
        value: product.nutrition.sodium,
        status: "HIGH_RISK",
        explanation: "High sodium - dangerous for high blood pressure.",
      });
      warnings.push(`High sodium (${product.nutrition.sodium})`);
      recommendations.push("Avoid this product. Choose low-sodium alternatives.");
    } else if (sodiumAmount > 140) {
      dataPoints.push({
        label: "Sodium Content",
        value: product.nutrition.sodium,
        status: "WARNING",
        explanation: "Moderate sodium - limit consumption.",
      });
      warnings.push("Moderate sodium content");
    }
  }
  
  // Heart disease check
  if (profile.chronicConditions.includes("Heart Disease")) {
    const satFat = parseFloat(product.nutrition.saturatedFat);
    if (satFat > 5) {
      dataPoints.push({
        label: "Saturated Fat",
        value: product.nutrition.saturatedFat,
        status: "HIGH_RISK",
        explanation: "High saturated fat - risky for heart health.",
      });
      warnings.push("High saturated fat");
      recommendations.push("Choose low-fat alternatives.");
    }
  }
  
  // Additives check
  if (product.additives && product.additives.length > 0) {
    const artificialColors = product.additives.filter((a) => a.type.includes("Color"));
    if (artificialColors.length > 0) {
      dataPoints.push({
        label: "Artificial Colors",
        value: artificialColors.map((a) => a.code).join(", "),
        status: "WARNING",
        explanation: "Contains artificial colors which may cause reactions in sensitive individuals.",
      });
    }
  }
}

// Cosmetic Allergy Checks
function checkCosmeticAllergies(
  product: Product,
  profile: UserProfile,
  dataPoints: DataPoint[],
  criticalIssues: string[]
): void {
  const ingredientsLower = product.ingredients.map((i) => i.toLowerCase());
  
  profile.cosmeticAllergies.forEach((allergen) => {
    const allergenLower = allergen.toLowerCase();
    const found = ingredientsLower.some((ing) => 
      (allergen === "Fragrance/Perfume" && (ing.includes("fragrance") || ing.includes("parfum"))) ||
      (allergen === "Parabens" && ing.includes("paraben")) ||
      (allergen === "Sulfates (SLS/SLES)" && (ing.includes("sulfate") || ing.includes("sls"))) ||
      ing.includes(allergenLower)
    );
    
    if (found) {
      dataPoints.push({
        label: "Cosmetic Allergen",
        value: allergen,
        status: "CRITICAL",
        explanation: `Contains ${allergen}, which may cause skin reactions.`,
      });
      criticalIssues.push(`Contains: ${allergen}`);
    }
  });
}

// Cosmetic Condition Checks
function checkCosmeticConditions(
  product: Product,
  profile: UserProfile,
  dataPoints: DataPoint[],
  warnings: string[],
  recommendations: string[]
): void {
  if (!product.cosmeticInfo) return;
  
  // Acne-prone check
  if (profile.dermatologicalConditions.includes("Acne-Prone")) {
    if (product.cosmeticInfo.comedogenicRating > 2) {
      dataPoints.push({
        label: "Comedogenic Rating",
        value: `${product.cosmeticInfo.comedogenicRating}/5`,
        status: "HIGH_RISK",
        explanation: "May clog pores and worsen acne.",
      });
      warnings.push("May cause breakouts");
      recommendations.push("Choose non-comedogenic products.");
    }
  }
  
  // Dry skin check
  if (profile.skinType === "Dry" || profile.dermatologicalConditions.includes("Eczema")) {
    const hasDryingIngredients = product.ingredients.some((ing) => 
      ing.toLowerCase().includes("alcohol denat") || 
      ing.toLowerCase().includes("isopropyl alcohol")
    );
    
    if (hasDryingIngredients || product.cosmeticInfo.hasSulfates) {
      dataPoints.push({
        label: "Drying Ingredients",
        value: "Detected",
        status: "WARNING",
        explanation: "May dry out skin further.",
      });
      warnings.push("Contains drying ingredients");
      recommendations.push("Use hydrating products instead.");
    }
  }
  
  // Sensitive skin check
  if (profile.skinSensitivity === "High" || profile.dermatologicalConditions.includes("Sensitive Skin")) {
    if (product.cosmeticInfo.fragranceType === "Synthetic") {
      dataPoints.push({
        label: "Synthetic Fragrance",
        value: "Present",
        status: "WARNING",
        explanation: "May irritate sensitive skin.",
      });
      warnings.push("Contains synthetic fragrance");
    }
  }
}

// Drug Allergy Checks
function checkDrugAllergies(
  product: Product,
  profile: UserProfile,
  dataPoints: DataPoint[],
  criticalIssues: string[]
): void {
  if (!product.medicineInfo) return;
  
  const activeIngredientLower = product.medicineInfo.activeIngredient.toLowerCase();
  const ingredientsLower = product.ingredients.map((i) => i.toLowerCase());
  
  profile.drugAllergies.forEach((allergen) => {
    const allergenLower = allergen.toLowerCase();
    const found = 
      activeIngredientLower.includes(allergenLower) ||
      (allergen === "Aspirin/NSAIDs" && (activeIngredientLower.includes("aspirin") || 
       activeIngredientLower.includes("ibuprofen") || activeIngredientLower.includes("naproxen"))) ||
      ingredientsLower.some((ing) => ing.includes(allergenLower));
    
    if (found) {
      dataPoints.push({
        label: "Drug Allergy",
        value: allergen,
        status: "CRITICAL",
        explanation: `Contains ${allergen}. DO NOT TAKE.`,
      });
      criticalIssues.push(`Drug allergy: ${allergen}`);
    }
  });
}

// Medicine Condition Checks
function checkMedicineConditions(
  product: Product,
  profile: UserProfile,
  dataPoints: DataPoint[],
  warnings: string[],
  recommendations: string[]
): void {
  if (!product.medicineInfo) return;
  
  // Check contraindications
  profile.chronicConditions.forEach((condition) => {
    const hasContraindication = product.medicineInfo!.contraindications.some((contra) =>
      contra.toLowerCase().includes(condition.toLowerCase()) ||
      (condition.includes("Diabetes") && contra.toLowerCase().includes("diabetes")) ||
      (condition.includes("Hypertension") && (contra.toLowerCase().includes("blood pressure") || 
       contra.toLowerCase().includes("hypertension")))
    );
    
    if (hasContraindication) {
      dataPoints.push({
        label: "Contraindication",
        value: condition,
        status: "CRITICAL",
        explanation: `Not recommended for ${condition}. Consult doctor.`,
      });
      warnings.push(`Contraindicated for ${condition}`);
      recommendations.push("Consult your doctor before taking this medication.");
    }
  });
  
  // Check sugar content for diabetics
  if ((profile.chronicConditions.includes("Type 1 Diabetes") || 
       profile.chronicConditions.includes("Type 2 Diabetes")) &&
      product.medicineInfo.sugarContent) {
    dataPoints.push({
      label: "Sugar in Medicine",
      value: product.medicineInfo.sugarContent,
      status: "WARNING",
      explanation: "Syrup contains sugar - monitor blood glucose.",
    });
    warnings.push("Contains sugar");
    recommendations.push("Ask pharmacist for sugar-free alternative.");
  }
  
  // Check sodium content for hypertension
  if (profile.chronicConditions.includes("Hypertension (High BP)") &&
      product.medicineInfo.sodiumContent) {
    dataPoints.push({
      label: "Sodium in Medicine",
      value: product.medicineInfo.sodiumContent,
      status: "WARNING",
      explanation: "Contains sodium - may affect blood pressure.",
    });
    warnings.push("Contains sodium");
  }
}

// Life Stage Compatibility
function checkLifeStageCompatibility(
  product: Product,
  profile: UserProfile,
  dataPoints: DataPoint[],
  criticalIssues: string[],
  warnings: string[]
): void {
  // Baby checks
  if (profile.isBaby) {
    if (product.category === "Food") {
      // Honey check
      const hasHoney = product.ingredients.some((ing) => ing.toLowerCase().includes("honey"));
      if (hasHoney) {
        dataPoints.push({
          label: "Honey Detected",
          value: "UNSAFE FOR BABIES",
          status: "CRITICAL",
          explanation: "Honey is dangerous for infants under 1 year (botulism risk).",
        });
        criticalIssues.push("Contains honey - unsafe for babies");
      }
      
      // Sodium Benzoate check
      const hasSodiumBenzoate = product.ingredients.some((ing) => 
        ing.toLowerCase().includes("sodium benzoate")
      );
      if (hasSodiumBenzoate) {
        dataPoints.push({
          label: "Preservative",
          value: "Sodium Benzoate",
          status: "HIGH_RISK",
          explanation: "Not recommended for babies.",
        });
        criticalIssues.push("Contains sodium benzoate");
      }
    } else if (product.category === "Cosmetic") {
      if (!product.cosmeticInfo?.isBabySafe) {
        dataPoints.push({
          label: "Baby Safety",
          value: "Not Baby-Safe",
          status: "HIGH_RISK",
          explanation: "This product is not formulated for babies.",
        });
        warnings.push("Not baby-safe formulation");
      }
    } else if (product.category === "Medicine") {
      const hasAgeRestriction = product.medicineInfo!.contraindications.some((contra) =>
        contra.toLowerCase().includes("children under") || 
        contra.toLowerCase().includes("infants")
      );
      if (hasAgeRestriction) {
        dataPoints.push({
          label: "Age Restriction",
          value: "Not for Infants",
          status: "CRITICAL",
          explanation: "This medication is not safe for babies.",
        });
        criticalIssues.push("Age-restricted medication");
      }
    }
  }
  
  // Pregnancy checks
  if (profile.isPregnant) {
    if (product.category === "Cosmetic" && product.cosmeticInfo) {
      if (!product.cosmeticInfo.isPregnancySafe) {
        const hasRetinol = product.ingredients.some((ing) => 
          ing.toLowerCase().includes("retinol") || ing.toLowerCase().includes("retinoid")
        );
        const hasSalicylic = product.ingredients.some((ing) => 
          ing.toLowerCase().includes("salicylic")
        );
        
        if (hasRetinol || hasSalicylic) {
          dataPoints.push({
            label: "Pregnancy Safety",
            value: "NOT SAFE",
            status: "CRITICAL",
            explanation: hasRetinol ? "Retinol is unsafe during pregnancy." : 
                        "Salicylic acid should be avoided during pregnancy.",
          });
          criticalIssues.push(hasRetinol ? "Contains Retinol" : "Contains Salicylic Acid");
        }
      }
    } else if (product.category === "Medicine") {
      const pregnancyContra = product.medicineInfo!.contraindications.some((contra) =>
        contra.toLowerCase().includes("pregnancy")
      );
      if (pregnancyContra) {
        dataPoints.push({
          label: "Pregnancy Contraindication",
          value: "Not Safe",
          status: "CRITICAL",
          explanation: "This medication is contraindicated during pregnancy.",
        });
        criticalIssues.push("Contraindicated in pregnancy");
      }
    }
  }
}

// Calculate overall risk score
function calculateRiskScore(dataPoints: DataPoint[]): number {
  let score = 0;
  
  dataPoints.forEach((dp) => {
    switch (dp.status) {
      case "CRITICAL":
        score += 40;
        break;
      case "HIGH_RISK":
        score += 25;
        break;
      case "WARNING":
        score += 10;
        break;
      case "SAFE":
        score += 0;
        break;
    }
  });
  
  return Math.min(score, 100);
}

// Determine badge
function determineBadge(riskScore: number, criticalCount: number): SafetyBadge {
  if (criticalCount > 0 || riskScore > 60) {
    return "UNSAFE";
  } else if (riskScore > 30) {
    return "CAUTION";
  } else {
    return "SAFE";
  }
}

// Generate summary
function generateSummary(
  product: Product,
  profile: UserProfile,
  badge: SafetyBadge,
  criticalIssues: string[],
  warnings: string[]
): string {
  if (badge === "UNSAFE") {
    if (criticalIssues.length > 0) {
      return `UNSAFE for ${profile.name}. ${criticalIssues[0]}.`;
    }
    return `Not recommended for ${profile.name} due to health profile conflicts.`;
  } else if (badge === "CAUTION") {
    if (warnings.length > 0) {
      return `Use with CAUTION. ${warnings[0]} - limit consumption.`;
    }
    return `Safe for ${profile.name} but use in moderation.`;
  } else {
    return `SAFE for ${profile.name}. No major health concerns detected.`;
  }
}

// Generate recommendation
function generateRecommendation(
  badge: SafetyBadge,
  criticalIssues: string[],
  warnings: string[],
  recommendations: string[]
): string {
  if (badge === "UNSAFE") {
    if (recommendations.length > 0) {
      return recommendations[0];
    }
    return "Avoid this product. Look for safer alternatives.";
  } else if (badge === "CAUTION") {
    if (recommendations.length > 0) {
      return recommendations[0];
    }
    return "Consume in limited quantities. Monitor for any adverse effects.";
  } else {
    return "This product is safe for your profile. Enjoy in moderation as part of a balanced lifestyle.";
  }
}


