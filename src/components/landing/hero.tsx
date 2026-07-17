"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Globe, Zap, Shield } from "lucide-react";
import { routes } from "../../lib/utils/routes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  ["Stellar", "Circle", "Coinbase"],
  ["Binance", "Deel", "Remote"],
];

const BASE_AMOUNT = 4_284_931;

const PAYMENTS = [
  {
    icon: "→",
    name: "Payment to Acme Logistics",
    sub: "Today, private",
    amount: "−$2,500.00 USDC",
    neg: true,
  },
  {
    icon: "→",
    name: "Invoice from Design Studio",
    sub: "Yesterday, private",
    amount: "+$1,850.00 USDC",
    neg: false,
  },
  {
    icon: "⚙",
    name: "Cash Link claim",
    sub: "Yesterday, private",
    amount: "+$420.00 USDC",
    neg: false,
  },
];

const SPARKLINE =
  "M0,50 C12,46 22,42 34,36 C46,30 56,24 68,18 C80,12 92,10 104,6 C112,4 118,5 128,2";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headlineRef.current, { y: 40, opacity: 0, duration: 0.8 }, 0.1);
      tl.from(subRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0.3);
      tl.from(statRef.current, { y: 12, opacity: 0, duration: 0.5 }, 0.42);
      tl.from(ctasRef.current, { y: 16, opacity: 0, duration: 0.55 }, 0.52);
      tl.from(logosRef.current, { y: 12, opacity: 0, duration: 0.5 }, 0.66);
      tl.from(scrollRef.current, { opacity: 0, duration: 0.5 }, 0.88);

      gsap.from(cardsRef.current, {
        y: 36,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.4,
      });

      const rows = cardsRef.current?.querySelectorAll("[data-row]");
      if (rows) {
        gsap.from(rows, {
          y: 12,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.09,
          delay: 0.8,
        });
      }

      const el = statRef.current;
      if (el) {
        el.textContent = "$" + BASE_AMOUNT.toLocaleString();
        let current = BASE_AMOUNT;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: BASE_AMOUNT,
          duration: 2.0,
          ease: "power2.out",
          delay: 0.2,
          onUpdate() {
            el.textContent = "$" + Math.round(obj.val).toLocaleString();
          },
          onComplete() {
            intervalRef.current = setInterval(
              () => {
                current += Math.floor(Math.random() * 900 + 300);
                el.textContent = "$" + current.toLocaleString();
              },
              3000 + Math.random() * 1500,
            );
          },
        });
      }

      gsap.to(scrollRef.current, {
        y: 6,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative overflow-hidden bg-white min-h-screen"
      >
        {/* Map — bottom-right, bleeds off edge, no rotation */}
        <div className="absolute bottom-0 right-0 w-[58%] pointer-events-none select-none">
          <Image
            src="/map.png"
            alt=""
            width={900}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* ── Left: hero text — normal flow ── */}
        <div className="relative w-full px-25">
          <div className="flex flex-col gap-7 max-w-205 pt-32 pb-24 lg:pt-40 lg:pb-32">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-medium text-primary truncate">
                Blockchain-Powered Payroll
              </span>
            </div>
            <h1
              ref={headlineRef}
              className="font-(family-name:--font-dm-sans) text-[2.2rem] font-bold leading-[1.06] tracking-tight text-black sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.4rem] 2xl:text-[5rem]"
            >
              Pay your global team{" "}
              <span className="bg-primary bg-clip-text text-transparent">
                in seconds, not days.
              </span>
            </h1>

            <p
              ref={subRef}
              className="text-base leading-relaxed text-[#1f1f1f]/82 max-w-165"
            >
              PayOrbit settles payroll instantly using USDC on the Stellar
              network — no wire transfers, no bank delays, no hidden fees. Built
              for teams that work across borders.
            </p>

            {/* Live stat */}
            <p className="text-sm font-medium text-[#1f1f1f]">
              Over 20 million global merchants and teams use stablecoins for
              payments.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="group rounded-lg px-7 text-base font-semibold text-white transition-all duration-200 bg-[#4600d2]! hover:shadow-2xl hover:-translate-y-px active:translate-y-0"
              >
                <Link
                  href={routes.authRoutes.SIGN_UP}
                  className="flex items-center gap-2"
                >
                  Get started now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-lg border-[#1f1f1f]/18 px-7 text-base font-semibold text-[#1f1f1f]/60 hover:border-[#5501ff]/35! hover:text-[#5501ff]! hover:bg-[#5501ff]/4!"
              >
                <Link href="#contact">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Instant Global Transfers card — top-right over map ── */}
        <div
          className="hidden lg:block absolute z-10"
          style={{
            top: "14%",
            right: "14%",
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.97)",
            transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          }}
        >
          <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative rounded border border-[#e8eaf0] bg-white/90 backdrop-blur-md p-6 shadow-2xl shadow-primary/8 w-166">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <span className="font-semibold text-[#0d0020] text-sm">
                  Instant Global Transfers
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </div>
            </div>

            {/* Transfer rows */}
            <div className="space-y-1">
              {[
                {
                  code: "us",
                  country: "United States",
                  amount: "$4,200.00",
                  time: "Just now",
                },
                {
                  code: "gb",
                  country: "United Kingdom",
                  amount: "£3,100.00",
                  time: "2s ago",
                },
                {
                  code: "de",
                  country: "Germany",
                  amount: "€2,890.00",
                  time: "5s ago",
                },
                {
                  code: "jp",
                  country: "Japan",
                  amount: "¥180,000",
                  time: "12s ago",
                },
              ].map((row, i) => (
                <div
                  key={row.country}
                  className="flex items-center gap-3 py-2.5 border-b border-[#f0f0f4] last:border-0"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.6 + i * 0.1}s`,
                  }}
                >
                  <img
                    src={`https://flagcdn.com/w40/${row.code}.png`}
                    alt={row.country}
                    className="h-4 w-6 object-cover shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0d0020] leading-tight">
                      {row.country}
                    </p>
                    <p className="text-[11px] text-[#1f1f1f]/45 mt-0.5">
                      {row.time}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#5501ff] tabular-nums">
                    {row.amount}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer features */}
            <div className="mt-4 pt-4 border-t border-[#f0f0f4] flex gap-5">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-[#00ffbb]/20 flex items-center justify-center">
                  <Zap className="h-3 w-3 text-[#00a87a]" />
                </div>
                <span className="text-[11px] font-medium text-[#1f1f1f]/60">
                  Lightning-fast
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-[#5501ff]/10 flex items-center justify-center">
                  <Shield className="h-3 w-3 text-primary" />
                </div>
                <span className="text-[11px] font-medium text-[#1f1f1f]/60">
                  Bank-grade security
                </span>
              </div>
            </div>
          </div>
        </div>

        
        <div
          ref={cardsRef}
          className="hidden lg:block absolute bottom-64 xl:bottom-72 3xl:bottom-140 z-20"
          style={{ right: "2%", width: "clamp(360px, 42vw, 620px)" }}
        >
          {/* Card 1: Payroll run in progress */}
          <div className="w-[65%] rounded bg-white border border-[#1f1f1f]/10 shadow-[0_20px_64px_rgba(0,0,0,0.13)] overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#1f1f1f]/7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1f1f1f]/75">
                  April Payroll Run
                </p>
                <p className="text-xs text-[#1f1f1f]/75 mt-0.5">
                  24 employees · 11 countries
                </p>
              </div>
              <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Settled
              </span>
            </div>

            <div className="px-5 pt-4 pb-3">
              <p className="text-[10px] text-[#1f1f1f]/75 mb-1">
                Total disbursed
              </p>
              <p className="text-[2rem] font-bold text-[#0d0020] tabular-nums leading-tight">
                $47,200.00
              </p>
              <p className="text-xs text-[#1f1f1f]/70 mt-0.5">
                USDC · Stellar Network
              </p>
            </div>

            <div className="px-5 pb-4">
              <div className="flex justify-between text-[10px] text-[#1f1f1f]/75 mb-1.5">
                <span>Settlement progress</span>
                <span className="text-[#5501ff] font-semibold">22 / 24</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#1f1f1f]/8">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-[#5501ff] to-[#00ffbb]"
                  style={{ width: "91%" }}
                />
              </div>
            </div>

            <div className="px-2 pb-0">
              <svg
                viewBox="0 0 128 48"
                className="w-full h-[64px]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5501ff" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#5501ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={SPARKLINE + " L128,48 L0,48 Z"} fill="url(#cg)" />
                <path
                  d={SPARKLINE}
                  fill="none"
                  stroke="#5501ff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex gap-4 px-5 pb-4">
              {["1W", "1M", "1Y"].map((l, i) => (
                <span
                  key={l}
                  className={`text-[10px] font-bold cursor-pointer rounded px-2 py-0.5 ${i === 1 ? "bg-[#5501ff] text-white" : "text-[#1f1f1f]/30"}`}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Live settlements — offset right + down, right-anchored so it never bleeds */}
          <div
            className="absolute w-[58%] rounded bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)] border border-[#1f1f1f]/10 overflow-hidden"
            style={{ top: "48%", right: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f]/7">
              <span className="text-[11px] font-semibold text-[#1f1f1f]/50 uppercase tracking-widest">
                Recent Payouts
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#5501ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5501ff] animate-pulse" />
                Live
              </span>
            </div>
            <div className="divide-y divide-[#1f1f1f]/6">
              {[
                {
                  flag: "🇳🇬",
                  name: "Chidi Okonkwo",
                  role: "Senior Engineer",
                  amount: "$3,200.00",
                  status: "Settled",
                  time: "3.8s",
                },
                {
                  flag: "🇧🇷",
                  name: "Maria Rodrigues",
                  role: "Product Designer",
                  amount: "$2,400.00",
                  status: "Settled",
                  time: "4.1s",
                },
                {
                  flag: "🇵🇭",
                  name: "James Mercado",
                  role: "Ops Manager",
                  amount: "$1,900.00",
                  status: "Pending",
                  time: null,
                },
              ].map((p) => (
                <div
                  key={p.name}
                  data-row
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div className="h-8 w-8 rounded-full bg-[#5501ff]/8 flex items-center justify-center text-base shrink-0 leading-none">
                    {p.flag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs xl:text-sm font-semibold text-[#1f1f1f] leading-tight truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] xl:text-[11px] text-[#1f1f1f]/38 truncate">
                      {p.role}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs xl:text-sm font-bold text-[#1f1f1f] tabular-nums">
                      {p.amount}
                    </p>
                    {p.time ? (
                      <p className="text-[10px] text-emerald-600 font-semibold">
                        ✓ {p.time}
                      </p>
                    ) : (
                      <p className="text-[10px] text-amber-500 font-semibold">
                        Pending…
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#f4f6f9] border-t border-[#1f1f1f]/7">
              <p className="text-[10px] text-[#1f1f1f]/35">
                20M+ stablecoin payroll transactions globally
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#1f1f1f]/72"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </section>
    </>
  );
}
