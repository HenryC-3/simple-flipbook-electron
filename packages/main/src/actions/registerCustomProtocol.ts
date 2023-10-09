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
