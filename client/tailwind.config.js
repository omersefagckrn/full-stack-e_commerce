/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				navigation: '1400px'
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
