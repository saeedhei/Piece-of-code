const { execSync } = require("child_process");
const fs = require("fs");
const readline = require("readline");

// Helper function to run shell commands
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing ${command}`, error);
    process.exit(1);
  }
};

// Function to prompt user for input
const askUser = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans);
  }));
};

const setupProject = async () => {
  // Step 1: Initialize a new npm project
  console.log("Initializing npm project...");
  runCommand("npm init -y");

  // Ask user if they want to install Express with TypeScript
  const userInput = await askUser("Do you want to install Express with TypeScript? (yes/no): ");

  if (userInput.toLowerCase() === 'yes') {
    // Step 2: Install express and TypeScript packages
    console.log("Installing Express and TypeScript...");
    runCommand("npm install express");
    runCommand("npm install typescript ts-node @types/node @types/express --save-dev");

    // Step 3: Create tsconfig.json file for TypeScript
    console.log("Creating TypeScript configuration...");
    const tsConfig = {
      compilerOptions: {
        module: "NodeNext",
        rootDir: "./src",
        outDir: "./dist",
        strict: true,
        esModuleInterop: true,
      },
    };
    fs.writeFileSync("tsconfig.json", JSON.stringify(tsConfig, null, 2));

    // Step 4: Create basic Express app in TypeScript
    console.log("Setting up Express app in TypeScript...");

    // Create src directory
    if (!fs.existsSync("src")) fs.mkdirSync("src");

    const expressApp = `
    import express from 'express';

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get('/', (req, res) => {
      res.send('Hello, TypeScript with Express!');
    });

    app.listen(PORT, () => {
      console.log(\`Server is running at http://localhost:\${PORT}\`);
    });
    `;

    fs.writeFileSync("src/index.ts", expressApp);

    // Step 5: Ask about linting code
    const lintInput = await askUser("Do you want to lint your code with ESLint? (yes/no): ");

    if (lintInput.toLowerCase() === 'yes') {
      // Step 6: Install ESLint for TypeScript
      console.log("Installing ESLint for TypeScript...");
      runCommand("npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev");

      // Step 7: Create ESLint configuration file for TypeScript
      const eslintConfigTs = `
      export default [
          {
              files: ["src/**/*.ts"],
              ignores: ["**/*.config.js", "!**/eslint.config.js"],
              rules: {
                  semi: "error"
              }
          }
      ];
      `;
      fs.writeFileSync("eslint.config.mjs", eslintConfigTs); // Changed to eslint.config.js

      // Step 8: Add lint script to package.json
      console.log("Adding lint script to package.json...");
      const packageJson = JSON.parse(fs.readFileSync("package.json"));
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.lint = "eslint . --fix"; // Add lint script
      fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

    } else {
      console.log("Skipping ESLint setup.");
    }

    // Step 9: Add start script to package.json
    console.log("Adding start script to package.json...");
    const packageJson = JSON.parse(fs.readFileSync("package.json"));
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.start = "ts-node src/index.ts";
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

    console.log("Setup complete! To start the server, run:\n");
    console.log("  npm start");

  } else {
    // Install only express for JavaScript
    console.log("Installing Express for JavaScript...");
    runCommand("npm install express");

    // Create basic Express app in JavaScript
    console.log("Setting up Express app in JavaScript...");

    // Create src directory
    if (!fs.existsSync("src")) fs.mkdirSync("src");

    const expressAppJs = `
    const express = require('express');

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get('/', (req, res) => {
      res.send('Hello, Express!');
    });

    app.listen(PORT, () => {
      console.log(\`Server is running at http://localhost:\${PORT}\`);
    });
    `;

    fs.writeFileSync("src/index.js", expressAppJs);

    // Step 5: Ask about linting code
    const lintInput = await askUser("Do you want to lint your code with ESLint? (yes/no): ");

    if (lintInput.toLowerCase() === 'yes') {
      // Step 6: Install ESLint for JavaScript
      console.log("Installing ESLint for JavaScript...");
      runCommand("npm install eslint --save-dev");

      // Step 7: Create ESLint configuration file for JavaScript
      const eslintConfigJs = `
      export default [
          {
              files: ["src/**/*.js"],
              ignores: ["**/*.config.js", "!**/eslint.config.js"],
              rules: {
                  semi: "error"
              }
          }
      ];
      `;
      fs.writeFileSync("eslint.config.js", eslintConfigJs); // Changed to eslint.config.js

      // Step 8: Add lint script to package.json
      console.log("Adding lint script to package.json...");
      const packageJsonJs = JSON.parse(fs.readFileSync("package.json"));
      packageJsonJs.scripts = packageJsonJs.scripts || {};
      packageJsonJs.scripts.lint = "eslint . --fix"; // Add lint script
      fs.writeFileSync("package.json", JSON.stringify(packageJsonJs, null, 2));

    } else {
      console.log("Skipping ESLint setup.");
    }

    // Step 9: Add start script to package.json
    console.log("Adding start script to package.json...");
    const packageJsonJs = JSON.parse(fs.readFileSync("package.json"));
    packageJsonJs.scripts = packageJsonJs.scripts || {};
    packageJsonJs.scripts.start = "node src/index.js";
    fs.writeFileSync("package.json", JSON.stringify(packageJsonJs, null, 2));

    console.log("Setup complete! To start the server, run:\n");
    console.log("  npm start");
  }
};

// Execute the setup project
setupProject();
