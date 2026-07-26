export const teams = [
  {
    id: "digital-future",
    name: "Team Digital Future",
    slogan: "Transparent governance. Connected campus. Your voice, amplified.",
    accent: "blue",
    votes: 2841,
    president: { name: "Kim Jun-su", dept: "Computer Science", initials: "JS" },
    vp: { name: "Choi Soo-yeon", dept: "Political Science & Diplomacy", initials: "CS" },
    vision:
      "A campus where every student has real-time access to decisions that affect them — where technology removes friction, not humanity. Together we will build a transparent, digitally connected ERICA where governance is open and every voice is heard.",
    pillars: [
      {
        icon: "💻",
        title: "Digital Campus Hub",
        desc: "A unified student portal for schedules, announcements, petitions, and feedback — available on any device.",
      },
      {
        icon: "📊",
        title: "Transparent Governance",
        desc: "Live-streamed council meetings, public budget dashboards, and monthly open Q&A sessions.",
      },
      {
        icon: "🗣️",
        title: "Student Liaison Office",
        desc: "A standing office that receives, logs, and escalates student concerns with mandatory response SLAs.",
      },
      {
        icon: "🔒",
        title: "Data Privacy First",
        desc: "An independent student data rights committee to audit how the university uses your information.",
      },
    ],
    initiatives: [
      {
        headline: "Launch unified ERICA student app within 90 days",
        detail: "Built with student developers, open-sourced on GitHub.",
      },
      {
        headline: "Publish a real-time MSA budget tracker",
        detail: "Every expenditure over ₩50,000 visible to all enrolled students.",
      },
      {
        headline: "Student concern ticketing system",
        detail: "Every submission gets a reference number and a response within 5 business days.",
      },
      {
        headline: "Monthly open office hours in every faculty building",
        detail: "No appointment needed — drop-in consultation with the president and VP.",
      },
    ],
  },
  {
    id: "student-first",
    name: "Team Student First",
    slogan: "Welfare, inclusion, and a campus that works for everyone.",
    accent: "purple",
    votes: 2204,
    president: { name: "Lee Min-ah", dept: "Business Administration", initials: "MA" },
    vp: { name: "Han Dong-wook", dept: "Sociology", initials: "HD" },
    vision:
      "Every student deserves a campus that meets them where they are — regardless of major, background, or circumstance. We will put welfare and inclusion at the center of every decision the MSA makes.",
    pillars: [
      {
        icon: "🤝",
        title: "Welfare First Policy",
        desc: "Expanded emergency student support fund and simplified application process.",
      },
      {
        icon: "🌱",
        title: "Inclusion Task Force",
        desc: "Dedicated support for international, transfer, and non-traditional students.",
      },
      {
        icon: "🏫",
        title: "Campus Accessibility",
        desc: "Auditing every building for physical and digital accessibility gaps.",
      },
      {
        icon: "💬",
        title: "Mental Health Access",
        desc: "Shorter counseling wait times and peer-support training programs.",
      },
    ],
    initiatives: [
      {
        headline: "Double the emergency student support fund",
        detail: "Faster approvals, fewer documents required.",
      },
      {
        headline: "International student onboarding hub",
        detail: "Single point of contact from arrival to graduation.",
      },
      {
        headline: "Campus-wide accessibility audit",
        detail: "Public report published within the first semester.",
      },
      {
        headline: "Peer counselor certification program",
        detail: "Trained student volunteers in every department.",
      },
    ],
  },
  {
    id: "green-erica",
    name: "Team Green ERICA",
    slogan: "Sustainable spaces, accessible campus, a future we're proud of.",
    accent: "green",
    votes: 1797,
    president: { name: "Park Ji-hoon", dept: "Industrial Design", initials: "JH" },
    vp: { name: "Yoon Se-jin", dept: "Architecture", initials: "YS" },
    vision:
      "The choices we make about our campus today shape the community we hand off tomorrow. We will build a greener, more accessible ERICA — one sustainable decision at a time.",
    pillars: [
      {
        icon: "🌿",
        title: "Zero-Waste Campus",
        desc: "Composting stations, reusable container programs, and waste audits by building.",
      },
      {
        icon: "🚲",
        title: "Green Mobility",
        desc: "Expanded bike infrastructure and shuttle routes with lower emissions.",
      },
      {
        icon: "🏛️",
        title: "Accessible Spaces",
        desc: "Retrofit priority list for buildings that don't meet accessibility standards.",
      },
      {
        icon: "🔆",
        title: "Renewable Campus",
        desc: "Solar pilot program for rooftop space across faculty buildings.",
      },
    ],
    initiatives: [
      {
        headline: "Install composting stations in every cafeteria",
        detail: "Partnered with facilities management for pilot rollout.",
      },
      {
        headline: "Double covered bike parking capacity",
        detail: "Priority locations near main academic buildings.",
      },
      {
        headline: "Publish an annual campus sustainability report",
        detail: "Tracked metrics on waste, energy, and emissions.",
      },
      {
        headline: "Rooftop solar feasibility study",
        detail: "Independent engineering assessment within one year.",
      },
    ],
  },
];

export const accentMap = {
  blue: {
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    solid: "bg-blue-600 hover:bg-blue-700",
    text: "text-blue-600",
    ring: "ring-blue-200",
    bar: "bg-blue-500",
    soft: "bg-blue-50",
  },
  purple: {
    badge: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
    solid: "bg-purple-600 hover:bg-purple-700",
    text: "text-purple-600",
    ring: "ring-purple-200",
    bar: "bg-purple-500",
    soft: "bg-purple-50",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    solid: "bg-emerald-600 hover:bg-emerald-700",
    text: "text-emerald-600",
    ring: "ring-emerald-200",
    bar: "bg-emerald-500",
    soft: "bg-emerald-50",
  },
};
