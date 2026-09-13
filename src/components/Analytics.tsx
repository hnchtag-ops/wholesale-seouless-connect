import { TrendingUp, ArrowUpRight, Sparkles } from "lucide-react";
import { Order, ProductCatalogItem } from "@/types";

interface AnalyticsProps {
  orders: Order[];
  products: ProductCatalogItem[];
}

export function Analytics({ orders, products }: AnalyticsProps) {
  const totalVolume = orders.reduce((acc, o) => acc + o.totalAmountUSD, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <div className="bg-card/70 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Predictive Financial Modeling</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
            Global B2B Intelligence & Analytics
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Real-time sell-through velocity, retailer re-order probability, and cross-border revenue metrics.
          </p>
        </div>
      </div>

      {/* High-level metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "YTD Wholesale Volume", value: `$${totalVolume.toLocaleString()}`, change: "+32.4% vs Q1 2024" },
          { title: "Average Order Value (AOV)", value: "$5,175.00", change: "+14.1% efficiency" },
          { title: "Retailer Re-Order Rate", value: "88.6%", change: "Top 5% in industry" },
        ].map((m, i) => (
          <div key={i} className="rounded-3xl bg-card/70 backdrop-blur-xl border border-border p-6 shadow-xl space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{m.title}</span>
            <div className="text-3xl font-extrabold text-foreground">{m.value}</div>
            <div className="flex items-center gap-1 text-xs text-success font-semibold">
              <ArrowUpRight className="w-4 h-4" />
              <span>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Chart Mockup */}
      <div className="rounded-3xl bg-card/70 backdrop-blur-xl border border-border p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-foreground">Wholesale Velocity & Demand Forecast</h3>
            <p className="text-xs text-muted-foreground">AI predicted quarterly pipeline expansion</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 text-xs font-bold">
            Live AI Projection
          </span>
        </div>

        <div className="h-64 flex items-end gap-3 pt-8 pb-4 px-2 bg-secondary rounded-2xl border border-border">
          {[40, 65, 45, 80, 70, 95, 85, 110, 130, 120, 150, 180].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div
                className="w-full bg-gradient-to-t from-primary to-accent rounded-t-xl group-hover:opacity-100 opacity-80 transition-all"
                style={{ height: `${val}%` }}
              />
              <span className="text-[10px] text-muted-foreground">M{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
