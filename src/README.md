
# DinoTradez

## Trading Dashboard for Stock Analysis and Watchlist

DinoTradez is a powerful trading dashboard designed to help you track stocks, analyze market data, and make informed trading decisions.

![DinoTradez Dashboard](public/lovable-uploads/12b50228-d144-48d1-b6cb-930e56cf06f1.png)

## Features

- **Stock Watchlist**: Track your favorite stocks with real-time data
- **Technical Analysis**: View charts, indicators, and trends
- **Darkpool Data**: Monitor institutional trading activity
- **Block Trade Analysis**: Track large market transactions
- **Responsive Design**: Works on desktop and mobile devices

## Deployment Instructions

### To deploy this project to GitHub Pages:

1. Make sure you have the latest code:
   ```
   git clone https://github.com/JJsPPL/DinoTradez.git
   cd DinoTradez
   npm install
   ```

2. Build the project:
   ```
   npm run build
   ```

3. Create a gh-pages branch:
   ```
   git checkout --orphan gh-pages
   ```

4. Remove all tracked files:
   ```
   git rm -rf .
   ```

5. Copy files from dist to root:
   ```
   cp -r dist/* .
   ```

6. Create a .nojekyll file to disable Jekyll processing:
   ```
   touch .nojekyll
   ```

7. Add, commit and push:
   ```
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push -f origin gh-pages
   ```

8. Return to main branch:
   ```
   git checkout main
   ```

9. Your site should now be available at:
   ```
   https://jjsppl.github.io/DinoTradez/
   ```

## Common GitHub Pages Issues

If your site shows a blank page:

1. Check that your repository settings have GitHub Pages enabled with the gh-pages branch
2. Ensure all path references use relative paths, not absolute paths
3. Check browser console for errors (F12 key)
4. Verify that the base path in vite.config.ts matches your repository name

## Local Development

```
npm install
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
