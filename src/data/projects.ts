export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github?: string;
  imageHalf?: string;
  mobileImage?: string;
  isInsights?: boolean;
  fullDescription?: string;
  keyFeatures?: string[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    infrastructure?: string[];
  };
  projectHighlights?: string[];
  mediaType?: "image" | "video";
}

export const projects: Project[] = [
  {
    title: "INSIGHTS",
    description:
      "AI-powered platform that analyzes Reddit discussions to identify product pain points and generate actionable recommendations for businesses.",
    fullDescription:
      "Enabled a local business to reconnect with inactive customers through targeted pain point analysis, driving a 50% increase in 6-month dormant user re-engagement by addressing critical product gaps. Scraped and analyzed 15,000+ Reddit posts across 50+ subreddits using automated NLP pipeline, processing 3.2M words of user feedback to generate actionable insights stored in MongoDB.",
    technologies: [
      "React",
      "Python/Flask",
      "MongoDB",
      "OpenAI/Claude API",
    ],
    techStack: {
      frontend: [
        "React 18 (Hooks, Context API)",
        "Vite",
        "SCSS",
        "Axios",
        "Vitest",
        "React Three Fiber (3D components)",
        "Lucide React (Icons)",
      ],
      backend: [
        "Python 3.11+",
        "Flask & Flask-RESTful",
        "MongoDB",
        "Reddit API (PRAW)",
        "Claude AI (Anthropic)",
        "NLP Pipeline: spaCy, transformers, scikit-learn, NLTK",
        "JWT Authentication",
        "Flask-CORS",
      ],
      infrastructure: [
        "MongoDB (data storage)",
        "JWT (authentication)",
        "Cookie-based sessions",
        "Rate limiting & security middleware",
      ],
    },
    keyFeatures: [
      "AI-Powered Discovery: Automatically finds and analyzes relevant discussions using Claude AI",
      "Advanced NLP Analysis: Sentiment analysis with 94% accuracy using spaCy and transformers",
      "Pain Point Detection: Identifies and categorizes user pain points by type and severity",
      "Smart Recommendations: Generates actionable recommendations using Claude AI",
      "Credits System: Fair usage system with credit-based operations",
      "Real-time Dashboard: Monitor analysis progress and results",
      "User Authentication: JWT-based authentication with secure cookie sessions",
      "Responsive Design: Works on desktop and mobile",
      "Error Handling: Error boundaries and graceful error recovery",
    ],
    projectHighlights: [
      "AI Integration: Claude AI for analysis and recommendations",
      "NLP Pipeline: Custom pipeline with 94% sentiment accuracy",
      "Full-Stack Architecture: RESTful API with React frontend",
      "User Management: Credit system, profiles, usage tracking",
      "Data Visualization: Interactive dashboards and filtering",
      "Testing: Comprehensive test coverage (Vitest, Pytest)",
      "Error Handling: Error boundaries and retry strategies",
      "Security: JWT authentication, secure headers, CORS",
    ],
    image: "documents/iinsightss.mp4",
    mobileImage: "documents/painpoint-1.png",
    mediaType: "video",
    link: "https://iinsightss.com/",
    github: "https://github.com/Lucas-Song-Dev/INSIGHT",
    isInsights: true,
  },
  {
    title: "DDR5 Power Calculator",
    description:
      "JEDEC-aligned DDR5 memory power modeling: core, interface, and DIMM totals with charts, 3D visualization, inverse search, and server deployment planning.",
    fullDescription:
      "A full-stack tool for estimating DDR5 power from memory geometry, IDD/IPP-style currents, timing, and workload mix (bank states, read/write duty, refresh). A Python core models die power on VDD and VPP, POD-style VDDQ interface power with DDR5 dual-subchannel geometry, and optional RDIMM buffering; FastAPI serves /api/calculate/* including batch scans; Next.js 14 provides presets, React Three Fiber visuals, target-power inverse search, and fleet-style ranking against power and capacity limits. Intended for learning and planning—not a substitute for silicon or module measurement.",
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Three.js",
      "pytest / Vitest",
    ],
    keyFeatures: [
      "Steady-state core model blending IDD2N/3N/4R/4W/5B-style terms with workload percentages and refresh duty",
      "Interface model for two 40-bit subchannels per rank, WCK/CK/CA/DQS activity, and POD termination read vs write split",
      "DIMM aggregation: devices per rank, interface once per module, component model path for registered DIMMs",
      "Inverse search and server deployment views: batch API ranking vs power, data rate, slot, and server-count constraints",
      "TypeScript port of the calculator with try-API-then-local fallback so the UI stays usable offline",
    ],
    image: "documents/ddr5_modeling_calc.mp4",
    mediaType: "video",
    link: "https://capstone-ai-037.vercel.app/server-deployment",
    isInsights: true,
  },
  {
    title: "2025 STK-market | WIP",
    description:
      "Heatmap stock market, useful for arbitrage backtesting momentum strategies",
    technologies: [
      "React",
      "Typescript",
      "CSS",
      "HTML",
      "Tailwind",
      "Python",
      "RESTful API",
    ],
    image: "documents/stk-market-1.png",
    imageHalf: "documents/stk-market-2.png",
    link: "https://github.com/Lucas-Song-Dev/StockHeatMap",
    github: "https://github.com/Lucas-Song-Dev/StockHeatMap",
  },
  {
    title: "2022 Pathfinding Visualizer",
    description:
      "grid-based visualizer to help your intuition on common pathfinding algorithms",
    technologies: ["React", "Node.js", "CSS", "HTML", "Tailwind"],
    image: "documents/SC_pathfinding.png",
    link: "https://lucas-song-dev.github.io/Shortest-Path/",
    github: "https://github.com/Lucas-Song-Dev/Shortest-Path",
  },
  {
    title: "2021 Old personal website",
    description: "My old website, proud of the animations and design",
    technologies: ["React", "Tailwind", "HTML"],
    image: "documents/Old_Website.png",
    link: "https://lucas-song-dev.github.io/Lucas02.Song/",
    github: "https://github.com/Lucas-Song-Dev/Lucas02.Song",
  },
  {
    title: "2022 Issue Hound",
    description:
      "Productivity tool for organizing tasks and ticketing system",
    technologies: ["React.js", "CSS", "HTML", "PostgreSQL"],
    image: "documents/issue_hound.png",
    link: "https://lucas-song-dev.github.io/Bug-Tracker/",
    github: "https://github.com/Lucas-Song-Dev",
  },
  {
    title: "2023 Asset_Ai",
    description:
      "Full-stack AI-powered asset generator to enhance digital communication | Taken down after heroku free trial",
    technologies: [
      "React.js",
      "CSS",
      "HTML",
      "MongoDB",
      "Express",
      "Google Auth",
      "OpenAI",
      "Heroku",
      "AWS",
    ],
    image: "documents/Asset_ai.png",
    link: "https://github.com/Lucas-Song-Dev/Asset_Ai",
    github: "https://github.com/Lucas-Song-Dev/Asset_Ai",
  },
];
