import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  LineChart, 
  Settings, 
  Home,
  Book,
  Calculator,
  DollarSign,
  History,
  Bell,
  Briefcase,
  PieChart
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const navigationItems = [
    {
      section: 'Dashboard',
      items: [
        { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
        { name: 'Portfolio', path: '/portfolio', icon: <Briefcase className="w-5 h-5" /> },
        { name: 'Watchlist', path: '/watchlist', icon: <Bell className="w-5 h-5" /> }
      ]
    },
    {
      section: 'Analysis',
      items: [
        { name: 'Market Overview', path: '/marketoverview', icon: <BarChart3 className="w-5 h-5" /> },
        { name: 'Technical Analysis', path: '/technical', icon: <LineChart className="w-5 h-5" /> },
        { name: 'Option Chain', path: '/options', icon: <PieChart className="w-5 h-5" /> }
      ]
    },
    {
      section: 'Tools',
      items: [
        { name: 'OCC Symbol Generator', path: '/occ-symbol', icon: <Calculator className="w-5 h-5" /> },
        { name: 'Position Calculator', path: '/calculator', icon: <DollarSign className="w-5 h-5" /> },
        { name: 'Trade History', path: '/history', icon: <History className="w-5 h-5" /> }
      ]
    },
    {
      section: 'Resources',
      items: [
        { name: 'Documentation', path: '/docs', icon: <Book className="w-5 h-5" /> },
        { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> }
      ]
    }
  ];

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:static inset-y-0 left-0 z-30 w-64 transition-transform duration-300 ease-in-out transform 
      bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navigationItems.map((section, index) => (
            <div key={index} className="py-4">
              <h3 className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {section.section}
              </h3>
              <nav className="mt-2 space-y-1">
                {section.items.map((item, itemIndex) => (
                  <NavLink
                    key={itemIndex}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <span className="inline-block mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">User Name</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">View Profile</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;