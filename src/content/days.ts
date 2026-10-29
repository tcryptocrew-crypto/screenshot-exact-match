import type { DayContent } from "./schema";

/**
 * Content for all 30 days. Each day is independently configurable — adding
 * or editing a day means touching only its object here.
 *
 * Lines marked `EDITABLE` are placeholders awaiting Hamid's final wording.
 * No personal history is invented anywhere in this file.
 */

// ---------------------------------------------------------------------------
// Day 1 — real copy, taken from Hamid's reference design.
// ---------------------------------------------------------------------------
const day1: DayContent = {
  dayNumber: 1,
  title: "Welcome to Your Journey",
  nickname: "Chanddd", // EDITABLE
  introText: "Acha ji, welcome to this little journey…", // EDITABLE
  scenes: [
    {
      id: "d1-s1",
      kind: "letter",
      title: "Welcome Mifra",
      body: [
        "Hiii Chanddd 🥺❤️",
        "Acha ji, welcome to this little journey…",
        "30 din, 30 surprises,\n30 chhoti chhoti khushiyan…\nAur har din, sirf tumhare liye.",
        "So get ready, because this is going to be special! ❤️",
      ],
      signature: "– Hamid ❤️",
      hamooPose: "peek",
      hamooPosition: "left",
    },
    {
      id: "d1-s2",
      kind: "hamoo",
      hamooPose: "peek",
      hamooPosition: "right",
      body: ["…psst. Koi tumhein dekh raha hai."], // EDITABLE
    },
    {
      id: "d1-s3",
      kind: "hamoo",
      hamooPose: "wave",
      hamooPosition: "left",
      title: "Assalamualaikum!",
      body: ["My name is Hamoo. I live in Hamid's room, between old books and candlelight."], // EDITABLE
    },
    {
      id: "d1-s4",
      kind: "hamoo",
      hamooPose: "happy",
      hamooPosition: "right",
      title: "Ek raaz ki baat…",
      body: [
        "Hamoo isn't just any panda.",
        "He is Hamid's panda self — small, shy, and completely hopeless at hiding feelings.", // EDITABLE
      ],
    },
    {
      id: "d1-s5",
      kind: "hamoo",
      hamooPose: "wave",
      hamooPosition: "left",
      title: "Day 30 ka surprise…",
      body: [
        "Something special is waiting for you on Day 30.",
        "Hamoo has been practising for weeks. No more hints. 🎂", // EDITABLE
      ],
    },
    {
      id: "d1-s6",
      kind: "calendar-reveal",
      title: "30 Days, One Journey",
      body: [
        "From today, a small piece of this journey unlocks for you every single day.",
        "Come back tomorrow — and the day after — until the last one.", // EDITABLE
      ],
      hamooPose: "idle",
      hamooPosition: "center",
    },
    {
      id: "d1-s7",
      kind: "letter",
      title: "A Letter From Hamid",
      body: [
        "Dear Chanddd,", // EDITABLE — awaiting final letter wording
        "Some journeys are not just about destinations… but about the people who make them special.",
        "This one is for you. Har din kuch naya, kuch tumhare liye.",
      ],
      signature: "– Hamid ❤️",
      hamooPose: "idle",
      hamooPosition: "center",
    },
    {
      id: "d1-s8",
      kind: "choice",
      title: "Toh batao…",
      body: ["Ready for these 30 days, Chanddd?"], // EDITABLE
      hamooPose: "happy",
      hamooPosition: "center",
      choices: [
        {
          id: "ready",
          label: "Bilkul ready hoon ❤️",
          response: "That's my Chanddd. Hamoo knew it. See you tomorrow — same time, same candlelight. ❤️", // EDITABLE
        },
        {
          id: "nervous",
          label: "Nervous… but yes 🙈",
          response: "Nervous is okay. Hamoo was nervous too, on his first day. You'll love it — promise. ❤️", // EDITABLE
        },
      ],
    },
  ],
  completionMessage: "Day 1 done… 29 to go. Hamoo will be waiting for you tomorrow. ❤️", // EDITABLE
};

// ---------------------------------------------------------------------------
// Days 2–29 — placeholder entries awaiting content.
// Each becomes a real day by replacing the generated object with a full one.
// ---------------------------------------------------------------------------
function placeholderDay(dayNumber: number): DayContent {
  return {
    dayNumber,
    title: `Day ${dayNumber}`, // EDITABLE — awaiting content
    scenes: [],
    completionMessage: undefined,
  };
}

const day30: DayContent = {
  dayNumber: 30,
  title: "The Birthday Finale", // EDITABLE
  scenes: [], // Finale is implemented in Phase 5 (celebration room, cake sequence, final letter).
};

export const DAY_CONTENT: readonly DayContent[] = [
  day1,
  ...Array.from({ length: 28 }, (_, i) => placeholderDay(i + 2)),
  day30,
];

export function getDay(dayNumber: number): DayContent | undefined {
  return DAY_CONTENT.find((d) => d.dayNumber === dayNumber);
}
