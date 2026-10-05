/**
 * Single source of truth for the site's copy and links.
 * Update the `links` below before deploying.
 */

export const links = {
  // TODO: replace with Renata's public contact address.
  email: "mailto:hello@example.com",
  emailLabel: "hello@example.com",
  github: "https://github.com/renn-stack",
  githubLabel: "github.com/renn-stack",
  // TODO: replace with Renata's LinkedIn profile URL.
  linkedin: "https://www.linkedin.com/",
  linkedinLabel: "LinkedIn",
  // TODO: replace with Renata's App Store developer page URL.
  appStore: "https://apps.apple.com/",
  appStoreLabel: "App Store",
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#origin" },
  { label: "Lab", href: "#lab" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
] as const;

export type ProjectId = "stream" | "transcribe" | "on";

export type Project = {
  id: ProjectId;
  index: string;
  name: string;
  year: string;
  tags: string[];
  concept: string;
  problem: string;
  vizLabel: string;
};

export const projects: Project[] = [
  {
    id: "stream",
    index: "W—01",
    name: "Wallas Stream",
    year: "2025",
    tags: ["Audio", "Accessibility", "Wireless Transmission"],
    concept:
      "A solution designed to transmit computer audio to a cochlear implant processor when conventional computer connectivity was not sufficient.",
    problem:
      "Computer audio did not reach the cochlear implant processor well enough through conventional connectivity.",
    vizLabel: "Signal path · computer → processor",
  },
  {
    id: "transcribe",
    index: "W—02",
    name: "Wallas Transcribe",
    year: "2026",
    tags: ["AI", "Speech", "Accessibility"],
    concept:
      "A transcription experience designed around accessibility and real-time understanding of spoken information.",
    problem:
      "Spoken information moves fast. Understanding it in real time should not depend on hearing it perfectly.",
    vizLabel: "Speech waveform → text",
  },
  {
    id: "on",
    index: "W—03",
    name: "Wallas On",
    year: "2026",
    tags: ["Bluetooth", "Audio", "Accessibility"],
    concept:
      "An experience designed to maintain the Bluetooth audio interaction even when there is silence.",
    problem:
      "When audio goes silent, the Bluetooth audio interaction can be interrupted.",
    vizLabel: "Link state during silence",
  },
];

export const labModules = [
  {
    id: "perception",
    code: "EXPERIMENT 01",
    status: "RESEARCH",
    title: "Perception",
    body: "Exploring alternative ways of experiencing information.",
  },
  {
    id: "audio",
    code: "EXPERIMENT 02",
    status: "IN PROGRESS",
    title: "Audio",
    body: "Signal processing, spatial audio and sound transformation.",
  },
  {
    id: "ai",
    code: "EXPERIMENT 03",
    status: "UNRELEASED",
    title: "AI",
    body: "New interfaces between human perception and intelligent systems.",
  },
  {
    id: "hardware",
    code: "EXPERIMENT 04",
    status: "PROTOTYPE",
    title: "Hardware",
    body: "Exploring technology beyond the screen.",
  },
] as const;

export type LabModuleId = (typeof labModules)[number]["id"];
