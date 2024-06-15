import { exec } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

const Logger = {
  success: (message: string) => globalThis.console.log(`🚀 ${message}`),
  info: (message: string) => globalThis.console.info(`📝 ${message}`),
  error: (message: string) => globalThis.console.error(`🔴 ${message}`),
  divider: () => globalThis.console.log("------------------------"),
};

const execAsync = promisify(exec);

async function main() {
  try {
    const repoUrl = process.argv[2];

    if (!repoUrl) {
      Logger.error(
        "Missing repo url 👉 Usage: bun run index.ts <github_repo_url>"
      );
      process.exit(1);
    }

    const repoName = path.basename(repoUrl, ".git");

    const parentDir = path.resolve("..");

    Logger.info(`Changing directory to ${parentDir}...`);
    Logger.divider();

    process.chdir(parentDir);

    Logger.info(`Cloning repo ${repoUrl}...`);
    Logger.divider();

    await execAsync(`git clone ${repoUrl}`);

    Logger.success(`Repo ${repoUrl} cloned in ${parentDir}`);
    Logger.divider();

    const repoDir = path.resolve(parentDir, repoName);

    process.chdir(repoDir);

    Logger.info(`Installing dependencies...`);
    Logger.divider();

    await execAsync("npm install");

    Logger.success(`Dependencies installed`);
    Logger.divider();

    Logger.info(`Next steps:`);

    Logger.info(`cd ${repoDir}`);

    process.exit(0);
  } catch (error) {
    Logger.error((error as Error).message);

    process.exit(1);
  }
}

main();
