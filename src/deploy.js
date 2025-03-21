
// This is a simple deploy script that you can run with Node.js
// to automate the GitHub Pages deployment process

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
};

console.log(`${colors.fg.cyan}${colors.bright}===== DinoTradez GitHub Pages Deployment =====\n${colors.reset}`);

try {
  // Step 1: Build the project
  console.log(`${colors.fg.blue}Building project...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`${colors.fg.green}Build completed successfully!${colors.reset}\n`);

  // Step 2: Make sure the dist folder has proper base path in assets
  console.log(`${colors.fg.blue}Verifying build output...${colors.reset}`);
  
  // Check that index.html exists
  const distPath = path.join(__dirname, '..', 'dist');
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    throw new Error('index.html not found in dist folder');
  }
  
  console.log(`${colors.fg.green}Build verification completed!${colors.reset}\n`);

  // Step 3: Create .nojekyll file to disable Jekyll processing
  console.log(`${colors.fg.blue}Creating .nojekyll file...${colors.reset}`);
  fs.writeFileSync(path.join(distPath, '.nojekyll'), '');
  console.log(`${colors.fg.green}.nojekyll file created!${colors.reset}\n`);

  // Step 4: Deploy to GitHub Pages using gh-pages branch
  console.log(`${colors.fg.blue}Deploying to GitHub Pages...${colors.reset}`);
  
  console.log(`${colors.fg.yellow}NOTE: You need to manually run the following commands:${colors.reset}`);
  console.log(`
  ${colors.fg.white}1. Initialize git repository if not done yet:${colors.reset}
     git init
  
  ${colors.fg.white}2. Add GitHub remote (replace with your username):${colors.reset}
     git remote add origin https://github.com/JJsPPL/DinoTradez.git
  
  ${colors.fg.white}3. Create and switch to gh-pages branch:${colors.reset}
     git checkout --orphan gh-pages
  
  ${colors.fg.white}4. Remove all files except dist folder:${colors.reset}
     git rm -rf .
  
  ${colors.fg.white}5. Copy all files from dist folder to root:${colors.reset}
     cp -r dist/* .
  
  ${colors.fg.white}6. Add all files to git:${colors.reset}
     git add .
  
  ${colors.fg.white}7. Commit changes:${colors.reset}
     git commit -m "Deploy to GitHub Pages"
  
  ${colors.fg.white}8. Push to GitHub:${colors.reset}
     git push -f origin gh-pages
  
  ${colors.fg.white}9. Switch back to main branch:${colors.reset}
     git checkout main
  `);

  console.log(`${colors.fg.cyan}${colors.bright}===== Deployment Instructions Complete =====\n${colors.reset}`);
  console.log(`${colors.fg.yellow}After pushing to the gh-pages branch, your site will be available at:${colors.reset}`);
  console.log(`${colors.fg.green}https://jjsppl.github.io/DinoTradez/${colors.reset}\n`);
  console.log(`${colors.fg.yellow}It may take a few minutes for the changes to be visible.${colors.reset}`);

} catch (error) {
  console.error(`${colors.fg.red}Error during deployment:${colors.reset}`, error);
  process.exit(1);
}
