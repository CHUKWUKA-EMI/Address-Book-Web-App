module.exports = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/contacts",
				permanent: true,
			},
		];
	},
};
