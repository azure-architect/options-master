import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { ThemeProvider } from './components/ThemeSwitcher';
import OCCSymbolPage from './pages/OCCSymbolPage';
import HomePage from './pages/HomePage';
import MarketOverview from './pages/MarketOverview';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex flex-1 relative">
            <Sidebar isOpen={isSidebarOpen} />
            {/* Overlay for mobile */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                onClick={toggleSidebar}
              />
            )}
            <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/occ-symbol" element={<OCCSymbolPage />} />
                <Route path="/marketoverview" element={<MarketOverview />} />
                {/* Add more routes as needed */}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;