/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "tutorial-marketplace-virid.vercel.app",
			},
		],
	},
};

module.exports = nextConfig;
