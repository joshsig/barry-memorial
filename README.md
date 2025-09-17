# Barry Memorial Website

A beautiful and respectful memorial website created with Vite and React, designed to honor the memory of Barry.

## Features

- **Responsive Design**: Works beautifully on all devices
- **Elegant Layout**: Clean, respectful design with thoughtful typography
- **Memory Sections**: Dedicated areas for memories, tributes, and life timeline
- **Photo Gallery**: Space for cherished photographs
- **Timeline**: Visual representation of life milestones
- **GitHub Pages Ready**: Configured for easy deployment

## Sections

1. **Header**: Memorial title with name and dates
2. **Hero Section**: Main photo and memorial quote
3. **Memories & Tributes**: Three memory cards for different aspects of life
4. **Life Timeline**: Chronological events and milestones
5. **Photo Gallery**: Grid layout for multiple photos
6. **Share Memories**: Section for visitor tributes
7. **Footer**: Memorial closing message

## Customization

To personalize this memorial page:

1. **Update Personal Information**:
   - Edit `src/App.tsx` to change the name from "Barry" to the person's name
   - Update birth and death dates in the header section
   - Replace placeholder text with personal memories and stories

2. **Add Photos**:
   - Replace placeholder images in the hero section and gallery
   - Add actual photos to the `public/` directory
   - Update image references in the JSX

3. **Customize Timeline**:
   - Replace placeholder timeline events with actual life milestones
   - Add or remove timeline items as needed

4. **Update Styling**:
   - Modify colors in `src/App.css` to match preferences
   - Adjust fonts, spacing, and layout as desired

## Development

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages:

### Initial Setup
1. Create a new repository on GitHub named `barry-memorial` (or your preferred name)
2. Push this code to your repository
3. Update the `homepage` field in `package.json` to match your repository URL

### Deploy
```bash
npm run deploy
```

This will:
1. Build the project for production
2. Deploy the built files to the `gh-pages` branch
3. Make your site available at `https://[your-username].github.io/barry-memorial`

### GitHub Pages Configuration
1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Set the source to "Deploy from a branch"
4. Select the `gh-pages` branch
5. Your site will be available at the provided URL

## Customization Notes

- **Static Site**: This is a static website, so interactive features like comment forms would require additional backend services
- **Photo Placeholders**: Replace placeholder divs with actual `<img>` tags pointing to your photos
- **Content Updates**: All content is in the React components and can be easily modified
- **Responsive**: The design automatically adapts to different screen sizes

## Browser Support

This website works in all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

---

*Created with love and respect to honor precious memories.*