import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { Catalog } from "@/components/Catalog";
import { Orders } from "@/components/Orders";
import { AgentsHub } from "@/components/AgentsHub";
import { Analytics } from "@/components/Analytics";
import { mockUserProfiles, mockProducts, mockOrders, mockAgentTasks } from "@/lib/data";
import { UserProfile, ProductCatalogItem, Order, AgentTask } from "@/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexusAI - B2B Commerce & Agentic Ecosystem" },
      { name: "description", content: "AI-powered B2B wholesale commerce and agentic automation ecosystem." },
      { property: "og:title", content: "NexusAI - B2B Commerce & Agentic Ecosystem" },
      { property: "og:description", content: "AI-powered B2B wholesale commerce and agentic automation ecosystem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockUserProfiles[0]!);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const [products, setProducts] = useState<ProductCatalogItem[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>(mockAgentTasks);

  const [selectedProductForOrder, setSelectedProductForOrder] = useState<ProductCatalogItem | null>(null);

  const handleAddNewProduct = (newProd: ProductCatalogItem) => {
    setProducts([newProd, ...products]);
  };

  const handleCreateOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
  };

  const handleAddTask = (newTask: AgentTask) => {
    setAgentTasks([newTask, ...agentTasks]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header
        currentUser={currentUser}
        onSwitchUser={setCurrentUser}
        allUsers={mockUserProfiles}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === "dashboard" && (
          <Dashboard
            currentUser={currentUser}
            products={products}
            orders={orders}
            agentTasks={agentTasks}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === "catalog" && (
          <Catalog
            products={products}
            currentUser={currentUser}
            onOpenOrderModal={(prod) => {
              setSelectedProductForOrder(prod);
              setActiveTab("orders");
            }}
            onAddNewProduct={handleAddNewProduct}
          />
        )}

        {activeTab === "orders" && (
          <Orders
            orders={orders}
            products={products}
            currentUser={currentUser}
            onCreateOrder={handleCreateOrder}
            selectedProductForOrder={selectedProductForOrder}
            onCloseOrderModal={() => setSelectedProductForOrder(null)}
          />
        )}

        {activeTab === "agents" && <AgentsHub tasks={agentTasks} onAddTask={handleAddTask} />}

        {activeTab === "analytics" && <Analytics orders={orders} products={products} />}
      </main>
    </div>
  );
}
