# WhatsApp Integration

## ⚙️ Configuration

### Update WhatsApp Number

To change the WhatsApp number, edit the configuration file:

````typescript
// src/config/whatsapp.ts
export const WHATSAPP_CONFIG = {
  phoneNumber: "94702048015", // Replace with your number (no + sign)
  displayNumber: "+94 (070) 204-8015", // Replace with formatted display
  // ... other settings
}
```c Pharmacy website has been fully integrated with WhatsApp for all product ordering and service booking functionality.

## 🚀 Features

### Product Ordering

- All "Add to Cart" buttons now route directly to WhatsApp
- Products include name, price, and ID in the WhatsApp message
- Quick order functionality available on product cards

### Service Booking

- All service booking buttons route to WhatsApp Business
- Service details include name, price, and duration in messages
- Works for both Ayurvedic consultations and Nakshatra services

### Contact Integration

- WhatsApp Business number displayed in footer and contact page
- Emergency consultation button routes to WhatsApp
- Contact form includes "WhatsApp" option alongside email
- Floating WhatsApp button on all pages

## ⚙️ Configuration

### Update WhatsApp Business Number

To change the WhatsApp Business number, edit the configuration file:

```typescript
// src/config/whatsapp.ts
export const WHATSAPP_BUSINESS_CONFIG = {
  phoneNumber: "15551234567", // Replace with your number (no + sign)
  displayNumber: "+1 (555) 123-4567", // Replace with formatted display
  // ... other settings
};
````

### Message Templates

The system includes pre-configured message templates for:

- Product orders
- Service bookings
- General inquiries
- Emergency consultations

Edit these in `src/config/whatsapp.ts` under `defaultMessages`.

## 📱 WhatsApp Message Examples

### Product Order

```
Hello! I'm interested in ordering the following product:

📦 Product: Ashwagandha Powder
💰 Price: $24.99
🆔 Product ID: 1

Could you please provide more information about availability and delivery options?

Thank you!
```

### Service Booking

```
Hello! I would like to book the following service:

🔮 Service: In-Person Consultation
💰 Price: From $75
⏰ Duration: 60 minutes

Could you please help me schedule an appointment at a convenient time?

Thank you!
```

## 🔧 Technical Implementation

### Components Updated

- `ProductCard` - Routing orders to WhatsApp
- `ServiceCard` - Routing bookings to WhatsApp
- `Footer` - Added WhatsApp contact info
- `ContactPage` - Added WhatsApp options
- `ServicesPage` - Updated main booking buttons
- `WhatsAppFloatingButton` - New floating action button

### Utility Functions

- `orderProductViaWhatsApp()` - Product ordering
- `bookServiceViaWhatsApp()` - Service booking
- `contactViaWhatsApp()` - General contact
- `emergencyConsultationViaWhatsApp()` - Emergency contact
- `bulkProductInquiryViaWhatsApp()` - Multiple products

### File Structure

```
src/
├── config/
│   └── whatsapp.ts          # Configuration
├── lib/
│   └── whatsapp.ts          # Utility functions
└── components/
    └── whatsapp-floating-button.tsx
```

## 📋 Setup Checklist

1. ✅ Update WhatsApp number in config
2. ✅ Test product ordering flow
3. ✅ Test service booking flow
4. ✅ Test emergency consultation
5. ✅ Verify floating button functionality
6. ✅ Check all contact information consistency## 🎨 UI Changes

- Shopping cart icons replaced with WhatsApp message icons
- "Add to Cart" text changed to "Order via WhatsApp"
- "Book Now" buttons changed to "Book via WhatsApp"
- Added WhatsApp contact information throughout
- Floating WhatsApp button with pulse animation

## 📞 Customer Journey

1. **Browse Products/Services** → Customer sees options
2. **Click Order/Book Button** → Opens WhatsApp with pre-filled message
3. **Customer Sends Message** → Regular WhatsApp chat opens
4. **Business Responds** → Confirms availability, pricing, delivery
5. **Complete Transaction** → Payment and fulfillment handled via WhatsApp

## 🛠️ Maintenance

- Update phone number in single config file
- Customize message templates as needed
- Monitor WhatsApp chat metrics
- Train staff on handling WhatsApp orders/bookings

---

All traditional cart and booking functionality has been replaced with regular WhatsApp integration for a more direct, personal customer experience.
