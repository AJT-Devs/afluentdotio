import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { User } from '../entities/User'


import { Brainstorm } from '../entities/Brainstorm'


import { Word } from '../entities/Word'

// Custom APIs for renderer
const api = { 
  createUser : (user: User) => ipcRenderer.invoke('createUser', user),

  createBrainstorm : (brainstorm: Brainstorm) => ipcRenderer.invoke('createBrainstorm', brainstorm),
  getAllBrainstormByUser : (userId: number) => ipcRenderer.invoke('getAllBrainstormByUser', userId),

  createWord : (word: Word) => ipcRenderer.invoke('createWord', word),
  getAllWordByBrainstorm : (brainstormId: number) => ipcRenderer.invoke('getAllWordByBrainstorm', brainstormId)
 }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
