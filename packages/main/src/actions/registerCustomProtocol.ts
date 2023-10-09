// BUG: 注册方法有任何问题吗？ https://www.electronjs.org/docs/latest/api/protocol#using-protocol-with-a-custom-partition-or-session
import {protocol, net} from 'electron';

export function registerCustomProtocol() {
	protocol.registerSchemesAsPrivileged([
		{scheme: 'atom', privileges: {bypassCSP: true, supportFetchAPI: true}},
	]);
	console.log('😄 register the url');
}

export function handleCustomProtocol() {
	console.log('😄 handle url');
	protocol.handle('atom', request => {
		console.log('😄 get request', request);
		return net.fetch('file://' + request.url.slice('atom://'.length));
	});
}
