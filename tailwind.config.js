/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['"Montserrat Alternates"', 'sans-serif'],
                'sans': ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 60s linear infinite',
                'reverse-spin': 'reverse-spin 60s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'reverse-spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-360deg)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
