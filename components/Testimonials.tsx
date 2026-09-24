import { Ph, PhImage } from "./Placeholder";

// Client proof. Rules for anything that goes in here:
//  - A real client, with their permission, a real photo and a LinkedIn link.
//  - Not one of our own portfolio companies (TNW, Hyrra, Leadey, Corpwise) or
//    anyone on the Octogle team. A prospect who finds that out walks.
//  - Lead with what they shipped, not savings maths nobody believes.
//
// To fill: add the photo to /public/proof/, set photo + linkedin, then remove
// `placeholder: true`.
type Quote = {
  name: string;
  role: string;
  company: string;
  quote: string;
  outcome: string;
  photo?: string;
  linkedin?: string;
  placeholder?: boolean;
};

const QUOTES: Quote[] = [
  {
    name: "Eduardo Middleton",
    role: "Founder",
    company: "1VA",
    quote:
      "Our initial budget for a developer in the UK was £75,000. OctogleHire placed an equally skilled engineer for £38,000, without compromising on quality.",
    outcome: "1 full-stack engineer",
    placeholder: true,
  },
  {
    name: "Ricardo Machado",
    role: "CEO",
    company: "Beekey",
    quote:
      "We were about to commit to three senior frontend engineers at London rates. OctogleHire matched us with equally talented engineers in under a week.",
    outcome: "3 senior frontend engineers",
    placeholder: true,
  },
  {
    name: "Client name",
    role: "Role",
    company: "Company",
    quote: "What they shipped with their engineer, in their words.",
    outcome: "What was hired",
    placeholder: true,
  },
];

function Field({ on, children }: { on?: boolean; children: React.ReactNode }) {
  return on ? <Ph>{children}</Ph> : <>{children}</>;
}

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
              &ldquo;<Field on={q.placeholder}>{q.quote}</Field>&rdquo;
            </blockquote>
            <p className="mt-4 text-[13px] font-medium text-steel-600">
              Hired: <Field on={q.placeholder}>{q.outcome}</Field>
            </p>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-5">
              {q.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={q.photo}
                  alt={q.name}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
              ) : (
                <PhImage label="Photo" className="h-12 w-12 shrink-0 rounded-full !p-0 text-[10px]" />
              )}
              <div className="min-w-0">
                <p className="font-display text-[15px] font-semibold text-navy-900">
                  <Field on={q.placeholder}>{q.name}</Field>
                </p>
                <p className="text-[13px] text-[var(--text-faint)]">
                  <Field on={q.placeholder}>
                    {q.role}, {q.company}
                  </Field>
                </p>
              </div>
              {q.linkedin ? (
                <a
                  href={q.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${q.name} on LinkedIn`}
                  className="ml-auto text-steel-600 transition hover:text-navy-900"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
              ) : (
                <span className="ml-auto">
                  <Ph>LinkedIn</Ph>
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
