import {ipcRenderer} from 'electron';

export function remoteTrigger(action: (message: string) => void) {
	ipcRenderer.on('sendFromRemote', (e, message) => {
		action(message);
	});
}
