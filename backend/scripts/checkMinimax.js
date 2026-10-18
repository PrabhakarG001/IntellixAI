import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { inspectMinimax } from '../services/minimaxDiagnostics.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true });
const result = await inspectMinimax({ live: process.argv.includes('--live') });
console.log(JSON.stringify(result, null, 2));
if (result.error) process.exitCode = 1;
