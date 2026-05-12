import { useState, useEffect } from "react";

// ─── DONNÉES ─────────────────────────────────────────────────────────────────

const INITIAL_REPERTOIRE = [
  { id: 1, name: "Pizza maison", emoji: "🍕", category: "fait maison", baby: "Fromage fondu écrasé + légumes mixés", viande: false, legumes: [{ name: "tomates", qty: "3" }, { name: "poivrons", qty: "1" }], epicerie: [{ name: "farine", qty: "500g" }, { name: "levure", qty: "1 sachet" }, { name: "mozzarella", qty: "250g" }, { name: "coulis tomate", qty: "200ml" }], boucher: [], budget: 8 },
  { id: 2, name: "Quiche maison", emoji: "🥧", category: "fait maison", baby: "Appareil sans lardons, mixé finement", viande: false, legumes: [{ name: "poireaux", qty: "2" }], epicerie: [{ name: "pâte brisée", qty: "1" }, { name: "crème fraîche", qty: "20cl" }, { name: "œufs", qty: "3" }, { name: "fromage râpé", qty: "100g" }, { name: "lardons", qty: "150g" }], boucher: [], budget: 7 },
  { id: 3, name: "Saucisse lentilles", emoji: "🌿", category: "plat mijoté", baby: "Lentilles mixées, saucisse retirée", viande: true, legumes: [{ name: "carottes", qty: "2" }, { name: "oignons", qty: "1" }], epicerie: [{ name: "lentilles vertes", qty: "300g" }, { name: "bouillon", qty: "1L" }], boucher: [{ item: "saucisses de Morteau", qty: "400g" }], budget: 9 },
  { id: 4, name: "Purée jambon", emoji: "🥔", category: "comfort food", baby: "Purée nature sans sel, dés de jambon mixés", viande: false, legumes: [{ name: "pommes de terre", qty: "800g" }], epicerie: [{ name: "beurre", qty: "50g" }, { name: "lait", qty: "15cl" }, { name: "jambon blanc", qty: "4 tranches" }], boucher: [], budget: 6 },
  { id: 5, name: "Salade composée", emoji: "🥗", category: "léger", baby: "Riz ou pâtes natures + légumes écrasés", viande: false, legumes: [{ name: "tomates", qty: "3" }, { name: "concombre", qty: "1" }, { name: "salade", qty: "1" }], epicerie: [{ name: "riz ou pâtes", qty: "200g" }, { name: "thon", qty: "2 boîtes" }, { name: "maïs", qty: "1 boîte" }, { name: "vinaigrette", qty: "1" }], boucher: [], budget: 5 },
  { id: 6, name: "Spaghetti bolognaise", emoji: "🍝", category: "pasta", baby: "Sauce bolognaise mixée sans sel, petites pâtes", viande: true, legumes: [{ name: "tomates", qty: "2" }, { name: "oignons", qty: "1" }, { name: "carottes", qty: "1" }], epicerie: [{ name: "spaghetti", qty: "400g" }, { name: "coulis tomate", qty: "400ml" }, { name: "vin rouge", qty: "10cl" }], boucher: [{ item: "viande hachée bœuf", qty: "400g" }], budget: 8 },
  { id: 7, name: "Cordon bleu maison", emoji: "🍗", category: "fait maison", baby: "Poulet haché vapeur, fromage fondu à part", viande: true, legumes: [{ name: "haricots verts", qty: "400g" }], epicerie: [{ name: "chapelure", qty: "100g" }, { name: "œufs", qty: "2" }, { name: "fromage", qty: "80g" }, { name: "jambon", qty: "4 tranches" }], boucher: [{ item: "escalopes de poulet", qty: "4 pièces" }], budget: 10 },
  { id: 8, name: "Hamburger maison", emoji: "🍔", category: "fait maison", baby: "Steak haché écrasé + pomme de terre vapeur", viande: true, legumes: [{ name: "pommes de terre", qty: "600g" }, { name: "tomates", qty: "2" }, { name: "salade", qty: "1" }], epicerie: [{ name: "pains burger", qty: "4" }, { name: "fromage cheddar", qty: "4 tranches" }, { name: "ketchup", qty: "1" }], boucher: [{ item: "steaks hachés", qty: "4 pièces" }], budget: 12 },
  { id: 9, name: "Crêpes / Galettes", emoji: "🫓", category: "fait maison", baby: "Crêpe nature déchirée + fromage fondu", viande: false, legumes: [{ name: "tomates", qty: "2" }], epicerie: [{ name: "farine de blé", qty: "250g" }, { name: "farine sarrasin", qty: "250g" }, { name: "œufs", qty: "4" }, { name: "lait", qty: "50cl" }, { name: "jambon blanc", qty: "4 tranches" }, { name: "fromage râpé", qty: "100g" }], boucher: [], budget: 6 },
];

