import { Reveal } from "@/components/ui/Reveal";
import { MetaRow, SectionMarker } from "@/components/ui/Marks";

export function Identity() {
  return (
    <section aria-labelledby="identity-title" className="px-gutter relative border-t border-line bg-ink py-[18vh]">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionMarker index="10" label="Identity" className="mb-10" />
          <Reveal>
            <h2 id="identity-title" className="display-md uppercase text-fg">
              Renata Ponce
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="meta mt-5 text-signal">Inventor · Technologist · Accessibility Researcher</p>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-16">
          <Reveal delay={0.15}>
            <p className="text-[clamp(1.35rem,2.2vw,2rem)] font-light leading-[1.3] tracking-[-0.02em] text-soft">
              I build technology at the intersection of accessibility, artificial intelligence, audio and human
              perception.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <dl className="mt-12 border-b border-line">
              <MetaRow k="Based in" v="Mexico" />
              <MetaRow k="Practice" v="Independent Inventor" />
              <MetaRow k="Fields" v="Technology · AI · Accessibility · Perception" />
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
