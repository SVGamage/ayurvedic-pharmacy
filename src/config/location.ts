// Location configuration for the Ayurvedic Pharmacy
export const pharmacyLocation = {
  lat: 6.282069999606662,
  lng: 81.26561306962404,
  title: "Rathnadeepa Aurvedic Pharmacy",
  address: "Rathndeepa osu hala, Hambantota Rd, Tissamaharama",
  description:
    "Experience authentic Ayurvedic healing in our serene wellness center",
  phone: "0473477938",
  /** Same number, formatted for reading and for tel: links. */
  phoneDisplay: "047 347 7938",
  phoneTel: "+94473477938",
};

/** Real turn-by-turn directions (opens the Maps app on phones), not the embed URL. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pharmacyLocation.lat},${pharmacyLocation.lng}`;

/** Opening hours as numbers (24h, Sri Lanka time) for the "open now" status. */
export const openingHours = { opensAt: 8, closesAt: 19 } as const;

// Additional location data
export const locationInfo = {
  operatingHours: {
    Everyday: "8:00 AM - 7:00 PM",
    "Poya Days": "Closed (Holiday)",
  },
  emergencyNote: "Emergency consultations available 24/7",
  email: {
    general: "info@ayurvedapharmacy.com",
    appointments: "appointments@ayurvedapharmacy.com",
  },
  emergencyPhone: "0473477938",
  facilities: [
    "Free Parking",
    "Extended Hours",
    "24/7 Emergency",
    "Wheelchair Accessible",
    "On-site Pharmacy",
    "Consultation Rooms",
    "Meditation Hall",
  ],
};

export default pharmacyLocation;
