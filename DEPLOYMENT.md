# Deployment Guide for Barry Memorial Website

## Quick Deployment to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `barry-memorial` (or your preferred name)
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### Step 2: Push Your Code
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Barry memorial website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/barry-memorial.git

# Push to GitHub
git push -u origin main
```

### Step 3: Update Package.json
Update the `homepage` field in `package.json` to match your repository:
```json
"homepage": "https://YOUR_USERNAME.github.io/barry-memorial"
```

### Step 4: Deploy to GitHub Pages
```bash
npm run deploy
```

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Click "Save"

Your website will be available at: `https://YOUR_USERNAME.github.io/barry-memorial`

## Custom Domain (Optional)

If you have a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Update the `homepage` field in `package.json` to your custom domain

## Updating the Website

To make changes and redeploy:
1. Make your changes to the code
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Update memorial content"
   git push origin main
   ```
3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run lint`
- Test build locally: `npm run build`

### GitHub Pages Not Updating
- Wait 5-10 minutes for GitHub Pages to update
- Check the Actions tab in your repository for deployment status
- Ensure the `gh-pages` branch exists and has content

### 404 Errors
- Verify the `base` path in `vite.config.ts` matches your repository name
- Check that the `homepage` in `package.json` is correct
- Ensure GitHub Pages is enabled and pointing to the `gh-pages` branch

## File Structure After Deployment

```
barry-memorial/
├── public/           # Static assets
├── src/             # Source code
├── dist/            # Built files (created during build)
├── package.json     # Dependencies and scripts
├── vite.config.ts   # Vite configuration
└── README.md        # Documentation
```

The `gh-pages` branch will contain the contents of the `dist/` folder, which is what GitHub Pages serves.
