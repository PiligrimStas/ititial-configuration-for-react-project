// ThemeProvider.tsx
import { type JSX, type ReactNode, useMemo, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const rawTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

const isTheme = (value: unknown): value is Theme =>
    typeof value === 'string' && (Object.values(Theme) as string[]).includes(value);

const defaultTheme = isTheme(rawTheme) ? rawTheme : Theme.LIGHT;

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Theme;
}

const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps): JSX.Element => {
    const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme);

    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);
    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
