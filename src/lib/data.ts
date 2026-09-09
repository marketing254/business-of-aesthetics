/* Static site content, carried over verbatim from the original BOA site. */

export const site = {
  name: "Business of Aesthetics",
  tagline: "Your Success Matters",
  phone: "(855) 466-4580",
  phoneHref: "tel:+18554664580",
  email: "ideas@businessofaesthetics.org",
  whatsapp: "https://wa.me/18554664580",
  address: "1810 E Sahara Ave Suite #1471, Las Vegas, NV 89104, USA",
  hours: "Mon–Fri · 8:00 AM – 6:00 PM PT",
  socials: {
    instagram: "https://www.instagram.com/businessofaesthetics/",
    facebook: "https://www.facebook.com/BusinessofAesthetics",
    linkedin:
      "https://www.linkedin.com/company/business-of-aestheticsorg/posts/?feedView=all",
  },
  ekwa: "https://www.ekwa.com/",
  latestEpisode: {
    number: 297,
    guest: "Melissa Delfino",
    title: "The 30-Day Owner Absence Test",
  },
};

export const marqueeTopics = [
  "Dermatology",
  "Plastic Surgery",
  "Med Spa Strategy",
  "Practice Marketing",
  "Patient Experience",
  "Reputation",
  "SEO & Social",
  "Aesthetics Leadership",
];

/* ---------------- Podcast ---------------- */

export type EpisodeCategory =
  | "Marketing"
  | "Operations"
  | "Growth"
  | "Leadership"
  | "Clinical";

export interface Episode {
  ep: number;
  category: EpisodeCategory;
  title: string;
  guest: string;
  role: string;
  image?: string;
}

export const episodes: Episode[] = [
  {
    ep: 284,
    category: "Clinical",
    title:
      "The Future of Clinical Integrity: Implementing Evidence-Based Education and Elevating Industry Standards",
    guest: "Tracey A. Hotta",
    role: "Clinical Educator",
    image: "/assets/dr-kate-dee.jpg",
  },
  {
    ep: 283,
    category: "Operations",
    title:
      "Running a Medical Spa 8 Years Ago vs. Today: The Strategic Evolution of Vendor Partnerships & Unit Economics",
    guest: "Amy Ingle",
    role: "Medspa Operator",
  },
  {
    ep: 282,
    category: "Marketing",
    title:
      "Surviving the Zero-Click Era: How Aesthetic Practices Win Patients When AI Answers Before the Click",
    guest: "Naren Arulrajah",
    role: "Founder, Ekwa",
    image: "/assets/naren-arulrajah.jpg",
  },
  {
    ep: 281,
    category: "Leadership",
    title: "Bridging the Gap Between Skill Set and Mindset in Aesthetic Practice",
    guest: "Nicole Cocuzza",
    role: "Practice Consultant",
  },
  {
    ep: 280,
    category: "Growth",
    title: "The A to Z of Starting an Aesthetic Practice Effectively",
    guest: "Jay Shorr",
    role: "Practice Advisor",
  },
  {
    ep: 279,
    category: "Growth",
    title:
      "Adding Another Injector Won't Fix Your Margins: The CFO Framework That Determines If You Should Scale",
    guest: "Chelsea Zainea",
    role: "Fractional CFO",
  },
  {
    ep: 278,
    category: "Growth",
    title: "Building a Preventative Empire: Scaling HRT, Weight Loss, and Vein Health",
    guest: "Dr. Charles Mok",
    role: "Practice Owner",
  },
  {
    ep: 277,
    category: "Operations",
    title:
      "The 10-Employee Bottleneck: Operational Scoreboards and Replicating Clinical Excellence",
    guest: "Cory Gallagher",
    role: "Operations Lead",
  },
  {
    ep: 276,
    category: "Operations",
    title:
      "The 'Ghost' Director Trap, Outcompeting Medspa Franchises, and the Business of Safety",
    guest: "Dr. Kate Dee",
    role: "Medspa Founder",
  },
  {
    ep: 275,
    category: "Growth",
    title:
      "Scaling Without Compromise: Closing the Associate Competency Gap and Integrating AI Automation",
    guest: "Mary Ford",
    role: "Multi-Site Operator",
    image: "/assets/mary_ford.jpg",
  },
  {
    ep: 274,
    category: "Leadership",
    title:
      "The 'Salary vs. Commission' Debate, the Talent Quality Gap, and the ROI of Clinical Education",
    guest: "Kim Laudati",
    role: "Talent Strategist",
    image: "/assets/Kim-Laudati.jpg",
  },
  {
    ep: 273,
    category: "Leadership",
    title:
      "The Hidden Cost of High Turnover, the ROI of Staff Empowerment, and the Psychology of Retention",
    guest: "Melissa DelFino",
    role: "HR Consultant",
    image: "/assets/Melissa-DelFino.jpg",
  },
];

export const hosts = [
  {
    name: "Don Adeesha",
    role: "Podcast Host",
    bio: "Host of the show, leading candid conversations with the industry's top operators, surgeons, and growth experts.",
  },
  {
    name: "Naren Arulrajah",
    role: "Founder & CEO, Ekwa",
    bio: "Serial entrepreneur helping 200+ practices grow through smarter digital marketing.",
    image: "/assets/naren-arulrajah.jpg",
  },
  {
    name: "Jeffrey Richmond",
    role: "Aesthetics Expert",
    bio: "Award-winning laser and light-based therapy specialist with 19 years in the field.",
    image: "/assets/jeffrey-richmond.jpg",
  },
  {
    name: "Dana Zeitler",
    role: "Founder, D-Lux Medspa",
    bio: "PA and medspa owner passionate about elevating the industry through safe, effective care.",
  },
  {
    name: "Dr. Lauren Umstattd",
    role: "Plastic Surgeon",
    bio: "Board-certified facial plastic surgeon and advocate for informed, empowered patients.",
  },
];

