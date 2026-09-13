import { useState } from "react";
import { Sparkles, Bell, Cpu, ChevronDown } from "lucide-react";
import { UserProfile } from "@/types";

interface HeaderProps {
  currentUser: UserProfile;
  onSwitchUser: (user: UserProfile) => void;
  allUsers: UserProfile[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({
  currentUser,
  onSwitchUser,
  allUsers,
  activeTab,
  setActiveTab,
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("dashboard")}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent to-destructive p-[2px] shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
              <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/80 to-primary bg-clip-text text-transparent">
                  NEXUS<span className="text-primary">AI</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                  ENTERPRISE OS
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                B2B Commerce & Agentic AI Ecosystem
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-card/50 p-1.5 rounded-2xl border border-border">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "catalog", label: "B2B Catalog" },
              { id: "orders", label: "Wholesale Orders" },
              { id: "agents", label: "Agentic Hub" },
              { id: "analytics", label: "Global Analytics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-primary-deep text-primary-foreground shadow-md shadow-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Controls: Notifications & User Switcher */}
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
          </button>

          {/* User Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                {currentUser.companyName.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-foreground truncate max-w-[140px]">
                  {currentUser.companyName}
                </p>
                <p className="text-[10px] text-primary capitalize font-medium">
                  {currentUser.role.replace("_", " ")}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-card border border-border shadow-2xl p-2 z-50 backdrop-blur-xl">
                <div className="px-3 py-2 border-b border-border mb-1">
                  <p className="text-xs font-bold text-foreground">Switch Persona & Role</p>
                  <p className="text-[10px] text-muted-foreground">Test different ecosystem workflows</p>
                </div>
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSwitchUser(u);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                      currentUser.id === u.id
                        ? "bg-primary/15 text-foreground border border-primary/30 font-semibold"
                        : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-foreground">{u.companyName}</p>
                      <p className="text-[10px] text-primary capitalize">{u.role.replace("_", " ")}</p>
                    </div>
                    {currentUser.id === u.id && <Sparkles className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
