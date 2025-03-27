
#!/usr/bin/env node

// GitHub Pages deployment script
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🦖 DinoTradez GitHub Pages Deployment');
console.log('====================================');

try {
  // Build the project with production settings
  console.log('\n📦 Building project...');
  execSync('npm run build', { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } });
  console.log('✅ Build completed successfully!');

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
  console.log('\n📄 Creating .nojekyll file...');
  fs.writeFileSync(path.join(distPath, '.nojekyll'), '');
  console.log('✅ .nojekyll file created!');

  // Create 404.html for SPA routing
  console.log('\n📄 Creating 404.html file...');
  fs.copyFileSync(indexPath, path.join(distPath, '404.html'));
  console.log('✅ 404.html file created!');

  // Deploy to GitHub Pages
  console.log('\n🚀 Deploying to GitHub Pages...');
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });
  console.log('✅ Deployment successful!');

  console.log('\n🎉 Your site should now be available at:');
  console.log('https://jjsppl.github.io/dinotradez/');
  console.log('\n⚠️ Note: It may take a few minutes for changes to appear.');

} catch (error) {
  console.error('\n❌ Error during deployment:', error);
  process.exit(1);
}
