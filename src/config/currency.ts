// Currency configuration for the application
export interface CurrencyConfig {
  symbol: string;
  code: string;
  locale: string;
  position: "before" | "after";
}

// Main currency configuration - change here to update across the entire app
export const CURRENCY_CONFIG: CurrencyConfig = {
  symbol: "Rs.",
  code: "Rs.",
  locale: "en-LK", // Sri Lankan English locale
  position: "before", // Rs 1,000 vs 1,000 Rs
};

// Utility functions for currency formatting
export const formatCurrency = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return CURRENCY_CONFIG.position === "before"
    ? `${CURRENCY_CONFIG.symbol} ${formattedAmount}`
    : `${formattedAmount} ${CURRENCY_CONFIG.symbol}`;
};

// Format currency for WhatsApp messages (simple format)
export const formatCurrencyForWhatsApp = (amount: number): string => {
  return `${CURRENCY_CONFIG.symbol} ${amount}`;
};

// Format currency range (e.g., "From Rs. 5,000")
export const formatCurrencyRange = (
  amount: number,
  prefix: string = "From"
): string => {
  return `${prefix} ${formatCurrency(amount)}`;
};

// Format service price string (for existing string-based prices)
export const formatServicePrice = (
  amount: number,
  prefix: string = "From"
): string => {
  return formatCurrencyRange(amount, prefix);
};

// Format savings amount
export const formatSavings = (
  originalPrice: number,
  currentPrice: number
): string => {
  const savings = originalPrice - currentPrice;
  return `Save ${formatCurrency(savings)}`;
};

// Get currency symbol only
export const getCurrencySymbol = (): string => {
  return CURRENCY_CONFIG.symbol;
};

// Get currency code only
export const getCurrencyCode = (): string => {
  return CURRENCY_CONFIG.code;
};
