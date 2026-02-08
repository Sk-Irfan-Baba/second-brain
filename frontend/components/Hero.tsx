// components/Hero.tsx
import { useScroll, useTransform, motion } from "framer-motion";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
      <motion.div style={{ y: y2 }} className="absolute top-40 -right-20 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
      
      <div className="z-10 text-center space-y-6 px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
          SECOND <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">BRAIN</span>
        </h1>
        <p className="max-w-xl mx-auto text-zinc-500 text-lg md:text-xl">
          An AI-powered knowledge system built for the next generation of thinkers.
        </p>
      </div>
    </section>
  );
};