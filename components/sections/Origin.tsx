import { LineReveal, Reveal, WordReveal } from "@/components/ui/Reveal";
import { SectionMarker } from "@/components/ui/Marks";

export function Origin() {
  return (
    <section
      id="origin"
      aria-labelledby="origin-title"
      className="px-gutter relative bg-ink pb-[10vh] pt-[22vh] md:pb-[12vh] md:pt-[30vh]"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-start justify-between md:mb-24">
          <SectionMarker index="02" label="Chapter 01" />
          <p className="meta hidden text-dim md:block">File — origin.log</p>
        </div>

        <LineReveal
          as="h2"
          id="origin-title"
          lines={["The", "Origin"]}
          className="display-xl uppercase text-fg"
          stagger={0.18}
        />

        <WordReveal
          text="It started with a problem."
          className="display-md mt-14 max-w-[14ch] text-soft md:mt-24 md:ml-[33%]"
          delay={0.3}
          stagger={0.14}
        />

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:col-start-7" delay={0.2}>
            <p className="lede max-w-md text-soft">
              I wasn’t trying to build a company.
              <br />
              <span className="text-fg">I was trying to solve a problem I experienced myself.</span>
            </p>
          </Reveal>
          <Reveal className="meta text-dim md:col-span-2 md:col-start-11 md:text-right" delay={0.4}>
            <span className="block">Observation</span>
            <span className="block text-signal">→ Question</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
