import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { User } from '../entities/User'


import { Brainstorm } from '../entities/Brainstorm'


import { Word } from '../entities/Word'

import UserApiAdapter  from '../endpoint/ipc/UserIpcAdapter'

// Custom APIs for renderer
const api = { 
  createUser : (user: User) => ipcRenderer.invoke('createUser', user),

  createBrainstorm : (brainstorm: Brainstorm) => ipcRenderer.invoke('createBrainstorm', brainstorm),
  getAllBrainstormByUser : (userId: number) => ipcRenderer.invoke('getAllBrainstormByUser', userId),

  createWord : (word: Word) => ipcRenderer.invoke('createWord', word),
  getAllWordByBrainstorm : (brainstormId: number) => ipcRenderer.invoke('getAllWordByBrainstorm', brainstormId)
}

const user: UserApiAdapter = {
  postUser: (user: User) => ipcRenderer.invoke('postUser', user),
  updateUser: (user: User) => ipcRenderer.invoke('updateUser', user),
  deleteUser: (id: string) => ipcRenderer.invoke('deleteUser', id),
  getUserById: (id: string) => ipcRenderer.invoke('getUserById', id),
  getAllUsers: () => ipcRenderer.invoke('getAllUsers'),
  getAiKey: (id: string) => ipcRenderer.invoke('getAiKey', id)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('user', user)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}