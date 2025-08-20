// WhatsApp Business utility functions
import { WHATSAPP_BUSINESS_CONFIG } from "@/config/whatsapp";

export interface WhatsAppConfig {
  businessNumber: string; // WhatsApp Business number without + sign
  baseUrl: string;
}

// WhatsApp Business configuration
const WHATSAPP_CONFIG: WhatsAppConfig = {
  businessNumber: WHATSAPP_BUSINESS_CONFIG.phoneNumber,
  baseUrl: WHATSAPP_BUSINESS_CONFIG.whatsappBaseUrl,
};

// Product ordering via WhatsApp
export const orderProductViaWhatsApp = (
  productName: string,
  productPrice: number,
  productId: number
) => {
  const message = `Hello! I'm interested in ordering the following product:

📦 Product: ${productName}
💰 Price: $${productPrice}
🆔 Product ID: ${productId}

Could you please provide more information about availability and delivery options?

Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.businessNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};

// Service booking via WhatsApp
export const bookServiceViaWhatsApp = (
  serviceName: string,
  servicePrice: string,
  serviceDuration: string
) => {
  const message = `Hello! I would like to book the following service:

🔮 Service: ${serviceName}
💰 Price: ${servicePrice}
⏰ Duration: ${serviceDuration}

Could you please help me schedule an appointment at a convenient time?

Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.businessNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};

// General inquiry via WhatsApp
export const contactViaWhatsApp = (
  subject?: string,
  customMessage?: string
) => {
  let message =
    "Hello! I'm interested in your Ayurvedic products and services.";

  if (subject && customMessage) {
    message = `Hello! I have an inquiry about: ${subject}

${customMessage}

Thank you!`;
  } else if (subject) {
    message = `Hello! I have an inquiry about: ${subject}

Could you please provide more information?

Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.businessNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};

// Emergency consultation via WhatsApp
export const emergencyConsultationViaWhatsApp = () => {
  const message = `🚨 EMERGENCY CONSULTATION REQUEST 🚨

Hello! I need urgent Ayurvedic consultation. This is a critical wellness concern that requires immediate attention.

Please connect me with an available doctor as soon as possible.

Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.businessNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};

// Bulk product inquiry via WhatsApp
export const bulkProductInquiryViaWhatsApp = (
  products: Array<{
    name: string;
    price: number;
    id: number;
    quantity?: number;
  }>
) => {
  const productList = products
    .map(
      (product, index) =>
        `${index + 1}. ${product.name} - $${product.price}${
          product.quantity ? ` (Qty: ${product.quantity})` : ""
        }`
    )
    .join("\n");

  const message = `Hello! I'm interested in the following products:

${productList}

Could you please provide:
- Total cost calculation
- Availability status
- Delivery options
- Any bulk discounts available

Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.businessNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};

// Update WhatsApp business number (for admin use)
export const updateWhatsAppNumber = (newNumber: string): WhatsAppConfig => {
  WHATSAPP_CONFIG.businessNumber = newNumber.replace(/\+/g, "");
  return WHATSAPP_CONFIG;
};

// Get current WhatsApp configuration
export const getWhatsAppConfig = (): WhatsAppConfig => {
  return { ...WHATSAPP_CONFIG };
};
