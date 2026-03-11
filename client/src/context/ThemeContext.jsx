import React, { createContext, useContext, useState, useLayoutEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initial state from localStorage or system preference
    const [theme, setThemeState] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) return saved;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });
    const [primaryColor, setPrimaryColorState] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('primaryColor') || '#3b82f6';
        }
        return '#3b82f6';
    });

    // We use a function to update theme AND DOM simultaneously
    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            if (newTheme === 'dark') {
                root.classList.add('dark');
                root.style.colorScheme = 'dark';
            } else {
                root.classList.remove('dark');
                root.style.colorScheme = 'light';
            }
            localStorage.setItem('theme', newTheme);
        }
    };

    const setPrimaryColor = (color) => {
        setPrimaryColorState(color);
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            root.style.setProperty('--primary-color', color);
            // Simple hex to rgba for glow
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            root.style.setProperty('--primary-glow', `rgba(${r}, ${g}, ${b}, 0.5)`);
            localStorage.setItem('primaryColor', color);
        }
    };

    // Keep DOM in sync on mount
    useLayoutEffect(() => {
        setTheme(theme);
        setPrimaryColor(primaryColor);
    }, []);

    const toggleTheme = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, primaryColor, setPrimaryColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
