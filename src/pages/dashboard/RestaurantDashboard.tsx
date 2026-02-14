import { useState } from "react";
import { ClipboardList, UtensilsCrossed, Star, TrendingUp, Plus, Edit, Trash2, Check, X } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { restaurants } from "@/data/mockData";
import { mockOrders } from "@/data/mockOrders";
import { toast } from "sonner";

const navItems = [
  { label: "Orders", path: "/dashboard/restaurant", icon: <ClipboardList className="h-4 w-4" /> },
  { label: "Menu", path: "/dashboard/restaurant/menu", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { label: "Reviews", path: "/dashboard/restaurant/reviews", icon: <Star className="h-4 w-4" /> },
  { label: "Analytics", path: "/dashboard/restaurant/analytics", icon: <TrendingUp className="h-4 w-4" /> },
];

const RestaurantDashboard = () => {
  const restaurant = restaurants[0]; // Mock: owner sees their restaurant
  const orders = mockOrders.filter((o) => o.restaurantId === restaurant.id);
  const [tab, setTab] = useState<"orders" | "menu" | "analytics" | "reviews">("orders");

  const revenue = orders.filter((o) => o.paymentStatus === "paid").reduce((s, o) => s + o.total, 0);
  const topItems = restaurant.menu.filter((m) => m.isBestseller);

  return (
    <DashboardLayout title="Restaurant" items={navItems}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Today's Revenue", value: `₹${revenue}`, color: "text-accent" },
          { label: "Active Orders", value: orders.filter((o) => o.orderStatus === "preparing").length, color: "text-warning" },
          { label: "Total Orders", value: orders.length, color: "text-info" },
          { label: "Rating", value: restaurant.rating, color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-card shadow-card">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(["orders", "menu", "analytics", "reviews"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${tab === t ? "bg-foreground text-card" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="space-y-3">
          {orders.length === 0 && <p className="text-center py-8 text-muted-foreground">No orders yet</p>}
          {orders.map((order) => (
            <div key={order.id} className="p-4 rounded-xl bg-card shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display font-bold text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</p>
                  <p className="text-sm font-bold text-foreground mt-1">₹{order.total}</p>
                </div>
                <div className="flex gap-1.5">
                  {(order.orderStatus === "placed") && (
                    <>
                      <button onClick={() => toast.success("Order accepted!")} className="h-8 w-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => toast.error("Order rejected")} className="h-8 w-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${
                    order.orderStatus === "delivered" ? "bg-accent/10 text-accent" : order.orderStatus === "preparing" ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
                  }`}>{order.orderStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "menu" && (
        <div className="space-y-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            <Plus className="h-4 w-4" /> Add Item
          </button>
          {restaurant.menu.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground">{item.name}</h4>
                <p className="text-xs text-muted-foreground">₹{item.price} · {item.category}</p>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 text-muted-foreground hover:text-primary"><Edit className="h-4 w-4" /></button>
                <button onClick={() => toast.success("Item deleted")} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "analytics" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-card shadow-card">
            <h3 className="font-display font-bold text-sm text-foreground mb-3">Revenue Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              {[{ label: "Daily", value: `₹${revenue}` }, { label: "Weekly", value: `₹${revenue * 5}` }, { label: "Monthly", value: `₹${revenue * 22}` }].map((r) => (
                <div key={r.label} className="text-center">
                  <p className="text-xs text-muted-foreground">{r.label}</p>
                  <p className="text-lg font-bold text-foreground">{r.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card">
            <h3 className="font-display font-bold text-sm text-foreground mb-3">Top Selling Items</h3>
            {topItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 text-sm">
                <span className="text-foreground">{item.name}</span>
                <span className="text-muted-foreground">₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-3">
          {mockOrders.filter((o) => o.rating).map((o) => (
            <div key={o.id} className="p-4 rounded-xl bg-card shadow-card">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <Star key={s} className={`h-3 w-3 ${s <= (o.rating || 0) ? "fill-warning text-warning" : "text-muted"}`} />)}</div>
                <span className="text-xs text-muted-foreground">{o.id}</span>
              </div>
              {o.review && <p className="text-sm text-foreground mt-1">"{o.review}"</p>}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default RestaurantDashboard;
