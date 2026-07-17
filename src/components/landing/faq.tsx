"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is PayOrbit?",
    answer: "PayOrbit is a cross-border payroll platform built on the Stellar blockchain. It lets companies pay employees and contractors globally in USDC or local currency — settling in under 5 seconds with zero hidden fees.",
  },
  {
    question: "How does Stellar ensure payment security?",
    answer: "Every transaction is recorded immutably on the Stellar blockchain. PayOrbit adds multi-signature authorization, role-based access controls, and a full on-chain audit trail to every payment.",
  },
  {
    question: "Which countries and currencies are supported?",
    answer: "PayOrbit supports 150+ countries and 50+ currencies, including USDC stablecoin. Real-time FX rates are applied with full transparency before you approve any payment.",
  },
  {
    question: "How long does settlement take?",
    answer: "Payments settle on the Stellar network in under 5 seconds — no correspondent banks, no 3-day clearing windows. Your team gets paid the moment you approve.",
  },
  {
    question: "Can contractors be paid without a bank account?",
    answer: "Yes. PayOrbit provisions non-custodial wallets for employees and contractors. No bank account is required — recipients can receive USDC directly to their wallet.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes — you can get started for free with no credit card required. Upgrade to a paid plan when you're ready to scale beyond the free tier limits.",
  },
  {
    question: "How does compliance and reporting work?",
    answer: "PayOrbit automatically generates audit trails, tax documentation, and KYC verification records. Reports can be exported for any jurisdiction in a few clicks.",
  },
  {
    question: "Can I integrate PayOrbit with my existing HR tools?",
    answer: "Yes. PayOrbit offers a REST API and webhooks for integration with HR platforms, accounting tools, and custom internal systems. Enterprise plans include dedicated integration support.",
  },
  {
    question: "What are the fees?",
    answer: "PayOrbit charges a flat monthly fee based on team size — no per-transaction fees, no FX markups, no hidden costs. You always see the exact cost before approving a payroll run.",
  },
  {
    question: "How do role-based permissions work?",
    answer: "You can assign Finance, HR, Admin, and Viewer roles with granular controls. Payroll runs can require multi-sig approval before any funds leave your account.",
  },
  {
    question: "What happens if a payment fails?",
    answer: "PayOrbit includes smart retry logic for failed settlements. You'll be notified instantly and can reprocess individual payments or the entire batch with one click.",
  },
  {
    question: "How do I get started?",
    answer: "Sign up, add your team, configure pay schedules, and run your first payroll — all in under 15 minutes. Our onboarding team is available if you need a guided walkthrough.",
  },
];

const LEFT = FAQS.filter((_, i) => i % 2 === 0);
const RIGHT = FAQS.filter((_, i) => i % 2 === 1);

function FAQItem({
  faq,
  index,
  openIndex,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  openIndex: number | null;
  onToggle: (i: number) => void;
}) {
  const isOpen = openIndex === index;
  return (
    <div className="border-b border-[#e8eaf0] last:border-0">
      <button
        onClick={() => onToggle(isOpen ? -1 : index)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#5501ff]"
      >
        <span className="text-sm font-medium text-[#0d0020]">{faq.question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#1f1f1f]/35 transition-transform duration-200",
            isOpen && "rotate-180 text-[#5501ff]",
          )}
        />
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.25s ease",
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-[#1f1f1f]/55">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-28 bg-white">
      <div className="mx-auto max-w-full px-4 sm:px-8 lg:px-25">

        {/* Header */}
        <h2 className="font-(family-name:--font-dm-sans) text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d0020] mb-8 md:mb-12">
          Frequently asked questions
        </h2>

        {/* Two-column grid — each question its own white card */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {LEFT.map((faq, i) => (
            <div key={faq.question} className="rounded-xl bg-white border border-[#e8eaf0] shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-6">
              <FAQItem
                faq={faq}
                index={i * 2}
                openIndex={openIndex}
                onToggle={setOpenIndex}
              />
            </div>
          ))}
          {RIGHT.map((faq, i) => (
            <div key={faq.question} className="rounded-xl bg-white border border-[#e8eaf0] shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-6">
              <FAQItem
                faq={faq}
                index={i * 2 + 1}
                openIndex={openIndex}
                onToggle={setOpenIndex}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-[#1f1f1f]/45 text-center">
          Still have questions?{" "}
          <a
            href="mailto:support@payorbit.io"
            className="font-semibold text-[#5501ff] hover:underline"
          >
            Contact our support team
          </a>
        </p>

      </div>
    </section>
  );
}
