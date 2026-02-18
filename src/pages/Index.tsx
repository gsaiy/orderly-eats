import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import CuisineScroller from "@/components/home/CuisineScroller";
import RestaurantCard from "@/components/home/RestaurantCard";
import InstamartSection from "@/components/home/InstamartSection";
import { restaurants } from "@/data/mockData";
import { SlidersHorizontal } from "lucide-react";

type SortOption = "relevance" | "rating" | "deliveryTime" | "costLow" | "costHigh";

const Index = () => {
  const [activeCuisine, setActiveCuisine] = useState("🍽️ All");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = restaurants;
    if (activeCuisine !== "🍽️ All") {
      const cuisineName = activeCuisine.replace(/^[\p{Emoji}\s]+/u, "").trim();
      list = list.filter((r) => r.cuisine.some((c) => c.toLowerCase().includes(cuisineName.toLowerCase())));
    }
    if (vegOnly) list = list.filter((r) => r.isVeg);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "costLow") list = [...list].sort((a, b) => a.costForTwo - b.costForTwo);
    if (sortBy === "costHigh") list = [...list].sort((a, b) => b.costForTwo - a.costForTwo);
    return list;
  }, [activeCuisine, sortBy, vegOnly]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-6xl pb-20">
        <HeroSection />

        {/* Filters */}
        <div className="flex items-center gap-2 px-4 pt-4 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </button>
          {(["relevance", "rating", "costLow", "costHigh"] as SortOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                sortBy === opt ? "bg-foreground text-card" : "border text-foreground hover:bg-secondary"
              }`}
            >
              {opt === "relevance" ? "Relevance" : opt === "rating" ? "Rating" : opt === "costLow" ? "Cost: Low" : "Cost: High"}
            </button>
          ))}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              vegOnly ? "bg-accent text-accent-foreground" : "border text-foreground hover:bg-secondary"
            }`}
          >
            Pure Veg
          </button>
        </div>

        <CuisineScroller active={activeCuisine} onSelect={setActiveCuisine} />

        {/* Restaurant Grid */}
        <section className="px-4">
          <h2 className="font-display font-bold text-xl text-foreground mb-4">
            {filtered.length} restaurants to explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r, i) => (
              <div key={r.id} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No restaurants found</p>
              <p className="text-sm mt-1">Try changing the filters</p>
            </div>
          )}
        </section>

        <InstamartSection />
      </main>
    </div>
  );
};

export default Index;
