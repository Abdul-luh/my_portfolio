const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const screenshotsDir = path.join(process.cwd(), "public", "images", "screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function fetchScreenshot(url, filename) {
  const filePath = path.join(screenshotsDir, filename);
  // If already exists and is non-empty (> 5KB), reuse
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 5000) {
    console.log(`Already cached: ${filename}`);
    return `/images/screenshots/${filename}`;
  }

  // 1. Try Thum.io
  try {
    const thumUrl = `https://image.thum.io/get/width/1024/crop/768/${encodeURI(url)}`;
    console.log(`Capturing screenshot for ${url}...`);
    const res = await fetch(thumUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length > 5000) {
        fs.writeFileSync(filePath, buffer);
        console.log(`Successfully saved screenshot: ${filename} (${buffer.length} bytes)`);
        return `/images/screenshots/${filename}`;
      }
    }
  } catch (err) {
    console.warn(`Thum.io failed for ${url}:`, err.message);
  }

  // 2. Fallback to Microlink
  try {
    const microUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
    const res = await fetch(microUrl);
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length > 5000) {
        fs.writeFileSync(filePath, buffer);
        console.log(`Successfully saved screenshot via Microlink: ${filename}`);
        return `/images/screenshots/${filename}`;
      }
    }
  } catch (err) {
    console.warn(`Microlink failed for ${url}:`, err.message);
  }

  return null;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "portfolio" });
  const Project = mongoose.model("Project", new mongoose.Schema({ title: String, demoLink: String, repoLink: String, image: String, repoName: String }, { strict: false }));
  
  const projects = await Project.find({});
  console.log(`Processing ${projects.length} projects...`);

  for (const proj of projects) {
    const isLiveWeb = proj.demoLink && proj.demoLink.startsWith("http") && !proj.demoLink.includes("github.com/");
    const safeName = (proj.repoName || proj.title || "proj").replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
    const filename = `${safeName}.png`;

    if (isLiveWeb) {
      const localPath = await fetchScreenshot(proj.demoLink, filename);
      if (localPath) {
        proj.image = localPath;
        await proj.save();
        console.log(`[UPDATED] ${proj.title} -> ${localPath}`);
        continue;
      }
    }

    // Backend or non-web repo: use repo OpenGraph card
    const repoIdentifier = proj.repoName || safeName;
    proj.image = `https://opengraph.githubassets.com/1/Abdul-luh/${repoIdentifier}`;
    await proj.save();
    console.log(`[REPO CARD] ${proj.title} -> ${proj.image}`);
  }

  console.log("All project screenshots processed successfully!");
  process.exit(0);
}

run().catch((err) => {
  console.error("Script error:", err);
  process.exit(1);
});
