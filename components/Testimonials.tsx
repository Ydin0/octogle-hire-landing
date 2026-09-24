import { Ph, PhImage } from "./Placeholder";

// Client proof: real clients with their permission and a real photo, all
// confirmed by Dan 2026-09-24. Lead with what they shipped, not savings maths.
// Photos live in /public/proof/.
type Quote = {
  name: string;
  role: string;
  company: string;
  quote: string;
  outcome: string;
  photo: string;
};

const QUOTES: Quote[] = [
  {
    name: "Eduardo Middleton",
    role: "Founder",
    company: "1VA",
    quote:
      "Our initial budget for a developer in the UK was £75,000. OctogleHire placed an equally skilled engineer for £38,000, without compromising on quality.",
    outcome: "1 full-stack engineer",
    photo: "/proof/eduardo.jpg",
  },
  {
    name: "Ricardo Machado",
    role: "CEO",
    company: "Beekey",
    quote:
      "We were about to commit to three senior frontend engineers at London rates. OctogleHire matched us with equally talented engineers in under a week.",
    outcome: "3 senior frontend engineers",
    photo: "/proof/ricardo.jpg",
  },
  {
    name: "Daniel Bell",
    role: "CMO",
    company: "TNW Energy",
    quote:
      "We needed a handful of developers for our internal CRM build. After speaking with multiple agencies, we sat down with Yaseen from Octogle and were pleasantly surprised by the talent available. We took on three developers, saving upwards of £6,000 a month, and built the software in record time, exactly how we wanted it.",
    outcome: "3 senior full-stack developers",
    photo: "/proof/dan.jpg",
  },
];

export default function Testimonials() {
  return (
    <div className="mt-10 space-y-5">
      {/* Video first: for an offshore offer, a client on camera beats any text. */}
      <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card lg:grid lg:grid-cols-[1.4fr_1fr]">
        <PhImage
          label="30 to 60 second client video (founder on camera: what they built, how the engineer fits in)"
          className="aspect-video w-full lg:aspect-auto lg:h-full"
        />
        <div className="p-6 sm:p-8">
          <p className="eyebrow text-[11px] font-medium text-steel-500">
            Client story
          </p>
          <p className="mt-3 font-display text-[22px] font-semibold leading-snug text-navy-900">
            <Ph>&ldquo;Pull quote from the video.&rdquo;</Ph>
          </p>
          <p className="mt-4 text-[15px] text-steel-700">
            <Ph>Name, role, company</Ph>
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-3xl border border-[var(--border-subtle)] bg-white p-6 shadow-card"
          >
            <blockquote className="flex-1 text-[15px] leading-relaxed text-steel-700">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <p className="mt-4 text-[13px] font-medium text-steel-600">
              Hired: {q.outcome}
            </p>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={q.photo}
                alt={q.name}
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-display text-[15px] font-semibold text-navy-900">
                  {q.name}
                </p>
                <p className="text-[13px] text-[var(--text-faint)]">
                  {q.role}, {q.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
