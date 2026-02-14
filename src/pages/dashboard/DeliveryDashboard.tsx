import { useState } from "react";
import { Package, MapPin, TrendingUp, Clock, Check, Phone, Navigation } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockOrders } from "@/data/mockOrders";
import { toast } from "sonner";

const navItems = [
  { label: "Active", path: "/dashboard/delivery", icon: <Package className="h-4 w-4" /> },
  { label: "History", path: "/dashboard/delivery/history", icon: <Clock className="h-4 w-4" /> },
  { label: "Earnings", path: "/dashboard/delivery/earnings", icon: <TrendingUp className="h-4 w-4" /> },
];

const DeliveryDashboard = () => {
  const assigned = mockOrders.filter((o) => o.deliveryPartnerId === "u3");
  const active = assigned.filter((o) => ["accepted", "preparing", "picked"].includes(o.orderStatus));
  const delivered = assigned.filter((o) => o.orderStatus === "delivered");
  const [tab, setTab] = useState<"active" | "history" | "earnings">("active");

  const totalEarnings = delivered.length * 45; // ₹45 per delivery

  return (
    <DashboardLayout title="Delivery" items={navItems}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Active Orders", value: active.length, color: "text-warning" },
          { label: "Delivered Today", value: delivered.length, color: "text-accent" },
          { label: "Earnings", value: `₹${totalEarnings}`, color: "text-primary" },
          { label: "Avg Rating", value: "4.5", color: "text-info" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-card shadow-card">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {(["active", "history", "earnings"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${tab === t ? "bg-foreground text-card" : "bg-secondary text-secondary-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="space-y-3">
          {active.length === 0 && <p className="text-center py-8 text-muted-foreground">No active deliveries</p>}
          {active.map((order) => (
            <div key={order.id} className="p-4 rounded-xl bg-card shadow-card">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-display font-bold text-foreground">{order.restaurantName}</p>
                  <p className="text-xs text-muted-foreground">{order.id} · ₹{order.total}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full capitalize bg-warning/10 text-warning">{order.orderStatus}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" />{order.deliveryAddress}
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success("Status updated!")}
                  className="flex-1 h-9 rounded-xl bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center gap-1.5">
                  <Check className="h-3 w-3" /> {order.orderStatus === "preparing" ? "Picked Up" : "Delivered"}
                </button>
                <button className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
                  <Navigation className="h-4 w-4" />
                </button>
                <button className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-3">
          {delivered.map((order) => (
            <div key={order.id} className="p-4 rounded-xl bg-card shadow-card flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-foreground">{order.restaurantName}</p>
                <p className="text-xs text-muted-foreground">{order.id} · {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-accent">₹45</p>
                <p className="text-xs text-muted-foreground">earned</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "earnings" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-card shadow-card">
            <h3 className="font-display font-bold text-sm text-foreground mb-3">Earnings Breakdown</h3>
            <div className="grid grid-cols-3 gap-4">
              {[{ label: "Today", value: `₹${totalEarnings}` }, { label: "This Week", value: `₹${totalEarnings * 5}` }, { label: "This Month", value: `₹${totalEarnings * 22}` }].map((e) => (
                <div key={e.label} className="text-center">
                  <p className="text-xs text-muted-foreground">{e.label}</p>
                  <p className="text-lg font-bold text-foreground">{e.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card">
            <h3 className="font-display font-bold text-sm text-foreground mb-2">Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-foreground"><span>Total deliveries</span><span>{delivered.length}</span></div>
              <div className="flex justify-between text-foreground"><span>Per delivery earning</span><span>₹45</span></div>
              <div className="flex justify-between text-foreground"><span>Avg delivery time</span><span>25 min</span></div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DeliveryDashboard;
