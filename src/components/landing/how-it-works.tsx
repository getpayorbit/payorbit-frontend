import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "../../lib/utils/routes";

const STEPS = [
  {
    number: "01.",
    title: "Connect Your Team",
    description:
      "Add employees with their wallet addresses and payment preferences. Supports 150+ countries out of the box.",
  },
  {
    number: "02.",
    title: "Configure Payroll",
    description:
      "Set salaries, currencies, and pay schedules. Group by department, location, or contract type.",
  },
  {
    number: "03.",
    title: "Review & Approve",
    description:
      "Finance and HR review all payment details before processing. Full transparency, multi-sig approval flows.",
  },
  {
    number: "04.",
    title: "Instant Settlement",
    description:
      "Payments settle on Stellar in under 5 seconds. Employees receive USDC or local currency instantly.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-full px-25">
        {/* Outer dark card */}
        <div className="rounded-2xl bg-[#1A004D] px-10 py-12 md:px-14 md:py-14">
          {/* Top: eyebrow + headline left, divider right — same row */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#5501ff]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                4 Simple Steps
              </span>
            </div>
            <div className="flex items-end gap-10">
              <h2 className="font-(family-name:--font-dm-sans) text-3xl font-bold leading-tight text-white md:text-[2.6rem] shrink-0">
                Effortless Payroll,
                <br />
                Every Pay Cycle.
              </h2>
              <div className="flex-1 pb-2">
                <div className="h-px w-full bg-white/15" />
              </div>
            </div>
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-10">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col justify-between rounded-xl bg-white/6 border border-white/8 p-6 min-h-[220px] hover:bg-white/10 transition-colors duration-200"
              >
                <div>
                  <p className="text-sm font-semibold text-white/40 mb-2">
                    {step.number}
                  </p>
                  <h3 className="text-base font-bold text-white leading-snug font-(family-name:--font-dm-sans)">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-white/45 mt-6">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom bar — separate rounded row */}
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-white/6 border border-white/8 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {["#5501ff", "#ff00a6", "#00ffbb", "#00bfff"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-[#1A004D] flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: color, zIndex: 4 - i }}
                    >
                      {["CF", "MJ", "AO", "SR"][i]}
                    </div>
                  ),
                )}
              </div>
              <p className="text-sm text-white/60">
                Align with teams that{" "}
                <span className="font-bold text-white">Choose Speed</span>
              </p>
            </div>

            <Link
              href={routes.authRoutes.SIGN_UP}
              className="flex items-center gap-3 rounded-lg bg-white pl-2 pr-5 py-2 text-sm font-bold text-[#0d0028] transition-all hover:bg-[#00ffbb]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5501ff]">
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </span>
              Start Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
