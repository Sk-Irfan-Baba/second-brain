// components/KnowledgeGrid.tsx
"use client";

import { motion } from "framer-motion";
import { BookOpen, Link as LinkIcon } from "lucide-react";

/* -------------------- Types -------------------- */

export interface KnowledgeItem {
  id?: string;
  title: string;
  content: string;
  summary?: string;
  type: "note" | "link";
  tags: string[];
  created_at: string; // ISO string from backend
}

interface KnowledgeGridProps {
  items: KnowledgeItem[];
}

/* -------------------- Animations -------------------- */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemAnim = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

/* -------------------- Component -------------------- */

export default function KnowledgeGrid({ items }: KnowledgeGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id ?? `${item.title}-${index}`}
          variants={itemAnim}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
              {item.type === "note" ? (
                <BookOpen size={20} />
              ) : (
                <LinkIcon size={20} />
              )}
            </div>

            <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
            {item.title}
          </h3>

          <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 text-sm leading-relaxed">
            {item.summary ?? item.content}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-[10px] font-bold uppercase text-zinc-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
