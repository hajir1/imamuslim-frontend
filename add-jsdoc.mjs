import { Project, SyntaxKind } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const sourceFiles = project.getSourceFiles("src/**/*.{ts,tsx}");

function formatName(name) {
  // Convert camelCase or PascalCase to readable words
  const result = name.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1).trim();
}

sourceFiles.forEach((file) => {
  // Add JSDoc to Function Declarations
  const functions = file.getFunctions();
  functions.forEach((func) => {
    if (func.getJsDocs().length === 0) {
      const name = func.getName() || "Anonymous";
      func.addJsDoc({
        description: `Function for ${formatName(name)}.\nTODO: add specific logic description here if needed for debugging.`,
      });
    }
  });

  // Add JSDoc to Variable Statements (typically React components or utility arrows)
  const varStatements = file.getVariableStatements();
  varStatements.forEach((stmt) => {
    if (stmt.getJsDocs().length === 0) {
      const declarations = stmt.getDeclarations();
      if (declarations.length > 0) {
        const decl = declarations[0];
        const init = decl.getInitializer();
        if (init && (init.getKind() === SyntaxKind.ArrowFunction || init.getKind() === SyntaxKind.FunctionExpression)) {
          const name = decl.getName();
          // Skip simple hook variables inside components, only export variables or top level?
          // To be safe, let's only do it for top-level exported variables, or components (starting with Uppercase).
          if (stmt.isExported() || /^[A-Z]/.test(name)) {
             stmt.addJsDoc({
               description: `Component/Function ${formatName(name)}.\nUsed to render or handle logic for ${name}.`,
             });
          }
        }
      }
    }
  });
});

console.log("Saving changes...");
project.saveSync();
console.log("Done.");
