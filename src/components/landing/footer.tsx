import Link from "next/link";
import Logo from "../ui/logo";

const ROW_ONE = [
  {
    title: "Payroll",
    items: [
      { label: "Bulk Payroll", href: "#features" },
      { label: "Auto Scheduling", href: "#features" },
      { label: "Contractor Payments", href: "#features" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { label: "KYC & Verification", href: "#features" },
      { label: "Audit Trail", href: "#features" },
      { label: "Tax Reporting", href: "#features" },
      { label: "Role-based Access", href: "#features" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { label: "Stellar Network", href: "#features" },
      { label: "USDC Stablecoin", href: "#features" },
      { label: "Real-time Tracking", href: "#features" },
      { label: "API & Integrations", href: "#features" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Startups", href: "#" },
      { label: "DAOs", href: "#" },
      { label: "NGOs", href: "#" },
      { label: "Enterprise", href: "#" },
    ],
  },
];

const ROW_TWO = [
  {
    title: "Resources",
    items: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Developers",
    items: [
      { label: "Quick Start", href: "#" },
      { label: "SDK Reference", href: "#" },
      { label: "Webhooks", href: "#" },
      { label: "Support Centre", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

const INVESTORS = ["Stellar Foundation", "Andreessen Horowitz", "Coinbase Ventures", "Circle", "Sequoia"];

const SOCIALS = [
  {
    label: "LinkedIn",
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.914 1.186.092-.923.35-1.547.636-1.903-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
];

export function LandingFooter() {
  return (
    <footer className="bg-[#faf9f7] border-t border-[#e8e6e0]">
      <div className="mx-auto max-w-full px-25 pt-16 pb-10">

        {/* Row 1: Logo + socials on left, 4 link columns on right */}
        <div className="grid grid-cols-[220px_1fr] gap-16 mb-14">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Logo />
            <div className="flex items-center gap-2 mt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d0cdc6] text-[#1f1f1f]/50 transition-all hover:border-[#1f1f1f]/40 hover:text-[#1f1f1f]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 4 columns */}
          <div className="grid grid-cols-4 gap-8">
            {ROW_ONE.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-semibold text-[#1f1f1f] tracking-wide">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#1f1f1f]/50 transition-colors hover:text-[#1f1f1f]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: offset columns (no brand column) */}
        <div className="grid grid-cols-[220px_1fr] gap-16 mb-16">
          <div />
          <div className="grid grid-cols-4 gap-8">
            {ROW_TWO.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-semibold text-[#1f1f1f] tracking-wide">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#1f1f1f]/50 transition-colors hover:text-[#1f1f1f]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e8e6e0] pt-8 flex items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-xs text-[#1f1f1f]/40">
            <span>© {new Date().getFullYear()} PayOrbit, Inc.</span>
            <Link href="#" className="hover:text-[#1f1f1f] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#1f1f1f] transition-colors">Privacy</Link>
          </div>

          {/* Backer logos */}
          <div className="flex items-center gap-8">
            {INVESTORS.map((name) => (
              <span key={name} className="text-xs font-semibold text-[#1f1f1f]/25 tracking-wide uppercase">
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
