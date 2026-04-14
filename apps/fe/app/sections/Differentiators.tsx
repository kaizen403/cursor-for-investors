"use client";

import { motion } from "framer-motion";
import {
  Brain,
  UserCheck,
  GitBranch,
  History,
  Shield,
  TrendingUp,
} from "lucide-react";

const differentiators = [
  {
    icon: Brain,
    title: "Firm-Specific Workflow Memory",
    description:
      "The system learns how your firm works — your processes, your templates, your decision patterns.",
  },
  {
    icon: UserCheck,
    title: "Partner Preference Modeling",
    description:
      "Which deals each partner likes, which memos got traction, which sourced companies became meetings.",
  },
  {
    icon: GitBranch,
    title: "Proprietary Relationship Graph",
    description:
      "Your firm's network as a searchable, scored, living map. Not a generic LinkedIn scrape.",
  },
  {
    icon: History,
    title: "Decision History",
    description:
      "Full audit trail: who changed the memo, who approved the action, what changed since last week.",
  },
  {
    icon: Shield,
    title: "Action Approvals & Audit Logs",
    description:
      "Observe, suggest, approve, auto-run. Never send an email or edit a CRM record without a clear review step.",
  },
  {
    icon: TrendingUp,
    title: "Outcome Feedback Loop",
    description:
      "Which signals correlated with real outcomes? The system gets sharper with every decision your firm makes.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Differentiators() {
  return (
    <section id="differentiators" className="py-24 md:py-32 px-8 md:px-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-medium tracking-[-1.5px] mb-4">
          The moat is not the{" "}
          <span className="font-serif italic font-normal">model</span>.
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          It&apos;s not the UI. It&apos;s not the chat. It&apos;s what
          accumulates over time.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto"
      >
        {differentiators.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="liquid-glass rounded-2xl p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className="text-muted-foreground" />
              <h3 className="text-base font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
