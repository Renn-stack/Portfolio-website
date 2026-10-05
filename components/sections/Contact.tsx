import { links } from "@/lib/content";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { SectionMarker } from "@/components/ui/Marks";

const channels = [
  { k: "Email", label: links.emailLabel, href: links.email, external: false },
  { k: "GitHub", label: links.githubLabel, href: links.github, external: true },
  { k: "LinkedIn", label: links.linkedinLabel, href: links.linkedin, external: true },
  { k: "App Store", label: links.appStoreLabel, href: links.appStore, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-gutter relative bg-ink pb-10 pt-[20vh]">
      <div className="mx-auto max-w-[1600px]">
        <SectionMarker index="11" label="Open channel" className="mb-14 md:mb-20" />

        <LineReveal
          as="h2"
          id="contact-title"
          lines={["Let’s build", "what doesn’t", "exist yet."]}
          className="display-xl uppercase text-fg"
          stagger={0.14}
        />

        <ul className="mt-[14vh] border-b border-line">
          {channels.map((c, i) => (
            <Reveal as="li" key={c.k} delay={i * 0.06}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid grid-cols-[1fr_auto] items-center gap-6 border-t border-line py-6 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[12rem_1fr_auto] md:py-8"
              >
                <span className="meta text-dim">0{i + 1} — {c.k}</span>
                <span className="col-span-2 row-start-2 text-2xl font-medium tracking-[-0.03em] text-fg transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:col-span-1 md:row-start-auto md:text-4xl">
                  {c.label}
                </span>
                <span aria-hidden className="meta col-start-2 row-start-1 text-muted transition-colors group-hover:text-signal md:col-start-auto md:row-start-auto">
                  {c.external ? "↗" : "→"}
                </span>
                {c.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </Reveal>
          ))}
        </ul>

        <footer className="mt-[16vh] flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="text-[clamp(1.75rem,5vw,4.5rem)] font-medium uppercase leading-none tracking-[-0.05em] text-fg">
            Renata Ponce <span className="text-dim">/</span> Inventor
          </p>
          <div className="meta flex items-center gap-8 text-dim">
            <span>© {new Date().getFullYear()}</span>
            <a href="#top" className="transition-colors hover:text-fg">
              Back to top ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
