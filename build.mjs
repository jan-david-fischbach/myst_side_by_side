import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create dist directory if it doesn't exist
try {
  mkdirSync(`${__dirname}/dist`, { recursive: true });
} catch (e) {
  // Directory might already exist
}

// Copy the plugin file to dist
const pluginContent = readFileSync(`${__dirname}/plugin.mjs`, 'utf-8');
writeFileSync(`${__dirname}/dist/index.mjs`, pluginContent);

console.log('Build complete! Plugin copied to dist/index.mjs');
