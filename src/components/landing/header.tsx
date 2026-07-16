"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../ui/logo";
import { routes } from "../../lib/utils/routes";

const PRODUCTS_COLUMNS = [
  {
    title: "Payroll",
    items: [
      { label: "Bulk Payroll", desc: "Pay entire teams in one click" },
      { label: "Auto Scheduling", desc: "Recurring payrolls on autopilot" },
      {
        label: "Contractor Payments",
        desc: "Global contractors, any currency",
      },
      { label: "Multi-Currency", desc: "50+ currencies supported" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { label: "KYC & Verification", desc: "Identity checks built in" },
      { label: "Audit Trail", desc: "Complete payment history" },
      { label: "Tax Reporting", desc: "Automated tax documentation" },
      { label: "Role-based Access", desc: "Permissions & controls" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { label: "Stellar Network", desc: "Instant blockchain settlements" },
      { label: "USDC Stablecoin", desc: "Stable, borderless transactions" },
      { label: "Real-time Tracking", desc: "Live payment status" },
      { label: "API & Integrations", desc: "Connect your stack" },
    ],
  },
];

const SOLUTIONS_ITEMS = [
  { label: "Startups", desc: "Fast-moving teams, zero bloat" },
  { label: "DAOs", desc: "Decentralized org payroll" },
  { label: "NGOs", desc: "Mission-driven disbursements" },
  { label: "Enterprise", desc: "Large-scale global payroll" },
];

const WATCHED_SECTIONS = ["features", "how-it-works", "pricing"];

function AnnouncementBar({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="relative flex items-center justify-center gap-2.5 bg-[#00BFFF] px-10 py-2.5 text-white">
      <Zap className="h-3.5 w-3.5 shrink-0 fill-[#00ffbb] text-[#00ffbb]" />
      <p className="text-xs font-medium tracking-wide">
        PayOrbit is now live on Stellar Mainnet —{" "}
        <Link
          href={routes.authRoutes.SIGN_UP}
          className="font-semibold underline underline-offset-2 hover:text-[#00ffbb] transition-colors"
        >
          Start paying your team today
        </Link>
      </p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 cursor-pointer p-1 text-white/60 hover:text-white transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection + hide announcement on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 10) setShowAnnouncement(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    WATCHED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Escape key closes dropdowns
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const openDropdown = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeAll = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const dropdownBg = scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white";

  const navLinkClass = (sectionId?: string) =>
    cn(
      "rounded px-3 py-2 text-14px font-medium transition-colors duration-200",
      sectionId && activeSection === sectionId
        ? "text-[#5501ff]"
        : "text-[#1f1f1f]/70 hover:text-[#1f1f1f]",
    );

  return (
    <div className="sticky top-0 z-50 w-full">
      {showAnnouncement && (
        <AnnouncementBar onDismiss={() => setShowAnnouncement(false)} />
      )}

      <header
        className={cn(
          "w-full transition-all duration-300",
          scrolled
            ? "bg-white backdrop-blur-md border-b border-gray-100 shadow-[0_1px_24px_rgba(85,1,255,0.10)]"
            : "bg-white border-b",
        )}
      >
        <div className="relative mx-auto flex h-18 max-w-full items-center justify-between px-25">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-15 lg:flex">
            {/* Products */}
            <div className="relative">
              <button
                onMouseEnter={() => openDropdown("products")}
                onMouseLeave={scheduleClose}
                className={cn(
                  "flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-14px transition-colors duration-200",
                  activeDropdown === "products"
                    ? "text-[#5501ff]"
                    : "text-[#1f1f1f]/70 hover:text-[#1f1f1f]",
                )}
              >
                Products
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeDropdown === "products" && "rotate-180",
                  )}
                />
              </button>
              <div
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className={cn(
                  "absolute -left-100 top-full w-270 mt-4 rounded-b border border-t-0 border-gray-100 transition-all duration-200 origin-top z-50",
                  dropdownBg,
                  activeDropdown === "products"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none",
                )}
              >
                <div className="grid grid-cols-3 gap-10 px-8 py-8">
                  {PRODUCTS_COLUMNS.map((col) => (
                    <div key={col.title}>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#5501ff]">
                        {col.title}
                      </p>
                      <ul className="space-y-0.5">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href="#features"
                              onClick={closeAll}
                              className="group flex flex-col rounded px-3 py-2.5 transition-colors hover:bg-[#5501ff]/5"
                            >
                              <span className="text-sm font-medium text-[#1f1f1f] group-hover:text-[#5501ff] transition-colors">
                                {item.label}
                              </span>
                              <span className="text-sm text-[#1f1f1f]/76 mt-0.5">
                                {item.desc}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onMouseEnter={() => openDropdown("solutions")}
                onMouseLeave={scheduleClose}
                className={cn(
                  "flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-14px font-medium transition-colors duration-200",
                  activeDropdown === "solutions"
                    ? "text-[#5501ff]"
                    : "text-[#1f1f1f]/70 hover:text-[#1f1f1f]",
                )}
              >
                Solutions
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeDropdown === "solutions" && "rotate-180",
                  )}
                />
              </button>
              <div
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className={cn(
                  "absolute -left-80 mt-4 top-full w-200 rounded-b border border-t-0 border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-200 origin-top z-50",
                  dropdownBg,
                  activeDropdown === "solutions"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none",
                )}
              >
                <div className="grid grid-cols-4 gap-4 px-8 py-8">
                  {SOLUTIONS_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href="#"
                      onClick={closeAll}
                      className="group flex flex-col rounded px-2 py-3 transition-colors hover:bg-[#5501ff]/5"
                    >
                      <span className="text-sm font-medium text-[#1f1f1f] group-hover:text-[#5501ff] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-sm text-[#1f1f1f]/70 mt-0.5">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="#pricing"
              onClick={closeAll}
              className={navLinkClass("pricing")}
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center lg:flex">
            <Button
              asChild
              className="group rounded-lg bg-[#5501ff] px-7 py-2.5 h-auto text-sm font-bold uppercase tracking-wide text-white  transition-all duration-200 hover:bg-[#4600d2]! hover:-translate-y-px active:translate-y-0"
            >
              <Link
                href={routes.authRoutes.SIGN_UP}
                className="flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex cursor-pointer items-center justify-center rounded p-2 text-[#1f1f1f]/70 transition-colors hover:bg-gray-100 hover:text-[#5501ff] lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={cn(
            "overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 lg:hidden",
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-1 px-5 py-4">
            <button
              onClick={() =>
                setMobileExpanded((v) => (v === "products" ? null : "products"))
              }
              className="flex cursor-pointer items-center justify-between rounded px-3 py-3 text-sm font-medium text-[#1f1f1f]/70 hover:bg-[#5501ff]/5 hover:text-[#5501ff] transition-colors"
            >
              Products
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  mobileExpanded === "products" && "rotate-180 text-[#5501ff]",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                mobileExpanded === "products" ? "max-h-[400px]" : "max-h-0",
              )}
            >
              {PRODUCTS_COLUMNS.map((col) => (
                <div key={col.title} className="px-3 pb-3">
                  <p className="pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#5501ff]">
                    {col.title}
                  </p>
                  {col.items.map((item) => (
                    <Link
                      key={item.label}
                      href="#features"
                      onClick={closeAll}
                      className="block py-1.5 pl-2 text-sm text-[#1f1f1f]/70 hover:text-[#5501ff] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                setMobileExpanded((v) =>
                  v === "solutions" ? null : "solutions",
                )
              }
              className="flex cursor-pointer items-center justify-between rounded px-3 py-3 text-sm font-medium text-[#1f1f1f]/70 hover:bg-[#5501ff]/5 hover:text-[#5501ff] transition-colors"
            >
              Solutions
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  mobileExpanded === "solutions" && "rotate-180 text-[#5501ff]",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                mobileExpanded === "solutions" ? "max-h-[200px]" : "max-h-0",
              )}
            >
              <div className="px-3 pb-3">
                {SOLUTIONS_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href="#"
                    onClick={closeAll}
                    className="block py-1.5 pl-2 text-sm text-[#1f1f1f]/70 hover:text-[#5501ff] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="#pricing"
              onClick={closeAll}
              className={cn(navLinkClass("pricing"), "w-full")}
            >
              Pricing
            </Link>

            <div className="mt-3 border-t border-gray-100 pt-4">
              <Button
                asChild
                className="w-full rounded bg-[#5501ff] text-sm font-semibold text-white [box-shadow:0_4px_18px_rgba(85,1,255,0.4)] hover:bg-[#4600d2]!"
              >
                <Link
                  href={routes.authRoutes.SIGN_UP}
                  onClick={closeAll}
                  className="flex items-center justify-center gap-1.5"
                >
                  Get Started Free
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
      {/* <div className="h-[3px] w-full bg-gradient-to-r from-[#5501ff] via-[#ff00a6] to-[#00ffbb]" /> */}
    </div>
  );
}
