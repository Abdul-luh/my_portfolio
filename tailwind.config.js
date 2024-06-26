/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		// colors: {
		// 	// Light theme colors
		// 	light: {
		// 		bg: "#ecf0f3", // White background
		// 		text: "#1f2937", // Black text
		// 		// ... other light theme colors
		// 	},
		// 	// Dark theme colors
		// 	dark: {
		// 		bg: "#252b2f", // Black background
		// 		text: "#e1e2e4", // White text
		// 		navBg: "rgb(74, 85, 96)",
		// 		// ... other dark theme colors
		// 	},
		// },
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
