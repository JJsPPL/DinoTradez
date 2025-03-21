
# DinoTradez

DinoTradez is a modern stock trading dashboard that helps you monitor market trends and stocks.

## Features

- Stock watchlist tracking
- Technical analysis tools
- User-friendly interface
- Responsive design for all devices

## Important: Repository Setup

After creating your new repository on GitHub:

1. Update the `base` path in `vite.config.ts` to match your repository name:
   ```javascript
   // Change this line in vite.config.ts
   base: "/your-new-repo-name/",
   ```

2. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

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
