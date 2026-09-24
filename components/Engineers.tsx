import { CtaButton } from "./Funnel";
import { Ph, PhImage } from "./Placeholder";

// The product is people, so show them. Every card must be a REAL Octogle
// engineer (with their OK to be shown). No stock photos: a prospect who
// reverse-image-searches one of these ends the conversation.
//
// To fill a card: drop the photo in /public/engineers/ and set `photo`,
// then replace the placeholder fields. Remove `placeholder: true` when done.
type Engineer = {
  photo?: string;
  name: string;
  role: string;
  years: string;
  stack: string[];
  previously: string;
  placeholder?: boolean;
};

const ENGINEERS: Engineer[] = [
  {
    photo: "/engineers/priya.jpg",
    name: "Priya",
    role: "Full-Stack Engineer",
    years: "7 yrs",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    previously: "B2B SaaS platforms",
  },
  {
    photo: "/engineers/rohit.jpg",
    name: "Rohit",
    role: "Full-Stack Engineer, backend focus",
    years: "5 yrs",
    stack: ["Python", "Django", "AWS", "PostgreSQL", "REST APIs", "Docker"],
    previously:
      "B2C apps and cybersecurity platforms handling personal data under UK GDPR",
  },
  {
    photo: "/engineers/prasanna.jpg",
    name: "Prasanna",
    role: "AI / ML Engineer, backend",
    years: "17 yrs",
    stack: ["Python", "LLMs", "RAG", "FastAPI", "Vector DBs", "AWS"],
    previously: "B2B and B2C software, building AI models for clients",
  },
];

// Every Octogle engineer is trained on Claude Code (the same claim
// octoglehire.com makes), so the badge sits on every card. Claude's colour and a
// generic spark, not Anthropic's logo, so it does not read as a partnership.
function ClaudeCodeBadge() {
  return (
    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D97757]/35 bg-[#D97757]/10 px-2.5 py-1 text-[12px] font-semibold text-[#B4532F]">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2l1.6 6.1L20 6.3l-4.3 4.6L22 12l-6.3 1.1 4.3 4.6-6.4-1.8L12 22l-1.6-6.1L4 17.7l4.3-4.6L2 12l6.3-1.1L4 6.3l6.4 1.8z" />
      </svg>
      Builds with Claude Code
    </span>
  );
}

// Per Dan: every engineer graduated from one of India's top tech universities.
function UniversityLine() {
  return (
    <p className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-steel-700">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M2 9l10-5 10 5-10 5L2 9z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      Top Indian tech university graduate
    </p>
  );
}

function Field({ on, children }: { on?: boolean; children: React.ReactNode }) {
  return on ? <Ph>{children}</Ph> : <>{children}</>;
}

export default function Engineers() {
  return (
    <div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ENGINEERS.map((e, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-white shadow-card"
          >
            {e.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={e.photo}
                alt={e.name}
                className="aspect-[4/3] w-full object-cover object-[center_40%]"
              />
            ) : (
              <PhImage
                label="Real engineer photo (head and shoulders, in the office)"
                className="aspect-[4/3] w-full"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[19px] font-semibold text-navy-900">
                  <Field on={e.placeholder}>{e.name}</Field>
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-good/10 px-2.5 py-1 text-[12px] font-medium text-good">
                  <span className="h-1.5 w-1.5 rounded-full bg-good" />
                  Available
                </span>
              </div>
              <p className="mt-1 text-[15px] text-steel-700">
                <Field on={e.placeholder}>
                  {e.role} · {e.years}
                </Field>
              </p>
              <ClaudeCodeBadge />
              <UniversityLine />
              {e.stack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[var(--border-default)] bg-ice-100/60 px-3 py-1 text-[13px] font-medium text-steel-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-4 text-[14px] text-[var(--text-faint)]">
                Previously: <Field on={e.placeholder}>{e.previously}</Field>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <CtaButton className="inline-flex items-center gap-3 rounded-2xl bg-navy-900 px-7 py-4 font-display text-[16px] font-medium text-white shadow-cta transition hover:bg-navy-800">
          See three matched to your build <span aria-hidden>→</span>
        </CtaButton>
        <p className="text-[14px] text-[var(--text-faint)]">
          Profiles in 48 hours. No commitment to view them.
        </p>
      </div>
    </div>
  );
}
