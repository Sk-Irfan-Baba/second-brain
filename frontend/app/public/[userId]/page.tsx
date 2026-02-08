"use client";
import { useEffect, useState } from "react";
import KnowledgeGrid from "@/components/KnowledgeGrid";
import { SearchBar } from "@/components/SearchBar";

export default function PublicBrain({ params }: { params: { userId: string } }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from your public FastAPI endpoint
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/brain/${params.userId}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, [params.userId]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-zinc-100 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Public Infrastructure</h1>
            <h2 className="text-3xl font-black">SHARED KNOWLEDGE</h2>
          </div>
          <p className="text-zinc-400 text-sm">Accessed via Hedamo Public API v1</p>
        </header>

        {loading ? (
          <div className="animate-pulse space-y-4">
             <div className="h-40 bg-zinc-100 rounded-2xl w-full" />
             <div className="h-40 bg-zinc-100 rounded-2xl w-full" />
          </div>
        ) : (
          <KnowledgeGrid items={items} />
        )}
      </div>
    </div>
  );
}