"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { captureKnowledge } from "@/lib/api";

export default function CaptureModal({ isOpen, onClose, onSave }) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", tags: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    setLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");

      // Format tags from comma-separated string to array
      const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t !== "");
      
      await captureKnowledge({
        title: formData.title,
        content: formData.content,
        tags: tagsArray
      }, token);

      // Reset form and close
      setFormData({ title: "", content: "", tags: "" });
      onSave(); // Refresh the Dashboard Grid
      onClose();
    } catch (err) {
      console.error("Capture failed:", err);
      alert("Failed to save to Brain. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-zinc-900 shadow-2xl z-50 p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500 rounded-lg text-white">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Capture Insight</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form className="space-y-8 flex-1" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="The concept of Entropy..."
                  className="w-full bg-transparent border-b-2 border-zinc-100 dark:border-zinc-800 py-3 text-xl font-medium focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="physics, thermodynamics, science"
                  className="w-full bg-transparent border-b-2 border-zinc-100 dark:border-zinc-800 py-2 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">The Insight</label>
                <textarea 
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Explain your thought in detail..."
                  className="w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6 outline-none focus:ring-4 ring-indigo-500/10 transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-zinc-900 dark:bg-white dark:text-black text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50 transition-all shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    AI Processing...
                  </>
                ) : (
                  <>
                    Save to Second Brain
                    <Plus size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}