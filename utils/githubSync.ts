import { Connect } from "@/dbConfig/dbconfig";
import Projects from "@/model/projectModel";
import Technology from "@/model/techModel";
import { extractTechFromPackageJson, getTechIcon } from "./techIcons";

// Common repos to exclude from portfolio projects (dotfiles, course notes, forks)
const IGNORED_REPOS = new Set([
  "abdul-luh",
  "my_portfolio",
  "cs-video-courses",
  "30-days-of-javascript",
  "learning_cpp_programming",
  "wk1-plp_python_assignment1",
  "alx-low_level_programming",
  "alx-system_engineering-devops",
  "alx-zero_day",
  "alx-pre_course",
  "journey-to-fullstack-exercises",
  "shell-scripting",
  "learn-python",
  "intro_to_c-programming",
]);

// Format repo name into a clean, human-readable title
export function formatProjectTitle(repoName: string, readmeTitle?: string): string {
  if (readmeTitle && readmeTitle.length > 2 && readmeTitle.length < 50 && !readmeTitle.includes("](")) {
    return readmeTitle.trim();
  }
  return repoName
    .replace(/-main$/i, "")
    .replace(/-master$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

// Clean markdown and extract a concise overview
export function extractDescriptionFromReadme(markdown?: string, fallbackDesc?: string, techNames: string[] = []): string {
  if (markdown) {
    // Remove badges, images, HTML tags, markdown links syntax
    let clean = markdown
      .replace(/\[\!\[.*?\]\(.*?\)\]\(.*?\)/g, "")
      .replace(/\!\[.*?\]\(.*?\)/g, "")
      .replace(/<[^>]+>/g, " ");

    const lines = clean.split("\n");
    const paragraphs: string[] = [];
    let buffer: string[] = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (
        line.startsWith("#") ||
        line.startsWith("---") ||
        line.startsWith("===") ||
        line.startsWith("- [") ||
        line.startsWith("* [") ||
        line.startsWith("|")
      ) {
        if (buffer.length) {
          paragraphs.push(buffer.join(" ").trim());
          buffer = [];
        }
        continue;
      }

      if (line === "") {
        if (buffer.length) {
          paragraphs.push(buffer.join(" ").trim());
          buffer = [];
        }
      } else {
        buffer.push(line);
      }
    }

    if (buffer.length) paragraphs.push(buffer.join(" ").trim());

    const validPara = paragraphs.find(
      (p) =>
        p.length >= 35 &&
        !p.toLowerCase().includes("table of contents") &&
        !p.toLowerCase().includes("license") &&
        !p.toLowerCase().includes("bootstrapped with create-next-app") &&
        !p.toLowerCase().includes("getting started")
    );

    if (validPara) {
      // Clean up markdown formatting like **bold** or [links](...)
      const cleanedText = validPara
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/`+(.*?)`+/g, "$1")
        .trim();

      if (cleanedText.length > 300) {
        return cleanedText.slice(0, 297) + "...";
      }
      return cleanedText;
    }
  }

  if (fallbackDesc && fallbackDesc.trim().length > 10 && fallbackDesc.toLowerCase() !== "none") {
    return fallbackDesc.trim();
  }

  const techText = techNames.length ? ` built using ${techNames.slice(0, 4).join(", ")}` : "";
  return `A modern, responsive web application${techText} hosted with high performance and accessibility in mind.`;
}

