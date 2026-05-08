import { useState } from "react";
import Icon from "@/components/ui/icon";

const PLANTS = [
  {
    id: 1,
    name: "Монстера делициоза",
    type: "Тропические",
    stage: "Взрослое",
    owner: "Алиса К.",
    distance: "0.3 км",
    rating: 4.9,
    trades: 12,
    wants: "Суккуленты, Кактусы",
    img: "https://cdn.poehali.dev/projects/e267088d-8ed4-432f-a218-b7f312519042/files/5d0346b3-749f-4f5a-a388-3873538546b9.jpg",
    tag: "Обмен",
    tagColor: "bg-lime text-ink",
  },
  {
    id: 2,
    name: "Коллекция суккулентов",
    type: "Суккуленты",
    stage: "Детка",
    owner: "Михаил Р.",
    distance: "1.1 км",
    rating: 4.7,
    trades: 8,
    wants: "Папоротники, Орхидеи",
    img: "https://cdn.poehali.dev/projects/e267088d-8ed4-432f-a218-b7f312519042/files/28162371-8158-4401-9d3b-a83f5e5544f6.jpg",
    tag: "Отдам",
    tagColor: "bg-green-mid text-white",
  },
  {
    id: 3,
    name: "Фикус лировидный",
    type: "Деревья",
    stage: "Взрослое",
    owner: "Ирина М.",
    distance: "0.8 км",
    rating: 5.0,
    trades: 21,
    wants: "Монстера, Потос",
    img: "https://cdn.poehali.dev/projects/e267088d-8ed4-432f-a218-b7f312519042/files/2341fe2f-8e36-46ad-a3e0-3eefbcf5eca9.jpg",
    tag: "Обмен",
    tagColor: "bg-lime text-ink",
  },
  {
    id: 4,
    name: "Потос золотистый",
    type: "Ампельные",
    stage: "Черенок",
    owner: "Денис В.",
    distance: "2.4 км",
    rating: 4.8,
    trades: 5,
    wants: "Что угодно",
    img: "https://cdn.poehali.dev/projects/e267088d-8ed4-432f-a218-b7f312519042/files/02be7c13-04cb-47e8-b8b3-716e553f67c0.jpg",
    tag: "Обмен",
    tagColor: "bg-lime text-ink",
  },
];

const MESSAGES = [
  { id: 1, from: "Алиса К.", text: "Привет! Интересно обменяться монстерой на твой кактус?", time: "14:32", unread: 2, avatar: "🌿" },
  { id: 2, from: "Михаил Р.", text: "Договорились на субботу в 12:00 у метро", time: "вчера", unread: 0, avatar: "🌵" },
  { id: 3, from: "Ирина М.", text: "Фикус готов к передаче, жду ответа!", time: "вчера", unread: 1, avatar: "🌳" },
];

const OFFERS = [
  { id: 1, plant: "Монстера делициоза", with: "Алиса К.", status: "Ожидает", statusColor: "text-amber-600 bg-amber-50", date: "07.05.2026" },
  { id: 2, plant: "Суккулент Эхеверия", with: "Михаил Р.", status: "Завершён", statusColor: "text-green-700 bg-green-50", date: "02.05.2026" },
  { id: 3, plant: "Орхидея фаленопсис", with: "Ирина М.", status: "Завершён", statusColor: "text-green-700 bg-green-50", date: "25.04.2026" },
];

const MAP_PINS = [
  { id: 1, x: 22, y: 38, name: "Монстера", owner: "Алиса", color: "lime" },
  { id: 2, x: 55, y: 55, name: "Суккуленты", owner: "Михаил", color: "green" },
  { id: 3, x: 70, y: 28, name: "Фикус", owner: "Ирина", color: "lime" },
  { id: 4, x: 38, y: 68, name: "Потос", owner: "Денис", color: "green" },
  { id: 5, x: 82, y: 60, name: "Алоэ", owner: "Катя", color: "lime" },
];

const FILTERS = ["Все", "Тропические", "Суккуленты", "Ампельные", "Деревья", "Кактусы"];

