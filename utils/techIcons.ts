export interface TechMeta {
  name: string;
  icon: string;
  slug: string;
}

const LOCAL_OR_DEVICON_ICONS: Record<string, string> = {
  html: "/images/skills/html.png",
  html5: "/images/skills/html.png",
  css: "/images/skills/css3.png",
  css3: "/images/skills/css3.png",
  javascript: "/images/skills/javascript.png",
  js: "/images/skills/javascript.png",
  react: "/images/skills/react.png",
  reactjs: "/images/skills/react.png",
  "react.js": "/images/skills/react.png",
  tailwind: "/images/skills/tailwind.png",
  tailwindcss: "/images/skills/tailwind.png",
  "tailwind css": "/images/skills/tailwind.png",
  sass: "/images/skills/sass.png",
  scss: "/images/skills/sass.png",
  git: "/images/skills/git.png",
  github: "/images/skills/github.png",
  typescript: "/images/skills/typescript.png",
  ts: "/images/skills/typescript.png",
  nextjs: "/images/skills/next-js.png",
  "next.js": "/images/skills/next-js.png",
  "react testing library": "/images/skills/react-testing-library.png",
  "react-testing-library": "/images/skills/react-testing-library.png",
  mysql: "/images/skills/mysql.png",
  prisma: "/images/skills/prisma.svg",
  postgresql: "/images/skills/postgresql.svg",
  postgres: "/images/skills/postgresql.svg",
  mongodb: "/images/skills/mongodb.svg",
  mongoose: "/images/skills/mongodb.svg",
  redux: "/images/skills/redux.svg",
  "redux toolkit": "/images/skills/redux.svg",
  nodejs: "/images/skills/nodejs.svg",
  "node.js": "/images/skills/nodejs.svg",
  express: "/images/skills/express.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  vite: "/images/skills/vite.svg",
  graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  python: "/images/skills/python.svg",
  "c++": "/images/skills/cpp.svg",
  cpp: "/images/skills/cpp.svg",
  stripe: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg",
  gsap: "/images/skills/gsap.svg",
  greensock: "/images/skills/gsap.svg",
  recharts: "/images/skills/recharts.png",
  zustand: "/images/skills/zustand.jpg",
  "framer motion": "/images/skills/framer-motion.svg",
  "framer-motion": "/images/skills/framer-motion.svg",
  "react router": "/images/skills/react-router.svg",
  "react-router": "/images/skills/react-router.svg",
  "radix ui": "/images/skills/radix-ui.svg",
  "radix-ui": "/images/skills/radix-ui.svg",
  "lucide icons": "/images/skills/lucide.svg",
  "lucide-react": "/images/skills/lucide.svg",
  lucide: "/images/skills/lucide.svg",
  "react icons": "/images/skills/react.png",
  axios: "/images/skills/axios.svg",
  zod: "/images/skills/zod.svg",
  jwt: "/images/skills/jwt.svg",
  jsonwebtoken: "/images/skills/jwt.svg",
  bcrypt: "/images/skills/bcrypt.svg",
  bcryptjs: "/images/skills/bcrypt.svg",
  nodemailer: "/images/skills/nodemailer.svg",
  "next-auth": "/images/skills/next-js.png",
  "nextauth.js": "/images/skills/next-js.png",
};

export function getTechIcon(name: string): string {
  if (!name) return "/images/skills/javascript.png";
  const key = name.trim().toLowerCase();
  if (LOCAL_OR_DEVICON_ICONS[key]) {
    return LOCAL_OR_DEVICON_ICONS[key];
  }
  // Remove non-alphanumeric and check again
  const cleanKey = key.replace(/[^a-z0-9]/g, "");
  if (LOCAL_OR_DEVICON_ICONS[cleanKey]) {
    return LOCAL_OR_DEVICON_ICONS[cleanKey];
  }
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanKey}/${cleanKey}-original.svg`;
}

// Map npm package names from package.json to clean tech names
const DEPENDENCY_MAPPING: Record<string, string> = {
  next: "Next.js",
  "eslint-config-next": "Next.js",
  react: "React",
  "react-dom": "React",
  tailwindcss: "Tailwind CSS",
  "@tailwindcss/vite": "Tailwind CSS",
  "@tailwindcss/postcss": "Tailwind CSS",
  typescript: "TypeScript",
  "@types/react": "TypeScript",
  "@types/node": "TypeScript",
  "@prisma/client": "Prisma",
  prisma: "Prisma",
  "@reduxjs/toolkit": "Redux Toolkit",
  redux: "Redux",
  "react-redux": "Redux",
  zustand: "Zustand",
  gsap: "GSAP",
  "framer-motion": "Framer Motion",
  "@stripe/stripe-js": "Stripe",
  stripe: "Stripe",
  "@stripe/react-stripe-js": "Stripe",
  "next-auth": "NextAuth.js",
  "@next-auth/prisma-adapter": "NextAuth.js",
  mongoose: "MongoDB",
  mongodb: "MongoDB",
  pg: "PostgreSQL",
  postgres: "PostgreSQL",
  "@neondatabase/serverless": "PostgreSQL",
  mysql: "MySQL",
  mysql2: "MySQL",
  axios: "Axios",
  vite: "Vite",
  "@vitejs/plugin-react": "Vite",
  firebase: "Firebase",
  express: "Express",
  sass: "Sass",
  recharts: "Recharts",
  "chart.js": "Chart.js",
  "react-router-dom": "React Router",
  "@radix-ui/react-slot": "Radix UI",
  "lucide-react": "Lucide Icons",
  "react-icons": "React Icons",
  "@testing-library/react": "React Testing Library",
  jest: "Jest",
  bcryptjs: "Bcrypt",
  bcrypt: "Bcrypt",
  jsonwebtoken: "JWT",
  nodemailer: "Nodemailer",
  zod: "Zod",
};

export function extractTechFromPackageJson(
  dependencies: Record<string, string> = {},
  devDependencies: Record<string, string> = {},
  primaryLanguage?: string
): string[] {
  const allDeps = { ...dependencies, ...devDependencies };
  const detected = new Set<string>();

  for (const dep of Object.keys(allDeps)) {
    const lowerDep = dep.toLowerCase();
    if (DEPENDENCY_MAPPING[lowerDep]) {
      detected.add(DEPENDENCY_MAPPING[lowerDep]);
    } else if (lowerDep.startsWith("@radix-ui/")) {
      detected.add("Radix UI");
    } else if (lowerDep.includes("tailwind")) {
      detected.add("Tailwind CSS");
    }
  }

  // Ensure primaryLanguage is recognized
  if (primaryLanguage) {
    const lang = primaryLanguage.toLowerCase();
    if (lang === "typescript" && !detected.has("TypeScript")) detected.add("TypeScript");
    if (lang === "javascript" && !detected.has("JavaScript") && !detected.has("TypeScript")) detected.add("JavaScript");
    if (lang === "html" && !detected.has("HTML")) detected.add("HTML");
    if (lang === "css" && !detected.has("CSS") && !detected.has("Tailwind CSS")) detected.add("CSS");
    if (lang === "python") detected.add("Python");
    if (lang === "c++") detected.add("C++");
  }

  // If Next.js was detected, ensure React is also included
  if (detected.has("Next.js") && !detected.has("React")) {
    detected.add("React");
  }

  // If Tailwind was detected, ensure CSS/Tailwind CSS is clean
  if (detected.has("Tailwind CSS") && detected.has("CSS")) {
    detected.delete("CSS");
  }

  return Array.from(detected);
}
