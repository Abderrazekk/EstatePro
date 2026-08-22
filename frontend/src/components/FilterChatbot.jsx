import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  MessageSquareText,
  X,
  Send,
  Sparkles,
  RotateCcw,
  MapPin,
  DollarSign,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const CITIES = ["Djerba", "Sidi Bou Said", "Hammamet", "Tozeur", "Tunis"];

const FilterChatbot = () => {
  const { t } = useTranslation("filterChatbot");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    guests: "",
    maxPrice: "",
    amenities: [],
  });

  const [step, setStep] = useState("location");

  const getTypeOptions = () => [
    { label: t("options.types.guesthouse"), value: "Maison d'Hôte" },
    { label: t("options.types.traditionalDar"), value: "Dar Traditionnelle" },
    { label: t("options.types.charmingVilla"), value: "Villa de Charme" },
    { label: t("options.types.ruralCottage"), value: "Gîte Rural" },
  ];

  const getGuestOptions = () => [
    { label: t("options.guests.g1_2"), value: 2 },
    { label: t("options.guests.g3_5"), value: 5 },
    { label: t("options.guests.g6_plus"), value: 6 },
  ];

  const getPriceOptions = () => [
    { label: "150 Euro", value: 150 },
    { label: "300 Euro", value: 300 },
    { label: "500 Euro", value: 500 },
    { label: t("options.prices.noLimit"), value: "" },
  ];

  useEffect(() => {
    const initChat = async () => {
      let locationsList = [
        "Djerba",
        "Sidi Bou Said",
        "Hammamet",
        "Kalaat Andalous",
      ];

      try {
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
            text: t("steps.greeting"),
          },
          {
            id: 2,
            sender: "bot",
            text: t("steps.askLocation"),
            type: "quick_replies",
            options: locationsList.map((loc) => ({ label: loc, value: loc })),
            category: "location",
          },
        ]);
      }
    };

    initChat();
  }, [t]);

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

  const handleSelectOption = (optionObj, category) => {
    addUserMessage(optionObj.label);

    if (category === "location") {
      setFilters((prev) => ({ ...prev, location: optionObj.value }));
      setStep("type");
      setTimeout(() => {
        addBotMessage(
          t("steps.askType", { location: optionObj.label }),
          getTypeOptions(),
          "type",
        );
      }, 500);
    } else if (category === "type") {
      setFilters((prev) => ({ ...prev, type: optionObj.value }));
      setStep("guests");
      setTimeout(() => {
        addBotMessage(t("steps.askGuests"), getGuestOptions(), "guests");
      }, 500);
    } else if (category === "guests") {
      setFilters((prev) => ({ ...prev, guests: optionObj.value }));
      setStep("maxPrice");
      setTimeout(() => {
        addBotMessage(t("steps.askMaxPrice"), getPriceOptions(), "maxPrice");
      }, 500);
    } else if (category === "maxPrice") {
      const updatedFilters = { ...filters, maxPrice: optionObj.value };
      setFilters(updatedFilters);
      setStep("results");
      executeSearch(updatedFilters);
    }
  };

  const executeSearch = async (searchFilters, customText = "") => {
    setLoading(true);
    addBotMessage(t("search.searching"));

    try {
      const res = await axios.post("/api/properties/bot-search", {
        ...searchFilters,
        text: customText,
      });

      setLoading(false);

      if (res.data.properties && res.data.properties.length > 0) {
        addBotMessage(
          t("search.resultsFound", { count: res.data.properties.length }),
          null,
          null,
          res.data.properties,
        );
      } else {
        addBotMessage(t("search.noResults"));
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      addBotMessage(t("search.error"));
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
        text: t("steps.resetGreeting"),
        type: "quick_replies",
        options: CITIES.map((city) => ({ label: city, value: city })),
        category: "location",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end selection:bg-stone-200">
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
            {t("toggleButton")}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[580px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-stone-900 text-white p-4 px-5 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">
                  {t("header.title")}
                </h3>
                <p className="text-[11px] text-stone-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{" "}
                  {t("header.status")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title={t("header.resetTooltip")}
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
                  <DollarSign className="w-3 h-3 text-stone-400" />{" "}
                  {t("badges.max")} {filters.maxPrice} Euro
                </span>
              )}
            </div>
          )}

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/50 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gray-900 text-white rounded-br-none shadow-sm font-medium"
                      : "bg-white text-stone-800 border border-stone-200/80 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.type === "quick_replies" && msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt, msg.category)}
                        className="bg-white hover:bg-stone-900 text-stone-800 hover:text-white border border-stone-200 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-1"
                      >
                        {opt.label}{" "}
                        <ArrowRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}

                {msg.type === "properties" && msg.properties && (
                  <div className="w-full space-y-3 mt-3">
                    {msg.properties.map((prop) => (
                      <Link
                        key={prop._id}
                        to={`/property/${prop._id}`}
                        onClick={() => setIsOpen(false)}
                        className="group bg-white rounded-2xl border border-stone-200 p-2.5 flex items-center gap-3 hover:border-gray-900 hover:shadow-md transition-all duration-200"
                      >
                        <div className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden shrink-0 relative">
                          {prop.images && prop.images[0] ? (
                            <img
                              src={prop.images[0].url}
                              alt={prop.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                              {t("card.noImage")}
                            </div>
                          )}
                        </div>

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
                              {prop.pricePerNight?.toLocaleString()} Euro{" "}
                              <span className="text-[10px] text-stone-400 font-medium">
                                {t("card.perNight")}
                              </span>
                            </span>
                            <span className="text-[11px] font-bold text-stone-700 group-hover:text-gray-900 flex items-center gap-0.5">
                              {t("card.view")}{" "}
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-stone-400 text-xs italic bg-white border border-stone-200 px-3 py-2 rounded-2xl w-max shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
                {t("input.loading")}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendText}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("input.placeholder")}
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
