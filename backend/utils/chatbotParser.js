// backend/utils/chatbotParser.js

const TUNISIAN_CITIES = [
  "Djerba",
  "Hammamet",
  "Sidi Bou Saïd",
  "Tozeur",
  "Tabarka",
  "Bizerte",
  "Sousse",
  "Mahdia",
  "Aïn Draham",
  "Douz",
  "Tunis",
  "La Marsa",
  "Nabeul",
  "Kélibia",
  "Monastir",
  "Tataouine",
  "Zaghouan",
  "Korba",
  "Gammarth",
  "Kairouan",
  "Chebba",
  "El Haouaria",
];

const AMENITY_KEYWORDS = {
  piscine: ["Piscine", "Piscine Extérieure", "Piscine Privée Sans Vis-à-vis"],
  jacuzzi: ["Jacuzzi / Spa", "Hammam Traditionnel"],
  "petit-déjeuner": ["Petit-déjeuner Inclus"],
  "petit dejeuner": ["Petit-déjeuner Inclus"],
  wifi: ["Wi-Fi Haut Débit (Fibre)"],
  climatisation: ["Climatisation Réversible"],
  clim: ["Climatisation Réversible"],
  vue: [
    "Vue Panoramique sur Mer",
    "Vue sur la Médina",
    "Vue sur Palmeraie / Oasis",
  ],
  mer: ["Vue Panoramique sur Mer", "Accès Direct à la Plage"],
  plage: ["Accès Direct à la Plage"],
  cuisine: [
    "Cuisine Équipée à Disposition",
    "Table d'Hôte (Dîner sur Commande)",
  ],
};

const TYPE_KEYWORDS = {
  dar: "Dar Traditionnelle",
  villa: "Villa de Charme",
  gîte: "Gîte Rural",
  gite: "Gîte Rural",
  chambre: "Chambre d'Hôte",
};

/**
 * Extracts structured query filters from natural language text without AI APIs.
 */
function parseChatMessage(message) {
  if (!message) return {};

  const text = message.toLowerCase().trim();
  const filters = {};

  // 1. Extract Location (Fuzzy match against known cities)
  for (const city of TUNISIAN_CITIES) {
    const cleanCity = city
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const cleanText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (cleanText.includes(cleanCity)) {
      filters.location = city;
      break;
    }
  }

  // 2. Extract Price (e.g., "moins de 200dt", "max 150", "200 tnd")
  const priceRegex =
    /(?:moins de|max|budget|inférieur à|<|jusqu'à|dans les)?\s*(\d+)\s*(?:dt|tnd|dinar|dinars)?/i;
  const priceMatch = text.match(priceRegex);
  if (priceMatch && priceMatch[1]) {
    const num = parseInt(priceMatch[1], 10);
    if (num >= 50 && num <= 5000) {
      filters.maxPrice = num;
    }
  }

  // 3. Extract Guest / Capacity count (e.g., "4 personnes", "pour 2 voyageurs")
  const guestRegex =
    /(\d+)\s*(?:personne|personnes|pax|invité|invités|voyageur|voyageurs)/i;
  const guestMatch = text.match(guestRegex);
  if (guestMatch && guestMatch[1]) {
    filters.guests = parseInt(guestMatch[1], 10);
  }

  // 4. Extract Property Type
  for (const [key, value] of Object.entries(TYPE_KEYWORDS)) {
    if (text.includes(key)) {
      filters.type = value;
      break;
    }
  }

  // 5. Extract Amenities
  filters.amenities = [];
  for (const [keyword, tags] of Object.entries(AMENITY_KEYWORDS)) {
    if (text.includes(keyword)) {
      filters.amenities.push(...tags);
    }
  }

  return filters;
}

module.exports = { parseChatMessage };
