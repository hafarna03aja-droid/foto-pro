import { existsSync, copyFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Starting Foto PRO Setup...\n');

// Step 1: Check .env
console.log('📋 Step 1: Checking .env file...');
const envPath = join(rootDir, '.env');
const envExamplePath = join(rootDir, '.env.example');

if (!existsSync(envPath)) {
  if (existsSync(envExamplePath)) {
    console.log('   Creating .env from .env.example...');
    copyFileSync(envExamplePath, envPath);
    console.log('   ✅ .env file created');
    console.log('   ⚠️  Please edit .env and add your API key!');
  } else {
    console.log('   ❌ .env.example not found!');
    process.exit(1);
  }
} else {
  console.log('   ✅ .env file exists');
  
  // Check if API key is set
  const envContent = readFileSync(envPath, 'utf-8');
  if (envContent.includes('your_google_ai_api_key_here')) {
    console.log('   ⚠️  API key not set yet. Please edit .env');
  } else {
    console.log('   ✅ API key appears to be set');
  }
}

// Step 2: Check node_modules
console.log('\n📦 Step 2: Checking dependencies...');
const nodeModulesPath = join(rootDir, 'node_modules');

if (!existsSync(nodeModulesPath)) {
  console.log('   Installing dependencies...');
  try {
    await execAsync('npm install', { cwd: rootDir });
    console.log('   ✅ Dependencies installed');
  } catch (error) {
    console.log('   ❌ Failed to install dependencies');
    console.error(error.message);
    process.exit(1);
  }
} else {
  console.log('   ✅ node_modules exists');
}

// Step 3: Check @google/genai
console.log('\n🤖 Step 3: Checking @google/genai...');
const genaiPath = join(nodeModulesPath, '@google', 'genai');

if (!existsSync(genaiPath)) {
  console.log('   Installing @google/genai...');
  try {
    await execAsync('npm install @google/genai', { cwd: rootDir });
    console.log('   ✅ @google/genai installed');
  } catch (error) {
    console.log('   ❌ Failed to install @google/genai');
    console.error(error.message);
    process.exit(1);
  }
} else {
  console.log('   ✅ @google/genai is installed');
}

// Final message
console.log('\n' + '='.repeat(50));
console.log('✅ Setup completed successfully!\n');
console.log('Next steps:');
console.log('1. Edit .env file and add your Google AI API key');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:5173\n');
console.log('For help, see: QUICKSTART.md');
console.log('='.repeat(50));
