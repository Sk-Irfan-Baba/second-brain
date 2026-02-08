// app/docs/page.tsx
"use client";

import { motion } from "framer-motion";
import { Brain, Layers, Sparkles, Network } from "lucide-react";

const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 space-y-4"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600">
        <Icon size={22} />
      </div>
      <h2 className="text-2xl font-black tracking-tight">{title}</h2>
    </div>
    <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-3">
      {children}
    </div>
  </motion.section>
);

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-32">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <header className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
            Architecture & Design Docs
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl">
            This document explains the architectural decisions, UX principles,
            and system thinking behind the <strong>Second Brain</strong> project.
            The goal was not just to build features, but to design a flexible,
            extensible knowledge system.
          </p>
        </header>

        {/* Portable Architecture */}
        <Section icon={Layers} title="Portable Architecture">
          <p>
            The system is designed with a strict separation of concerns between
            the frontend, backend, and AI layer.
          </p>
          <p>
            The <strong>FastAPI backend</strong> exposes a clean JSON-based API
            for capturing, enriching, and querying knowledge. It has no
            dependency on Next.js or any frontend-specific logic.
          </p>
          <p>
            This allows the frontend to be swapped entirely (e.g., mobile app,
            browser extension, internal dashboard) without modifying the core
            system.
          </p>
          <p>
            Similarly, the AI provider is abstracted behind a service layer. The
            current implementation uses <strong>Gemini</strong> for
            summarization and embeddings, but could be replaced with OpenAI or
            another provider without changing the database schema or API
            contract.
          </p>
        </Section>

        {/* Principles-Based UX */}
        <Section icon={Sparkles} title="Principles-Based UX">
          <p>
            The UI was designed around a small set of guiding principles rather
            than isolated features.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Anticipatory AI:</strong> The system enriches content at
              capture time by automatically generating summaries and tags,
              reducing the cognitive load on the user.
            </li>
            <li>
              <strong>Motion with Intent:</strong> Framer Motion is used
              sparingly to guide attention—staggered card entrances, hover lift,
              and animated search states communicate system feedback without
              distraction.
            </li>
            <li>
              <strong>Minimal Friction:</strong> Knowledge capture happens in a
              slide-over modal instead of a full page, keeping users in flow and
              minimizing context switching.
            </li>
          </ul>
        </Section>

        {/* Agent Thinking */}
        <Section icon={Brain} title="Agent Thinking">
          <p>
            The backend is designed to behave as an <strong>agent</strong>, not a
            passive data store.
          </p>
          <p>
            When new knowledge is captured, the system automatically:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Summarizes the content</li>
            <li>Generates semantic tags</li>
            <li>Creates vector embeddings for future retrieval</li>
          </ul>
          <p>
            This ensures that the knowledge base becomes more structured and
            useful over time, even if the user provides raw or unorganized
            input.
          </p>
          <p>
            The result is a system that improves itself incrementally as more
            data is added—mirroring how a real second brain should behave.
          </p>
        </Section>

        {/* Infrastructure Mindset */}
        <Section icon={Network} title="Infrastructure Mindset">
          <p>
            The application is treated as a service, not just a website.
          </p>
          <p>
            A public-facing API endpoint allows external systems to query a
            user’s knowledge base in a controlled way. This makes it possible to
            embed the “Brain” into other products, dashboards, or tools.
          </p>
          <p>
            This infrastructure-first approach enables future extensions such
            as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browser extensions</li>
            <li>Team knowledge sharing</li>
            <li>Internal AI assistants powered by the same data</li>
          </ul>
          <p>
            By exposing intelligence through APIs, the system remains flexible,
            composable, and scalable beyond its initial UI.
          </p>
        </Section>

        {/* Footer */}
        <footer className="pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">
            This project emphasizes clarity, extensibility, and thoughtful
            engineering over feature count.
          </p>
        </footer>
      </div>
    </main>
  );
}