export function generateScreenshotUrl(demoLink?: string, owner?: string, repoName?: string): string {
  // Use GitHub's official high-res OpenGraph dynamic card - fast, CDN-cached, unique per repository
  if (owner && repoName) {
    return `https://opengraph.githubassets.com/1/${owner}/${repoName}`;
  }
  if (demoLink && demoLink.startsWith("http")) {
    const cleanName = demoLink.replace(/^https?:\/\//, "").replace(/\.vercel\.app.*$/, "").replace(/[^a-zA-Z0-9-_]/g, "");
    return `https://opengraph.githubassets.com/1/Abdul-luh/${cleanName}`;
  }
  return `https://opengraph.githubassets.com/1/Abdul-luh/my_portfolio`;
}

export async function syncProjectsFromGitHub() {
  await Connect();

  const username = process.env.GITHUB_USERNAME || "Abdul-luh";
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Portfolio-Sync-App",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // 1. Fetch repos from GitHub
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers,
  });

  if (!reposRes.ok) {
    throw new Error(`GitHub API error: ${reposRes.status} ${reposRes.statusText}`);
  }

  const allRepos = await reposRes.json();
  if (!Array.isArray(allRepos)) {
    throw new Error("Invalid GitHub response: expected array of repositories");
  }

  // Filter out forks and non-project repos
  const validRepos = allRepos.filter((r) => {
    if (r.fork) return false;
    const lowerName = r.name.toLowerCase();
    if (IGNORED_REPOS.has(lowerName)) return false;
    return true;
  });

  // Prioritize hosted / vercel projects
  validRepos.sort((a, b) => {
    const aHosted = !!a.homepage;
    const bHosted = !!b.homepage;
    if (aHosted && !bHosted) return -1;
    if (!aHosted && bHosted) return 1;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const syncedProjects = [];
  const allFeaturedTechs = new Set<string>();

  // Take top hosted / prominent projects (up to 25)
  const reposToProcess = validRepos.slice(0, 25);

  for (const repo of reposToProcess) {
    try {
      const defaultBranch = repo.default_branch || "main";
      let demoLink = repo.homepage ? repo.homepage.trim() : "";
      if (demoLink.includes("github.com/")) demoLink = "";

      // Fallback detection for github.io pages if no homepage was filled
      if (!demoLink && repo.has_pages) {
        demoLink = `https://${username}.github.io/${repo.name}/`;
      }

      // 2. Fetch package.json if present
      let technologies: string[] = [];
      try {
        const pkgRes = await fetch(
          `https://raw.githubusercontent.com/${username}/${repo.name}/${defaultBranch}/package.json`,
          { headers: { "User-Agent": "Portfolio-Sync-App" } }
        );
        if (pkgRes.ok) {
          const pkgData = await pkgRes.json();
          technologies = extractTechFromPackageJson(
            pkgData.dependencies,
            pkgData.devDependencies,
            repo.language
          );
        }
      } catch (e) {
        // No package.json or invalid JSON
      }

      // If no package.json tech found, fallback to repository language
      if (!technologies.length && repo.language) {
        technologies = [repo.language];
      }
      if (!technologies.length) {
        technologies = ["HTML", "CSS", "JavaScript"];
      }

      // 3. Fetch README.md if present
      let readmeContent = "";
      let readmeTitle = "";
      try {
        const readmeRes = await fetch(
          `https://raw.githubusercontent.com/${username}/${repo.name}/${defaultBranch}/README.md`,
          { headers: { "User-Agent": "Portfolio-Sync-App" } }
        );
        if (readmeRes.ok) {
          readmeContent = await readmeRes.text();
          const titleMatch = readmeContent.match(/^#\s+(.+)$/m);
          if (titleMatch && titleMatch[1]) {
            readmeTitle = titleMatch[1].replace(/[^\w\s-]/g, "").trim();
          }
        }
      } catch (e) {
        // README fetch error
      }

      const title = formatProjectTitle(repo.name, readmeTitle);
      const description = extractDescriptionFromReadme(readmeContent, repo.description, technologies);
      const isHosted = !!demoLink;
      const imageUrl = generateScreenshotUrl(demoLink, username, repo.name);

      // Header summary (e.g. "Next.js • Tailwind CSS • TypeScript")
      const header = technologies.slice(0, 3).join(" • ") || "Web Application";

      const techObjects = technologies.map((t) => ({ techName: t }));

      // Default featured to true for hosted projects (Vercel, etc.)
      const isFeatured = isHosted;

      // 4. Upsert project in MongoDB
      const query = {
        $or: [{ repoLink: repo.html_url }, { githubId: repo.id.toString() }, { title }],
      };

      const updateData = {
        title,
        header,
        image: imageUrl,
        description,
        technologies: techObjects,
        demoLink: demoLink || repo.html_url,
        repoLink: repo.html_url,
        githubId: repo.id.toString(),
        repoName: repo.name,
        featured: isFeatured,
        updatedAt: new Date(),
      };

      const projectDoc = await Projects.findOneAndUpdate(query, updateData, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });

      syncedProjects.push(projectDoc);

      // Collect technologies from featured projects
      if (isFeatured) {
        technologies.forEach((t) => allFeaturedTechs.add(t));
      }
    } catch (repoErr) {
      console.error(`Error processing repo ${repo.name}:`, repoErr);
    }
  }

  // 5. Sync Technologies Collection based on featured projects
  const syncedTechnologies = [];
  for (const techName of Array.from(allFeaturedTechs)) {
    try {
      const iconUrl = getTechIcon(techName);
      const techDoc = await Technology.findOneAndUpdate(
        { title: { $regex: new RegExp(`^${techName}$`, "i") } },
        {
          title: techName,
          image: iconUrl,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      syncedTechnologies.push(techDoc);
    } catch (techErr) {
      console.error(`Error syncing technology ${techName}:`, techErr);
    }
  }

  return {
    success: true,
    syncedCount: syncedProjects.length,
    hostedCount: syncedProjects.filter((p) => p.demoLink && !p.demoLink.includes("github.com/")).length,
    technologiesCount: syncedTechnologies.length,
    projects: syncedProjects,
    technologies: syncedTechnologies,
  };
}
