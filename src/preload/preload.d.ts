import { ElectronAPI } from '@electron-toolkit/preload'
import UserIpcAdapter from '../endpoint/ipc/UserIpcAdapter'
import BrainstormIpcAdapter from '../endpoint/ipc/BrainstormIpcAdapter'


declare global {
  interface Window {
    electron: ElectronAPI
    api: any
    user: UserIpcAdapter
    brainstorm: BrainstormIpcAdapter
  }
}
