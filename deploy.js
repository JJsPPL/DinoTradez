
#!/usr/bin/env node

// Simple script to deploy to GitHub Pages
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🦖 DinoTradez GitHub Pages Deployment');
console.log('====================================');

try {
  // Build the project
  console.log('\n📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');

  // Create .nojekyll file
  console.log('\n📄 Creating .nojekyll file...');
  fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');
  console.log('✅ .nojekyll file created!');

  // Create 404.html for SPA routing
  console.log('\n📄 Creating 404.html file...');
  fs.copyFileSync(
    path.join(__dirname, 'dist', 'index.html'),
    path.join(__dirname, 'dist', '404.html')
  );
  console.log('✅ 404.html file created!');

  // Deploy to GitHub Pages
  console.log('\n🚀 Deploying to GitHub Pages...');
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });
  console.log('✅ Deployment successful!');

  console.log('\n🎉 Your site should now be available at:');
  console.log('https://jjsppl.github.io/DinoTradezLovable/');
  console.log('\n⚠️ Note: It may take a few minutes for changes to appear.');

} catch (error) {
  console.error('\n❌ Error during deployment:', error);
  process.exit(1);
}
