import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  ChefHat, 
  Target, 
  Heart, 
  Trophy, 
  History as HistoryIcon, 
  LayoutDashboard,
  Menu,
  X,
  User,
  LogOut,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getTodaysQuote } from '../../data/quotes';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [todaysQuote, setTodaysQuote] = useState(null);
  
  const userLevel = localStorage.getItem('userLevel') || '1';
  const userPoints = localStorage.getItem('userPoints') || '0';
  const userName = localStorage.getItem('userName') || 'User';
  const userStreak = localStorage.getItem('userStreak') || '0';

  useEffect(() => {
    setTodaysQuote(getTodaysQuote());
  }, []);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', color: 'text-primary' },
    { path: '/analyze', icon: Camera, label: 'Analyze Meal', color: 'text-blue-500' },
    { path: '/meal-planner', icon: ChefHat, label: 'Meal Planner', color: 'text-purple-500' },
    { path: '/goals', icon: Target, label: 'Goals', color: 'text-orange-500' },
    { path: '/favourites', icon: Heart, label: 'My Favourites', color: 'text-red-500' },
    { path: '/achievements', icon: Trophy, label: 'Achievements', color: 'text-yellow-500' },
    { path: '/history', icon: HistoryIcon, label: 'History', color: 'text-indigo-500' },
    { path: '/account', icon: User, label: 'Account', color: 'text-gray-500' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`${
              isSidebarOpen ? 'fixed' : 'relative'
            } lg:relative w-72 bg-white dark:bg-gray-800 shadow-xl h-full z-40 overflow-y-auto`}
          >
            <div className="flex flex-col h-full">
              {/* Logo Section */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Nutrio
                  </h1>
                </div>
              </div>

              {/* User Stats */}
              <div className="p-4 mx-4 mt-4 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Level {userLevel}</span>
                  <span className="text-sm font-semibold text-primary">{userPoints} XP</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(parseInt(userPoints) % 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {userLevel < 5 ? 'Nutrition Newbie' : userLevel < 10 ? 'Meal Master' : 'Macro Guru'}
                  </span>
                  <span className="text-xs text-orange-500 font-semibold">
                    🔥 {userStreak} day streak
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive
                                ? 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`
                          }
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <Icon 
                            className={`transition-colors duration-200 ${item.color}`} 
                            size={20} 
                          />
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom Section */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                      {userName[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{userName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Level {userLevel}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-full">
        {/* Top Header with Quote Card */}
        <header className="safe-area-top bg-white dark:bg-gray-800 shadow-sm px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30">
          <div className="w-full max-w-full overflow-hidden">
            {/* Glassmorphism Quote Card */}
            {todaysQuote && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative glass rounded-2xl p-4 sm:p-5 shadow-glass overflow-hidden"
                style={{
                  background: 'rgba(127, 199, 161, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(127, 199, 161, 0.2)',
                }}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl opacity-50 animate-gradient"
                  style={{
                    background: 'linear-gradient(45deg, #7fc7a1, #6bb591, #7fc7a1)',
                    backgroundSize: '200% 200%',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                
                {/* Floating particles effect */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-primary/30 rounded-full animate-float" />
                <div className="absolute bottom-3 left-4 w-1.5 h-1.5 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                
                <div className="relative flex items-start space-x-3">
                  {/* Quote icon */}
                  <div className="flex-shrink-0">
                    <span className="text-3xl" role="img" aria-label="motivation">
                      {todaysQuote.icon}
                    </span>
                  </div>
                  
                  {/* Quote text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-white leading-relaxed">
                      "{todaysQuote.text}"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                      {todaysQuote.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
          <div className="w-full max-w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