export const platforms = [
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/podcast/business-of-aesthetics-podcast-show/id1523244879",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/15rz3RUpQvVYRS7uFM2knz",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/watch?v=Sq8UV78JNrs&list=PL9LKxAt7YDRQmSWdLkDFAaPb28JKfgNpz",
  },
  {
    name: "Amazon Music",
    href: "https://music.amazon.com/podcasts/cb85ae9f-f1bf-42b8-ad24-0d1044c3e633/Business-of-Aesthetics-Podcast-Show",
  },
  {
    name: "Android",
    href: "https://www.subscribeonandroid.com/businessofaestheticsorg.libsyn.com/rss",
  },
  {
    name: "TuneIn",
    href: "https://tunein.com/podcasts/Health--Wellness-Podcasts/Business-of-Aesthetics-Podcast-Show-p1497709/",
  },
];

/* ---------------- Events ---------------- */

export interface EventItem {
  title: string;
  date: string;
  year: 2023 | 2024 | 2025 | 2026;
  badge: string;
  desc: string;
  image: string;
  link: string;
}

export const featuredEvent: EventItem = {
  title:
    "Future-Proofing Your Aesthetic Practice: Decisions You Must Get Right in the Next 18 Months",
  date: "May 20, 2026",
  year: 2026,
  badge: "Business Strategy",
  desc: "Join five industry leaders as they break down the critical decisions that will define your practice's trajectory over the next year and a half - from market positioning to operational resilience.",
  image: "https://www.businessofaesthetics.org/wp-content/uploads/2026/05/may20.jpg",
  link: "https://www.businessofaesthetics.org/webinar/future-proofing-your-aesthetic-practice-decisions-you-must-get-right-in-the-next-18-months/",
};

