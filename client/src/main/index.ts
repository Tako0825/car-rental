import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
    const bounds: Partial<Electron.Rectangle> = {
        width: 1080,
        height: 760
    }
    const setBounds = (state: typeof bounds) => {
        for (const key in state) {
            const value = state[key]
            bounds[key] = value
        }
    }
    const { width: initialWidth, height: initialHeight } = bounds

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: initialWidth,
        height: initialHeight,
        show: false,
        autoHideMenuBar: true,
        frame: false,
        transparent: true,
        resizable: false,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
        const { x, y } = mainWindow.getBounds()
        setBounds(Object.assign(bounds, { x, y }))
    })

    // 最小化窗口
    ipcMain.handle('window-minimize', () => {
        mainWindow.minimize()
    })

    // 缩放窗口
    ipcMain.handle('window-maximize', () => {
        const isMaximized = mainWindow.isMaximized()
        if (!isMaximized) {
            mainWindow.maximize()
        } else {
            const { x, y } = bounds
            mainWindow.setBounds({
                width: initialWidth,
                height: initialHeight,
                x,
                y
            })
        }
        return !isMaximized
    })

    // 获取窗口最大化状态
    ipcMain.handle('get-is-maximized', () => mainWindow.isMaximized())

    // 关闭窗口
    ipcMain.handle('window-close', () => {
        mainWindow.close()
    })

    mainWindow.webContents.setWindowOpenHandler(details => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // IPC test
    ipcMain.on('ping', () => console.log('pong'))

    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
