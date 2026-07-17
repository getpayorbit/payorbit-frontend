import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "../../lib/utils/routes";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#ede9ff] py-20 md:py-32 lg:py-40">
      {/* Concentric rings — scaled down on mobile */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
        {[400, 320, 240, 160, 100].map((size) => (
          <div
            key={size}
            className="absolute bottom-0 translate-y-1/2 rounded-full border border-[#5501ff]/10 sm:hidden"
            style={{ width: size, height: size }}
          />
        ))}
        {[600, 500, 400, 300, 200].map((size) => (
          <div
            key={size}
            className="absolute bottom-0 translate-y-1/2 rounded-full border border-[#5501ff]/10 hidden sm:block"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 text-center">

        {/* Headline */}
        <h2 className="font-(family-name:--font-dm-sans) text-2xl sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.6rem] font-bold leading-[1.05] tracking-tight text-[#5501ff]">
          The fastest payroll decision you&apos;ll ever make.
        </h2>

        {/* Sub */}
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#1f1f1f]/50">
          Set up global payroll in under 15 minutes. Pay employees and
          contractors worldwide — settling on Stellar in under 5 seconds.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={routes.authRoutes.SIGN_UP}
            className="group inline-flex items-center gap-2 rounded-lg hover:bg-[#0d0020] px-7 py-3.5 text-sm font-bold text-white transition-all bg-[#5501ff] hover:-translate-y-px"
          >
            Get started free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-[#0d0020]/20 bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#0d0020]/70 backdrop-blur-sm transition-all hover:border-[#0d0020]/40 hover:text-[#0d0020]"
          >
            Contact support
          </Link>
        </div>

        {/* Trust note */}
        <p className="mt-6 text-xs text-[#1f1f1f]/30">
          No credit card required · Free forever for small teams
        </p>
      </div>
    </section>
  );
}
