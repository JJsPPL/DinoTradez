
// Enhanced deployment script for GitHub Pages
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}${colors.bright}===== DinoTradez GitHub Pages Deployment =====\n${colors.reset}`);

try {
  // Step 1: Build the project with production settings
  console.log(`${colors.blue}Building project for production...${colors.reset}`);
  execSync('npm run build', { 
    stdio: 'inherit', 
    env: { ...process.env, NODE_ENV: 'production' } 
  });
  console.log(`${colors.green}✓ Build completed successfully!${colors.reset}\n`);

  // Step 2: Verify the build output
  console.log(`${colors.blue}Verifying build output...${colors.reset}`);
  
  const distPath = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('dist directory not found! Build may have failed.');
  }
  
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('index.html not found in dist folder! Build output is incomplete.');
  }
  
  console.log(`${colors.green}✓ Build verification passed!${colors.reset}\n`);

  // Step 3: Create necessary files for GitHub Pages
  console.log(`${colors.blue}Creating GitHub Pages configuration files...${colors.reset}`);
  
  // Create .nojekyll file (prevents GitHub Pages from ignoring files that begin with an underscore)
  fs.writeFileSync(path.join(distPath, '.nojekyll'), '');
  
  // Create 404.html for SPA routing support
  fs.copyFileSync(indexPath, path.join(distPath, '404.html'));
  
  console.log(`${colors.green}✓ GitHub Pages configuration files created!${colors.reset}\n`);

  // Step 4: Deploy to GitHub Pages using gh-pages
  console.log(`${colors.blue}Deploying to GitHub Pages...${colors.reset}`);
  console.log(`${colors.yellow}This may take a moment...${colors.reset}`);
  
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });
  
  console.log(`\n${colors.green}✓ Deployment successful!${colors.reset}`);
  console.log(`\n${colors.cyan}Your site should now be available at:${colors.reset}`);
  console.log(`${colors.bright}https://jjsppl.github.io/dinotradez/${colors.reset}`);
  console.log(`\n${colors.yellow}Note: It may take a few minutes for the changes to propagate.${colors.reset}`);

} catch (error) {
  console.error(`\n${colors.red}Error during deployment:${colors.reset}`, error);
  process.exit(1);
}
