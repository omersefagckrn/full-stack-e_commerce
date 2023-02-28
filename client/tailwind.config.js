/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				navigation: '1152px',
				login: '956px',
				footer: '1072px'
			},
			colors: {
				black: '#000000',
				white: '#FFFFFF',
				green_Five: '#68D237',
				gray_Two: '#D6D6D6',
				gray_Three: '#ADADAD',
				gray_Five: '#555555',
				red_Seven: '#E03C00',
				red_Six: '#FF5A1F',
				primary: '#0a2540',
				border: '#B8B8B8',
				purple: '#6F55FF'
			},
			fontFamily: {
				workSans: ['Work Sans', 'sans-serif']
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
