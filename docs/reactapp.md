# Options Master React App Documentation

## Project Overview
Options Master is a React-based web application for tracking and analyzing options trades. The application features a responsive design with a collapsible sidebar for mobile viewing.

## Project Structure
```
options-master/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Header.js
│   │       └── Sidebar.js
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── assets/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Dependencies
The project uses the following key dependencies:

```json
{
  "dependencies": {
    "react": "^18.x.x",
    "react-dom": "^18.x.x",
    "react-router-dom": "^6.x.x",
    "lucide-react": "^0.x.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x.x",
    "postcss": "^8.x.x",
    "autoprefixer": "^10.x.x"
  }
}
```

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd options-master
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Key Components

### Header Component (`src/components/layout/Header.js`)
- Contains the application title
- Houses the mobile menu toggle button
- Responsive design that adapts to different screen sizes

```jsx
import React from 'react';
import { Menu, X } from 'lucide-react';

function Header({ isSidebarOpen, toggleSidebar }) {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-md flex items-center justify-between">
      <button 
        onClick={toggleSidebar}
        className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className="text-2xl font-bold text-center flex-1 lg:text-left">Options Master</h1>
    </header>
  );
}
```

### Sidebar Component (`src/components/layout/Sidebar.js`)
- Navigation menu with links to different sections
- Responsive design that collapses on mobile
- Smooth transition animations

```jsx
function Sidebar({ isOpen }) {
  return (
    <nav className={`
      fixed lg:static
      inset-y-0 left-0
      transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
      transition-transform duration-200 ease-in-out
      w-64 bg-white shadow-lg h-[calc(100vh-64px)]
      z-30
    `}>
      {/* Navigation items */}
    </nav>
  );
}
```

## Styling
The project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Responsive Design
The application includes the following responsive breakpoints:
- Mobile: < 1024px (Collapsible sidebar with hamburger menu)
- Desktop: ≥ 1024px (Permanent sidebar)

## Navigation
The application uses React Router for navigation between different sections:
- Dashboard (/dashboard)
- Trade Log (/trades)
- Analysis (/analysis)
- Watchlist (/watchlist)

## State Management
Currently using React's built-in useState for local state management:
- Sidebar visibility state in App.js
- Additional state management solutions may be added as the application grows

## Future Development
The following sections are planned for development:
1. Dashboard with performance metrics
2. Trade logging system
3. Analysis tools
4. Watchlist management

## Contributing
1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request with a description of your changes

## Running Tests
```bash
npm test
```

## Building for Production
```bash
npm run build
```
This will create a production build in the `build` folder.