const SUGGESTED_NEW = [
  { id: 10, name: "Gratin dauphinois", emoji: "🫕", category: "comfort food", baby: "Pommes de terre vapeur écrasées, crème diluée", viande: false, legumes: [{ name: "pommes de terre", qty: "1kg" }], epicerie: [{ name: "crème fraîche", qty: "30cl" }, { name: "fromage râpé", qty: "80g" }, { name: "ail", qty: "2 gousses" }, { name: "beurre", qty: "30g" }], boucher: [], budget: 7 },
  { id: 11, name: "Poulet rôti", emoji: "🍗", category: "rôti", baby: "Blanc de poulet effiloché + légumes mixés", viande: true, legumes: [{ name: "carottes", qty: "3" }, { name: "pommes de terre", qty: "500g" }], epicerie: [{ name: "herbes de Provence", qty: "1 c.s." }, { name: "huile d'olive", qty: "3 c.s." }, { name: "ail", qty: "3 gousses" }], boucher: [{ item: "poulet fermier entier", qty: "1.5kg" }], budget: 14 },
  { id: 12, name: "Soupe de légumes", emoji: "🥣", category: "soupe", baby: "Parfait tel quel, texture idéale bébé", viande: false, legumes: [{ name: "carottes", qty: "3" }, { name: "poireaux", qty: "2" }, { name: "courgettes", qty: "2" }, { name: "pommes de terre", qty: "300g" }], epicerie: [{ name: "bouillon", qty: "1L" }, { name: "crème fraîche", qty: "10cl" }], boucher: [], budget: 4 },
  { id: 13, name: "Risotto aux champignons", emoji: "🍚", category: "mijoté", baby: "Riz bien cuit, champignons mixés", viande: false, legumes: [{ name: "champignons", qty: "300g" }, { name: "oignons", qty: "1" }], epicerie: [{ name: "riz arborio", qty: "300g" }, { name: "bouillon", qty: "1L" }, { name: "parmesan", qty: "80g" }, { name: "vin blanc", qty: "10cl" }], boucher: [], budget: 8 },
  { id: 14, name: "Poisson pané maison", emoji: "🐟", category: "poisson", baby: "Poisson sans arêtes émietté + purée", viande: false, legumes: [{ name: "pommes de terre", qty: "600g" }], epicerie: [{ name: "chapelure", qty: "100g" }, { name: "œufs", qty: "2" }, { name: "citron", qty: "1" }, { name: "farine", qty: "50g" }], boucher: [{ item: "filets de cabillaud", qty: "500g" }], budget: 11 },
];

const DAYS = ["Lundi soir", "Mardi soir", "Mercredi soir", "Jeudi soir", "Vendredi soir", "Sam. midi", "Sam. soir", "Dim. midi", "Dim. soir"];
const DAY_EMOJIS = ["🌙","🌙","🌙","🌙","🌙","☀️","🌙","☀️","🌙"];

const CATEGORY_COLORS = {
  "fait maison":  { bg: "#FFF3E0", accent: "#E65100", icon: "👨‍🍳" },
  "pasta":        { bg: "#FCE4EC", accent: "#C62828", icon: "🍝" },
  "comfort food": { bg: "#E8F5E9", accent: "#2E7D32", icon: "🥘" },
  "plat mijoté":  { bg: "#E3F2FD", accent: "#1565C0", icon: "🫕" },
  "léger":        { bg: "#F3E5F5", accent: "#6A1B9A", icon: "🥗" },
  "soupe":        { bg: "#E0F7FA", accent: "#00695C", icon: "🥣" },
  "mijoté":       { bg: "#FFF8E1", accent: "#F57F17", icon: "🍲" },
  "poisson":      { bg: "#E8EAF6", accent: "#283593", icon: "🐟" },
  "rôti":         { bg: "#FBE9E7", accent: "#BF360C", icon: "🍗" },
};

