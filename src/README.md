
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

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the main branch will trigger a GitHub Actions workflow that builds and deploys the site.

### Manual Deployment

You can also deploy manually:

```bash
# Using npm script
npm run deploy

# Or using the deploy script directly
node deploy.js
```

After deployment, your site will be available at:
```
https://jjsppl.github.io/DinoTradez/
```

## Troubleshooting Deployment

If your deployed site shows a blank page:

1. Check browser console (F12) for errors
2. Verify that all assets use relative paths
3. Ensure the repository settings have GitHub Pages enabled for the gh-pages branch
4. Check that the base path in vite.config.ts is set to "./"

## Local Development

```bash
npm install
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
