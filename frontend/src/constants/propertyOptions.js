// Static French constants for Admin pages (like PropertyForm.jsx)
export const AMENITIES_CATEGORIES = [
  {
    category: "Confort & Électronique",
    items: [
      "Wi-Fi Haut Débit (Fibre)",
      "Climatisation Réversible",
      "Chauffage Central",
      "Cheminée / Poêle à Bois",
      "Smart TV (Netflix / Satellite)",
      "Espace de Travail / Bureau",
      "Sèche-cheveux",
      "Linge de Maison & Serviettes",
      "Lave-linge / Sèche-linge",
    ],
  },
  {
    category: "Piscine, Spa & Bien-être",
    items: [
      "Piscine Extérieure",
      "Piscine Chauffée / Couverte",
      "Piscine Privée Sans Vis-à-vis",
      "Hammam Traditionnel",
      "Jacuzzi / Spa",
      "Massages & Soins",
      "Transats & Parasols",
    ],
  },
  {
    category: "Restauration & Cuisine",
    items: [
      "Petit-déjeuner Inclus",
      "Table d'Hôte (Dîner sur Commande)",
      "Cuisine Équipée à Disposition",
      "Machine à Café / Nespresso",
      "Barbecue / Majour",
      "Plateau de Courtoisie (Thé & Café)",
      "Réfrigérateur / Congélateur",
    ],
  },
  {
    category: "Services VIP & Événements",
    items: [
      "Chef Privé à Domicile",
      "Service de Majordome",
      "Service de Ménage Quotidien",
      "Transfert Aéroport / Navette VIP",
      "Garde d'Enfants / Babysitting",
      "Gardiennage 24/7",
      "Privatisation Événements / Mariages",
    ],
  },
  {
    category: "Activités & Plein Air",
    items: [
      "Atelier de Cuisine Traditionnelle",
      "Cinéma en Plein Air",
      "Espace Yoga & Méditation",
      "Excursions Quad / Buggy",
      "Balades à Cheval / Dromadaire",
      "Matériel de Paddle / Kayak",
      "Téléscope pour Observation Étoiles",
    ],
  },
  {
    category: "Éco-Responsabilité",
    items: [
      "Borne de Recharge Électrique",
      "Panneaux Solaires",
      "Potager Bio en Libre Cueillette",
      "Produits de Toilette Éco-responsables",
    ],
  },
];

export const FEATURES_CATEGORIES = [
  {
    category: "Style & Architecture",
    items: [
      "Dar Traditionnelle",
      "Patio Central avec Fontaine",
      "Skifa & Voûtes Traditionnelles",
      "Décoration Artisanale Tunisienne",
      "Zellige & Faïence Fait Main",
      "Architecture Troglodyte",
      "Menzel / Houch Djerbien",
    ],
  },
  {
    category: "Vues & Emplacement",
    items: [
      "Vue Panoramique sur Mer",
      "Vue sur la Médina",
      "Vue sur Palmeraie / Oasis",
      "Vue sur Montagne",
      "Accès Direct à la Plage",
      "Situé au Cœur de la Médina",
      "Pleine Nature / Campagne",
    ],
  },
  {
    category: "Espaces Extérieurs",
    items: [
      "Terrasse Sur le Toit (Roof-top)",
      "Jardin Arboré / Verger",
      "Cour Intérieure Ombragée",
      "Coin Feu Extérieur (Brasero)",
      "Solarium",
    ],
  },
  {
    category: "Ambiance & Concept",
    items: [
      "Calme Absolu & Intimité",
      "Cadre Romantique",
      "Privatisable entièrement",
      "Adapté aux Retraites Yoga",
    ],
  },
];

// Dynamic translation getters for internationalized public pages
export const getAmenitiesCategories = (t) => [
  {
    category: t("amenities.comfort.title"),
    items: [
      t("amenities.comfort.wifi"),
      t("amenities.comfort.airCon"),
      t("amenities.comfort.heating"),
      t("amenities.comfort.fireplace"),
      t("amenities.comfort.smartTv"),
      t("amenities.comfort.workspace"),
      t("amenities.comfort.hairdryer"),
      t("amenities.comfort.linens"),
      t("amenities.comfort.laundry"),
    ],
  },
  {
    category: t("amenities.pool.title"),
    items: [
      t("amenities.pool.outdoorPool"),
      t("amenities.pool.heatedPool"),
      t("amenities.pool.privatePool"),
      t("amenities.pool.hammam"),
      t("amenities.pool.jacuzzi"),
      t("amenities.pool.massage"),
      t("amenities.pool.sunloungers"),
    ],
  },
  {
    category: t("amenities.dining.title"),
    items: [
      t("amenities.dining.breakfast"),
      t("amenities.dining.tableDhôte"),
      t("amenities.dining.kitchen"),
      t("amenities.dining.coffeeMachine"),
      t("amenities.dining.bbq"),
      t("amenities.dining.courtesyTray"),
      t("amenities.dining.fridge"),
    ],
  },
  {
    category: t("amenities.vip.title"),
    items: [
      t("amenities.vip.privateChef"),
      t("amenities.vip.butler"),
      t("amenities.vip.dailyHousekeeping"),
      t("amenities.vip.airportShuttle"),
      t("amenities.vip.babysitting"),
      t("amenities.vip.security"),
      t("amenities.vip.events"),
    ],
  },
  {
    category: t("amenities.outdoor.title"),
    items: [
      t("amenities.outdoor.cookingWorkshop"),
      t("amenities.outdoor.openAirCinema"),
      t("amenities.outdoor.yoga"),
      t("amenities.outdoor.excursions"),
      t("amenities.outdoor.horseRiding"),
      t("amenities.outdoor.paddle"),
      t("amenities.outdoor.telescope"),
    ],
  },
  {
    category: t("amenities.eco.title"),
    items: [
      t("amenities.eco.evCharger"),
      t("amenities.eco.solarPanels"),
      t("amenities.eco.organicGarden"),
      t("amenities.eco.ecoToiletries"),
    ],
  },
];

export const getFeaturesCategories = (t) => [
  {
    category: t("features.style.title"),
    items: [
      t("features.style.traditionalDar"),
      t("features.style.centralPatio"),
      t("features.style.vaults"),
      t("features.style.crafts"),
      t("features.style.tiles"),
      t("features.style.cave"),
      t("features.style.menzel"),
    ],
  },
  {
    category: t("features.views.title"),
    items: [
      t("features.views.seaView"),
      t("features.views.medinaView"),
      t("features.views.oasisView"),
      t("features.views.mountainView"),
      t("features.views.beachAccess"),
      t("features.views.medinaHeart"),
      t("features.views.nature"),
    ],
  },
  {
    category: t("features.outdoorSpaces.title"),
    items: [
      t("features.outdoorSpaces.rooftop"),
      t("features.outdoorSpaces.garden"),
      t("features.outdoorSpaces.innerCourtyard"),
      t("features.outdoorSpaces.firePit"),
      t("features.outdoorSpaces.solarium"),
    ],
  },
  {
    category: t("features.ambiance.title"),
    items: [
      t("features.ambiance.tranquility"),
      t("features.ambiance.romantic"),
      t("features.ambiance.fullPrivatization"),
      t("features.ambiance.yogaRetreats"),
    ],
  },
];
