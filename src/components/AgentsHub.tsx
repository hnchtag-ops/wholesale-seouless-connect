import { useState } from "react";
import { Cpu, Sparkles, Zap, Play, CheckCircle2, Bot } from "lucide-react";
import { AgentTask } from "@/types";

interface AgentsHubProps {
  tasks: AgentTask[];
  onAddTask: (task: AgentTask) => void;
}

export function AgentsHub({ tasks, onAddTask }: AgentsHubProps) {
  const [runningId, setRunningId] = useState<string | null>(null);
  const [newWorkflowName, setNewWorkflowName] = useState("");

  const handleRunWorkflow = (taskId: string) => {
    setRunningId(taskId);
    setTimeout(() => {
      setRunningId(null);
    }, 2500);
  };

  const handleCreateCustomAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkflowName) return;
    const newTask: AgentTask = {
      id: `task_${Date.now()}`,
      title: newWorkflowName,
      status: "running",
      output: "Initializing Gemini 2.5 Pro autonomous routines...",
    };
    onAddTask(newTask);
    setNewWorkflowName("");
    setTimeout(() => {
      newTask.status = "success";
      newTask.output = "Workflow compiled & executed successfully across nodes.";
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Immersive Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-muted to-background border border-border p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold mb-6">
            <Bot className="w-4 h-4 animate-bounce" />
            <span>Autonomous Multi-Agent AI Core</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
            Agentic OS &{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent">
              Automation Hub
            </span>
          </h1>
          <p className="text-muted-foreground text-base mb-8 leading-relaxed">
            Deploy autonomous agents to synchronize inventory, forecast seasonal re-orders, optimize
            wholesale pricing tiers, and generate custom PDF line sheets in seconds.
          </p>

          <form onSubmit={handleCreateCustomAgent} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="Describe custom agent task (e.g. Sync Shopify inventory with NuORDER...)"
              value={newWorkflowName}
              onChange={(e) => setNewWorkflowName(e.target.value)}
              className="flex-1 bg-secondary border border-border rounded-2xl px-5 py-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-deep text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Deploy Agent</span>
            </button>
          </form>
        </div>
      </div>

      {/* Agent Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-3xl bg-card/70 backdrop-blur-xl border border-border p-8 flex flex-col justify-between hover:border-primary/40 transition-all shadow-xl group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-primary">
                  <Cpu className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </div>
                <span
                  className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase ${
                    task.status === "success"
                      ? "bg-success/10 text-success border border-success/30"
                      : task.status === "running" || runningId === task.id
                        ? "bg-accent/10 text-accent border border-accent/30 animate-pulse"
                        : "bg-primary/10 text-primary border border-primary/30"
                  }`}
                >
                  {runningId === task.id ? "running" : task.status}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-foreground">{task.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed bg-secondary p-4 rounded-2xl border border-border">
                {runningId === task.id
                  ? "Executing deep neural analysis across enterprise APIs..."
                  : task.output || "Agent standing by for deployment."}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleRunWorkflow(task.id)}
                disabled={runningId === task.id}
                className="w-full py-3.5 rounded-2xl bg-secondary hover:bg-muted border border-border text-xs font-bold text-foreground transition-all flex items-center justify-center gap-2"
              >
                <Play className={`w-4 h-4 text-primary ${runningId === task.id ? "animate-spin" : ""}`} />
                <span>{runningId === task.id ? "Processing..." : "Run Agent Now"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
