
#!/usr/bin/env node

// GitHub Pages deployment script
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

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

console.log(`${colors.cyan}${colors.bright}🦖 DinoTradez GitHub Pages Deployment${colors.reset}`);
console.log(`${colors.cyan}=====================================${colors.reset}\n`);

try {
  // Build the project with production settings
  console.log(`${colors.blue}📦 Building project...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } });
  console.log(`${colors.green}✅ Build completed successfully!${colors.reset}`);

  // Verify the build output exists
  const distPath = path.join(__dirname, 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('dist directory not found! Build may have failed silently.');
  }

  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('index.html not found in dist folder! Build output is incomplete.');
  }

  // Create .nojekyll file (needed for GitHub Pages)
  console.log(`\n${colors.blue}📄 Creating .nojekyll file...${colors.reset}`);
  fs.writeFileSync(path.join(distPath, '.nojekyll'), '');
  console.log(`${colors.green}✅ .nojekyll file created!${colors.reset}`);

  // Create 404.html for SPA routing
  console.log(`\n${colors.blue}📄 Creating 404.html file...${colors.reset}`);
  fs.copyFileSync(indexPath, path.join(distPath, '404.html'));
  console.log(`${colors.green}✅ 404.html file created!${colors.reset}`);

  // Create a deployment timestamp file
  const timestamp = new Date().toISOString();
  console.log(`\n${colors.blue}📄 Creating deployment timestamp file...${colors.reset}`);
  fs.writeFileSync(path.join(distPath, 'deploy-timestamp.txt'), `Deployed on: ${timestamp}`);
  console.log(`${colors.green}✅ Timestamp file created!${colors.reset}`);

  // Deploy to GitHub Pages
  console.log(`\n${colors.blue}🚀 Deploying to GitHub Pages...${colors.reset}`);
  console.log(`${colors.yellow}This may take a few minutes...${colors.reset}`);
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });
  console.log(`${colors.green}✅ Deployment submitted successfully!${colors.reset}`);

  console.log(`\n${colors.cyan}${colors.bright}Deployment Information:${colors.reset}`);
  console.log(`${colors.yellow}• Deployment timestamp: ${timestamp}${colors.reset}`);
  console.log(`${colors.yellow}• Your site should be available at:${colors.reset}`);
  console.log(`  ${colors.bright}https://jjsppl.github.io/dinotradez/${colors.reset}`);
  
  console.log(`\n${colors.yellow}⚠️ Important Notes:${colors.reset}`);
  console.log(`${colors.yellow}• GitHub Pages deployment typically takes 1-5 minutes to process${colors.reset}`);
  console.log(`${colors.yellow}• You can check deployment status in the GitHub repository's Actions tab${colors.reset}`);
  console.log(`${colors.yellow}• To verify the deployment, wait a few minutes and then visit:${colors.reset}`);
  console.log(`  ${colors.bright}https://jjsppl.github.io/dinotradez/deploy-timestamp.txt${colors.reset}`);
  console.log(`  If you see "${timestamp}", your deployment is live${colors.reset}`);
  
  // Provide a function to check deployment status
  console.log(`\n${colors.blue}Checking deployment status...${colors.reset}`);
  console.log(`${colors.yellow}Will check again in 60 seconds...${colors.reset}`);
  
  // Set a timeout to check the deployment after 60 seconds
  setTimeout(() => {
    checkDeploymentStatus('https://jjsppl.github.io/dinotradez/deploy-timestamp.txt', timestamp);
  }, 60000);

} catch (error) {
  console.error(`\n${colors.red}❌ Error during deployment:${colors.reset}`, error);
  process.exit(1);
}

// Function to check if deployment is live
function checkDeploymentStatus(url, expectedTimestamp) {
  https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (data.includes(expectedTimestamp)) {
        console.log(`\n${colors.green}✅ Deployment confirmed live!${colors.reset}`);
        console.log(`${colors.green}Your site is now available at:${colors.reset}`);
        console.log(`${colors.bright}https://jjsppl.github.io/dinotradez/${colors.reset}`);
      } else {
        console.log(`\n${colors.yellow}⚠️ Deployment not yet detected.${colors.reset}`);
        console.log(`${colors.yellow}This is normal - GitHub Pages deployments can take up to 10 minutes.${colors.reset}`);
        console.log(`${colors.yellow}Try visiting your site in a few minutes:${colors.reset}`);
        console.log(`${colors.bright}https://jjsppl.github.io/dinotradez/${colors.reset}`);
      }
    });
  }).on('error', (err) => {
    console.log(`\n${colors.yellow}⚠️ Could not verify deployment:${colors.reset}`, err.message);
    console.log(`${colors.yellow}GitHub Pages may still be processing your deployment.${colors.reset}`);
    console.log(`${colors.yellow}Check again in a few minutes at:${colors.reset}`);
    console.log(`${colors.bright}https://jjsppl.github.io/dinotradez/${colors.reset}`);
  });
}
