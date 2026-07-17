"use client";

import { useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const FEATURES = [
  {
    category: "PAYROLL ENGINE",
    title: "Bulk Payroll",
    description:
      "Disburse salaries to entire teams across 150+ countries in a single transaction. Stellar settles in under 5 seconds.",
    color: "#5501ff",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="7"
          width="8"
          height="5"
          rx="1"
          stroke="#5501ff"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="7"
          width="8"
          height="5"
          rx="1"
          stroke="#5501ff"
          strokeWidth="1.5"
        />
        <path
          d="M6 12v2m12-2v2"
          stroke="#5501ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 9.5h4"
          stroke="#5501ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="6" cy="4" r="1.5" stroke="#5501ff" strokeWidth="1.5" />
        <circle cx="18" cy="4" r="1.5" stroke="#5501ff" strokeWidth="1.5" />
        <circle cx="12" cy="4" r="1.5" stroke="#5501ff" strokeWidth="1.5" />
        <path
          d="M4 19h16"
          stroke="#5501ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    category: "PRIVACY & SECURITY",
    title: "Bank-Grade Security",
    description:
      "Multi-signature authorization, on-chain audit trails, and role-based access controls protect every payment.",
    color: "#00a87a",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3L4 6.5v5c0 4.5 3.4 8.7 8 9.5 4.6-.8 8-5 8-9.5v-5L12 3z"
          stroke="#00a87a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="#00a87a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    category: "SETTLEMENT LAYER",
    title: "Instant Settlement",
    description:
      "Payments finalize on Stellar in seconds — no correspondent banks, no 3-day clearing windows.",
    color: "#ff00a6",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#ff00a6" strokeWidth="1.5" />
        <path
          d="M12 7v5l3 3"
          stroke="#ff00a6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 12h1M16 12h1M12 7V6M12 18v-1"
          stroke="#ff00a6"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    category: "GLOBAL REACH",
    title: "Multi-Currency Support",
    description:
      "Pay in 50+ currencies or USDC stablecoin. Real-time FX rates with zero hidden conversion fees.",
    color: "#00bfff",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#00bfff" strokeWidth="1.5" />
        <ellipse
          cx="12"
          cy="12"
          rx="4"
          ry="9"
          stroke="#00bfff"
          strokeWidth="1.5"
        />
        <path
          d="M3 9h18M3 15h18"
          stroke="#00bfff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    category: "KEY MANAGEMENT",
    title: "Wallet Infrastructure",
    description:
      "Non-custodial wallet provisioning for every employee. Scoped access paths and on-chain recovery policy.",
    color: "#f59e0b",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="6"
          width="20"
          height="14"
          rx="2"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <path d="M16 13a1 1 0 100 2 1 1 0 000-2z" fill="#f59e0b" />
        <path d="M2 10h20" stroke="#f59e0b" strokeWidth="1.5" />
        <path
          d="M6 6V5a2 2 0 012-2h8a2 2 0 012 2v1"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    category: "COMPLIANCE",
    title: "Audit & Reporting",
    description:
      "Automatic tax documentation, KYC verification, and complete payment history exportable for any jurisdiction.",
    color: "#5501ff",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="2"
          width="13"
          height="18"
          rx="2"
          stroke="#5501ff"
          strokeWidth="1.5"
        />
        <path
          d="M8 7h7M8 11h7M8 15h4"
          stroke="#5501ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="18"
          cy="18"
          r="3.5"
          fill="white"
          stroke="#5501ff"
          strokeWidth="1.5"
        />
        <path
          d="M18 16.5v2l1 .5"
          stroke="#5501ff"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    category: "AUTOMATION",
    title: "Auto Scheduling",
    description:
      "Set recurring payroll runs on autopilot — weekly, bi-weekly, or monthly. Smart retry on failed payments.",
    color: "#00a87a",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 12a8 8 0 01-14.93 3.93"
          stroke="#00a87a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 12a8 8 0 0114.93-3.93"
          stroke="#00a87a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 8v4H8"
          stroke="#00a87a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 16v-4h-4"
          stroke="#00a87a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    category: "NETWORK",
    title: "Stellar Network Client",
    description:
      "Direct integration with Stellar mainnet — blocks, transactions, validators, and real-time payment tracking.",
    color: "#ff00a6",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="2.5" stroke="#ff00a6" strokeWidth="1.5" />
        <circle cx="5" cy="19" r="2.5" stroke="#ff00a6" strokeWidth="1.5" />
        <circle cx="19" cy="19" r="2.5" stroke="#ff00a6" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" stroke="#ff00a6" strokeWidth="1.5" />
        <path
          d="M12 7.5v2.5M10.2 13.8L6.8 17M13.8 13.8l3.4 3.2"
          stroke="#ff00a6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    category: "CONTRACTOR PAYROLL",
    title: "Contractor Payments",
    description:
      "Pay freelancers and contractors globally in their local currency or USDC. No bank account required.",
    color: "#00bfff",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="3" stroke="#00bfff" strokeWidth="1.5" />
        <path
          d="M3 20v-1a6 6 0 016-6h.5"
          stroke="#00bfff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 14l1.5 1.5L20 13"
          stroke="#00bfff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="17" r="5" stroke="#00bfff" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    category: "IDENTITY",
    title: "KYC Verification",
    description:
      "Built-in identity checks for employees and contractors. Stay compliant without slowing down hiring.",
    color: "#f59e0b",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="4"
          width="18"
          height="14"
          rx="2"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <circle cx="9" cy="11" r="2.5" stroke="#f59e0b" strokeWidth="1.5" />
        <path
          d="M5 18c0-2.2 1.8-4 4-4s4 1.8 4 4"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15 9h3M15 12h2"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    category: "ROLE MANAGEMENT",
    title: "Role-based Access",
    description:
      "Granular permissions for finance, HR, and admins. Control who can approve, view, or run payroll.",
    color: "#5501ff",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3" stroke="#5501ff" strokeWidth="1.5" />
        <path
          d="M6 20v-1a6 6 0 0112 0v1"
          stroke="#5501ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect
          x="15"
          y="3"
          width="6"
          height="5"
          rx="1"
          stroke="#5501ff"
          strokeWidth="1.5"
        />
        <path
          d="M18 3V2M18 8v1"
          stroke="#5501ff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    category: "ANALYTICS",
    title: "Real-time Analytics",
    description:
      "Track payroll costs, headcount trends, and settlement rates with live dashboards and exportable reports.",
    color: "#00a87a",
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20h16"
          stroke="#00a87a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 16l4-4 4 3 4-6 4 2"
          stroke="#00a87a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="12" r="1.5" fill="#00a87a" />
        <circle cx="12" cy="15" r="1.5" fill="#00a87a" />
        <circle cx="16" cy="9" r="1.5" fill="#00a87a" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const ROWS = 2;
  const COLS = Math.ceil(FEATURES.length / ROWS);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  // Group into columns
  const columns: (typeof FEATURES)[] = Array.from({ length: COLS }, (_, col) =>
    Array.from({ length: ROWS }, (_, row) => FEATURES[col * ROWS + row]).filter(
      Boolean,
    ),
  );

  return (
    <section id="features" className="py-16 md:py-28 bg-[#f3f3f3] overflow-hidden">
      <div className="mx-auto max-w-full px-4 sm:px-8 lg:px-25">
        <div className="flex items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="max-w-auto space-y-4 sm:space-y-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-medium text-primary truncate">
                Platform Features
              </span>
            </div>
            <h2 className="font-(family-name:--font-dm-sans) text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] text-[#0d0020] capitalize">
              The infrastructure behind the PayOrbit stack.
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center border border-[#1f1f1f]/15 text-[#1f1f1f]/50 transition-all hover:border-[#5501ff]/40 hover:text-[#5501ff] disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex rounded-lg h-10 w-10 items-center justify-center border border-[#1f1f1f]/15 text-[#1f1f1f]/50 transition-all hover:border-[#5501ff]/40 hover:text-[#5501ff] disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="flex rounded-lg items-center gap-2 border border-[#1f1f1f]/20 px-5 py-2.5 text-sm font-semibold text-[#0d0020] transition-all hover:border-[#5501ff] hover:text-[#5501ff]">
              View all modules
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto pb-2 pl-4 pr-4 sm:pl-8 sm:pr-8 lg:pl-25 lg:pr-25"
        style={{ scrollbarWidth: "none" }}
      >
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-5 shrink-0">
            {col.map((feature) => {
              const Icon = feature.Icon;
              return (
                <div
                  key={feature.title}
                  className="w-[280px] sm:w-[310px] lg:w-[340px] h-[200px] sm:h-[210px] lg:h-[220px] rounded-lg border border-white bg-white p-5 sm:p-6 lg:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.10)] hover:border-[#5501ff]/20 flex flex-col"
                >
                  <div className="mb-6">
                    <Icon />
                  </div>
                  <h3 className="mb-3 tracking-wide text-[1rem] font-bold text-[#0d0020] font-(family-name:--font-dm-sans)">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#1f1f1f]/55">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
