import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

import "@renderer/assets/stylesheets/components/theme-toggle.css"

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} className='icon'/> : <Sun size={20} className='icon'/>}
    </button>
  );
}

export default ThemeToggle;