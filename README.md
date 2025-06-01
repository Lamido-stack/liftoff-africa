# Liftoff Africa - Space Education NGO Website

A modern, visually stunning website for an African NGO focused on space education for kids and young adults across the continent. Built with React, TypeScript, Vite, and Three.js for interactive 3D rocket depictions.

## About Liftoff Africa

Liftoff Africa is dedicated to inspiring the next generation of African space explorers, scientists, and engineers. Through innovative education programs, we're building Africa's space future one student at a time.

## Features

- 🚀 **Interactive 3D Rocket**: Beautiful Three.js animated rocket model
- 🌟 **Modern Design**: Clean, playful, and educational UI/UX
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Fast**: Built with Vite for optimal performance
- 🎨 **Smooth Animations**: Engaging user experience
- 📧 **Contact Form**: Get in touch functionality

## Sections

- **Hero**: Eye-catching landing with 3D rocket animation
- **About**: Mission, vision, and impact statistics
- **Programs**: Educational offerings and workshops
- **Events**: Upcoming space education events
- **Contact**: Contact form and organization details

## Technologies Used

- React 18 with TypeScript
- Vite for build tooling
- Three.js with React Three Fiber for 3D graphics
- CSS Grid and Flexbox for responsive layouts
- Modern CSS with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── Rocket.tsx      # 3D rocket component
│   ├── Navigation.tsx  # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Programs.tsx    # Programs section
│   ├── Events.tsx      # Events section
│   └── Contact.tsx     # Contact section
├── App.tsx             # Main app component
├── App.css             # Main styles
├── index.css           # Global styles
└── main.tsx            # App entry point
```

## Customization

The website is designed to be easily customizable:

- **Colors**: Update the CSS custom properties in `App.css`
- **Content**: Modify the text and data in each component
- **3D Model**: Enhance the rocket model in `Rocket.tsx`
- **Sections**: Add or modify sections as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
