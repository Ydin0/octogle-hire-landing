const ITEMS = [
  {
    name: "Daniel Bell",
    role: "CMO, TNW Energy",
    count: "3",
    hired: "Senior full-stack developers hired",
    saved: "£225,000",
    local: "£12,450",
    octogle: "£6,200",
    initials: "DB",
    // img: "/proof/daniel.jpg",
  },
  {
    name: "Harry",
    role: "Co-Founder, Hyrra",
    count: "3",
    hired: "Full-stack engineers hired",
    saved: "£108,000",
    local: "£5,000",
    octogle: "£2,000",
    initials: "H",
    // img: "/proof/harry.jpg",
  },
  {
    name: "Eduardo Middleton",
    role: "Founder, 1VA",
    count: "1",
    hired: "Full-stack engineer hired",
    saved: "£36,996",
    local: "£6,250",
    octogle: "£3,167",
    initials: "EM",
    // img: "/proof/eduardo.jpg",
  },
  {
    name: "Ricardo Machado",
    role: "CEO, Beekey",
    count: "3",
    hired: "Senior frontend engineers hired",
    saved: "£205,200",
    local: "£9,500",
    octogle: "£3,800",
    initials: "RM",
    // img: "/proof/ricardo.jpg",
  },
] as const;

type Item = (typeof ITEMS)[number] & { img?: string };

function Avatar({ item }: { item: Item }) {
  if (item.img) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.img}
        alt={item.name}
        width={72}
        height={72}
        className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-white/15 sm:h-[72px] sm:w-[72px]"
      />
    );
  }
  return (
    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-sky-500/15 font-display text-[22px] font-semibold text-sky-300 ring-1 ring-white/10 sm:h-[72px] sm:w-[72px]">
      {item.initials}
    </span>
  );
}

function Card({ item, top }: { item: Item; top: number }) {
  return (
    <div className="sticky" style={{ top }}>
      <div className="rounded-[1.75rem] border border-white/10 bg-navy-900 p-6 shadow-cta sm:p-8">
        {/* Person */}
        <div className="flex items-center gap-4">
          <Avatar item={item} />
          <div>
            <p className="font-display text-[19px] font-semibold leading-tight text-white sm:text-[21px]">
              {item.name}
            </p>
            <p className="mt-0.5 text-[14px] text-[#8FB0C6]">{item.role}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div className="min-w-0">
            <p className="font-display text-[52px] font-semibold leading-none text-white sm:text-[60px]">
              {item.count}
            </p>
            <p className="mt-2 max-w-[15rem] text-[13px] font-medium uppercase tracking-wide text-[#8FB0C6]">
              {item.hired}
            </p>
          </div>
          <div className="shrink-0 sm:text-right">
            <p className="font-display text-[34px] font-semibold leading-none text-[#5FE0B0] sm:text-[40px]">
              {item.saved}
            </p>
            <p className="mt-2 text-[12px] font-medium uppercase tracking-wide text-[#8FB0C6]">
              Saved per year
            </p>
          </div>
        </div>

        {/* Cost line */}
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-5">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-wide text-[#7F9BB4]">
              Local
            </p>
            <p className="mt-1 font-display text-[20px] font-semibold text-[#9FB8CC] line-through decoration-[#597690]">
              {item.local}
              <span className="text-[13px] font-medium"> /mo</span>
            </p>
          </div>
          <span aria-hidden className="text-[#597690]">
            &rarr;
          </span>
          <div>
            <p className="text-[12px] font-medium uppercase tracking-wide text-sky-400">
              Octogle
            </p>
            <p className="mt-1 font-display text-[22px] font-semibold text-white">
              {item.octogle}
              <span className="text-[13px] font-medium text-[#8FB0C6]"> /mo</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="mt-10 space-y-5 sm:space-y-6">
      {ITEMS.map((item, i) => (
        // Increasing top offset makes each card stack over the previous
        // one on scroll, leaving a small peek of the card underneath.
        <Card key={item.name} item={item} top={96 + i * 14} />
      ))}
    </div>
  );
}
