import type {BrowserWindow} from 'electron';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendFromRemote(browserWindow: BrowserWindow, data: any[]) {
	console.log(`main send ${data} to renderer`);
	browserWindow.webContents.send('sendFromRemote', data);
}
