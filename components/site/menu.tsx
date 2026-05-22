import { Reveal } from "./reveal";

type Item = { name: string; note: string; price: string };
type Category = { label: string; jp: string; items: Item[] };

const COLUMN_A: Category[] = [
  {
    label: "Pour-over — filter",
    jp: "点",
    items: [
      {
        name: "Yoake, house origin",
        note: "Yirgacheffe, washed — floral, clean",
        price: "780",
      },
      {
        name: "Guest origin",
        note: "Rotating — ask the counter what is open",
        price: "840",
      },
      {
        name: "Batch brew",
        note: "The day's filter, by the cup",
        price: "520",
      },
    ],
  },
  {
    label: "Espresso",
    jp: "濃",
    items: [
      { name: "Espresso", note: "A short, considered shot", price: "420" },
      { name: "Macchiato", note: "Espresso, a spoon of foam", price: "460" },
      { name: "Cortado", note: "Equal parts, warm milk", price: "540" },
    ],
  },
];

const COLUMN_B: Category[] = [
  {
    label: "With milk",
    jp: "和",
    items: [
      { name: "Flat white", note: "Silken, low and even", price: "620" },
      { name: "Latte", note: "Long, gentle, unsweetened", price: "640" },
      { name: "Café au lait", note: "Filter coffee, hot milk", price: "580" },
    ],
  },
  {
    label: "Tea & otherwise",
    jp: "茶",
    items: [
      { name: "Ceremonial matcha", note: "Whisked to order", price: "680" },
      { name: "Hojicha latte", note: "Roasted green tea, milk", price: "620" },
      {
        name: "Seasonal wagashi",
        note: "A small sweet, with the day's tea",
        price: "560",
      },
    ],
  },
];

export function Menu() {
  return (
    <section
      id="menu"
      className="relative bg-paper py-[clamp(6.5rem,13vw,12.5rem)]"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-ink/30" />
              <span className="eyebrow">The menu — 品書き</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-7 text-display-lg text-ink">
                What the counter
                <br />
                pours today.
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end lg:col-span-5 lg:justify-end">
            <Reveal delay={0.14}>
              <p className="max-w-[330px] text-[14px] leading-[1.76] text-ink-soft">
                A short list, kept short on purpose. Prices in yen. The filter
                origins rotate with the season and with what is tasting its
                best.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
          <div className="flex flex-col gap-14">
            {COLUMN_A.map((c) => (
              <MenuCategory key={c.label} category={c} />
            ))}
          </div>
          <div className="flex flex-col gap-14">
            {COLUMN_B.map((c) => (
              <MenuCategory key={c.label} category={c} />
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-6">
            <span className="text-[12.5px] text-ink-mute">
              Beans are sold by the bag at the counter — ground or whole.
            </span>
            <a href="#visit" className="link-underline text-[13px] text-ink">
              Reserve a seat to taste the full list
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MenuCategory({ category }: { category: Category }) {
  return (
    <Reveal>
      <div>
        <div className="flex items-baseline gap-3">
          <span className="jp text-[22px] leading-none text-bean">
            {category.jp}
          </span>
          <span className="eyebrow">{category.label}</span>
        </div>
        <div className="mt-6 flex flex-col">
          {category.items.map((item) => (
            <div
              key={item.name}
              className="border-t border-ink/12 py-4 first:border-t-0 sm:py-[1.15rem]"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[16px] font-medium text-ink">
                  {item.name}
                </span>
                <span className="h-px flex-1 translate-y-[-2px] border-b border-dotted border-ink/30" />
                <span className="text-[14px] tabular-nums text-ink">
                  <span className="text-ink-mute">¥</span>
                  {item.price}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-mute">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