function getDishVisual(dish) {
  return CATEGORY_COLORS[dish.category] || { bg: "#F5F5F5", accent: "#555", icon: dish.emoji || "🍽️" };
}

// ─── STORAGE ─────────────────────────────────────────────────────────────────

function getStorage(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function setStorage(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─── API CLAUDE ───────────────────────────────────────────────────────────────

async function callClaude(messages, system, maxTokens = 1000) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTokens, system, messages }),
  });
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "";
}

// ─── COMPOSANTS ───────────────────────────────────────────────────────────────

function DishThumbnail({ dish, size = 44 }) {
  const visual = getDishVisual(dish);
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: visual.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.45, flexShrink: 0, border: `1.5px solid ${visual.accent}22` }}>
      {visual.icon}
    </div>
  );
}

function RecipeModal({ dish, onClose }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callClaude(
      [{ role: "user", content: `Donne une recette simple pour "${dish.name}" pour 2 adultes et 1 enfant. JSON: {"temps":"X min","ingredients":["..."],"etapes":["..."]}` }],
      "Chef familial français. JSON uniquement, sans backticks."
    ).then(text => {
      try { setRecipe(JSON.parse(text.replace(/```json|```/g, "").trim())); }
      catch { setRecipe({ temps: "30 min", ingredients: ["Voir recette habituelle"], etapes: ["Préparer avec amour !"] }); }
      setLoading(false);
    });
  }, [dish.name]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <DishThumbnail dish={dish} size={48} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#1a2e1c", fontFamily: "'Playfair Display', Georgia, serif" }}>{dish.name}</div>
              {!loading && recipe && <div style={{ fontSize: 12, color: "#8a9e8c", marginTop: 2 }}>⏱ {recipe.temps}</div>}
            </div>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: "50%", background: "#f0f0ec", border: "none", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#8a9e8c" }}>Chargement de la recette…</div>
        ) : recipe && (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#2d5a3d", marginBottom: 8 }}>Ingrédients</div>
              {recipe.ingredients?.map((ing, i) => (
                <div key={i} style={{ fontSize: 13, color: "#444", padding: "4px 0", borderBottom: "1px solid #f5f5f0" }}>• {ing}</div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#2d5a3d", marginBottom: 8 }}>Étapes</div>
              {recipe.etapes?.map((e, i) => (
                <div key={i} style={{ fontSize: 13, color: "#444", padding: "6px 0", borderBottom: "1px solid #f5f5f0", display: "flex", gap: 10 }}>
                  <span style={{ fontWeight: 700, color: "#2d5a3d", flexShrink: 0 }}>{i + 1}.</span> {e}
                </div>
              ))}
            </div>
            <div style={{ background: "#fdf8f2", borderRadius: 12, padding: "10px 14px", fontSize: 12, color: "#7a5c3a" }}>
              <span style={{ fontWeight: 700 }}>👶 Adaptation bébé : </span>{dish.baby}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", background: "#1a2e1c", color: "#fff", borderRadius: 20, padding: "10px 20px", fontSize: 13, fontWeight: 600, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.25)", whiteSpace: "nowrap" }}>
      {msg}
    </div>
  );
}

function ShoppingList({ weekMenu, allDishes, onCopy }) {
  const selectedDishes = weekMenu.filter(Boolean).map(id => allDishes.find(d => d.id === id)).filter(Boolean);

  // Agréger les ingrédients avec quantités
  const leclercMap = {}, maraicherMap = {}, boucher = [];
  let budget = 0;

  selectedDishes.forEach(dish => {
    dish.epicerie?.forEach(i => {
      const key = typeof i === "string" ? i : i.name;
      const qty = typeof i === "object" ? i.qty : "";
      leclercMap[key] = leclercMap[key] ? leclercMap[key] : qty;
    });
    dish.legumes?.forEach(l => {
      const key = typeof l === "string" ? l : l.name;
      const qty = typeof l === "object" ? l.qty : "";
      maraicherMap[key] = maraicherMap[key] ? maraicherMap[key] : qty;
    });
    dish.boucher?.forEach(b => { if (!boucher.find(x => x.item === b.item)) boucher.push(b); });
    budget += dish.budget || 0;
  });

  const leclerc = Object.entries(leclercMap);
  const maraicher = Object.entries(maraicherMap);

  const CopyBtn = ({ onClick }) => (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 5, background: "#25D366", border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0 }}>
      📋 Copier
    </button>
  );

  const Section = ({ title, icon, color, children, lines }) => (
    <div style={{ background: "#fff", borderRadius: 18, padding: 18, border: "1.5px solid #e8ebe8" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2e1c", flex: 1 }}>{title}</div>
        <CopyBtn onClick={() => onCopy(title, lines)} />
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "linear-gradient(135deg, #2d5a3d, #4a8c5c)", borderRadius: 18, padding: 18, color: "#fff" }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Budget estimé semaine</div>
        <div style={{ fontSize: 36, fontWeight: 800 }}>{budget} €</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Pour 2 adultes + 1 enfant + bébé</div>
      </div>

      <Section title="🛒 Drive Leclerc" icon="🛒" color="#e8f4fd"
        lines={leclerc.map(([name, qty]) => qty ? `${name} — ${qty}` : name)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {leclerc.map(([name, qty], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0f7fe", borderRadius: 10, padding: "7px 12px" }}>
              <span style={{ fontSize: 13, color: "#2a5080" }}>{name}</span>
              {qty && <span style={{ fontSize: 12, color: "#2a5080", fontWeight: 600, opacity: 0.7 }}>{qty}</span>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="🥕 Maraîcher — vendredi matin" icon="🥕" color="#fdf4e8"
        lines={maraicher.map(([name, qty]) => qty ? `${name} — ${qty}` : name)}>
        <div style={{ fontSize: 11, color: "#8a9e8c", marginBottom: 8 }}>Légumes frais · triés par fraîcheur</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {maraicher.map(([name, qty], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fef6ed", borderRadius: 10, padding: "7px 12px" }}>
              <span style={{ fontSize: 13, color: "#7a4a1a" }}>{name}</span>
              {qty && <span style={{ fontSize: 12, color: "#7a4a1a", fontWeight: 600, opacity: 0.7 }}>{qty}</span>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="🥩 Boucher — vendredi matin" icon="🥩" color="#fde8e8"
        lines={boucher.map(b => `${b.item} — ${b.qty}`)}>
        {boucher.length === 0
          ? <div style={{ fontSize: 13, color: "#aaa" }}>Aucune viande cette semaine 🌿</div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {boucher.map((b, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fef2f2", borderRadius: 10, padding: "7px 12px" }}>
                <span style={{ fontSize: 13, color: "#5a1a1a", fontWeight: 500 }}>{b.item}</span>
                <span style={{ fontSize: 12, color: "#c53030", fontWeight: 700 }}>{b.qty}</span>
              </div>
            ))}
          </div>
        }
      </Section>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  // ── State (tous persistés) ───────────────────────────────────────────────
  const [step, setStep] = useState(() => getStorage("step", "accueil"));
  const [repertoire] = useState(INITIAL_REPERTOIRE);
  const [history, setHistory] = useState(() => getStorage("history", []));
  const [selectedDishes, setSelectedDishes] = useState(() => getStorage("selectedDishes", []));
  const [weekMenu, setWeekMenu] = useState(() => getStorage("weekMenu", Array(9).fill(null)));
  const [constraints, setConstraints] = useState(() => getStorage("constraints", ""));
  const [extraDishes, setExtraDishes] = useState(() => getStorage("extraDishes", SUGGESTED_NEW));
  const [ingredientsToUse, setIngredientsToUse] = useState(() => getStorage("ingredientsToUse", []));

  const [dragging, setDragging] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showNewDishes, setShowNewDishes] = useState(false);
  const [menuToast, setMenuToast] = useState(false);
  const [toast, setToast] = useState(null);
  const [recipeModal, setRecipeModal] = useState(null); // dish object

  const allDishes = [...repertoire, ...extraDishes];

  // ── Persistance auto ─────────────────────────────────────────────────────
  useEffect(() => { setStorage("step", step); }, [step]);
  useEffect(() => { setStorage("weekMenu", weekMenu); }, [weekMenu]);
  useEffect(() => { setStorage("selectedDishes", selectedDishes); }, [selectedDishes]);
  useEffect(() => { setStorage("constraints", constraints); }, [constraints]);
  useEffect(() => { setStorage("extraDishes", extraDishes); }, [extraDishes]);
  useEffect(() => { setStorage("ingredientsToUse", ingredientsToUse); }, [ingredientsToUse]);
  useEffect(() => { setStorage("history", history); }, [history]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2500); }

  function copyText(title, lines) {
    const text = `${title}\n\n${lines.map(l => `• ${l}`).join("\n")}`;
    navigator.clipboard.writeText(text).then(() => showToast(`✅ "${title}" copié — Collez dans WhatsApp`));
  }

  function copyMenuWhatsApp() {
    const lines = DAYS.map((day, idx) => {
      const dish = allDishes.find(d => d.id === weekMenu[idx]);
      return dish ? `${DAY_EMOJIS[idx]} *${day}*\n   – ${dish.name}` : null;
    }).filter(Boolean);
    const text = `🌿 *Menu de la semaine*\n${"─".repeat(22)}\n\n${lines.join("\n\n")}`;
    navigator.clipboard.writeText(text).then(() => { setMenuToast(true); setTimeout(() => setMenuToast(false), 2500); });
  }

  function getIngredientBadge(dish) {
    if (!ingredientsToUse.length) return null;
    const all = [...(dish.legumes || []), ...(dish.epicerie || [])].map(i => (typeof i === "string" ? i : i.name).toLowerCase());
    for (const ing of ingredientsToUse) {
      const n = ing.name.toLowerCase().replace(/s$/, "");
      if (all.some(i => i.includes(n) || n.includes(i.replace(/s$/, "")))) {
        return ing.qty ? `🌿 Idéal pour vos ${ing.qty} ${ing.name}` : `🌿 Utilise vos ${ing.name}`;
      }
    }
    return null;
  }

  // ── Actions ──────────────────────────────────────────────────────────────
  async function generateSuggestions() {
    setLoadingSuggestions(true);
    setStep("choix");

    if (constraints) {
      const raw = await callClaude(
        [{ role: "user", content: `Dans "${constraints}", extrais les aliments à écouler. JSON: [{"name":"courgettes","qty":"3"}]. Si rien: []. JSON uniquement.` }],
        "Assistant culinaire. JSON uniquement."
      );
      try { setIngredientsToUse(JSON.parse(raw.replace(/```json|```/g, "").trim()) || []); } catch { setIngredientsToUse([]); }
    } else { setIngredientsToUse([]); }

    const recentNames = history.slice(-3).flat().join(", ");
    const prompt = `Famille fr : 2 adultes, enfant 5 ans, bébé 9 mois. Répertoire IDs 1-9: ${repertoire.map(d => `${d.id}:${d.name}`).join(", ")}. Éviter récents: ${recentNames || "aucun"}. Contraintes: ${constraints || "aucune"}. Choisis 9 IDs parmi 1-14 pour la semaine. JSON: {"ids":[...]}`;
    const text = await callClaude([{ role: "user", content: prompt }], "Assistant repas. JSON uniquement.");
    try {
      const { ids } = JSON.parse(text.replace(/```json|```/g, "").trim());
      setSelectedDishes(ids.map(id => allDishes.find(d => d.id === id)).filter(Boolean));
    } catch { setSelectedDishes(repertoire.slice(0, 9)); }
    setLoadingSuggestions(false);
  }

  async function loadMoreDishes() {
    setLoadingMore(true);
    const known = [...repertoire, ...extraDishes].map(d => d.name).join(", ");
    const prompt = `Propose exactement 10 nouvelles recettes familiales françaises simples, DIFFÉRENTES de: ${known}. JSON tableau de 10 objets: {name, emoji, category, baby, viande(bool), legumes:[{name,qty}], epicerie:[{name,qty}], boucher:[{item,qty}], budget(int)}. JSON uniquement, sans backticks.`;
    try {
      const text = await callClaude([{ role: "user", content: prompt }], "Assistant culinaire. JSON tableau uniquement.", 3000);
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      if (Array.isArray(parsed)) {
        setExtraDishes(prev => [...prev, ...parsed.map((d, i) => ({ ...d, id: 1000 + prev.length + i }))]);
      }
    } catch (e) { console.error(e); }
    setLoadingMore(false);
  }

  function toggleDish(dish) {
    setSelectedDishes(prev =>
      prev.find(d => d.id === dish.id)
        ? prev.filter(d => d.id !== dish.id)
        : prev.length < 9 ? [...prev, dish] : prev
    );
  }

  function goToPlanning() {
    setWeekMenu(selectedDishes.map(d => d.id));
    setStep("planning");
  }

  function moveDish(from, to) {
    const m = [...weekMenu]; [m[from], m[to]] = [m[to], m[from]]; setWeekMenu(m);
  }

  function validateWeek() {
    const names = weekMenu.filter(Boolean).map(id => allDishes.find(d => d.id === id)?.name).filter(Boolean);
    setHistory(prev => [...prev, names].slice(-8));
    setStep("courses");
  }

  function nouvelleSeamaine() {
    setStep("accueil");
    setSelectedDishes([]);
    setWeekMenu(Array(9).fill(null));
    setConstraints("");
    setIngredientsToUse([]);
  }

  // ── Styles ───────────────────────────────────────────────────────────────
  const S = {
    app: { fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f7f7f4", minHeight: "100vh", maxWidth: 480, margin: "0 auto", paddingBottom: 40 },
    header: { background: "#fff", padding: "16px 20px", borderBottom: "1px solid #eeeeea", position: "sticky", top: 0, zIndex: 10 },
    logo: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 800, color: "#1a2e1c" },
    sub: { fontSize: 12, color: "#8a9e8c", marginTop: 2 },
    content: { padding: "20px 16px" },
    btn: { background: "#2d5a3d", color: "#fff", border: "none", borderRadius: 14, padding: "14px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%" },
    btnOutline: { background: "#fff", color: "#2d5a3d", border: "2px solid #2d5a3d", borderRadius: 14, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" },
    back: { background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#444" },
  };

  const Header = ({ title, onBack }) => (
    <div style={S.header}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && <button onClick={onBack} style={S.back}>←</button>}
        <div><div style={S.logo}>🌿 MenuSemaine</div><div style={S.sub}>{title}</div></div>
      </div>
    </div>
  );

  // ── ACCUEIL ───────────────────────────────────────────────────────────────
  if (step === "accueil") return (
    <div style={S.app}>
      <Header title="Planificateur repas familial" />
      <div style={S.content}>
        <div style={{ background: "linear-gradient(135deg, #2d5a3d, #4a8c5c)", borderRadius: 24, padding: 24, color: "#fff", marginBottom: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>👋</div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Bonjour !</div>
          <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>Prête à planifier la semaine ? Moins de 5 minutes.</div>
        </div>

        {history.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14, border: "1.5px solid #e8ebe8" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1c", marginBottom: 8 }}>🗓 Semaine dernière</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(history[history.length - 1] || []).map((name, i) => (
                <span key={i} style={{ background: "#f5f5f0", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#666" }}>{name}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 20, border: "1.5px solid #e8ebe8" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e1c", marginBottom: 10 }}>Des contraintes cette semaine ?</div>
          <textarea value={constraints} onChange={e => setConstraints(e.target.value)}
            placeholder="Ex : mercredi on mange dehors, pas de poisson, on a 3 courgettes à finir…"
            style={{ width: "100%", border: "1.5px solid #e8ebe8", borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#333", resize: "none", minHeight: 80, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
        </div>

        <button onClick={generateSuggestions} style={S.btn}>✨ Générer mes suggestions</button>
      </div>
    </div>
  );

  // ── CHOIX ─────────────────────────────────────────────────────────────────
  if (step === "choix") return (
    <div style={S.app}>
      <Header title="Choisissez vos 9 repas" onBack={() => setStep("accueil")} />
      <div style={S.content}>
        {loadingSuggestions ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🤔</div>
            <div style={{ fontSize: 15, color: "#3a5c3e", fontWeight: 600 }}>Je prépare vos suggestions…</div>
            <div style={{ fontSize: 13, color: "#aaa", marginTop: 6 }}>En tenant compte de vos dernières semaines</div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: "#8a9e8c" }}><span style={{ fontWeight: 700, color: "#2d5a3d" }}>{selectedDishes.length}/9</span> sélectionnés</div>
              <div style={{ display: "flex", gap: 3, background: "#f0f0ec", borderRadius: 20, padding: 3 }}>
                {["Mes plats", "Nouveautés"].map((t, i) => (
                  <button key={i} onClick={() => setShowNewDishes(i === 1)} style={{ background: showNewDishes === (i === 1) ? "#fff" : "none", border: "none", borderRadius: 16, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: showNewDishes === (i === 1) ? "#2d5a3d" : "#888", cursor: "pointer" }}>{t}</button>
                ))}
              </div>
            </div>

            {!showNewDishes ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {repertoire.map(dish => (
                  <DishCardFull key={dish.id} dish={dish} selected={!!selectedDishes.find(d => d.id === dish.id)} onToggle={toggleDish} badge={getIngredientBadge(dish)} onRecipe={setRecipeModal} />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {extraDishes.map(dish => (
                  <DishCardCompact key={dish.id} dish={dish} selected={!!selectedDishes.find(d => d.id === dish.id)} onToggle={toggleDish} badge={getIngredientBadge(dish)} />
                ))}
                <button onClick={loadMoreDishes} disabled={loadingMore} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#fff", border: "2px dashed #c8d8ca", borderRadius: 14, padding: "14px", fontSize: 13, fontWeight: 600, color: loadingMore ? "#aaa" : "#2d5a3d", cursor: loadingMore ? "not-allowed" : "pointer" }}>
                  {loadingMore ? <>⏳ Recherche…</> : <>✨ Voir 10 autres propositions</>}
                </button>
              </div>
            )}

            {selectedDishes.length === 9
              ? <button onClick={goToPlanning} style={S.btn}>Placer dans le calendrier →</button>
              : <div style={{ textAlign: "center", fontSize: 13, color: "#aaa" }}>Sélectionnez encore {9 - selectedDishes.length} plat{9 - selectedDishes.length > 1 ? "s" : ""}</div>
            }
          </>
        )}
      </div>
      {recipeModal && <RecipeModal dish={recipeModal} onClose={() => setRecipeModal(null)} />}
    </div>
  );

  // ── PLANNING ──────────────────────────────────────────────────────────────
  if (step === "planning") return (
    <div style={S.app}>
      <Header title="Organisez votre semaine" onBack={() => setStep("choix")} />
      <div style={S.content}>
        <div style={{ fontSize: 13, color: "#8a9e8c", marginBottom: 14, textAlign: "center" }}>Touchez un repas pour l'échanger · ✕ pour le supprimer</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {DAYS.map((day, idx) => {
            const dish = allDishes.find(d => d.id === weekMenu[idx]);
            const isSel = dragging === idx;
            return (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div onClick={() => {
                  if (!dish) return;
                  if (dragging === null) setDragging(idx);
                  else if (dragging === idx) setDragging(null);
                  else { moveDish(dragging, idx); setDragging(null); }
                }} style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, background: isSel ? "#e8f5ec" : dish ? "#fff" : "#fafaf8", border: `2px solid ${isSel ? "#2d5a3d" : "#e8ebe8"}`, borderRadius: 16, padding: "10px 14px", cursor: dish ? "pointer" : "default", transition: "all .15s" }}>
                  <div style={{ width: 80, fontSize: 11, fontWeight: 700, color: "#8a9e8c", flexShrink: 0, lineHeight: 1.3 }}>{day}</div>
                  {dish ? (
                    <>
                      <DishThumbnail dish={dish} size={38} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2e1c" }}>{dish.name}</div>
                        <div style={{ fontSize: 10, color: "#8a9e8c", marginTop: 1 }}>👶 {dish.baby?.substring(0, 38)}…</div>
                      </div>
                      {isSel && <div style={{ fontSize: 18 }}>↕</div>}
                    </>
                  ) : (
                    <div style={{ fontSize: 11, color: "#ccc", fontStyle: "italic" }}>On mange dehors 🍽️</div>
                  )}
                </div>
                {dish ? (
                  <button onClick={() => { if (dragging === idx) setDragging(null); const m = [...weekMenu]; m[idx] = null; setWeekMenu(m); }} style={{ width: 34, height: 34, borderRadius: "50%", background: "#fff", border: "1.5px solid #f0d0d0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: "#c53030", flexShrink: 0 }}>✕</button>
                ) : <div style={{ width: 34 }} />}
              </div>
            );
          })}
        </div>
        <button onClick={validateWeek} style={S.btn}>Valider & voir les courses →</button>
      </div>
    </div>
  );

  // ── COURSES ───────────────────────────────────────────────────────────────
  if (step === "courses") return (
    <div style={S.app}>
      <Header title="Récap semaine & courses" onBack={() => setStep("planning")} />
      <div style={S.content}>
        <Toast msg={toast} />
        {menuToast && <Toast msg="✅ Menu copié — Collez dans WhatsApp" />}

        {/* Planning résumé */}
        <div style={{ background: "#fff", borderRadius: 18, padding: 16, border: "1.5px solid #e8ebe8", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2e1c" }}>📅 Menu de la semaine</div>
            <button onClick={copyMenuWhatsApp} style={{ display: "flex", alignItems: "center", gap: 5, background: "#25D366", border: "none", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer" }}>📋 Copier</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {DAYS.map((day, idx) => {
              const dish = allDishes.find(d => d.id === weekMenu[idx]);
              if (!dish) return null;
              return (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#8a9e8c", width: 82, flexShrink: 0 }}>{DAY_EMOJIS[idx]} {day}</div>
                  <div style={{ flex: 1, fontSize: 13, color: "#1a2e1c", fontWeight: 500 }}>{dish.name}</div>
                  <button onClick={() => setRecipeModal(dish)} style={{ fontSize: 11, color: "#2d5a3d", background: "none", border: "1px solid #c8dfc8", borderRadius: 10, padding: "3px 8px", cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>Recette</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Listes de courses */}
        <ShoppingList weekMenu={weekMenu} allDishes={allDishes} onCopy={copyText} />

        <div style={{ marginTop: 20 }}>
          <button onClick={nouvelleSeamaine} style={S.btnOutline}>🗓 Nouvelle semaine</button>
        </div>
      </div>
      {recipeModal && <RecipeModal dish={recipeModal} onClose={() => setRecipeModal(null)} />}
    </div>
  );

  return null;
}

// ─── DishCard variantes ───────────────────────────────────────────────────────

function DishCardFull({ dish, selected, onToggle, badge, onRecipe }) {
  const visual = getDishVisual(dish);
  return (
    <div style={{ borderRadius: 18, overflow: "hidden", border: `2px solid ${selected ? "#2d5a3d" : "#e8ebe8"}`, background: "#fff", transition: "all .25s", boxShadow: selected ? "0 4px 20px rgba(45,90,61,0.15)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div style={{ position: "relative", height: 110, background: visual.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => onToggle(dish)}>
        <span style={{ fontSize: 50, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{visual.icon}</span>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 50%)" }} />
        {selected && <div style={{ position: "absolute", top: 8, right: 8, width: 24, height: 24, borderRadius: "50%", background: "#2d5a3d", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 13 }}>✓</span></div>}
        <div style={{ position: "absolute", bottom: 7, left: 9, right: 9 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#fff", lineHeight: 1.2, textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>{dish.name}</div>
        </div>
      </div>
      <div style={{ padding: "7px 10px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#e8f0e9", color: "#3a5c3e", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>{dish.category}</span>
        <button onClick={e => { e.stopPropagation(); onRecipe(dish); }} style={{ fontSize: 10, color: "#2d5a3d", background: "none", border: "none", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}>Recette</button>
      </div>
      {badge && !selected && (
        <div style={{ margin: "0 10px 8px", background: "#edf7ef", border: "1px solid #c8e6cc", borderRadius: 8, padding: "4px 10px", fontSize: 10, color: "#2d6e3a", fontWeight: 600 }}>{badge}</div>
      )}
    </div>
  );
}

function DishCardCompact({ dish, selected, onToggle, badge }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: `1.5px solid ${selected ? "#2d5a3d" : badge ? "#b8dfc0" : "#e8ebe8"}`, background: selected ? "#2d5a3d" : "#fff", cursor: "pointer", transition: "all .2s" }}>
      <div onClick={() => onToggle(dish)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px" }}>
        <DishThumbnail dish={dish} size={44} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: selected ? "#fff" : "#1a2e1c" }}>{dish.name}</div>
          <div style={{ fontSize: 11, color: selected ? "#a8d4b0" : "#8a9e8c", marginTop: 2 }}>{dish.category}</div>
        </div>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: selected ? "#fff" : "#e8ebe8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {selected ? <span style={{ color: "#2d5a3d", fontSize: 13 }}>✓</span> : <span style={{ color: "#aaa", fontSize: 16 }}>+</span>}
        </div>
      </div>
      {badge && !selected && (
        <div style={{ background: "#edf7ef", borderTop: "1px solid #c8e6cc", padding: "5px 14px", fontSize: 11, color: "#2d6e3a", fontWeight: 600 }}>{badge}</div>
      )}
    </div>
  );
}
