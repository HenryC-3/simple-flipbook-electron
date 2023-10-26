import {protocol} from 'electron';

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
		const url = request.url;

		// 获取文件路径，去掉 'item://' 前缀
		const filePath = decodeURI(url.substr(7));
		// NOTE： 在 windows 上 url 的盘符会消失，例如 e:/folder/a.txt 会变成 e/folder/a.txt
		const winFilePath = (filePath.charAt(0) + ':' + filePath.substring(1)).replace(/\//g, '\\');

		// 在 Windows 上将斜杠替换为反斜杠
		const normalizedPath = process.platform === 'win32' ? winFilePath : filePath;
		callback(normalizedPath);
	});
}
