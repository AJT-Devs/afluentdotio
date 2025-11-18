import { useTheme } from '../contexts/ThemeContext';

export const useThemeStyles = () => {
  const { theme } = useTheme();
  
  return {
    isDark: theme === 'dark',
    isLight: theme === 'light' ,
    theme,
  };
};