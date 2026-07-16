export function StatsBar() {
  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-full px-25">
        <div className="grid grid-cols-3 gap-25">
          {[
            { value: "< 5s", label: "Settlement time" },
            { value: "150+", label: "Countries covered" },
            { value: "$0", label: "Hidden fees" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-3 rounded-lg bg-primary/4 px-8 py-8"
            >
              <span className="text-4xl font-bold text-primary text-center font-(family-name:--font-dm-sans)">
                {stat.value}
              </span>
              <span className="text-[11px] font-semibold text-center uppercase tracking-widest text-[#1f1f1f]/80 whitespace-pre-line leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-6">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#1f1f1f]/28 shrink-0">
            Powered by
          </span>
          <div className="h-px flex-1 bg-[#1f1f1f]/8" />
          <div className="flex items-center gap-4">
            {["Stellar", "USDC", "Circle"].map((name) => (
              <span
                key={name}
                className="text-xs font-bold text-[#1f1f1f]/35 tracking-wide hover:text-[#5501ff]/60 transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
