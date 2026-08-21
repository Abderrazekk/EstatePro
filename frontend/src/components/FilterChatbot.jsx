import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MessageSquareText,
  X,
  Send,
  Sparkles,
  RotateCcw,
  MapPin,
  Users,
  DollarSign,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const CITIES = ["Djerba", "Sidi Bou Said", "Hammamet", "Tozeur", "Tunis"];
const TYPES = [
  "Maison d'Hôte",
  "Dar Traditionnelle",
  "Villa de Charme",
  "Gîte Rural",
];
const AMENITIES_OPTIONS = [
  "Piscine Extérieure",
  "Petit-déjeuner Inclus",
  "Wi-Fi Haut Débit (Fibre)",
  "Vue Panoramique sur Mer",
];

const FilterChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Bot Search State Filters
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    guests: "",
    maxPrice: "",
    amenities: [],
  });

  const [step, setStep] = useState("location"); // location -> type -> guests -> maxPrice -> results

  // Initialize bot greeting
  useEffect(() => {
    const initChat = async () => {
      let locationsList = [
        "Djerba",
        "Sidi Bou Said",
        "Hammamet",
        "Kalaat Andalous",
      ];

      try {
        // Fetch actual locations stored in MongoDB
        const res = await axios.get("/api/properties/locations");
        if (res.data && res.data.length > 0) {
          locationsList = res.data;
        }
      } catch (err) {
        console.error("Could not fetch locations:", err);
      }

      if (messages.length === 0) {
        setMessages([
          {
            id: 1,
            sender: "bot",
            text: "Bonjour ! 🌿 Je suis votre assistant virtuel. Je vais vous aider à trouver la maison d'hôte idéale en Tunisie.",
          },
          {
            id: 2,
            sender: "bot",
            text: "Pour commencer, quelle destination préférez-vous ?",
            type: "quick_replies",
            options: locationsList, // Dynamic locations list directly from MongoDB
            category: "location",
          },
        ]);
      }
    };

    initChat();
  }, []);

  // Auto scroll down on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const addBotMessage = (
    text,
    options = null,
    category = null,
    properties = null,
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "bot",
        text,
        type: options ? "quick_replies" : properties ? "properties" : "text",
        options,
        category,
        properties,
      },
    ]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text }]);
  };

  const handleSelectOption = (option, category) => {
    addUserMessage(option);

    if (category === "location") {
      setFilters((prev) => ({ ...prev, location: option }));
      setStep("type");
      setTimeout(() => {
        addBotMessage(
          `Super choix pour ${option} ! Quel style d'hébergement recherchez-vous ?`,
          TYPES,
          "type",
        );
      }, 500);
    } else if (category === "type") {
      setFilters((prev) => ({ ...prev, type: option }));
      setStep("guests");
      setTimeout(() => {
        addBotMessage(
          "Combien de personnes participeront au séjour ?",
          ["1-2 Invités", "3-5 Invités", "6+ Invités"],
          "guests",
        );
      }, 500);
    } else if (category === "guests") {
      const guestNum = option.includes("1-2")
        ? 2
        : option.includes("3-5")
          ? 5
          : 6;
      setFilters((prev) => ({ ...prev, guests: guestNum }));
      setStep("maxPrice");
      setTimeout(() => {
        addBotMessage(
          "Quel est votre budget maximum par nuitée ?",
          ["150 TND", "300 TND", "500 TND", "Pas de limite"],
          "maxPrice",
        );
      }, 500);
    } else if (category === "maxPrice") {
      const price = option.includes("150")
        ? 150
        : option.includes("300")
          ? 300
          : option.includes("500")
            ? 500
            : "";
      const updatedFilters = { ...filters, maxPrice: price };
      setFilters(updatedFilters);
      setStep("results");
      executeSearch(updatedFilters);
    }
  };

  const executeSearch = async (searchFilters, customText = "") => {
    setLoading(true);
    addBotMessage("Recherche des meilleures maisons d'hôte disponibles...");

    try {
      const res = await axios.post("/api/properties/bot-search", {
        ...searchFilters,
        text: customText,
      });

      setLoading(false);

      if (res.data.properties && res.data.properties.length > 0) {
        addBotMessage(
          `Voici ${res.data.properties.length} résidence(s) trouvée(s) selon vos critères :`,
          null,
          null,
          res.data.properties,
        );
      } else {
        addBotMessage(
          "Désolé, aucune maison d'hôte ne correspond exactement à ces critères. Essayez de réinitialiser la recherche ou de changer de ville !",
        );
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      addBotMessage(
        "Une erreur s'est produite lors de la recherche. Veuillez réessayer.",
      );
    }
  };

  const handleSendText = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    addUserMessage(userText);

    executeSearch(filters, userText);
  };

  const resetChat = () => {
    setFilters({
      location: "",
      type: "",
      guests: "",
      maxPrice: "",
      amenities: [],
    });
    setStep("location");
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: "Recherche réinitialisée ! Quelle destination préférez-vous ?",
        type: "quick_replies",
        options: CITIES,
        category: "location",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end selection:bg-stone-200">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gray-900 hover:bg-stone-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 border border-white/20"
        >
          <div className="relative">
            <MessageSquareText className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <span className="text-sm font-bold pr-1 hidden sm:inline">
            Trouver une Maison
          </span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[580px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-stone-900 text-white p-4 px-5 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">
                  Assistant Résidence
                </h3>
                <p className="text-[11px] text-stone-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{" "}
                  En ligne • Filtre Intelligent
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Réinitialiser"
                className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filter Badges Bar */}
          {(filters.location || filters.type || filters.maxPrice) && (
            <div className="bg-stone-50 px-4 py-2 border-b border-stone-100 flex flex-wrap gap-1.5 text-[10px] font-semibold text-stone-600">
              {filters.location && (
                <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />{" "}
                  {filters.location}
                </span>
              )}
              {filters.type && (
                <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-md">
                  {filters.type}
                </span>
              )}
              {filters.maxPrice && (
                <span className="bg-white border border-stone-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-stone-400" /> Max{" "}
                  {filters.maxPrice} TND
                </span>
              )}
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/50 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Bubble Text */}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gray-900 text-white rounded-br-none shadow-sm font-medium"
                      : "bg-white text-stone-800 border border-stone-200/80 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Quick Reply Buttons */}
                {msg.type === "quick_replies" && msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt, msg.category)}
                        className="bg-white hover:bg-stone-900 text-stone-800 hover:text-white border border-stone-200 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-1"
                      >
                        {opt} <ArrowRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Property Cards Embedded inside Chat */}
                {msg.type === "properties" && msg.properties && (
                  <div className="w-full space-y-3 mt-3">
                    {msg.properties.map((prop) => (
                      <Link
                        key={prop._id}
                        to={`/property/${prop._id}`}
                        onClick={() => setIsOpen(false)}
                        className="group bg-white rounded-2xl border border-stone-200 p-2.5 flex items-center gap-3 hover:border-gray-900 hover:shadow-md transition-all duration-200"
                      >
                        {/* Image Thumbnail */}
                        <div className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden shrink-0 relative">
                          {prop.images && prop.images[0] ? (
                            <img
                              src={prop.images[0].url}
                              alt={prop.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                              Sans Image
                            </div>
                          )}
                        </div>

                        {/* Property Details */}
                        <div className="flex-1 min-w-0 pr-1">
                          <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block mb-1">
                            {prop.type}
                          </span>
                          <h4 className="text-xs font-bold text-gray-900 truncate group-hover:text-amber-700 transition">
                            {prop.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5 truncate">
                            <MapPin className="w-3 h-3 shrink-0 text-stone-400" />{" "}
                            {prop.location}
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs font-black text-gray-900">
                              {prop.pricePerNight?.toLocaleString()} TND{" "}
                              <span className="text-[10px] text-stone-400 font-medium">
                                /nuit
                              </span>
                            </span>
                            <span className="text-[11px] font-bold text-stone-700 group-hover:text-gray-900 flex items-center gap-0.5">
                              Voir <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-stone-400 text-xs italic bg-white border border-stone-200 px-3 py-2 rounded-2xl w-max shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
                Recherche en cours...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendText}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Maison avec piscine à Djerba..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-gray-900 hover:bg-stone-800 disabled:opacity-40 text-white p-2 rounded-xl transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FilterChatbot;
