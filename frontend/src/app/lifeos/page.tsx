"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { fetchLifeOSTasks, createLifeOSTask, updateLifeOSTask } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Flame,
  Check,
  Calendar,
  AlertCircle
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  estimated_minutes?: number;
  created_at: string;
}

export default function LifeOSPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [estimatedMinutes, setEstimatedMinutes] = useState(45);

  const loadTasks = () => {
    setLoading(true);
    fetchLifeOSTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const created = await createLifeOSTask({
        title,
        description,
        priority,
        estimated_minutes: Number(estimatedMinutes),
      });
      setTasks((prev) => [created, ...prev]);
      setTitle("");
      setDescription("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === "completed" ? "todo" : "completed";
    try {
      await updateLifeOSTask(task.id, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  return (
    <DashboardShell credits={85}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Productivity Matrix
              </span>
              <span className="text-xs text-slate-400">Real-Time Backend Synced</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <CalendarDays className="w-6 h-6 text-blue-400" />
              <span>LifeOS Daily & Weekly Planner</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Intelligent task scheduling, editable time-blocking, and habit streak tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => setIsModalOpen(true)} className="text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Task</span>
            </Button>
          </div>
        </div>

        {/* Productivity Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Active Habit Streak</div>
              <div className="text-lg font-bold text-white font-mono">12 Consecutive Days</div>
              <div className="text-[10px] text-emerald-400">Architecture & Learning habit</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Pending Tasks</div>
              <div className="text-lg font-bold text-white font-mono">
                {tasks.filter((t) => t.status !== "completed").length} Tasks
              </div>
              <div className="text-[10px] text-blue-400">Estimated ~135 mins focus</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Completed</div>
              <div className="text-lg font-bold text-white font-mono">
                {tasks.filter((t) => t.status === "completed").length} Tasks
              </div>
              <div className="text-[10px] text-purple-400">Archived to Career Timeline</div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Active Priorities</h2>
            <span className="text-xs text-slate-500">Click circle to mark completed</span>
          </div>

          {tasks.length === 0 && !loading && (
            <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/30 space-y-3">
              <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-sm font-medium text-slate-300">No tasks created yet</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Add your first priority task to start tracking your daily LifeOS schedule.
              </p>
              <Button onClick={() => setIsModalOpen(true)} size="sm">
                <Plus className="w-3.5 h-3.5" />
                <span>Create Task</span>
              </Button>
            </div>
          )}

          <div className="space-y-2.5">
            {tasks.map((task) => {
              const isDone = task.status === "completed";
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    isDone
                      ? "border-slate-800/60 bg-slate-950/40 opacity-60"
                      : "border-slate-800 bg-slate-900/50 hover:bg-slate-900/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleStatus(task)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors border ${
                        isDone
                          ? "bg-emerald-500 text-black border-emerald-500"
                          : "border-slate-700 hover:border-cyan-400 text-transparent"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <div>
                      <div className={`text-xs font-semibold ${isDone ? "line-through text-slate-500" : "text-slate-100"}`}>
                        {task.title}
                      </div>
                      {task.description && (
                        <p className="text-[11px] text-slate-400 mt-0.5">{task.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono">
                      ~{task.estimated_minutes || 30} mins
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border font-mono ${
                        task.priority === "urgent"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                          : task.priority === "high"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create LifeOS Task"
        description="Schedule a new priority into your personal planner."
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            id="task_title"
            label="Task Title"
            placeholder="e.g. Complete System Design Chapter 4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            id="task_desc"
            label="Description (Optional)"
            placeholder="Key notes, links, or objectives..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Estimated Minutes</label>
              <input
                type="number"
                min="5"
                max="300"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-xs">
              Cancel
            </Button>
            <Button type="submit" className="text-xs">
              Add Task
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardShell>
  );
}
