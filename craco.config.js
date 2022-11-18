const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = async function () {
	const linkerPlugin = await import("@angular/compiler-cli/linker/babel");
	return {
		babel: {
			plugins: [linkerPlugin.default],
			loaderOptions: {
				compact: false,
				cacheDirectory: true,
			},
		},
		webpack: {
			plugins: [
				// new BundleAnalyzerPlugin({
				// 	analyzerMode: "server",
				// 	defaultSizes: "gzip",
				// }),
			],
		},
	};
};