export const events: EventItem[] = [
  featuredEvent,
  {
    title:
      "Busy Isn't Profitable: Why Many Aesthetic Practices Stall at the Same Revenue Level",
    date: "Apr 22, 2026",
    year: 2026,
    badge: "Finance",
    desc: "Why revenue plateaus happen and the strategic shifts that break through them.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2026/04/Webinar-Replay-Apr22.jpg",
    link: "https://www.businessofaesthetics.org/webinar/busy-isnt-profitable-why-many-aesthetic-practices-stall-at-the-same-revenue-level/",
  },
  {
    title:
      "Strategic Planning for Aesthetic Practices in 2026: Building Long-Term Growth",
    date: "Mar 25, 2026",
    year: 2026,
    badge: "Strategy",
    desc: "Building long-term growth through marketing, finance, operations and leadership.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2026/03/Webinar-March-25.jpg",
    link: "https://www.businessofaesthetics.org/webinar/strategic-planning-for-aesthetic-practices-in-2026-building-long-term-growth-through-marketing-finance-operations-and-leadership/",
  },
  {
    title: "Smart Growth for Aesthetic Practices: A Complete Owner's Guide",
    date: "Feb 26, 2026",
    year: 2026,
    badge: "Growth",
    desc: "The full playbook for scaling aesthetic practices the right way.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2026/02/Webinar-Replay-22725.jpg",
    link: "https://www.businessofaesthetics.org/webinar/smart-growth-for-aesthetic-practices-a-complete-owners-guide/",
  },
  {
    title:
      "Enhancing Modern Aesthetic Practices Through Communication, Technology & Patient Experience",
    date: "Jan 21, 2026",
    year: 2026,
    badge: "Technology",
    desc: "Communication, technology, patient experience and marketing strategies for 2026.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2026/01/jan21r.jpg",
    link: "https://www.businessofaesthetics.org/webinar/enhancing-modern-aesthetic-practices-in-2026-through-communication-technology-patient-experience-and-marketing/",
  },
  {
    title:
      "Scaling Smarter: Legal, Financial & Operational Strategies for Aesthetic Practice Growth",
    date: "Dec 9, 2025",
    year: 2025,
    badge: "Operations",
    desc: "The business systems that protect and accelerate aesthetic practice growth.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/12/December-9th.jpg",
    link: "https://www.businessofaesthetics.org/webinar/scaling-smarter-legal-financial-operational-strategies-for-aesthetic-practice-growth/",
  },
  {
    title: "Maximizing Practice Growth with Next-Gen Injectables, Devices & Team Training",
    date: "Oct 22, 2025",
    year: 2025,
    badge: "Clinical",
    desc: "Injectables, devices and team training - the full growth stack.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/10/Webinar-1022.jpg",
    link: "https://www.businessofaesthetics.org/webinar/maximizing-practice-growth-with-next-gen-injectables-devices-team-training/",
  },
  {
    title:
      "Optimizing Outcomes & Maximizing Revenue with Next-Gen Long-Lasting Injectables",
    date: "Sep 30, 2025",
    year: 2025,
    badge: "Clinical",
    desc: "Drive success for growing, established, and veteran aesthetic practices.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/10/sept30.jpg",
    link: "https://www.businessofaesthetics.org/webinar/optimizing-outcomes-and-maximizing-revenue-with-next-gen-long-lasting-injectables-to-drive-success-for-growing-established-and-veteran-aesthetic-practices/",
  },
  {
    title:
      "Dermatology Growth Summit: Scaling Practices with Technology, Marketing & Leadership",
    date: "Sep 23, 2025",
    year: 2025,
    badge: "Dermatology",
    desc: "Scaling dermatology practices with technology, marketing and leadership.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/09/September-23rd.jpg",
    link: "https://www.businessofaesthetics.org/webinar/dermatology-growth-summit-scaling-practices-with-technology-marketing-leadership/",
  },
  {
    title: "Targeted Treatments for Every Generation: From Botox to Facelifts",
    date: "Sep 18, 2025",
    year: 2025,
    badge: "Clinical",
    desc: "Tailoring care for every patient age group - from Gen Z to boomers.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/09/Webinar-set18.jpg",
    link: "https://www.businessofaesthetics.org/webinar/targeted-treatments-for-every-generation-from-botox-to-facelifts/",
  },
  {
    title: "Scaling the Modern Plastic Surgery Practice: Business, Branding, and Beyond",
    date: "Aug 20, 2025",
    year: 2025,
    badge: "Plastic Surgery",
    desc: "Business, branding, and beyond - a complete owner's roadmap.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/08/aug20-25.jpg",
    link: "https://www.businessofaesthetics.org/webinar/scaling-the-modern-plastic-surgery-practice-business-branding-and-beyond/",
  },
  {
    title:
      "Advancements in Aesthetics: Surgical, Non-Surgical, Regenerative Medicine & More",
    date: "Jul 31, 2025",
    year: 2025,
    badge: "Clinical",
    desc: "The latest in surgical, non-surgical, and regenerative medicine.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/10/Webinar-1024.jpg",
    link: "https://www.businessofaesthetics.org/webinar/advancements-in-aesthetics-surgical-non-surgical-regenerative-medicine-more/",
  },
  {
    title: "Aesthetics Sales & Marketing Boot Camp",
    date: "Jul 23, 2025",
    year: 2025,
    badge: "Marketing",
    desc: "Tactical, hands-on sales and marketing training for aesthetic teams.",
    image: "https://www.businessofaesthetics.org/wp-content/uploads/2025/07/j23.jpg",
    link: "https://www.businessofaesthetics.org/webinar/aesthetics-sales-and-marketing-boot-camp/",
  },
  {
    title:
      "Multi-Generational Skincare: Boost Your Practice with Age-Diverse Treatment Offerings",
    date: "Jun 25, 2025",
    year: 2025,
    badge: "Clinical",
    desc: "Age-diverse treatment offerings to broaden your patient base.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/06/Webinar-Replay625.jpg",
    link: "https://www.businessofaesthetics.org/webinar/multi-generational-skincare-boost-your-practice-with-age-diverse-treatment-offerings/",
  },
  {
    title: "Everything You Need to Know About Buying, Marketing & Growing Device Revenue",
    date: "Jun 18, 2025",
    year: 2025,
    badge: "Growth",
    desc: "Scaling device-based revenue from purchase through ROI.",
    image: "https://www.businessofaesthetics.org/wp-content/uploads/2025/06/jun12.jpg",
    link: "https://www.businessofaesthetics.org/webinar/everything-you-need-to-know-about-buying-marketing-and-growing-device-revenue/",
  },
  {
    title: "Aesthetic Practice Ownership Journey: Starting, Buying, Expanding & Selling",
    date: "May 28, 2025",
    year: 2025,
    badge: "Business Strategy",
    desc: "Starting, buying, expanding, retirement planning, and selling.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/06/Webinar-Replay-528.jpg",
    link: "https://www.businessofaesthetics.org/webinar/aesthetic-practice-ownership-journey-starting-buying-expanding-retirement-planning-and-selling/",
  },
  {
    title: "Non-Surgical Facial Rejuvenation: Injectables, Fillers, Threads & More",
    date: "Apr 30, 2025",
    year: 2025,
    badge: "Clinical",
    desc: "Injectables, fillers, threads, and the techniques driving results.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/05/webinar-replay-thumbnail-april-.jpg",
    link: "https://www.businessofaesthetics.org/webinar/non-surgical-facial-rejuvenation-injectables-fillers-threads-and-more/",
  },
  {
    title: "Metrics & Numbers That Drive Your Practice: Accounting, Finance & Tax",
    date: "Mar 19, 2025",
    year: 2025,
    badge: "Finance",
    desc: "The numbers every aesthetic practice owner must know.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/03/1067615319.jpg",
    link: "https://www.businessofaesthetics.org/webinar/metrics-and-numbers-that-drive-your-practice-accounting-finance-tax/",
  },
  {
    title: "What's New in Aesthetics",
    date: "Feb 20, 2025",
    year: 2025,
    badge: "Industry Trends",
    desc: "The newest treatments, techniques, and trends shaping the industry.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/02/boawebfeb.jpg",
    link: "https://www.businessofaesthetics.org/webinar/whats-new-in-aesthetics/",
  },
  {
    title: "Blueprint for Success: Setting Your Goals for Practice Growth in 2025",
    date: "Jan 29, 2025",
    year: 2025,
    badge: "Strategy",
    desc: "Setting actionable goals for practice growth in the year ahead.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2025/01/Webinar-Replay-12925.jpg",
    link: "https://www.businessofaesthetics.org/webinar/blueprint-for-success-setting-your-goals-for-practice-growth-in-2025/",
  },
  {
    title: "The HR Playbook: Essential Strategies for Success in 2025",
    date: "Dec 12, 2024",
    year: 2024,
    badge: "HR & Culture",
    desc: "Essential HR strategies for aesthetic practice success.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/12/2024121304453.jpg",
    link: "https://www.businessofaesthetics.org/webinar/the-hr-playbook-essential-strategies-for-success-in-2025/",
  },
  {
    title:
      "From Clicks to Clients: A Comprehensive Guide to Aesthetic Marketing & Consultation",
    date: "Nov 26, 2024",
    year: 2024,
    badge: "Marketing",
    desc: "A comprehensive guide to marketing and consultation conversion.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/11/Webinar-Replay-Thumbnail-Images-4.jpg",
    link: "https://www.businessofaesthetics.org/webinar/from-clicks-to-clients-a-comprehensive-guide-to-aesthetic-marketing-and-consultation/",
  },
  {
    title: "Starting a New Clinic? Here's How to Market It Successfully",
    date: "Oct 30, 2024",
    year: 2024,
    badge: "Marketing",
    desc: "Marketing strategies for newly launched aesthetic practices.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/10/Webinar-30oct.jpg",
    link: "https://www.businessofaesthetics.org/webinar/starting-a-new-clinic-heres-how-to-market-it-successfully/",
  },
  {
    title: "The Business of Hair: How Non-Invasive Hair Growth Is Changing the Market",
    date: "Oct 9, 2024",
    year: 2024,
    badge: "Growth",
    desc: "Non-invasive hair growth treatments and their market impact.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/10/BOA-101124.jpg",
    link: "https://www.businessofaesthetics.org/webinar/the-business-of-hair-how-non-invasive-hair-growth-is-changing-the-market/",
  },
  {
    title:
      "Turning Inquiries into Appointments: Conversion Strategies for Aesthetic Practices",
    date: "Sep 19, 2024",
    year: 2024,
    badge: "Operations",
    desc: "Conversion strategies that turn patient inquiries into booked appointments.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/09/BOA-Sep19.jpg",
    link: "https://www.businessofaesthetics.org/webinar/turning-inquiries-into-appointments-conversion-strategies-for-aesthetic-practices/",
  },
  {
    title: "Dissecting Real-World Wins and Woes in Aesthetic Practice Ownership",
    date: "Sep 2, 2024",
    year: 2024,
    badge: "Business Strategy",
    desc: "Lessons learned from real-world aesthetic practice ownership.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/09/BOA-Panel-Discussion.jpg",
    link: "https://www.businessofaesthetics.org/webinar/dissecting-real-world-wins-and-woes-in-aesthetic-practice-ownership-lessons-learned/",
  },
  {
    title: "Advancements in Radio Frequency",
    date: "Aug 15, 2024",
    year: 2024,
    badge: "Clinical",
    desc: "The latest RF technology and its clinical applications.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/08/BOA-Panel-Discussion-Archive-Lengea-Law-Webinar.jpg",
    link: "https://www.businessofaesthetics.org/webinar/advancements-in-radio-frequency/",
  },
  {
    title: "Aesthetics Summit 2024: Growing Your Practice the Smart Way",
    date: "Jul 27, 2024",
    year: 2024,
    badge: "Summit",
    desc: "Strategies for 2024 and beyond - the smart way to grow.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/07/Webinar-Replay-jul-27.jpg",
    link: "https://www.businessofaesthetics.org/webinar/aesthetics-summit-2024/",
  },
  {
    title:
      "Financial Management for Your Aesthetic Practice: Budgeting, Profitability & Growth",
    date: "Jun 26, 2024",
    year: 2024,
    badge: "Finance",
    desc: "Budgeting, profitability, and growth strategies for practice owners.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/06/BOA62624.jpg",
    link: "https://www.businessofaesthetics.org/webinar/financial-management-for-your-aesthetic-practice-budgeting-profitability-and-growth/",
  },
  {
    title: "How to Attract, Engage, and Retain Happy Patients",
    date: "May 30, 2024",
    year: 2024,
    badge: "Patient Experience",
    desc: "Building a patient experience that drives loyalty and referrals.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/05/May-30th-webinar.jpg",
    link: "https://www.businessofaesthetics.org/webinar/how-to-attract-engage-and-retain-happy-patients/",
  },
  {
    title: "Growing Your Aesthetic Practice with Male Patients",
    date: "Apr 18, 2024",
    year: 2024,
    badge: "Growth",
    desc: "Tapping into the growing male aesthetics market.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/04/BOA-Panel-Discussion-Archive-Lengea-Law-Webinar-template-Sara-Shikhman.jpg",
    link: "https://www.businessofaesthetics.org/webinar/growing-your-aesthetic-practice-with-male-patients/",
  },
  {
    title: "Crafting Your 2024 Marketing Masterplan",
    date: "Mar 14, 2024",
    year: 2024,
    badge: "Marketing",
    desc: "Make 2024 your best year yet with a comprehensive marketing plan.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/03/Crafting-your-medspa.png",
    link: "https://www.businessofaesthetics.org/webinar/crafting-your-2024-marketing-masterplan-to-make-2024-your-best-year-yet/",
  },
  {
    title: "How to Incorporate Membership Plans to Grow Your Practice",
    date: "Feb 22, 2024",
    year: 2024,
    badge: "Growth",
    desc: "Membership models that drive predictable recurring revenue.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/02/incorporate-membership-plans.jpg",
    link: "https://www.businessofaesthetics.org/webinar/how-to-incorporate-membership-plans-to-grow-your-practice/",
  },
  {
    title: "Building Your Aesthetic Practice on Advanced Injectable Techniques",
    date: "Feb 15, 2024",
    year: 2024,
    badge: "Clinical",
    desc: "Advanced injectable techniques for clinical excellence.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2024/02/Advanced-Injectables.jpg",
    link: "https://www.businessofaesthetics.org/webinar/building-your-aesthetic-practice-on-advanced-injectable-techniques/",
  },
  {
    title: "Creating a High-Performance Team for Aesthetic Practice Success",
    date: "Dec 19, 2023",
    year: 2023,
    badge: "Leadership",
    desc: "Building and retaining a team that drives practice growth.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2023/12/unnamed.jpg",
    link: "https://www.businessofaesthetics.org/webinar/creating-a-high-performance-team-for-aesthetic-practice-success/",
  },
  {
    title: "Medspa Laws 101: What Every Business Owner Needs to Know",
    date: "Dec 12, 2023",
    year: 2023,
    badge: "Legal",
    desc: "Essential legal knowledge for medspa owners and operators.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2023/05/51023.png",
    link: "https://www.businessofaesthetics.org/webinar/medspa-laws-101-what-every-business-owner-needs-to-know/",
  },
  {
    title: "The Art of Influential Practice Leadership",
    date: "Nov 28, 2023",
    year: 2023,
    badge: "Leadership",
    desc: "Leadership strategies that inspire your team and grow your practice.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2023/05/51023.png",
    link: "https://www.businessofaesthetics.org/webinar/the-art-of-influential-practice-leadership/",
  },
  {
    title: "10 Biggest Legal Mistakes Aesthetic Practice Owners Make",
    date: "May 17, 2023",
    year: 2023,
    badge: "Legal",
    desc: "Common legal pitfalls and how to avoid them.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2023/05/51023.png",
    link: "https://www.businessofaesthetics.org/webinar/10-biggest-legal-mistakes-aesthetic-practice-owners-make/",
  },
  {
    title: "Unlock the Cash in Your Unused Technology",
    date: "Apr 26, 2023",
    year: 2023,
    badge: "Operations",
    desc: "Exploring the lucrative used equipment market trend.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2023/04/42623.jpg",
    link: "https://www.businessofaesthetics.org/webinar/unlock-the-cash-in-your-unused-technology-exploring-the-lucrative-used-market-trend/",
  },
  {
    title: "Service Contracts: Worth It or Save Your Thousands?!",
    date: "Jan 26, 2023",
    year: 2023,
    badge: "Operations",
    desc: "The real cost-benefit analysis of aesthetic equipment service contracts.",
    image:
      "https://www.businessofaesthetics.org/wp-content/uploads/2023/01/BOA-Panel-Discussion-Archive.jpg",
    link: "https://www.businessofaesthetics.org/webinar/1-26-2023/",
  },
];

