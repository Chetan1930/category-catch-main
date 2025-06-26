
# LinkVault 🔗

A modern, elegant link management application that helps you organize and categorize your favorite websites with ease.

## 🌟 Features

- **Smart Link Management**: Add links with automatic title fetching and favicon display
- **Auto-Categorization**: Links are automatically categorized based on their domain
- **Custom Categories**: Create your own categories for better organization
- **Local Storage**: All your links are stored locally in your browser
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Glass Morphism UI**: Modern, elegant interface with smooth animations
- **Link Validation**: Automatic URL validation and normalization

## 🚀 Live Demo

Check out the live application: [https://catchlinks.netlify.app/](https://catchlinks.netlify.app/)

## 📸 Screenshots

![LinkVault Interface](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=LinkVault+Interface)

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server
- **Local Storage API** - Client-side data persistence

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chetan1930/category-catch-main.git
   cd category-catch-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📖 How to Use

1. **Adding Links**: 
   - Paste or type any URL in the input field
   - The app will automatically fetch the page title and favicon
   - Choose an existing category or create a new one
   - Click "Add Link" to save

2. **Managing Categories**:
   - Links are automatically categorized based on their domain
   - Create custom categories using the "+" button
   - All categories are displayed as organized sections

3. **Organizing Links**:
   - Links are grouped by categories for easy browsing
   - Each link shows its favicon, title, and URL
   - Click on any link to visit the website

## 🎨 Design Features

- **Glass Morphism**: Modern translucent design elements
- **Smooth Animations**: Subtle hover effects and transitions
- **Responsive Layout**: Adapts to different screen sizes
- **Clean Typography**: Easy-to-read Inter font
- **Accessible Colors**: High contrast for better readability

## 🔧 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── LinkForm.tsx     # Form for adding new links
│   ├── LinkCard.tsx     # Individual link display component
│   ├── CategorySection.tsx # Category grouping component
│   └── EmptyState.tsx   # Empty state component
├── utils/
│   └── linkUtils.ts     # Link processing utilities
├── hooks/
│   └── useLocalStorage.ts # Local storage hook
└── pages/
    └── Index.tsx        # Main application page
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Chetan**
- GitHub: [@Chetan1930](https://github.com/Chetan1930)

## 🙏 Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Design inspiration from modern web applications

---

⭐ Star this repository if you find it helpful!
