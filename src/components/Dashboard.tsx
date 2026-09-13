import {
  TrendingUp,
  ShoppingBag,
  Cpu,
  ArrowUpRight,
  Sparkles,
  Zap,
  DollarSign,
  PackageCheck,
} from "lucide-react";
import { ProductCatalogItem, Order, UserProfile, AgentTask } from "@/types";

interface DashboardProps {
  currentUser: UserProfile;
  products: ProductCatalogItem[];
  orders: Order[];
  agentTasks: AgentTask[];
  onNavigate: (tab: string) => void;
}

export function Dashboard({
  currentUser,
  products,
  orders,
  agentTasks,
  onNavigate,
}: DashboardProps) {
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmountUSD, 0);
  const totalActiveSKUs = products.reduce(
    (acc, p) => acc + p.variants.reduce((vAcc, v) => vAcc + v.inventoryCount, 0),
    0
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Immersive Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-muted to-background border border-border p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/15 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI Autonomous Agent Ecosystem Active</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent">
              {currentUser.companyName}
            </span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
            Your global B2B wholesale network is running at peak velocity. AI demand forecasters
            have synchronized 4 warehouses with zero discrepancy.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("catalog")}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-deep text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore B2B Catalog</span>
            </button>
            <button
              onClick={() => onNavigate("agents")}
              className="px-6 py-3.5 rounded-2xl bg-card hover:bg-muted border border-border text-foreground font-bold text-sm transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-accent" />
              <span>View Autonomous Agents</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Gross Wholesale Volume",
            value: `$${totalRevenue.toLocaleString()}`,
            change: "+24.8% vs last month",
            icon: DollarSign,
            color: "from-success/20 to-success/0 text-success border-success/30",
          },
          {
            title: "Active Catalog Products",
            value: products.length.toString(),
            change: "100% synced with Shopify",
            icon: ShoppingBag,
            color: "from-primary/20 to-primary/0 text-primary border-primary/30",
          },
          {
            title: "Total SKU Inventory",
            value: totalActiveSKUs.toLocaleString(),
            change: "Across 4 global hubs",
            icon: PackageCheck,
            color: "from-accent/20 to-accent/0 text-accent border-accent/30",
          },
          {
            title: "Active Agent Workers",
            value: agentTasks.length.toString(),
            change: "3 agents executing",
            icon: Cpu,
            color: "from-destructive/20 to-destructive/0 text-destructive border-destructive/30",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-3xl bg-card/70 backdrop-blur-xl border border-border p-6 hover:border-primary/40 transition-all shadow-xl group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {stat.title}
              </span>
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} border flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-foreground mb-2">{stat.value}</div>
            <div className="flex items-center gap-1.5 text-xs text-success font-semibold">
              <ArrowUpRight className="w-4 h-4" />
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Recent Orders & Agent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Wholesale Orders */}
        <div className="lg:col-span-2 rounded-3xl bg-card/70 backdrop-blur-xl border border-border p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Recent Wholesale Orders</h2>
              <p className="text-xs text-muted-foreground">Live B2B transaction ledger & status</p>
            </div>
            <button
              onClick={() => onNavigate("orders")}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {orders.map((order) => {
              const prod = products.find((p) => p.id === order.items[0]?.productId);
              return (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-secondary border border-border flex items-center justify-between hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border overflow-hidden flex-shrink-0">
                      {prod?.images[0] ? (
                        <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag className="w-6 h-6 m-3 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">Order #{order.id}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            order.status === "paid"
                              ? "bg-success/10 text-success border border-success/30"
                              : order.status === "approved"
                                ? "bg-accent/10 text-accent border border-accent/30"
                                : "bg-primary/10 text-primary border border-primary/30"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {prod ? prod.name : "Multiple Items"} ({order.items.length} variants)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-foreground">
                      ${order.totalAmountUSD.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Activity Stream */}
        <div className="rounded-3xl bg-card/70 backdrop-blur-xl border border-border p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-extrabold text-foreground">Agentic Stream</h2>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-ping" />
            </div>

            <div className="space-y-4">
              {agentTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-2xl bg-secondary border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground line-clamp-1">{task.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        task.status === "success"
                          ? "bg-success/10 text-success border border-success/30"
                          : task.status === "running"
                            ? "bg-accent/10 text-accent border border-accent/30 animate-pulse"
                            : "bg-primary/10 text-primary border border-primary/30"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  {task.output && (
                    <p className="text-xs text-muted-foreground leading-relaxed bg-background p-2.5 rounded-xl border border-border">
                      {task.output}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate("agents")}
            className="w-full mt-6 py-3 rounded-2xl bg-secondary hover:bg-muted border border-border text-xs font-bold text-foreground transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span>Launch New AI Workflow</span>
          </button>
        </div>
      </div>
    </div>
  );
}
