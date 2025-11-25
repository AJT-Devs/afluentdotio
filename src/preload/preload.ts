import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { User } from '../entities/User'
import UserIpcAdapter  from '../endpoint/ipc/UserIpcAdapter'

import { Brainstorm } from '../entities/Brainstorm'
import BrainstormIpcAdapter from '../endpoint/ipc/BrainstormIpcAdapter'


// Custom APIs for renderer

const user: UserIpcAdapter = {
  postUser: (user: User) => ipcRenderer.invoke('postUser', user),
  updateUser: (user: User) => ipcRenderer.invoke('updateUser', user),
  deleteUser: (id: string) => ipcRenderer.invoke('deleteUser', id),
  getUserById: (id: string) => ipcRenderer.invoke('getUserById', id),
  getAllUsers: () => ipcRenderer.invoke('getAllUsers'),
  getAiKey: (id: string) => ipcRenderer.invoke('getAiKey', id)
}

const brainstorm: BrainstormIpcAdapter = {
  generateAIWords: (brainstorm: Brainstorm, aiKey: string, aiModelPreference: AiModels) => ipcRenderer.invoke('generateAIWords', brainstorm, aiKey, aiModelPreference),
  postBrainstorm: (brainstorm: Brainstorm) => ipcRenderer.invoke('postBrainstorm', brainstorm),
  updateBrainstorm: (brainstorm: Brainstorm) => ipcRenderer.invoke('updateBrainstorm', brainstorm),
  updateViewport: (brainstormId: string, viewport: any) => ipcRenderer.invoke('updateViewport', brainstormId, viewport),
  updatePoolNode: (brainstormId: string, node: any) => ipcRenderer.invoke('updatePoolNode', brainstormId, node),
  updatePoolEdge: (brainstormId: string, edge: any) => ipcRenderer.invoke('updatePoolEdge', brainstormId, edge),
  deleteBrainstorm: (id: string) => ipcRenderer.invoke('deleteBrainstorm', id),
  deletePoolNode: (brainstormId: string, nodeId: string) => ipcRenderer.invoke('deletePoolNode', brainstormId, nodeId),
  deletePoolEdge: (brainstormId: string, edgeId: string) => ipcRenderer.invoke('deletePoolEdge', brainstormId, edgeId),
  getAllBrainstormByUser: (userId: string) => ipcRenderer.invoke('getAllBrainstormByUser', userId),
  getBrainstormById: (id: string) => ipcRenderer.invoke('getBrainstormById', id),
  getBrainstormPoolById: (brainstormId: string) => ipcRenderer.invoke('getBrainstormPoolById', brainstormId),
  addPoolNodes: (brainstormId: string, node: any) => ipcRenderer.invoke('addPoolNodes', brainstormId, node),
  addPoolEdges: (brainstormId: string, edge: any) => ipcRenderer.invoke('addPoolEdges', brainstormId, edge)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)

    contextBridge.exposeInMainWorld('user', user)
    contextBridge.exposeInMainWorld('brainstorm', brainstorm)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}