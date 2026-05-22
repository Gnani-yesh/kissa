import { Reveal } from "./reveal";

const EXPLORE = [
  { label: "The coffee", href: "#coffee" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Brewing", href: "#brewing" },
  { label: "The room", href: "#room" },
  { label: "Menu", href: "#menu" },
];

const CONNECT = [
  { label: "Instagram", href: "#" },
  { label: "The journal", href: "#" },
  { label: "hello@kissa.coffee", href: "mailto:hello@kissa.coffee" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso pt-[clamp(5rem,9vw,8rem)]">
      <div className="shell">
        {/* sign-off */}
        <div className="flex flex-col gap-9 pb-14 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="display text-display-md text-cream">
              See you
              <br />
              at the counter.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4 sm:items-end">
              <a href="#visit" className="btn-cream">
                <span>Reserve a seat</span>
              </a>
              <span className="text-[12.5px] text-cream-soft">
                Open daily — 07:00 to 18:00
              </span>
            </div>
          </Reveal>
        </div>

        <div className="hairline-cream" />

        {/* columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[22px] font-bold tracking-tight-display text-cream">
                Kissa
              </span>
              <span className="jp text-[14px] text-cream-soft">喫茶</span>
            </div>
            <p className="mt-5 max-w-[300px] text-[13.5px] leading-[1.74] text-cream-soft">
              A specialty coffee room in the old-Tokyo kissaten tradition —
              single origin, hand-poured, unhurried.
            </p>
          </div>

          <FooterColumn title="Explore" links={EXPLORE} />
          <FooterColumn
            title="Visit"
            links={[
              { label: "No. 4, Yanaka", href: "#visit" },
              { label: "Taitō, Tokyo", href: "#visit" },
              { label: "07:00 – 18:00, daily", href: "#visit" },
            ]}
          />
          <FooterColumn title="Connect" links={CONNECT} />
        </div>

        {/* oversized wordmark */}
        <div className="relative pt-6">
          <span className="mask-b block select-none text-center text-[24vw] font-bold leading-[0.78] tracking-tightest text-cream/[0.12] lg:text-[20vw]">
            Kissa
          </span>
        </div>

        {/* fine print */}
        <div className="flex flex-col items-center gap-4 border-t border-cream/12 py-8 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:gap-6 sm:text-left">
          <span className="text-[11.5px] tracking-wide text-cream-soft">
            © 2026 Kissa Coffee — a quiet room for coffee.
          </span>
          <span className="jp text-[11.5px] text-cream-soft">
            一杯ずつ、丁寧に。
          </span>
          <a
            href="#top"
            className="link-underline text-[11.5px] uppercase tracking-wider2 text-cream-soft"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="lg:col-span-2">
      <span className="eyebrow-cream">{title}</span>
      <ul className="mt-5 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="footer-link text-[13.5px] text-cream-soft transition-colors duration-300 hover:text-cream"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
