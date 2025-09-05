import { readdirSync, statSync } from "fs";
import path from "path";

function loadBallrinaFiles(dir: string): string[] {
    let files: string[] = []
    for (const file of readdirSync(dir)) {
        const fullPath = path.join(dir, file);

        if (statSync(fullPath).isDirectory()) {
            files = files.concat(loadBallrinaFiles(fullPath))
        } else if (file.endsWith('.bal')) {
            files.push(fullPath);
        }
    }
    return files;
}

const files = loadBallrinaFiles('./ballerina');
console.log(files);