// Shared FAQ data. Kept in a plain (non-"use client") module so it can be
// imported by both the client <Faq> component and the server page that emits
// FAQPage JSON-LD. Importing a value from a "use client" module into a server
// component yields a client-reference proxy, not the data.

export const FAQS = [
  {
    q: "Why is it so much cheaper than a local hire?",
    a: "Our engineers work from our own office in India, so you're not paying UK payroll, NI, benefits, and overhead on top of a salary. Same senior work, embedded in your team. You do the maths on the two numbers above.",
  },
  {
    q: "Is this outsourcing or freelancers?",
    a: "Neither. It's one full time engineer working on one client at a time, from our office, on your standups. Your product, your repo, your ownership. Not a marketplace, not a project handed back on completion.",
  },
  {
    q: "What if the engineer isn't the right fit?",
    a: "You see three profiles before anything starts, so you choose. If it isn't working, we swap them. No placement fee either way.",
  },
  {
    q: "How fast can someone actually start?",
    a: "Profiles in 48 hours. Once you pick, they're embedded in your team from week one.",
  },
  {
    q: "I already paid an agency and got burned.",
    a: "A build quote runs £50,000 to £200,000, they hand you a repo, then they're gone. Here the engineer just works for you, ongoing, and everything stays yours.",
  },
];
