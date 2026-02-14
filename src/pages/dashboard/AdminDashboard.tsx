import { useState } from "react";
import { Users, Store, ShoppingBag, TrendingUp, Shield, ShieldOff, Eye } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockOrders, mockAllUsers } from "@/data/mockOrders";
import { restaurants } from "@/data/mockData";
import { toast } from "sonner";

const navItems = [
  { label: "Overview", path: "/dashboard/admin", icon: <TrendingUp className="h-4 w-4" /> },
  { label: "Users", path: "/dashboard/admin/users", icon: <Users className="h-4 w-4" /> },
  { label: "Restaurants", path: "/dashboard/admin/restaurants", icon: <Store className="h-4 w-4" /> },
  { label: "Orders", path: "/dashboard/admin/orders", icon: <ShoppingBag className="h-4 w-4" /> },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState<"overview" | "users" | "restaurants" | "orders">("overview");
  const totalRevenue = mockOrders.filter((o) => o.paymentStatus === "paid").reduce((s, o) => s + o.total, 0);

  return (
    <DashboardLayout title="Admin" items={navItems}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Users", value: mockAllUsers.length, color: "text-info" },
          { label: "Restaurants", value: restaurants.length, color: "text-primary" },
          { label: "Total Orders", value: mockOrders.length, color: "text-warning" },
          { label: "Revenue", value: `₹${totalRevenue}`, color: "text-accent" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-card shadow-card">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {(["overview", "users", "restaurants", "orders"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${tab === t ? "bg-foreground text-card" : "bg-secondary text-secondary-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-card shadow-card">
            <h3 className="font-display font-bold text-sm text-foreground mb-3">Platform Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between text-foreground"><span>Active customers</span><span>{mockAllUsers.filter((u) => u.role === "customer" && u.status === "active").length}</span></div>
              <div className="flex justify-between text-foreground"><span>Active partners</span><span>{mockAllUsers.filter((u) => u.role === "delivery" && u.status === "active").length}</span></div>
              <div className="flex justify-between text-foreground"><span>Completed orders</span><span>{mockOrders.filter((o) => o.orderStatus === "delivered").length}</span></div>
              <div className="flex justify-between text-foreground"><span>Cancelled orders</span><span>{mockOrders.filter((o) => o.orderStatus === "cancelled").length}</span></div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card shadow-card">
            <h3 className="font-display font-bold text-sm text-foreground mb-3">Recent Orders</h3>
            {mockOrders.slice(0, 3).map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 text-sm border-b border-border last:border-0">
                <div>
                  <p className="text-foreground font-medium">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.restaurantName}</p>
                </div>
                <span className="text-sm font-bold text-foreground">₹{o.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "users" && (
        <div className="space-y-2">
          {mockAllUsers.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card">
              <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
                {u.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email} · <span className="capitalize">{u.role}</span></p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}>{u.status}</span>
              <button onClick={() => toast.success(u.status === "active" ? "User blocked" : "User unblocked")}
                className="p-1.5 text-muted-foreground hover:text-foreground">
                {u.status === "active" ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "restaurants" && (
        <div className="space-y-2">
          {restaurants.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-card shadow-card">
              <img src={r.image} alt={r.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.cuisine.join(", ")} · ⭐ {r.rating}</p>
              </div>
              <button className="p-1.5 text-muted-foreground hover:text-primary"><Eye className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-2">
          {mockOrders.map((o) => (
            <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-card shadow-card">
              <div>
                <p className="font-medium text-sm text-foreground">{o.id}</p>
                <p className="text-xs text-muted-foreground">{o.restaurantName} · {new Date(o.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">₹{o.total}</p>
                <span className={`text-[10px] font-bold capitalize ${o.orderStatus === "delivered" ? "text-accent" : o.orderStatus === "cancelled" ? "text-destructive" : "text-warning"}`}>
                  {o.orderStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
