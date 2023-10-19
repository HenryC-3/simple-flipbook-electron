import {app, ipcMain} from 'electron';

export function enableListeners() {
	ipcMain.on('quiteApp', function () {
		if (process.platform !== 'darwin') app.quit();
		app.exit();
	});
}
