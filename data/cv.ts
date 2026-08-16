/** Real bio, education, and credentials. Shared by the profile, about page, and resume. */

export const bio = [
  "I'm Muhammed Cengiz, a full-stack developer in the Greater Toronto Area. I graduated from Sheridan College in August 2026 with a diploma in Software Development and Network Engineering, where my capstone team's product was ranked first out of more than fifty projects at the year-end showcase.",
  "Most of what I know came from shipping things people actually use. I built and still maintain a booking and payments platform for a transportation business with a 1.2M-follower audience, where real customers pay through Stripe every week. I designed and launched Bloom, a cloud-synced planner with Google sign-in and offline support. I also built a site for a local patisserie that needed a first real web presence.",
  "The work I like most is owning a feature from the database up: designing the schema, writing the API, building the interface, and getting it deployed without drama. My networking and security coursework means I understand the layer underneath the app, which helps when something breaks in production at an inconvenient hour.",
  "I'm a Canadian permanent resident, so there's no sponsorship or work-permit paperwork involved. I'm looking for a full-time software developer role on a team where code review is normal and I can keep getting better.",
];

/** Short version for tight spaces (store page, meta descriptions, resume summary). */
export const bioShort =
  "Full-stack developer in the GTA. Sheridan SDNE graduate whose capstone ranked #1 of 50+ at the 2026 showcase. I ship production web apps: a live booking and payments platform for a client with a 1.2M-follower audience, and Bloom, a cloud-synced planner. Canadian permanent resident.";

export const education = {
  school: "Sheridan College",
  program: "Software Development & Network Engineering (SDNE)",
  credential: "Advanced Diploma",
  location: "Oakville, ON",
  grad: "August 2026",
  status: "Graduated",
  honours: [
    "Capstone ranked #1 of 50+ projects at the 2026 capstone showcase",
    "Year-long capstone graded 97/100 in the final term, 94/100 at the prototype stage",
  ],
  coursework: [
    "AI & Machine Learning with Python (PROG25211)",
    "iOS Application Development · Advanced iOS (PROG31632 / PROG39856)",
    ".NET / C# Technologies · Advanced .NET Server-Side (PROG32356 / PROG36944)",
    "Hybrid Mobile Apps with Next.js (SYST35300)",
    "Cloud Systems · Cloud-Enabled Networks (SYST35144 / TELE20483)",
    "Database Design & Implementation · Database Management (DBAS27198 / DBAS32100)",
    "Enterprise Java Development (PROG32758) · Data Structures in C (PROG20799)",
    "Linux/UNIX Operating Systems (SYST13416) · Computer & Network Security (INFO24178)",
    "Software Process Management · Systems Development Methodologies (SYST38634 / SYST28951)",
    "Capstone Prototype + Project (INFO34049 / INFO39014)",
  ],
};

export const certificates = [
  "CCNA IP Addressing & Subnetting",
  "IPv6 Fundamentals (APNIC)",
  "Cisco Introduction to Cybersecurity",
  "LinkedIn: Networking Foundations",
];

/**
 * The four facts that separate this profile from every other new grad
 * applying in the GTA right now. Surfaced on the profile and the resume.
 */
export const credentials = [
  {
    id: "capstone",
    stat: "#1 of 50+",
    title: "Top capstone, 2026 showcase",
    body: "A year-long build judged first overall out of more than fifty projects. I found a critical auth flaw in the live service and built the gateway that closed it.",
    icon: "Trophy",
  },
  {
    id: "production",
    stat: "3 live",
    title: "Apps running in production",
    body: "Not demos. Real users, real payments, and the maintenance that comes after launch.",
    icon: "Rocket",
  },
  {
    id: "clients",
    stat: "2 paying",
    title: "Clients shipped for",
    body: "A transportation business with a 1.2M-follower audience, and a local patisserie.",
    icon: "Briefcase",
  },
  {
    id: "pr",
    stat: "Canadian PR",
    title: "Authorized to work, no sponsorship",
    body: "Permanent resident, available across the GTA or remote, no work-permit process.",
    icon: "BadgeCheck",
  },
];