/* ---------------- Panels ---------------- */

export type PanelCategory = "lead" | "ops" | "clin" | "tech";

export interface Panel {
  no: number;
  title: string;
  date: string;
  category: PanelCategory;
  badge: string;
  poster: string;
  panelists: string[];
  description: string;
  takeaways: string[];
  replay?: string;
}

export const panelCategories: { key: PanelCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "lead", label: "Leadership & Teams" },
  { key: "ops", label: "Practice Management" },
  { key: "clin", label: "Clinical & Patient Care" },
  { key: "tech", label: "Technology & Security" },
];

export const panels: Panel[] = [
  {
    no: 10,
    title:
      "AI in Your Practice: Patient Communication, Automation & What to Never Outsource to a Bot",
    date: "April 7, 2026",
    category: "tech",
    badge: "Technology & AI",
    poster: "/assets/panels/panel-02.jpg",
    panelists: ["Bridgette Debrino", "Leslie Tracey", "Audrey Campbell"],
    description:
      "AI is reshaping how aesthetic patients communicate, how appointments are managed, and how practices market themselves. This panel gives owners a practical guide to AI adoption without losing the patient trust they've spent years building.",
    takeaways: [
      "Which tasks to automate vs. keep human",
      "Which tools to trust, and which to leave alone",
      "Where human presence is non-negotiable",
    ],
    replay: "https://www.youtube.com/watch?v=4aj1m1VNWzM",
  },
  {
    no: 9,
    title:
      "Women in Aesthetics: Leading Transformation, Mentoring the Future & Redefining Success",
    date: "April 2, 2026",
    category: "lead",
    badge: "Leadership",
    poster: "/assets/panels/panel-03.jpg",
    panelists: ["Tracey Mancuso", "Sheila Barbarino, MD", "Tracey Hotta"],
    description:
      "Women leading transformation in aesthetics: work-life integration, mentorship, closing the gender gap in leadership, and stories of resilience and innovation from across the industry.",
    takeaways: [
      "How to lead transformation without losing yourself",
      "Mentorship frameworks that actually develop successors",
      "Redefining success beyond revenue and recognition",
    ],
    replay: "https://www.youtube.com/watch?v=3S-6jTQD7NE",
  },
  {
    no: 8,
    title:
      "Patient-Centered Aesthetics: The Art of Listening, Assessment & Ethical Treatment",
    date: "March 19, 2026",
    category: "clin",
    badge: "Clinical & Ethics",
    poster: "/assets/panels/panel-04.jpg",
    panelists: ["Andrew Miller"],
    description:
      "Redefining beauty through empathy and ethics, and building a reputation rooted in care, not just results. A candid look at active listening, over-treatment, and clinical decisions that align with patient wellbeing.",
    takeaways: [
      "The power of active listening in building patient trust",
      "Avoiding over-treatment: aligning clinical decisions with wellbeing",
      "Balancing artistry, safety, and business pressures",
    ],
    replay: "https://www.youtube.com/watch?v=O2JGrcs_kUc",
  },
  {
    no: 7,
    title: "From Consultation to Conversion: Mastering the Aesthetic Sales Journey",
    date: "March 18, 2026",
    category: "ops",
    badge: "Practice Management",
    poster: "/assets/panels/panel-05.jpg",
    panelists: ["Mikyla Race"],
    description:
      "The psychology behind patient decision-making, and how to design a seamless consultation flow that converts without pressure. A data-driven look at follow-up systems, digital touchpoints, and team alignment.",
    takeaways: [
      "Storytelling and emotional intelligence in aesthetic sales",
      "Follow-up systems and digital touchpoints that close",
      "Aligning clinical and front desk teams for consistent communication",
    ],
    replay: "https://www.youtube.com/watch?v=A7ocbb9oCaM",
  },
  {
    no: 6,
    title:
      "Accountability with Empathy: Creating Ownership Without Burnout in Aesthetic Teams",
    date: "March 3, 2026",
    category: "lead",
    badge: "Leadership",
    poster: "/assets/panels/panel-06.jpg",
    panelists: ["Amy Lynn", "Christin (Lang) Trujillo"],
    description:
      "Redefining accountability: from blame to shared ownership. Feedback frameworks that motivate rather than discourage, and how empathy strengthens performance and team loyalty.",
    takeaways: [
      "Setting clear expectations while maintaining flexibility",
      "Feedback frameworks that motivate rather than discourage",
      "Managing conflict and underperformance with compassion",
    ],
  },
  {
    no: 5,
    title:
      "The Empowered Leader: Coaching & Developing High-Performing Aesthetic Teams",
    date: "February 26, 2026",
    category: "lead",
    badge: "Leadership",
    poster: "/assets/panels/panel-07.jpg",
    panelists: ["Terri Wojak, LE"],
    description:
      "What empowerment really looks like in a clinical and creative setting. Coaching techniques that inspire accountability and initiative, and building leadership capacity at all levels of the organization.",
    takeaways: [
      "Coaching techniques that inspire accountability and initiative",
      "Recognizing and nurturing individual strengths in team members",
      "Avoiding micromanagement and fostering self-leadership",
    ],
  },
  {
    no: 4,
    title:
      "From Vision to Reality: How Smart Financial Planning Fuels Growth & Purpose",
    date: "February 16, 2026",
    category: "ops",
    badge: "Practice Management",
    poster: "/assets/panels/panel-08.jpg",
    panelists: ["Chelsea Zainea, CPA", "Steve Kehn"],
    description:
      "Understanding the true cost of service delivery and profitability per treatment. Pricing strategy, sustainable growth, revenue forecasting, and the financial KPIs every aesthetic business should track.",
    takeaways: [
      "Pricing strategy that reflects brand value and market demand",
      "When to reinvest vs. when to consolidate",
      "Financial KPIs every aesthetic business should track",
    ],
  },
  {
    no: 3,
    title: "Communicating Better at Work: Avoiding Confusion & Conflict",
    date: "January 26, 2026",
    category: "lead",
    badge: "Leadership",
    poster: "/assets/panels/panel-09.jpg",
    panelists: ["Cathy Christensen", "Dominique Waples", "Connie Brennan, NP-BC"],
    description:
      "What emotional safety means in high-performance aesthetic teams, and how leadership behavior shapes trust, open communication, and ultimately patient retention.",
    takeaways: [
      "Psychological safety vs. accountability: finding the balance",
      "Recognizing and addressing burnout and competition in creative roles",
      "Practical tools to create a feedback-friendly environment",
    ],
  },
  {
    no: 2,
    title:
      "Cybersecurity in Aesthetic Practices: Protecting Patient Data & Your Reputation",
    date: "January 21, 2026",
    category: "tech",
    badge: "Technology & Security",
    poster: "/assets/panels/panel-10.jpg",
    panelists: ["Abby Honaker", "Sariah Hopkins"],
    description:
      "The new landscape of cyber threats in medical aesthetics: HIPAA compliance, securing patient photos and payment data, and how to train your front desk and clinicians to prevent data breaches.",
    takeaways: [
      "Best practices for securing patient photos, payment data, consultation records",
      "Cyber insurance: is it worth it and what does it actually cover?",
      "Real-world examples of data breaches and recovery strategies",
    ],
  },
  {
    no: 1,
    title:
      "Mergers, Partnerships & Expansion: The Smart Way to Grow an Aesthetic Brand",
    date: "January 13, 2026",
    category: "ops",
    badge: "Practice Management",
    poster: "/assets/panels/panel-11.jpg",
    panelists: ["Dana Hatch", "Robin Dimond", "Dr. Justin Harper"],
    description:
      "Identifying the right strategic partners, due diligence across financials and culture, and integrating teams and client bases post-merger without losing brand identity. Case examples on what worked, and what diluted the brand.",
    takeaways: [
      "Due diligence: financial health, leadership synergy, culture fit",
      "Structuring partnership agreements that protect both sides",
      "Integrating teams post-merger without losing brand identity",
    ],
  },
];

