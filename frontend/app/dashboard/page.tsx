"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Plus, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

// Components
import KnowledgeGrid from "@/components/KnowledgeGrid";
import { SearchBar } from "@/components/SearchBar";
import CaptureModal from "@/components/CaptureModal";

export default function Dashboard() {
  const { isLoaded, userId, getToken } = useAuth();
  const router = useRouter();

  // --- State ---
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // --- Auth Guard ---
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/");
    }
  }, [isLoaded, userId, router]);

  // --- Fetch Logic (Source of Truth) ---
  const fetchBrainItems = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/brain/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, getToken]);

  useEffect(() => {
    fetchBrainItems();
  }, [fetchBrainItems]);

  // --- Handlers ---

  /**
   * Fixed: handleSave now takes zero arguments.
   * The CaptureModal handles the actual POST request. 
   * This function simply refreshes the UI from the database.
   */
  const handleSave = async () => {
    await fetchBrainItems();
  };

  /**
   * Semantic Search Logic
   */
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      fetchBrainItems();
      return;
    }

    setIsSearching(true);
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      const results = await res.json();
      setItems(results);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // --- UI Render ---
  return (
    <div className="pt-28 min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <BrainCircuit size={24} />
              <span className="font-bold tracking-widest text-xs uppercase">
                Knowledge Engine
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">MY BRAIN</h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="group bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:shadow-indigo-500/20 transition-all"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            Capture Insight
          </motion.button>
        </header>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          isSearching={isSearching}
        />

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl"
              />
            ))}
          </div>
        ) : items.length > 0 ? (
          <KnowledgeGrid items={items} />
        ) : (
          <div className="flex items-center justify-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl mt-12">
            <p className="text-zinc-500 font-medium">
              Your brain is empty. Start capturing insights!
            </p>
          </div>
        )}
      </div>

      {/* Logic-Wired Modal */}
      <CaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave} // Signature matches () => Promise<void>
      />
    </div>
  );
}