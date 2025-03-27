
# DinoTradez

DinoTradez is a modern stock trading dashboard that helps you monitor market trends and stocks.

## Features

- Stock watchlist tracking
- Technical analysis tools
- Darkpool data analysis
- User-friendly interface
- Responsive design for all devices

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages. 

### Automatic Deployment

When you push to the main branch, GitHub Actions will automatically build and deploy your site to GitHub Pages.

### Manual Deployment

To manually deploy the application:

```bash
# Option 1: Using npm script
npm run deploy

# Option 2: Running the deploy script directly
node deploy.js
```

After deployment, your site will be available at:
```
https://jjsppl.github.io/dinotradez/
```

## Development

This project is built with:
- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## License

MIT