/* ---------------- Case studies ---------------- */

export const caseStudies = [
  {
    badge: "Med Spa · Texas",
    image: "/assets/stock-medspa.jpg",
    title: "From 1 to 4 locations in 24 months",
    metrics: ["+312% revenue", "3× new patients"],
    body: "An owner-operated med spa in Houston used BOA panel playbooks to systematize hiring, then leveraged Ekwa marketing to fill four new locations.",
  },
  {
    badge: "Dermatology · NY",
    image: "/assets/stock-derm.jpg",
    title: "$2.4M new revenue from a website rebuild",
    metrics: ["+186% leads", "2.7× conversion"],
    body: "A New York dermatology practice rebuilt its patient acquisition engine after a single Marketing Strategy Meeting with the Ekwa team.",
  },
  {
    badge: "Plastic Surgery · CA",
    image: "/assets/stock-aesthetic.jpg",
    title: "Doubled associate productivity in 6 months",
    metrics: ["+103% per-provider revenue"],
    body: "A plastic surgery group in California closed the associate competency gap using BOA's leadership panel insights and expert community.",
  },
  {
    badge: "Skin Clinic · WA",
    image: "/assets/stock-skincare.jpg",
    title: "50% margin improvement after pricing reset",
    metrics: ["+50% gross margin"],
    body: "A Washington skin clinic used the BOA Pricing Power workshop to confidently raise prices - and didn't lose a single patient.",
  },
  {
    badge: "Aesthetics · FL",
    image: "/assets/stock-clinical.jpg",
    title: "From burnout to $1M monthly revenue",
    metrics: ["$1M+ MRR", "−60% owner hours"],
    body: "A Florida aesthetics owner went from 70-hour weeks to a calm, profitable practice using the systems shared in BOA's leadership panels.",
  },
  {
    badge: "Multi-location · Canada",
    image: "/assets/stock-tech-cx.jpg",
    title: "A successful exit at 4× EBITDA",
    metrics: ["4× EBITDA exit"],
    body: "A Canadian medspa group prepped for sale through BOA's M&A panel and Ekwa marketing, exiting at the top of the market.",
  },
];

