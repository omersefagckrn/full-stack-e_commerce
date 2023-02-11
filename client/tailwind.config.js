/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            maxWidth: {
                navigation: '1152px',
            },
            colors: {
                black: '#000000',
                white: '#FFFFFF',
                green_Five: '#68D237',
                gray_Two: '#D6D6D6',
                gray_Three: '#ADADAD',
            },
            fontFamily: {
                workSans: ['Work Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}
