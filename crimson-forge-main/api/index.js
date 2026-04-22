import { readFileSync, existsSync } from "fs";
import { join, extname } from "path";

const clientDir = join(__dirname, "../dist/client");

function getContentType(filePath) {
  const types = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
  };
  return types[extname(filePath)] || "application/octet-stream";
}

export default async function (req, res) {
  const url = req.url || "/";
  
  const filePath = url === "/" ? join(clientDir, "index.html") : join(clientDir, url);
  
  if (existsSync(filePath)) {
    const content = readFileSync(filePath);
    res.setHeader("Content-Type", getContentType(filePath));
    res.status(200).send(content);
    return;
  }

  const indexPath = join(clientDir, "index.html");
  if (existsSync(indexPath)) {
    const content = readFileSync(indexPath);
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(content);
    return;
  }

  res.status(404).send("Not Found");
}