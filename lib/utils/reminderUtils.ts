import { ScanResult, Reminder } from "../types";

/**
 * Generate a reminder from a scan result
 * Only generates reminders for Food category products with expiry dates (packed food)
 * Returns null if product is unpacked or not food
 */
export function generateReminderFromScan(scanResult: ScanResult): Reminder | null {
  const { product, id: scanId } = scanResult;

  // Only generate reminders for Food category
  if (product.category !== "Food") {
    return null;
  }

  // Only generate if product has expiry date (packed food)
  if (!product.expiryDate) {
    return null;
  }

  // Calculate days until expiry
  const today = new Date();
  const expiryDate = new Date(product.expiryDate);
  const diffTime = expiryDate.getTime() - today.getTime();
  const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Determine urgency
  let urgency: "urgent" | "upcoming" | "safe";
  if (daysUntilExpiry <= 7) {
    urgency = "urgent";
  } else if (daysUntilExpiry <= 30) {
    urgency = "upcoming";
  } else {
    urgency = "safe";
  }

  // Create reminder
  const reminder: Reminder = {
    id: `reminder-${scanId}`,
    type: "expiry",
    productId: product.id,
    productName: product.name,
    description: `Expires in ${daysUntilExpiry} days`,
    dueDate: product.expiryDate,
    isCompleted: false,
    createdAt: scanResult.scannedAt,
    // New fields
    scanId: scanId,
    productImageUrl: product.imageUrl,
    isPacked: true, // Has expiry date, so it's packed
  };

  return reminder;
}

/**
 * Generate reminders from multiple scan results
 * Filters for Food category with expiry dates only
 */
export function generateRemindersFromScans(scanResults: ScanResult[]): Reminder[] {
  const reminders: Reminder[] = [];

  for (const scanResult of scanResults) {
    const reminder = generateReminderFromScan(scanResult);
    if (reminder) {
      reminders.push(reminder);
    }
  }

  return reminders;
}

