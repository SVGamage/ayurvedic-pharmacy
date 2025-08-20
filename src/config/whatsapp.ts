// Configuration file for WhatsApp integration
// Update this file to change the WhatsApp number across the entire application

export const WHATSAPP_CONFIG = {
  // WhatsApp phone number (without + sign for wa.me links)
  // Format: Country code + Area code + Number (no spaces, dashes, or parentheses)
  // Example: "15551234567" for +1 (555) 123-4567
  phoneNumber: "94702048015",

  // Formatted display number for UI (with formatting for readability)
  displayNumber: "+94 (070) 204-8015",

  // Business name for WhatsApp messages
  businessName: "AyurVeda Pharmacy",

  // WhatsApp Web/API base URL
  // Using api.whatsapp.com forces regular WhatsApp instead of business detection
  whatsappBaseUrl: "https://api.whatsapp.com/send?phone=",

  // Default messages for different scenarios
  defaultMessages: {
    productOrder: "Hello! I'm interested in ordering the following product:",
    serviceBooking: "Hello! I would like to book the following service:",
    generalInquiry:
      "Hello! I'm interested in your Ayurvedic products and services.",
    emergency:
      "🚨 EMERGENCY CONSULTATION REQUEST 🚨\n\nHello! I need urgent Ayurvedic consultation.",
  },
} as const;

// Helper function to validate phone number format
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Check if phone number contains only digits and is between 10-15 characters
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phoneNumber);
};

// Helper function to format phone number for display
export const formatPhoneForDisplay = (phoneNumber: string): string => {
  // This is a simple US phone number formatter
  // Adjust this function based on your country's phone number format
  if (phoneNumber.length === 11 && phoneNumber.startsWith("1")) {
    return `+1 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(
      4,
      7
    )}-${phoneNumber.slice(7)}`;
  }
  return phoneNumber;
};
