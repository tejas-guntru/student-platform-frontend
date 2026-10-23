export type SnippetLine =
  | { kind: "comment"; text: string }
  | { kind: "blank" }
  | { kind: "label"; text: string }
  | { kind: "prompt"; text: string }
  | { kind: "code"; text: string };

export type Stage = {
  id: string;
  number: string;
  name: string;
  short: string;
  headline: string;
  happens: string;
  youDo: string;
  why: string;
  file: string;
  lines: SnippetLine[];
};

export const stages: Stage[] = [
  {
    id: "spark",
    number: "01",
    name: "Spark",
    short: "Meet the problem first",
    headline: "Start with a problem, not a definition.",
    happens:
      "Each concept opens with a real situation: a slow search, a broken checkout, a model that guesses wrong. You meet the problem before the theory that solves it.",
    youDo: "Attempt it cold. Write down your first approach, even if you suspect it is wrong.",
    why: "When you have felt the problem, the concept lands as an answer, not as a fact to memorise.",
    file: "problem-01.md",
    lines: [
      { kind: "comment", text: "// Problem 01 · Campus placement portal" },
      { kind: "comment", text: "// 12,000 students. A recruiter filters by CGPA." },
      { kind: "comment", text: "// The search takes 4.2 seconds. Why?" },
      { kind: "blank" },
      { kind: "label", text: "Your first approach:" },
      { kind: "prompt", text: "> check every student one by one…" },
      { kind: "prompt", text: "> is there a way to skip half of them?" },
    ],
  },
  {
    id: "build",
    number: "02",
    name: "Build",
    short: "Code along, line by line",
    headline: "Write it live, alongside a trainer.",
    happens:
      "After the cold attempt, the trainer writes the solution in the open. You type the same lines during the session, not after a recording.",
    youDo: "Stay in the file. If a line is unclear, stop on that line and ask before the next one is written.",
    why: "The idea sticks because your hands built it. A lecture that ends at “understood” never gets this far.",
    file: "filter.ts",
    lines: [
      { kind: "comment", text: "// written live with the trainer" },
      { kind: "code", text: "function filterByCgpa(students, min) {" },
      { kind: "code", text: "  return students.filter(" },
      { kind: "code", text: "    (student) => student.cgpa >= min" },
      { kind: "code", text: "  );" },
      { kind: "code", text: "}" },
      { kind: "blank" },
      { kind: "label", text: "Next line only after this one runs" },
    ],
  },
  {
    id: "break",
    number: "03",
    name: "Break",
    short: "Debug it on purpose",
    headline: "Find the bugs before they find you.",
    happens:
      "We plant bugs in the code you just wrote: a wrong comparison, a missing case, a value that was never sent.",
    youDo: "Read the failure, name the bug, and fix it. Guessing is not the point.",
    why: "You remember the fix because you felt the break. The same mistakes show up in reviews and in interviews.",
    file: "search.ts",
    lines: [
      { kind: "comment", text: "// planted bug" },
      { kind: "code", text: "const { branch, minCgpa } = req.query;" },
      { kind: "blank" },
      { kind: "code", text: ".andWhere('cgpa', '>', req.cgpa);" },
      { kind: "blank" },
      { kind: "label", text: "req.cgpa was never read." },
      { kind: "prompt", text: "> What should this compare against?" },
    ],
  },
  {
    id: "explain",
    number: "04",
    name: "Explain",
    short: "Teach it back to peers",
    headline: "If you can explain it, you own it.",
    happens: "You teach the idea back to a peer, out loud, without borrowing the trainer’s sentences.",
    youDo: "Walk one example. Let them interrupt. If you cannot answer, that is the next thing you practise.",
    why: "Teaching shows the gap between recognising a solution and owning it.",
    file: "teach-back.md",
    lines: [
      { kind: "comment", text: "// 1. What was slow?" },
      { kind: "comment", text: "// 2. What did we change?" },
      { kind: "comment", text: "// 3. What still breaks?" },
      { kind: "blank" },
      { kind: "label", text: "Peer:" },
      { kind: "prompt", text: '> "Why not check every student?"' },
      { kind: "label", text: "You:" },
      { kind: "prompt", text: "> [your explanation]" },
    ],
  },
  {
    id: "ship",
    number: "05",
    name: "Ship",
    short: "Build something real",
    headline: "Turn it into something that works for someone.",
    happens: "The same idea leaves the exercise and lands in a module project someone else can run.",
    youDo: "Push it, ask for a review, and fix what a mentor marks on the exact line.",
    why: "A concept that ships is evidence. A concept that stays in a notebook is not.",
    file: "ship.md",
    lines: [
      { kind: "comment", text: "// ship checklist" },
      { kind: "prompt", text: "> tests passing" },
      { kind: "prompt", text: "> pushed to GitHub" },
      { kind: "prompt", text: "> mentor review on the diff" },
      { kind: "prompt", text: "> fixed and shipped again" },
    ],
  },
];

