"use client";

import { motion } from "framer-motion";
import { Terminal, Code, Layers, Mic, Users, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";

const features = [
  {
    icon: Terminal,
    title: "Command Bar",
    description:
      "Describe the outcome, not the workflow. 'Find seed-stage AI security startups with repeat founders and a warm path.'",
  },
  {
    icon: Code,
    title: "Thesis-as-Code",
    description:
      "Encode sectors, stages, ownership targets, and anti-thesis patterns. The system runs your thesis continuously.",
  },
  {
    icon: Layers,
    title: "Deal Workspace",
    description:
      "Notes, emails, transcripts, comps, and memos in one place. Auto-generated briefs, competitor maps, and relationship graphs.",
  },
  {
    icon: Mic,
    title: "Meeting to Memo",
    description:
      "Transcribe founder calls. Extract metrics, risks, and asks. Draft follow-ups, update CRM, generate partner-ready memos.",
  },
  {
    icon: Users,
    title: "Relationship Intelligence",
    description:
      "Warm intro paths, network overlap, relationship freshness scores. Your firm's network becomes a searchable asset.",
  },
  {
    icon: ShieldCheck,
    title: "Diligence Copilot",
    description:
      "Summarize data rooms, flag inconsistencies, build competitor grids. Every claim links back to a source.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="px-8 md:px-28 py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-medium tracking-[-1.5px] mb-4">
          Everything an investor{" "}
          <span className="font-serif italic font-normal">needs</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl">
          From sourcing to IC memo, one workspace replaces the
          spreadsheet-and-email chaos.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="liquid-glass rounded-2xl p-6 cursor-default transition-shadow hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
            >
              <div className="mb-4 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
                <Icon size={20} className="text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