type Tab = "feed" | "map" | "offers" | "messages" | "profile";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [activeFilter, setActiveFilter] = useState("Все");
  const [selectedPlant, setSelectedPlant] = useState<number | null>(null);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ from: "me" | "other"; text: string }[]>([
    { from: "other", text: "Привет! Интересно обменяться монстерой на твой кактус?" },
    { from: "me", text: "Да, звучит интересно! Расскажи подробнее о своей монстере" },
  ]);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  const filtered = activeFilter === "Все" ? PLANTS : PLANTS.filter((p) => p.type === activeFilter);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatHistory([...chatHistory, { from: "me", text: chatInput }]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--off-white)", maxWidth: 430, margin: "0 auto", position: "relative" }}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4" style={{ background: "var(--ink)", borderBottom: "2px solid var(--lime)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center" style={{ background: "var(--lime)" }}>
            <span style={{ fontSize: 16 }}>🌿</span>
          </div>
          <span className="font-oswald text-white font-bold text-xl tracking-wide uppercase">Plant Swap</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-1">
            <Icon name="Bell" size={20} className="text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-center text-xs font-bold flex items-center justify-center" style={{ background: "var(--lime)", color: "var(--ink)", fontSize: 9 }}>3</span>
          </button>
          <button onClick={() => setActiveTab("profile")}>
            <div className="w-8 h-8 flex items-center justify-center font-oswald font-bold text-sm text-white" style={{ background: "var(--green-mid)" }}>ИВ</div>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">

        {/* FEED TAB */}
        {activeTab === "feed" && (
          <div>
            <div className="px-5 py-5" style={{ background: "var(--green-dark)" }}>
              <p className="tag-chip text-xs mb-1" style={{ color: "var(--lime)" }}>Рядом с вами · Москва</p>
              <h1 className="font-oswald text-white text-3xl font-bold leading-tight">НАЙДИ РАСТЕНИЕ<br />ДЛЯ ОБМЕНА</h1>
              <div className="mt-3 flex items-center gap-2">
                <button className="lime-btn px-4 py-2 text-sm flex items-center gap-1.5" onClick={() => setActiveTab("map")}>
                  <Icon name="MapPin" size={14} />
                  Карта
                </button>
                <button className="px-4 py-2 text-sm font-oswald font-semibold uppercase tracking-wide border border-white/30 text-white hover:bg-white/10 transition-colors flex items-center gap-1">
                  <Icon name="Plus" size={14} />
                  Добавить
                </button>
              </div>
            </div>

            <div className="flex gap-2 px-5 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="tag-chip whitespace-nowrap px-3 py-1.5 border transition-all"
                  style={
                    activeFilter === f
                      ? { background: "var(--lime)", color: "var(--ink)", border: "1px solid transparent" }
                      : { background: "transparent", color: "#666", border: "1px solid #ddd" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="px-5 grid grid-cols-2 gap-3 pb-4">
              {filtered.map((plant, i) => (
                <div
                  key={plant.id}
                  className={`plant-card bg-white cursor-pointer animate-fade-up stagger-${Math.min(i + 1, 6)}`}
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                  onClick={() => setSelectedPlant(plant.id)}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={plant.img} alt={plant.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span
                        className="tag-chip px-2 py-0.5 text-xs"
                        style={
                          plant.tagColor.includes("lime")
                            ? { background: "var(--lime)", color: "var(--ink)" }
                            : { background: "var(--green-mid)", color: "white" }
                        }
                      >
                        {plant.tag}
                      </span>
                      <span
                        className="tag-chip px-2 py-0.5 text-xs"
                        style={{ background: "rgba(0,0,0,0.55)", color: "white", backdropFilter: "blur(4px)" }}
                      >
                        {plant.stage === "Черенок" ? "✂️ Черенок" : plant.stage === "Детка" ? "🌱 Детка" : "🌳 Взрослое"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                  </div>
                  <div className="p-3">
                    <p className="font-oswald font-semibold text-sm leading-tight" style={{ color: "var(--ink)" }}>{plant.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--green-mid)" }}>{plant.type}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={10} className="text-gray-400" />
                        <span className="text-xs text-gray-400">{plant.distance}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <span style={{ color: "var(--lime)", fontSize: 12 }}>★</span>
                        <span className="text-xs font-semibold">{plant.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAP TAB */}
        {activeTab === "map" && (
          <div className="animate-fade-up">
            <div className="px-5 py-4">
              <h2 className="font-oswald text-2xl font-bold uppercase">Карта растений</h2>
              <p className="text-sm text-gray-500 mt-0.5">Наведи на метку — подробнее о растении</p>
            </div>

            <div className="mx-5 relative overflow-hidden" style={{ height: 320, background: "#E8F0E0", border: "2px solid var(--ink)" }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute" style={{ left: `${i * 25}%`, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.06)" }} />
              ))}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="absolute" style={{ top: `${i * 25}%`, left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.06)" }} />
              ))}
              <div className="absolute" style={{ top: "42%", left: "10%", right: "10%", height: 3, background: "rgba(255,255,255,0.6)" }} />
              <div className="absolute" style={{ top: "20%", bottom: "20%", left: "48%", width: 3, background: "rgba(255,255,255,0.6)" }} />
              <div className="absolute" style={{ top: "65%", left: "25%", right: "5%", height: 2, background: "rgba(255,255,255,0.5)", transform: "rotate(-3deg)" }} />

              <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
                <div className="w-4 h-4 rounded-full border-2 border-white relative" style={{ background: "#3B82F6" }}>
                  <div className="map-ping absolute inset-0 rounded-full" style={{ background: "#3B82F6", opacity: 0.3 }} />
                </div>
              </div>

              {MAP_PINS.map((pin) => (
                <div
                  key={pin.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -100%)", zIndex: 20 }}
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  {hoveredPin === pin.id && (
                    <div className="absolute bg-white text-xs font-semibold px-2 py-1 whitespace-nowrap shadow-lg animate-pop" style={{ bottom: "110%", left: "50%", transform: "translateX(-50%)", border: "1px solid var(--ink)", zIndex: 30 }}>
                      {pin.name} · {pin.owner}
                    </div>
                  )}
                  <div
                    className="w-7 h-7 flex items-center justify-center shadow-lg text-sm"
                    style={{
                      background: pin.color === "lime" ? "var(--lime)" : "var(--green-mid)",
                      clipPath: "polygon(50% 0%, 100% 35%, 100% 75%, 50% 100%, 0% 75%, 0% 35%)"
                    }}
                  >
                    🌿
                  </div>
                </div>
              ))}

              <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-2 text-xs" style={{ border: "1px solid var(--ink)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#3B82F6" }} />
                  <span>Вы</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3" style={{ background: "var(--lime)" }} />
                  <span>Растения</span>
                </div>
              </div>
            </div>

            <div className="px-5 mt-4">
              <p className="tag-chip text-xs mb-3" style={{ color: "var(--green-mid)" }}>Ближайшие</p>
              {PLANTS.slice(0, 3).map((p, i) => (
                <div key={p.id} className={`flex items-center gap-3 py-3 border-b border-gray-100 animate-fade-up stagger-${i + 1}`}>
                  <img src={p.img} alt={p.name} className="w-12 h-12 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.owner} · {p.distance}</p>
                  </div>
                  <button className="lime-btn px-3 py-1.5 text-xs flex-shrink-0">Обмен</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OFFERS TAB */}
        {activeTab === "offers" && (
          <div className="animate-fade-up">
            <div className="px-5 py-4 flex items-center justify-between">
              <h2 className="font-oswald text-2xl font-bold uppercase">Мои обмены</h2>
              <span className="tag-chip px-2 py-1 text-white text-xs" style={{ background: "var(--ink)" }}>{OFFERS.length}</span>
            </div>

            <div className="px-5 space-y-3">
              {OFFERS.map((offer, i) => (
                <div key={offer.id} className={`bg-white p-4 animate-fade-up stagger-${i + 1}`} style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: "3px solid var(--lime)" }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-oswald font-semibold text-base">{offer.plant}</p>
                      <p className="text-sm text-gray-500 mt-0.5">с {offer.with}</p>
                    </div>
                    <span className={`tag-chip px-2 py-1 text-xs ${offer.statusColor}`}>{offer.status}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Icon name="Calendar" size={11} />
                      {offer.date}
                    </span>
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1.5 border border-gray-200 hover:border-gray-400 transition-colors flex items-center gap-1">
                        <Icon name="MessageCircle" size={11} />
                        Чат
                      </button>
                      {offer.status === "Ожидает" && (
                        <button className="lime-btn text-xs px-3 py-1.5 flex items-center gap-1">
                          <Icon name="Check" size={11} />
                          Принять
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 mt-6">
              <p className="tag-chip text-xs mb-3" style={{ color: "var(--green-mid)" }}>Статистика</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Всего", val: "5", icon: "Repeat2" },
                  { label: "Успешно", val: "3", icon: "CheckCircle" },
                  { label: "Рейтинг", val: "4.9", icon: "Star" },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-3 text-center" style={{ border: "1px solid #eee" }}>
                    <Icon name={s.icon} size={18} className="mx-auto mb-1" style={{ color: "var(--green-mid)" }} />
                    <p className="font-oswald font-bold text-xl">{s.val}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MESSAGES LIST */}
        {activeTab === "messages" && !activeChat && (
          <div className="animate-fade-up">
            <div className="px-5 py-4">
              <h2 className="font-oswald text-2xl font-bold uppercase">Сообщения</h2>
            </div>
            <div className="px-5 space-y-1">
              {MESSAGES.map((msg, i) => (
                <div
                  key={msg.id}
                  className={`flex items-center gap-3 p-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors animate-fade-up stagger-${i + 1}`}
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                  onClick={() => setActiveChat(msg.id)}
                >
                  <div className="w-11 h-11 flex items-center justify-center text-xl flex-shrink-0" style={{ background: "var(--gray-soft)" }}>
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{msg.from}</p>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{msg.text}</p>
                  </div>
                  {msg.unread > 0 && (
                    <div className="w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "var(--lime)", color: "var(--ink)" }}>
                      {msg.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAT VIEW */}
        {activeTab === "messages" && activeChat && (
          <div className="animate-fade-up flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
            <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-gray-100">
              <button onClick={() => setActiveChat(null)} className="p-1">
                <Icon name="ArrowLeft" size={18} />
              </button>
              <div className="w-9 h-9 flex items-center justify-center text-lg" style={{ background: "var(--gray-soft)" }}>
                {MESSAGES.find((m) => m.id === activeChat)?.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm">{MESSAGES.find((m) => m.id === activeChat)?.from}</p>
                <p className="text-xs" style={{ color: "var(--green-mid)" }}>Онлайн</p>
              </div>
              <div className="ml-auto">
                <button className="p-1.5 hover:bg-gray-100">
                  <Icon name="MapPin" size={16} style={{ color: "var(--green-mid)" }} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {chatHistory.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[75%] px-3 py-2 text-sm"
                    style={
                      m.from === "me"
                        ? { background: "var(--lime)", color: "var(--ink)" }
                        : { background: "white", color: "var(--ink)", border: "1px solid #eee" }
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Напишите сообщение..."
                className="flex-1 px-3 py-2 text-sm bg-gray-50 outline-none border border-gray-200 focus:border-gray-400 transition-colors"
              />
              <button className="lime-btn px-4 py-2" onClick={sendMessage}>
                <Icon name="Send" size={15} />
              </button>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="animate-fade-up">
            <div className="px-5 py-6" style={{ background: "var(--green-dark)" }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center font-oswald font-bold text-2xl text-white" style={{ background: "var(--green-mid)", border: "3px solid var(--lime)" }}>
                  ИВ
                </div>
                <div>
                  <h2 className="font-oswald text-white text-xl font-bold">Иван Волков</h2>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span style={{ color: "var(--lime)" }}>★</span>
                    <span className="text-white text-sm font-semibold">4.9</span>
                    <span className="text-white/60 text-sm ml-1">· 5 обменов</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                    <Icon name="MapPin" size={11} className="inline" />
                    Москва, Красносельский район
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="inline-flex items-center gap-1 px-3 py-1" style={{ background: "var(--lime)" }}>
                  <Icon name="ShieldCheck" size={12} style={{ color: "var(--ink)" }} />
                  <span className="tag-chip text-xs" style={{ color: "var(--ink)" }}>Email подтверждён</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-gray-100 bg-white" style={{ borderBottom: "2px solid var(--lime)" }}>
              {[
                { label: "Растений", val: "4" },
                { label: "Обменов", val: "5" },
                { label: "Отзывов", val: "9" },
              ].map((s, i) => (
                <div key={i} className="py-4 text-center">
                  <p className="font-oswald font-bold text-2xl">{s.val}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="px-5 mt-5">
              <p className="font-oswald font-semibold text-base uppercase mb-3">Мои растения</p>
              <div className="grid grid-cols-2 gap-3">
                {PLANTS.slice(0, 2).map((p, i) => (
                  <div key={p.id} className={`relative overflow-hidden animate-fade-up stagger-${i + 1}`} style={{ aspectRatio: "4/3" }}>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-end p-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                      <p className="text-white text-xs font-semibold">{p.name}</p>
                      <span
                        className="tag-chip text-xs w-fit px-1.5 py-0.5 mt-0.5"
                        style={
                          p.tagColor.includes("lime")
                            ? { background: "var(--lime)", color: "var(--ink)" }
                            : { background: "var(--green-mid)", color: "white" }
                        }
                      >
                        {p.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2.5 border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
                <Icon name="Plus" size={14} />
                Добавить растение
              </button>
            </div>

            <div className="px-5 mt-5 mb-4 space-y-1">
              {[
                { icon: "Bell", label: "Уведомления" },
                { icon: "MapPin", label: "Моё местоположение" },
                { icon: "Shield", label: "Безопасность и проверка" },
                { icon: "LogOut", label: "Выйти" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-2">
                  <Icon name={item.icon} size={16} className="text-gray-400" />
                  <span className="text-sm">{item.label}</span>
                  <Icon name="ChevronRight" size={14} className="text-gray-300 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Plant detail modal */}
      {selectedPlant && (() => {
        const plant = PLANTS.find((p) => p.id === selectedPlant)!;
        return (
          <div
            className="fixed inset-0 z-50 flex flex-col justify-end"
            style={{ maxWidth: 430, margin: "0 auto", background: "rgba(0,0,0,0.5)" }}
            onClick={() => setSelectedPlant(null)}
          >
            <div className="bg-white animate-pop" onClick={(e) => e.stopPropagation()}>
              <div className="relative" style={{ height: 260 }}>
                <img src={plant.img} alt={plant.name} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center" onClick={() => setSelectedPlant(null)}>
                  <Icon name="X" size={16} />
                </button>
                <span
                  className="absolute top-3 left-3 tag-chip px-2 py-1 text-xs"
                  style={
                    plant.tagColor.includes("lime")
                      ? { background: "var(--lime)", color: "var(--ink)" }
                      : { background: "var(--green-mid)", color: "white" }
                  }
                >
                  {plant.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-oswald font-bold text-xl">{plant.name}</h3>
                    <p className="text-sm mt-0.5" style={{ color: "var(--green-mid)" }}>{plant.type}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span style={{ color: "var(--lime)" }}>★</span>
                    <span className="font-bold">{plant.rating}</span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50">
                    <p className="tag-chip text-xs text-gray-400 mb-1">Владелец</p>
                    <p className="font-semibold text-sm">{plant.owner}</p>
                    <p className="text-xs text-gray-400">{plant.trades} обменов</p>
                  </div>
                  <div className="p-3 bg-gray-50">
                    <p className="tag-chip text-xs text-gray-400 mb-1">Хочет взамен</p>
                    <p className="font-semibold text-sm">{plant.wants}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-0.5">
                      <Icon name="MapPin" size={10} />{plant.distance}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    className="flex-1 py-3 font-oswald font-semibold uppercase tracking-wide text-sm border-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "var(--ink)" }}
                    onClick={() => { setSelectedPlant(null); setActiveTab("messages"); setActiveChat(1); }}
                  >
                    <Icon name="MessageCircle" size={15} />
                    Написать
                  </button>
                  <button className="flex-1 lime-btn py-3 text-sm flex items-center justify-center gap-2">
                    <Icon name="Repeat2" size={15} />
                    Предложить обмен
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-40 flex"
        style={{ maxWidth: 430, background: "var(--ink)", borderTop: "2px solid var(--lime)" }}
      >
        {(
          [
            { id: "feed", icon: "LayoutGrid", label: "Лента" },
            { id: "map", icon: "MapPin", label: "Карта" },
            { id: "offers", icon: "Repeat2", label: "Обмены" },
            { id: "messages", icon: "MessageCircle", label: "Чаты" },
            { id: "profile", icon: "User", label: "Профиль" },
          ] as { id: Tab; icon: string; label: string }[]
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setActiveChat(null); setSelectedPlant(null); }}
            className="flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all"
            style={{ color: activeTab === item.id ? "var(--lime)" : "rgba(255,255,255,0.5)" }}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-xs font-golos">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}