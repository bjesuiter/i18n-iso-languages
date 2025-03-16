import fs from "node:fs/promises";
import { unraw } from "unraw";

async function main() {
    const jsonString = await fs.readFile(process.argv[2], "utf-8");
    let json = JSON.parse(jsonString) as {
        locale: string;
        languages: Record<string, string>;
    };

    json.languages = Object.fromEntries(Object.entries(json.languages).filter(([key, val]) => key.length > 2 || !val.includes("_")))

    await fs.writeFile(process.argv[2], JSON.stringify(json, null, 2));
}

main();