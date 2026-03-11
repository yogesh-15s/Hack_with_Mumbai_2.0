/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                secondary: '#64748b', // Slate-500
                background: '#eff6ff', // Blue-50
            }
        },
    },
    plugins: [],
}
