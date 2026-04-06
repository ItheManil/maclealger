import { ReactNode } from 'react';
import { ThemeContext, useThemeProvider } from '@/hooks/useTheme';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value = useThemeProvider();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
