// Module to control application life.
import app from 'app';
// Module to create native browser window.
import BrowserWindow from 'browser-window';
// Report crashes to our server.
import crashReporter from 'crash-reporter';
// Module to Set up Menu
import Menu from 'menu';

crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
        app.quit();
    // }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', () => {
    // Create the browser window.
    if (process.env.NODE_ENV !== 'production') {
        mainWindow = new BrowserWindow({
            title: 'Sums Up',
            width: 320,
            height: 620
        });
    } else {
        mainWindow = new BrowserWindow({
            title: 'Sums Up',
            width: 320,
            height: 620,
            resizable: false
        });
    }
    

    // and load the index.html of the app.
    mainWindow.loadUrl(`file://${__dirname}/index.html`);

    // Open the devtools.
    if (process.env.NODE_ENV !== 'production') {
        mainWindow.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Create the Application's main menu
    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
