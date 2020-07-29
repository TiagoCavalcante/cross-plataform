import { app, BrowserWindow } from 'electron';

function createWindow() {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		titleBarStyle: 'hidden',
		webPreferences: {
			nodeIntegration: true
		}
	});

	window.setMenu(null);
	window.loadFile(app.getLocale() +  '../public/index.html');
	// window.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit();
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0)
		createWindow();
});