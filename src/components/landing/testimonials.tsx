const StarRating = () => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const TESTIMONIALS = [
  {
    quote:
      "Before PayOrbit, our payroll was spread across spreadsheets and emails. After switching, everything — from employee records to cross-border payments — lives in one place.",
    name: "Robert Fox",
    role: "HR Specialist, Acme Corp",
    initials: "RF",
    color: "#5501ff",
    highlight: true,
  },
  {
    quote:
      "We evaluated several payroll tools and PayOrbit stood out immediately. Setup was fast, and running payroll across 12 countries now takes minutes, not days.",
    name: "Darrell Steward",
    role: "Employee Relations Officer",
    initials: "DS",
    color: "#00a87a",
    highlight: false,
  },
  {
    quote:
      "As a finance lead, I used to spend hours chasing payment statuses. PayOrbit gives me a real-time view of every settlement. Approvals are fast and the audit trail is impeccable.",
    name: "Amara Osei",
    role: "Finance Lead, NovaTech",
    initials: "AO",
    color: "#ff00a6",
    highlight: false,
  },
  {
    quote:
      "Our DAO needed a payroll solution that was transparent and fast. PayOrbit on Stellar is exactly that — contributor rewards distributed in seconds with full on-chain visibility.",
    name: "James Mercado",
    role: "Treasury Lead, BuildDAO",
    initials: "JM",
    color: "#00bfff",
    highlight: false,
  },
  {
    quote:
      "Paying contractors across Nigeria, Brazil, and the Philippines used to take a week. Now it's done in under 5 seconds per payment. The Stellar integration is genuinely impressive.",
    name: "Maria Rodrigues",
    role: "COO, RemoteFirst",
    initials: "MR",
    color: "#f59e0b",
    highlight: false,
  },
  {
    quote:
      "The role-based access and multi-sig approval flow gave our CFO confidence that no payment goes out without the right eyes on it. Compliance reporting is now effortless.",
    name: "Sarah Chen",
    role: "CFO, TechVenture",
    initials: "SC",
    color: "#5501ff",
    highlight: false,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#f3f3f3]">
      <div className="mx-auto max-w-full px-25">
        <div className="grid grid-cols-[42%_1fr] gap-24 items-start">
          {/* Left: headline + image */}
          <div className="pt-1 flex flex-col gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5501ff] mb-6">
                What teams are saying
              </p>
              <h2 className="font-(family-name:--font-dm-sans) text-[3.2rem] font-bold leading-[1.04] tracking-tight text-[#0d0020] md:text-[3.6rem]">
                Trusted by global finance & HR teams.
              </h2>
            </div>

            {/* Image slot — replace src with real image */}
            <div className="rounded-xl overflow-hidden w-full aspect-[4/3] bg-[#e8eaf0]">
              <img
                src="/1.jpg"
                alt="Photo by Lala Azizli
      "
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: 2×3 grid */}
          <div className="grid grid-cols-2">
            {TESTIMONIALS.map((t, i) => {
              const isLastRow = i >= TESTIMONIALS.length - 2;
              const isRightCol = i % 2 === 1;
              return (
                <div
                  key={t.name}
                  className={[
                    "flex flex-col justify-between p-8 min-h-[220px] bg-[#f3f3f3] transition-colors duration-200 hover:bg-white group",
                    !isLastRow ? "border-b border-[#d0d0d0]" : "",
                    !isRightCol ? "border-r border-[#d0d0d0]" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div>
                    <StarRating />
                    <p className="text-sm leading-relaxed text-[#1f1f1f]/65 mt-1">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 bg-primary/20"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0d0020]">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-[#1f1f1f]/40">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
