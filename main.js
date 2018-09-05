const {app, BrowserWindow} = require('electron');

let win;

function createWindow() {
	// 创建浏览器窗口
	win = new BrowserWindow({width: 800, height: 600})

	// 然后加载应用的index.html
	win.loadFile('index.html');

	//打开开发者工具
	win.webContents.openDevTools();

	// 当window被关闭，这个事件会被触发
	win.on('closed', () => {
		// 取消引用window对象，如果你的应用支持多窗口的话，
		// 通常会把多个window对象存放在一个数组里面,
		// 与此同时，你应该删除相应的元素

		win = null;
	})
}


// Elctron会在初始化后并准备创建浏览器窗口时，调用这个函数.
// 部分API在ready事件触发后才能使用	
app.on('ready', createWindow);

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
	// 在macOS上，除非cmd+Q确定退出，否则仍会保持激活
	if(process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	// 在macOS上，当单击dock图标并且没有其他窗口打开时,
	// 通常在应用程序中重新创建一个窗口
	if(win === null) {
		createWindow();
	}
})

