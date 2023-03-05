/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				main: '1280px'
			},
			colors: {
				black: '#000000',
				white: '#FFFFFF',
				green: '#68D236',
				redsoft: '#E03C00',
				gray: '#D6D6D6',
				primary: '#0a2540',
				border: '#B8B8B8',
				purple: '#6F55FF',
				yellow: '#F7A415',
				blue: '#2196F3'
			},
			fontFamily: {
				workSans: ['Work Sans', 'sans-serif']
			}
		}
	},
	darkMode: 'class'
};
