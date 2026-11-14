/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		// this will override the experiments config
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "**" },
			{ protocol: "http", hostname: "**" },
		],
	},
	experimental: {
		esmExternals: "loose", // <-- add this
		serverComponentsExternalPackages: ["mongoose"], // <-- and this
	},
	// api: {
	// 	bodyParser: false,
	// },
};

module.exports = nextConfig;
