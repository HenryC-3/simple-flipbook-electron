import {protocol} from 'electron';
import * as path from 'path';

// 注册自定义文件协议 'item'
export function setProtocol() {
	protocol.registerSchemesAsPrivileged([
		{
			scheme: 'item',
			privileges: {
				supportFetchAPI: true,
				secure: true,
				standard: true,
			},
		},
	]);
}

/**
 * Create the application window when the background process is ready.
 */
export function handleFileProtocol() {
	// NOTE: 这个需要在 app.ready 触发之后使用
	protocol.registerFileProtocol('item', (request, callback) => {
		const url = request.url.substr(7);

		callback(decodeURI(path.normalize(url)));
	});
}
