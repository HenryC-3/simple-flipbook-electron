import {ipcRenderer} from 'electron';

export function quiteApp() {
	ipcRenderer.send('quiteApp');
}
