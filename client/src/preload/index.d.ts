import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
        electron: ElectronAPI & {
            minimizeWindow: () => void
            maximizeWindow: () => void
            closeWindow: () => void
            getIsMaximized: () => Promise<boolean>
        }
        api: unknown
    }
}
