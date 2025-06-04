import { Theme } from './lib/ThemeContext';
import { useTheme } from './lib/useTheme'; // возможно этому хуку следовало находиться в слое shared
import ThemeProvider from './ui/ThemeProvider';

export { ThemeProvider, useTheme, Theme };
