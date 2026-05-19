import { Project } from "ts-morph";
import path from "path";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const renameDir = (oldPath, newPath) => {
  const dir = project.getDirectory(oldPath);
  if (dir) {
    console.log(`Moving directory ${oldPath} to ${newPath}`);
    dir.move(path.resolve(process.cwd(), newPath));
  } else {
    console.log(`Directory ${oldPath} not found.`);
  }
};

const renameFile = (oldPath, newPath) => {
  const file = project.getSourceFile(oldPath);
  if (file) {
    console.log(`Moving file ${oldPath} to ${newPath}`);
    file.move(path.resolve(process.cwd(), newPath));
  } else {
    console.log(`File ${oldPath} not found.`);
  }
};

// Rename files first
renameFile("src/model/_Type.ts", "src/model/index.ts");
renameFile("src/helper/_skeleton.ts", "src/helper/skeleton.ts");

// Rename directories bottom-up
renameDir("src/page/bookMark", "src/page/bookmarks");
renameDir("src/page", "src/pages");
renameDir("src/style", "src/styles");
renameDir("src/helper", "src/utils");
renameDir("src/model", "src/types");
renameDir("src/state", "src/stores");
renameDir("src/components/element", "src/components/elements");
renameDir("src/components/fragment", "src/components/fragments");

console.log("Saving changes...");
project.saveSync();
console.log("Done.");
