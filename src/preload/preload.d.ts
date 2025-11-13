import { ElectronAPI } from '@electron-toolkit/preload'
import UserIpcAdapter from '../endpoint/ipc/UserIpcAdapter'


declare global {
  interface Window {
    electron: ElectronAPI
    api: any
    user: UserIpcAdapter
  }
}
