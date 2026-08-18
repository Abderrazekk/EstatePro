// frontend/src/components/ChatbotWidget.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  X,
  Send,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const QUICK_CHIPS = [
  { label: "📍 Djerba", filter: { location: "Djerba" } },
  { label: "📍 Hammamet", filter: { location: "Hammamet" } },
  { label: "📍 Sidi Bou Saïd", filter: { location: "Sidi Bou Saïd" } },
  { label: "🏊 Avec Piscine", filter: { amenities: ["Piscine"] } },
  { label: "💰 Moins de 200 DT", filter: { maxPrice: 200 } },
  { label: "👥 Pour 2 personnes", filter: { guests: 2 } },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Bonjour! 👋 Je suis votre assistant maison d'hôte. Dites-moi ce que vous recherchez (ex: *Maison à Djerba avec piscine moins de 250 DT*) ou choisissez une option ci-dessous :",
      properties: [],
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (
    customMessage = null,
    quickFilterPayload = null
  ) => {
    const textToSend = customMessage || input.trim();
    if (!textToSend && !quickFilterPayload) return;

    const userMsg =
      textToSend ||
      (quickFilterPayload?.location
        ? `Recherche à ${quickFilterPayload.location}`
        : "Filtre sélectionné");

    // Push User message
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    if (!customMessage) setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: textToSend,
            quickFilter: quickFilterPayload,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.replyMessage,
            properties: data.properties || [],
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Désolé, une erreur est survenue lors de la recherche.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Impossible de contacter le serveur pour le moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {/* Responsive Trigger Button: Circle on mobile, Pill on desktop */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Trouver une Maison"
          className="flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-stone-800 text-white w-14 h-14 sm:w-auto sm:h-auto sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-stone-800/20 active:scale-95"
        >
          <MessageSquare className="w-6 h-6 text-stone-200" />
          <span className="hidden sm:inline font-bold text-sm tracking-tight">
            Trouver une Maison
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col border border-stone-200 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {/* Header styled like Borgogo Navbar */}
          <div className="bg-gray-900 p-4 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-200 shadow-inner">
                <Sparkles className="w-5 h-5 text-stone-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1">
                  <span>Bor</span>
                  <span className="text-stone-400">gogo Assistant</span>
                </h3>
                <p className="text-[11px] text-stone-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  En ligne • Recherche instantanée
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
              className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Text Bubble */}
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gray-900 text-white rounded-br-none shadow-sm font-medium"
                      : "bg-white text-stone-800 shadow-sm border border-stone-200/80 rounded-bl-none font-normal"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Clickable Property Card List */}
                {msg.properties && msg.properties.length > 0 && (
                  <div className="mt-3 w-full space-y-2.5">
                    {msg.properties.map((prop) => (
                      <Link
                        key={prop._id}
                        to={`/property/${prop._id}`}
                        onClick={() => setIsOpen(false)}
                        className="group flex gap-3 bg-white p-3 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-stone-400 transition-all duration-200 cursor-pointer overflow-hidden block"
                      >
                        <img
                          src={
                            prop.images?.[0]?.url ||
                            "https://via.placeholder.com/100"
                          }
                          alt={prop.title}
                          className="w-20 h-20 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex flex-col justify-between min-w-0 flex-1">
                          <div>
                            <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-stone-700 transition-colors">
                              {prop.title}
                            </h4>
                            <p className="text-[11px] text-stone-500 font-medium flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                              <span className="truncate">{prop.location}</span>
                            </p>
                            <p className="text-[12px] text-stone-900 font-extrabold mt-1">
                              {prop.pricePerNight} DT{" "}
                              <span className="text-[10px] text-stone-400 font-normal">
                                / nuit
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center text-[11px] font-bold text-stone-900 group-hover:translate-x-1 transition-transform mt-1 gap-1">
                            <span>Voir détails</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-stone-500 italic bg-white px-3 py-2 rounded-xl border border-stone-200 w-fit shadow-sm">
                <span className="w-2 h-2 bg-stone-800 rounded-full animate-ping"></span>
                Recherche des logements...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Filters Chips */}
          <div className="p-2.5 bg-white border-t border-stone-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(null, chip.filter)}
                className="whitespace-nowrap px-3 py-1.5 text-[11px] font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors border border-stone-200/80 shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Text Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-stone-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Djerba avec piscine 200 DT..."
              className="flex-1 bg-stone-100 focus:bg-white text-stone-900 text-xs sm:text-sm rounded-full px-4 py-2.5 outline-none border border-transparent focus:border-stone-300 focus:ring-2 focus:ring-stone-900/10 transition-all placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gray-900 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-full p-2.5 transition-all shadow-sm shrink-0 flex items-center justify-center"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}