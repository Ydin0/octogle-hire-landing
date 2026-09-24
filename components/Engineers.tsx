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
    name: "First name",
    role: "Senior Full-Stack",
    years: "7 yrs",
    stack: ["React", "Node", "Postgres"],
    previously: "Previous company",
    placeholder: true,
  },
  {
    name: "First name",
    role: "Backend Engineer",
    years: "5 yrs",
    stack: ["Python", "Django", "AWS"],
    previously: "Previous company",
    placeholder: true,
  },
  {
    name: "First name",
    role: "AI / ML Engineer",
    years: "6 yrs",
    stack: ["Python", "LLMs", "RAG"],
    previously: "Previous company",
    placeholder: true,
  },
];

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
                className="aspect-[4/3] w-full object-cover"
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
