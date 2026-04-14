"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const layers = [
  {
    number: 1,
    title: "Connectors",
    tag: "INPUT",
    description:
      "Gmail, Calendar, Affinity, Harmonic, PitchBook, Drive, Notion, Slack, Zoom transcripts. Each tool is a connector, not a destination.",
  },
  {
    number: 2,
    title: "Canonical Data Model",
    tag: "STRUCTURE",
    description:
      "Structured objects: Person, Company, Deal, Meeting, Memo, Thesis, Fund, LP, Portfolio Company, KPI. Every agent reads and writes to these—not chat history.",
  },
  {
    number: 3,
    title: "Agent Runtime",
    tag: "COMPUTE",
    description:
      "Specialized agents for specialized jobs: Scout for sourcing, Mapper for relationships, Analyst for research, Memo for writing, Operator for CRM and outreach.",
  },
  {
    number: 4,
    title: "Approval Layer",
    tag: "CONTROL",
    description:
      "Four modes: Observe (summarize only), Suggest (draft but don't apply), Approve (review before write), Auto-run (safe internal tasks only).",
  },
  {
    number: 5,
    title: "Firm Memory",
    tag: "LEARN",
    description:
      "The system learns which deals each partner likes, which memos got traction, which signals correlated with outcomes. A private behavioral dataset no generic model has.",
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function FlowConnector({
  active,
  index,
  inView,
}: {
  active: boolean;
  index: number;
  inView: boolean;
}) {
  return (
    <div className="flex justify-center py-1.5">
      <div className="flex flex-col items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-[3px] h-[3px] rounded-full"
            style={{
              backgroundColor: active
                ? "rgba(255, 255, 255, 0.35)"
                : "rgba(255, 255, 255, 0.06)",
            }}
            animate={
              inView
                ? {
                    opacity: [0.3, 1, 0.3],
                  }
                : {}
            }
            transition={{
              duration: 1.8,
              delay: dot * 0.25 + index * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="px-8 md:px-28 py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        className="mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-medium tracking-[-1.5px] mb-4">
          Five layers,{" "}
          <span className="font-serif italic font-normal">one</span> system
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl">
          Not a chatbot. A workspace, command layer, memory, and action engine.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: Layer descriptions */}
        <div className="relative flex flex-col">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease,
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="relative flex gap-6 cursor-default"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                    active === i
                      ? "bg-white/10 border border-white/20"
                      : "liquid-glass"
                  }`}
                >
                  <span className="text-sm font-semibold tabular-nums">
                    {layer.number}
                  </span>
                </div>
                {i < layers.length - 1 && (
                  <motion.div
                    className="w-px flex-1 my-1 bg-border origin-top"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1 + 0.3,
                      ease,
                    }}
                  />
                )}
              </div>

              <div
                className={`transition-opacity duration-300 ${
                  i < layers.length - 1 ? "pb-10" : "pb-0"
                } ${active !== null && active !== i ? "opacity-30" : "opacity-100"}`}
              >
                <h3 className="text-base font-semibold mb-1.5 leading-tight">
                  {layer.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {layer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Architecture stack visualization */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="hidden lg:block sticky top-32"
        >
          <div
            className="rounded-2xl border border-white/[0.06] relative overflow-hidden p-6"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(120, 119, 198, 0.04) 0%, transparent 60%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Diagram label */}
            <div className="relative mb-5 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/20">
                System Architecture
              </span>
            </div>

            {/* Layer stack */}
            <div className="relative flex flex-col">
              {layers.map((layer, i) => (
                <div key={layer.number}>
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.08 + 0.4,
                      ease,
                    }}
                    onHoverStart={() => setActive(i)}
                    onHoverEnd={() => setActive(null)}
                  >
                    <div
                      className={`relative flex items-center gap-4 px-4 py-3.5 rounded-lg cursor-default transition-all duration-300 ${
                        active === i
                          ? "bg-white/[0.08] shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                          : active !== null
                            ? "opacity-35"
                            : "hover:bg-white/[0.03]"
                      }`}
                      style={{
                        transform:
                          active === null
                            ? "translateY(0)"
                            : active === i
                              ? "translateY(0)"
                              : i < active
                                ? "translateY(-5px)"
                                : "translateY(5px)",
                      }}
                    >
                      <div
                        className={`w-[2px] self-stretch min-h-[28px] rounded-full transition-all duration-300 ${
                          active === i ? "bg-white/40" : "bg-white/[0.08]"
                        }`}
                      />

                      <span className="text-[11px] font-mono text-white/25 tabular-nums w-5 shrink-0">
                        0{layer.number}
                      </span>

                      <span
                        className={`text-sm font-medium flex-1 transition-colors duration-300 ${
                          active === i ? "text-white" : "text-white/60"
                        }`}
                      >
                        {layer.title}
                      </span>

                      <span
                        className={`text-[10px] font-mono tracking-[0.15em] uppercase transition-colors duration-300 ${
                          active === i ? "text-white/45" : "text-white/12"
                        }`}
                      >
                        {layer.tag}
                      </span>
                    </div>
                  </motion.div>

                  {i < layers.length - 1 && (
                    <FlowConnector
                      active={active === i || active === i + 1}
                      index={i}
                      inView={isInView}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div className="relative mt-5 pt-4 border-t border-white/[0.04]">
              <div className="flex items-center gap-2.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400/30"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-[10px] font-mono text-white/20">
                  {active !== null
                    ? `Layer ${layers[active].number} · ${layers[active].title}`
                    : "All layers active"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