/* ---------------- Resources ---------------- */

export const tools = [
  {
    tag: "Calculator",
    title: "Patient Lifetime Value Calculator",
    desc: "Plug in your average ticket, visit frequency and retention rate - see what a single patient is really worth to your practice over five years.",
    cta: "Open the tool",
  },
  {
    tag: "Calculator",
    title: "Marketing ROI Calculator",
    desc: "Break down spend vs. new-patient value by channel. Stop arguing about budgets and start answering them with a number.",
    cta: "Open the tool",
  },
  {
    tag: "Scorecard",
    title: "Practice Growth Scorecard",
    desc: "A 7-minute, 22-question self-assessment covering marketing, patient experience, reputation, team and leadership. Get a PDF report instantly.",
    cta: "Take the scorecard",
  },
  {
    tag: "Worksheet",
    title: "New Patient Journey Map",
    desc: "Print-ready template that walks you through every touchpoint from Google search to post-treatment follow-up. Find the leaks in your funnel.",
    cta: "Download (PDF)",
  },
  {
    tag: "Planner",
    title: "90-Day Content Planner",
    desc: "A structured template for building a high-converting social and blog content plan for an aesthetic practice - themes, formats and cadence.",
    cta: "Get the template",
  },
  {
    tag: "Checklist",
    title: "Website Audit Checklist",
    desc: "The 40-point checklist our web team runs on every aesthetic practice website - SEO, speed, conversion, trust, accessibility.",
    cta: "Download (PDF)",
  },
  {
    tag: "Calculator",
    title: "Review Velocity Calculator",
    desc: "See how many new reviews per month you actually need to protect and grow your Google Business ranking in your zip code.",
    cta: "Open the tool",
  },
  {
    tag: "Worksheet",
    title: "Core Services Positioning Canvas",
    desc: "A one-page exercise to clarify what your practice actually stands for - the foundation every marketing decision depends on.",
    cta: "Download (PDF)",
  },
  {
    tag: "Template",
    title: "Consultation Script Template",
    desc: "A conversion-focused, non-salesy consultation framework used by high-performing aesthetic practices. Editable and printable.",
    cta: "Get the template",
  },
];

