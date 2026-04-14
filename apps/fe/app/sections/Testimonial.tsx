"use client";

import { motion } from "framer-motion";
import WordReveal from "@/app/components/WordReveal";

const testimonialText =
  "We went from spending 6 hours preparing IC memos to having a draft ready before the partner meeting ends. Rixie doesn't replace our judgment — it gives us back the time to actually use it.";

export default function Testimonial() {
  return (
    <section className="min-h-screen py-24 md:py-32 px-8 md:px-28">
      <div className="max-w-3xl mx-auto flex flex-col items-start gap-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-6xl font-serif text-muted-foreground select-none block"
        >
          &ldquo;
        </motion.span>

        <WordReveal
          text={testimonialText}
          className="text-4xl md:text-5xl font-medium leading-[1.2]"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-lg font-semibold">
            SC
          </div>
          <div>
            <p className="text-base font-semibold leading-7">Sarah Chen</p>
            <p className="text-sm font-normal leading-5 text-muted-foreground">
              Principal, Seed-Stage VC
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
