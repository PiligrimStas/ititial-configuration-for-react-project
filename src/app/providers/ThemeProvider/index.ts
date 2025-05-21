import ThemeProvider from './ui/ThemeProvider';
import { useTheme } from './lib/useTheme'; // возможно этому хуку следовало находиться в слое shared
import { Theme } from './lib/ThemeContext';
export { ThemeProvider, useTheme, Theme };