export const kbCategories = [
  { key: "all", label: "All questions" },
  { key: "general", label: "About BOA" },
  { key: "podcast", label: "Podcast" },
  { key: "events", label: "Events & Panels" },
  { key: "marketing", label: "Marketing Services (MSM)" },
  { key: "billing", label: "Billing & Access" },
  { key: "speakers", label: "Speakers & Guests" },
];

export const kbFaqs = [
  {
    cat: "general",
    q: "What is Business of Aesthetics, exactly?",
    a: "Business of Aesthetics is a modern platform that brings together leaders in Dermatology, Plastic Surgery and Aesthetics. It combines a weekly podcast, live expert panels, in-person events and a marketing services arm (MSM) so practitioners can learn, connect and grow - all in one place.",
  },
  {
    cat: "general",
    q: "Who is BOA built for?",
    a: "Independent practice owners, partners and senior leaders in dermatology, plastic surgery and medical aesthetics who want candid business conversations - not sales pitches disguised as education.",
  },
  {
    cat: "general",
    q: "Is it free to access the content?",
    a: "Yes. The podcast, blog library, tools and most webinars are completely free. Certain premium workshops and strategy meetings with our advisors have their own access rules, but the core learning platform is open.",
  },
  {
    cat: "podcast",
    q: "How often does the podcast release new episodes?",
    a: "The Business of Aesthetics podcast drops weekly, typically on Tuesday mornings. You'll find every episode on Apple Podcasts, Spotify, YouTube and right here on our site.",
  },
  {
    cat: "podcast",
    q: "Can I suggest a topic or a guest?",
    a: "Absolutely. Use the Speakers page to submit a pitch for yourself or a colleague. We read every submission and respond to everyone, usually within 7 business days.",
  },
  {
    cat: "events",
    q: "What's the difference between Events and Panels?",
    a: "Events are our scheduled live webinars and workshops on a specific topic. Panels are recurring moderated roundtables where 3–5 experts debate a strategic question in real time. Both are free to attend and are recorded for members who can't attend live.",
  },
  {
    cat: "events",
    q: "Are events recorded?",
    a: "Yes. Every live event is recorded and posted inside the Events archive within 48 hours, usually with timestamps and a downloadable summary.",
  },
  {
    cat: "marketing",
    q: "What is a Marketing Strategy Meeting (MSM)?",
    a: "A complimentary 60-minute video conversation with a senior advisor. You walk away with a clear, custom growth plan - covering SEO, social, reputation and web - built specifically for your market and specialty. No pressure, no pitch.",
  },
  {
    cat: "marketing",
    q: "Do I have to be an Ekwa or MSM client to participate?",
    a: "Not at all. The content, events and community are completely independent of our marketing services. Plenty of our audience will never become clients - and that's entirely the point.",
  },
  {
    cat: "marketing",
    q: "What services does MSM actually cover?",
    a: "Search engine optimization, paid search, social media management, web design and development, reputation management and strategic content - all tailored specifically to aesthetic and dermatology practices.",
  },
  {
    cat: "billing",
    q: "How do I reset my account password?",
    a: 'Use the "Forgot password" link on the sign-in screen. If you don\'t receive the reset email within 5 minutes, check spam, then contact us at ideas@businessofaesthetics.org and we\'ll help personally.',
  },
  {
    cat: "billing",
    q: "How is my data handled?",
    a: "We never sell data. See our Privacy Policy for the full breakdown of what we collect, why, and how long we keep it.",
  },
  {
    cat: "speakers",
    q: "How do I apply to speak on the podcast or at an event?",
    a: "Head to the Speakers page and fill out the short application. Tell us about your practice, the topic you're excited to share, and a few recent talks or articles if you have them. Our producer responds within a week.",
  },
  {
    cat: "speakers",
    q: "Do you compensate podcast guests?",
    a: "No. Our guests join for the exposure, the network and the conversation - and we make sure every appearance is produced, packaged and promoted at a high standard so it's genuinely valuable for them.",
  },
];

