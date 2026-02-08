"use client";

import { useAuth, SignIn } from "@clerk/nextjs";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  // Once logged in → go to dashboard
  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/dashboard");
    }
  }, [isLoaded, userId]);

  // Wait for Clerk to hydrate
  if (!isLoaded) return null;

  // --- LOGGED OUT VIEW ---
  if (!userId) {
    return (
      <main className="bg-white dark:bg-black min-h-screen">
        <Hero />

        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-black mb-4 text-center">
              Welcome to Second Brain
            </h2>
            <p className="text-zinc-500 text-center mb-6">
              Sign in to start capturing and querying your knowledge.
            </p>

            {/* Clerk Sign In – HASH routing avoids route issues */}
            <SignIn routing="hash" />
          </motion.div>
        </section>
      </main>
    );
  }

  // --- LOGGED IN (redirecting...) ---
  return null;
}
