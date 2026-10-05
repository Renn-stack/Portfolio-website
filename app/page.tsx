import { Nav } from "@/components/Nav";
import { ChronoRail } from "@/components/ChronoRail";
import { Hero } from "@/components/sections/Hero";
import { Origin } from "@/components/sections/Origin";
import { Journey } from "@/components/sections/Journey";
import { IdeaStayed } from "@/components/sections/IdeaStayed";
import { Wallas } from "@/components/sections/Wallas";
import { BuildingToInventing } from "@/components/sections/BuildingToInventing";
import { Lab } from "@/components/sections/Lab";
import { Now } from "@/components/sections/Now";
import { Identity } from "@/components/sections/Identity";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <ChronoRail />
      <main id="main">
        <div data-chapter="none">
          <Hero />
        </div>
        <div data-chapter="2024">
          <Origin />
        </div>
        <Journey />
        <div data-chapter="2025">
          <IdeaStayed />
        </div>
        <div data-chapter="2026">
          <Wallas />
          <BuildingToInventing />
        </div>
        <div data-chapter="lab">
          <Lab />
        </div>
        <div data-chapter="now">
          <Now />
        </div>
        <div data-chapter="none">
          <Identity />
          <Contact />
        </div>
      </main>
    </>
  );
}