export const featureNotes = [
  {
    number: "1",
    title: "One mission a day, not a syllabus dump",
    text: "The LMS breaks your track into daily missions: watch, build, break. You always know the next step and roughly how long it takes.",
  },
  {
    number: "2",
    title: "Code in the browser, tested instantly",
    text: "A built-in playground runs your code against test cases as you type, so you find out what works without setting anything up.",
  },
  {
    number: "3",
    title: "A skill map that finds your gaps",
    text: "Mastery is measured from your actual attempts. When a topic is weak, practice for it is added to your week automatically.",
  },
  {
    number: "4",
    title: "Real people review your code",
    text: "Mentors comment on specific lines, the way a senior engineer would. You fix, reply and resubmit in the same place.",
  },
  {
    number: "5",
    title: "Doubts attached to your exact line",
    text: "Ask a question right where you are stuck. Trainers answer with context, often with a nudge rather than the answer.",
  },
  {
    number: "6",
    title: "Readiness you can see growing",
    text: "Every solved problem, review and mock interview feeds one profile, so placement readiness is visible, not a guess.",
  },
];

export const week = [
  {
    day: "Mon",
    tag: "Live",
    tone: "live" as const,
    title: "Concept + code-along",
    text: "The trainer opens the week with a real problem and builds the solution with you, live.",
  },
  {
    day: "Tue",
    tag: "Lab",
    tone: "lab" as const,
    title: "Practice ladder",
    text: "Problems climb from guided to unguided. The next rung unlocks when you clear the last.",
  },
  {
    day: "Wed",
    tag: "Lab",
    tone: "lab" as const,
    title: "Break-it lab",
    text: "Planted bugs, real error messages, and hints only when you ask for them.",
  },
  {
    day: "Thu",
    tag: "Peer",
    tone: "peer" as const,
    title: "Teach-back circle",
    text: "Explain, question, get pushed. Communication practice hiding inside a tech session.",
  },
  {
    day: "Fri",
    tag: "Lab",
    tone: "lab" as const,
    title: "Build sprint",
    text: "Apply the week to your module project and submit it for mentor review.",
  },
  {
    day: "Sat",
    tag: "Live",
    tone: "live" as const,
    title: "Timed challenge",
    text: "Solve under interview conditions, then walk through the solutions together.",
  },
];

export const signals: Array<{
  label: string;
  note: string;
  width: number;
  tone: "green" | "blue" | "accent";
}> = [
  { label: "Problem solving", note: "142 solved · 38 timed", width: 86, tone: "green" },
  { label: "Code quality", note: "11 mentor reviews passed", width: 78, tone: "green" },
  { label: "Projects", note: "4 shipped on GitHub", width: 62, tone: "blue" },
  { label: "Interview", note: "2 mock interviews", width: 40, tone: "accent" },
  { label: "Communication", note: "9 teach-back sessions", width: 70, tone: "green" },
];

export const tracks = [
  {
    mark: "DSA",
    tint: "blue" as const,
    title: "Data Structures & Algorithms",
    can: "Look at an unfamiliar problem, pick the right structure, and defend your choice against a timer.",
    build: [
      "Ranked search for a placement portal",
      "An LRU cache, from scratch",
      "Contest sets solved under interview timing",
    ],
  },
  {
    mark: "</>",
    tint: "peach" as const,
    title: "Full-Stack Development",
    can: "Build, deploy and debug a working web application end to end, from database to UI.",
    build: ["Campus events app with login", "A REST API on a real database", "Your deployed portfolio site"],
  },
  {
    mark: "AI",
    tint: "mint" as const,
    title: "AI & Machine Learning",
    can: "Train a model on messy real data, measure it honestly, and explain why it fails when it does.",
    build: ["Resume-to-role matcher", "Attendance anomaly detector", "A model evaluation report"],
  },
  {
    mark: "Σ",
    tint: "blue" as const,
    title: "Aptitude & Reasoning",
    can: "Work through quantitative and logical sets quickly, with methods instead of guesswork.",
    build: ["Timed sectional tests", "Your own shortcut-method notebook", "Company-pattern mock rounds"],
  },
  {
    mark: "Aa",
    tint: "peach" as const,
    title: "Communication & Soft Skills",
    can: "Speak clearly in a group discussion, an HR round, and a technical walkthrough of your own project.",
    build: [
      "Recorded mock interviews",
      "Group discussions with feedback",
      "A 60-second pitch of your best project",
    ],
  },
];

export const proof = [
  "A GitHub portfolio of reviewed projects",
  "A readiness profile backed by real work",
  "A program-completion certificate in collaboration with IIT Patna",
];
