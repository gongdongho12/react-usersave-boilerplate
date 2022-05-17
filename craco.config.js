const { ESLINT_MODES } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");
const CracoAntDesignPlugin = require("craco-antd");
const CracoAlias = require("craco-alias");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = ({ env }) => {
	const isProductionBuild = process.env.NODE_ENV === "production";
	const analyzerMode = process.env.REACT_APP_INTERACTIVE_ANALYZE
		? "server"
		: "json";
	const plugins = [];
	if (isProductionBuild) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerMode }))
  }
	return {
		reactScriptsVersion: "react-scripts",
		plugins: [
			{
				plugin: CracoAntDesignPlugin
			},
			{
				plugin: CracoLessPlugin,
				options: {
					lessLoaderOptions: {
						lessOptions: {
							modifyVars: {
								"@layout-body-background": "#ffffff",
							},
							javascriptEnabled: true,
						},
					},
				},
			},
			{
				plugin: CracoAlias,
				options: {
					// see in examples section
					baseUrl: "./src",
					source: "tsconfig",
					tsConfigPath: "tsconfig.paths.json",
				},
			},
			{ plugin: new OpenBrowserPlugin({ url: "http://localhost:3000" }) },
		],
		webpack: {
			configure: (webpackConfig) => {
				webpackConfig.optimization.minimizer = [
					new TerserPlugin({
						cache: true,
						parallel: true,
						sourceMap: true, // Must be set to true if using source-maps in production
						terserOptions: {
							compress: {
								drop_console: true,
							},
						},
					}),
				];

				return webpackConfig;
			},
			plugins
		},
		eslint: {
			mode: ESLINT_MODES.file,
		},
	};
};
