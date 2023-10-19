import {app, ipcMain} from 'electron';

export function enableListeners() {
	ipcMain.on('quiteApp', function () {
		console.log('quiteApp');
		if (process.platform !== 'darwin') app.quit();
		app.exit();
	});
}
