/**
 * TODO: Rewrite this config to ESM
 * But currently electron-builder doesn't support ESM configs
 * @see https://github.com/develar/read-config-file/issues/10
 */

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
	const {getVersion} = await import('./version/getVersion.mjs');

	return {
		directories: {
			output: 'dist',
			buildResources: 'buildResources',
		},
		// files: ['packages/**/dist/**'],
		files: ['packages/**/dist/**'],
		extraResources: [
			{from: 'packages/preload/dist/pages', to: './pages'},
			{from: 'packages/preload/dist/bgs', to: './bgs'},
			{from: 'packages/preload/dist/config.json', to: '.'},
		],
		extraMetadata: {
			version: getVersion(),
		},

		// more win options https://www.electron.build/configuration/win
		win: {
			target: ['nsis'],
		},
		// more nsis options https://www.electron.build/configuration/nsis
		nsis: {
			oneClick: false,
		},
	};
};