/* ---------------- Testimonials (home) ---------------- */

export const testimonials = [
  {
    quote: "I think people put their most honest opinion out to share with others.",
    name: "Dr. Rick Moore",
    role: "BOA Community Member",
  },
  {
    quote:
      "This has been the most honest source of info and opinions about the aesthetic industry. I appreciate everyone's candid responses and sharing.",
    name: "Dr. Christine Lee",
    role: "BOA Community Member",
  },
  {
    quote:
      "What you've put together is a multi-specialty, multi-disciplinary platform. I get on it every morning. You've really found a niche that was an unmet need in medicine. Thank you for helping to meet the need!",
    name: "Dr. WM. Philip Werschler",
    role: "MD, FAAD, FAACS",
  },
  {
    quote:
      "I'm a fan of the podcast. I've seen a bunch of episodes already, and I learned something from each one. What you guys are doing with this podcast is so important for the whole community.",
    name: "Dr. Daniel Kaufman",
    role: "Founder & Medical Director, Discreet Plastic Surgery",
  },
  {
    quote:
      "Being in the Aesthetics industry for over 20 years, I've experienced so much. I truly enjoy being able to share the good, the bad, and the ugly. Thank you for the platform to do so.",
    name: "Kristina Sabo-Casel",
    role: "Aesthetics Industry Veteran",
  },
  {
    quote:
      "Great investment - cost zero dollars but is an excellent investment of time! It's called the Business of Aesthetics.",
    name: "Jennifer Peden",
    role: "BOA Community Member",
  },
  {
    quote: "I sincerely enjoy and learn from this group! Thank you for adding me!",
    name: "Larissa Z. Scanlan",
    role: "BOA Community Member",
  },
  {
    quote:
      "Thanks for creating this group. I enjoy learning from others and sharing knowledge and experiences.",
    name: "Dr. Beatriz H. Porras",
    role: "BOA Community Member",
  },
  {
    quote: "I enjoy this group so much and I love the wealth of knowledge shared.",
    name: "Grace Atkinson",
    role: "Spa Manager, SafiraMD Medical Aesthetics",
  },
  {
    quote: "I love the podcast and the FB group and the community you are building.",
    name: "Cassie Lane, CRNA, DNAP",
    role: "Founder, Injectables EDU",
  },
  {
    quote:
      "Business of Aesthetics gave me the opportunity to be heard by thousands of decision makers in the aesthetics industry. Any company doing good honest business will benefit by working with BOA.",
    name: "Tony Tydlacka",
    role: "President, iLease Works",
  },
  {
    quote: "Love this group!",
    name: "Angela Lacy",
    role: "BOA Community Member",
  },
  {
    quote:
      "I always love being a part of these webinars. I have had a few people reach out just to tell me that they loved it.",
    name: "Ang Klippel",
    role: "Master Aesthetician & Educator",
  },
  {
    quote:
      "Thank you so very much for having me join your panel tonight! I really enjoyed sharing advice for success.",
    name: "Kim Laudati",
    role: "Founder & CEO, SomaCell",
  },
  {
    quote:
      "I really appreciate you guys letting me join you again. I always have a lot of fun.",
    name: "Sean Duncan",
    role: "Founder, SMD Consulting & Accounting",
  },
];
