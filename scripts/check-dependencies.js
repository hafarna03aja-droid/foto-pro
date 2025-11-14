import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Checking dependencies...\n');

// Check package.json exists
const packagePath = join(rootDir, 'package.json');
if (!existsSync(packagePath)) {
  console.error('❌ package.json not found!');
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));

// Check critical dependencies
const criticalDeps = {
  'react': packageJson.dependencies?.react,
  'react-dom': packageJson.dependencies?.['react-dom'],
  '@google/generative-ai': packageJson.dependencies?.['@google/generative-ai'],
};

let hasErrors = false;

console.log('📦 Critical Dependencies:');
for (const [name, version] of Object.entries(criticalDeps)) {
  if (version) {
    console.log(`  ✅ ${name}: ${version}`);
  } else {
    console.log(`  ❌ ${name}: NOT FOUND`);
    hasErrors = true;
  }
}

// Check .env file
console.log('\n🔐 Environment Configuration:');
const envPath = join(rootDir, '.env');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  if (envContent.includes('VITE_API_KEY=')) {
    const hasRealKey = !envContent.includes('your_google_ai_api_key_here');
    if (hasRealKey) {
      console.log('  ✅ .env file exists with API key');
    } else {
      console.log('  ⚠️  .env file exists but using placeholder key');
    }
  } else {
    console.log('  ❌ .env file missing VITE_API_KEY');
    hasErrors = true;
  }
} else {
  console.log('  ❌ .env file not found');
  console.log('  ℹ️  Run: cp .env.example .env');
  hasErrors = true;
}

// Check node_modules
console.log('\n📁 Installation Status:');
const nodeModulesPath = join(rootDir, 'node_modules');
if (existsSync(nodeModulesPath)) {
  console.log('  ✅ node_modules folder exists');
  
  // Check if @google/generative-ai is installed
  const genaiPath = join(nodeModulesPath, '@google', 'generative-ai');
  if (existsSync(genaiPath)) {
    console.log('  ✅ @google/generative-ai is installed');
  } else {
    console.log('  ❌ @google/generative-ai is NOT installed');
    console.log('  ℹ️  Run: npm install @google/generative-ai');
    hasErrors = true;
  }
} else {
  console.log('  ❌ node_modules not found');
  console.log('  ℹ️  Run: npm install');
  hasErrors = true;
}

console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Some checks failed. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('✅ All checks passed! You\'re ready to go!');
  console.log('ℹ️  Run: npm run dev');
}
