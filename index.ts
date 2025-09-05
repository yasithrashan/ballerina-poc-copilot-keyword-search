import { readdirSync, readFileSync, statSync } from "fs";
import path from "path";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

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

function readFileContents(files: string[]): string[] {
    return files.map((filePath) => readFileSync(filePath, 'utf8'))
}

const files = loadBallrinaFiles('./ballerina');
const fileContents = readFileContents(files);
console.log(fileContents);