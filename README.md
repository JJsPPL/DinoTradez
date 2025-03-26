
# DinoTradez

DinoTradez is a modern stock trading dashboard that helps you monitor market trends and stocks.

## Features

- Stock watchlist tracking
- Technical analysis tools
- User-friendly interface
- Responsive design for all devices

## Important: GitHub Pages Deployment

To deploy this application to GitHub Pages:

1. Make sure the `base` path in `vite.config.ts` matches your repository name exactly:
   ```javascript
   // In vite.config.ts
   base: "/DinoTradez/",
   ```

2. Push your changes to the main branch to trigger the GitHub Actions workflow.

3. If you need to manually deploy:
   ```bash
   # Build the project
   npm run build
   
   # Create .nojekyll file to disable Jekyll processing
   touch dist/.nojekyll
   
   # Deploy to GitHub Pages
   npx gh-pages -d dist
   ```

4. After deployment, your site should be available at:
   ```
   https://jjsppl.github.io/DinoTradez/
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
