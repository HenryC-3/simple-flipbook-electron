import type {BrowserWindow} from 'electron';
import {createServer} from 'net';
import {sendFromRemote} from '../senders';

export function createTcpServer(browserWindow: BrowserWindow) {
	const server = createServer(socket => {
		console.log('客户端已连接');

		// 当客户端发送数据时触发
		socket.on('data', data => {
			console.log('接收到数据: ' + data);
			// browserWindow.webContents.send('sendFromRemote', JSON.parse(String(data)));
			sendFromRemote(browserWindow, [String(data)]);
		});

		// 当客户端关闭连接时触发
		socket.on('end', () => {
			console.log('客户端已断开连接');
		});

		// 处理错误事件
		socket.on('error', error => {
			console.error('发生错误:', error);
		});
	});

	const port = 9999; // 选择一个端口
	const host = '192.168.1.26'; // 选择一个主机

	server.listen(port, host, () => {
		console.log(`服务器已在 ${host}:${port} 上启动`);
	});
}
