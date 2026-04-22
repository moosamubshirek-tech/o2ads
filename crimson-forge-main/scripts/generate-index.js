import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const clientDir = join(process.cwd(), "dist/client");
const jsFiles = readFileSync(join(clientDir, "assets"), "utf-8").split("\n").filter(f => f.endsWith(".js"));
const mainJs = jsFiles.find(f => f.startsWith("index-")) || jsFiles[0];
const cssFiles = jsFiles.filter(f => f.includes("styles-")).map(f => f.trim()).filter(Boolean);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>O2 Ads — We Don't Run Ads. We Build Brands.</title>
  ${cssFiles.map(c => `<link rel="stylesheet" href="/assets/${c}">`).join("\n  ")}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&family=Dancing+Script:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/assets/${mainJs}"></script>
</body>
</html>`;

writeFileSync(join(clientDir, "index.html"), html);
console.log("Generated index.html");