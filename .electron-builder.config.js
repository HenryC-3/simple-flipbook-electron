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
		files: [
			'packages/main/dist/**',
			'packages/preload/dist/index.cjs',
			'packages/renderer/dist/**',
		],
		extraResources: [
			{from: 'packages/preload/dist/config', to: './config'},
			// NOTE 不要在 fileset 中使用 glob，会出现 file not found 错误，详见 https://github.com/electron-userland/electron-builder/issues/2693
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
