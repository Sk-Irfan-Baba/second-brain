// components/SearchBar.tsx
"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export const SearchBar = ({ onSearch, isSearching }) => {
  return (
    <div className="relative max-w-2xl mx-auto my-12 px-6">
      <div className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 ${isSearching ? 'animate-pulse' : ''}`}></div>
        <div className="relative flex items-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2">
          <Search className="text-zinc-400 mr-3" size={20} />
          <input 
            type="text"
            placeholder="Ask your Second Brain anything..."
            className="w-full bg-transparent outline-none text-lg py-2"
            onChange={(e) => onSearch(e.target.value)}
          />
          {isSearching && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full"
            />
          )}
        </div>
      </div>
      <p className="text-center text-zinc-500 text-xs mt-4 italic">
        "Semantic search powered by Gemini & pgvector"
      </p>
    </div>
  );
};