import DialogContent from './Dialog'
import { useEffect, useState, useRef } from 'react'
import { User } from '../../../../../entities/User'
import { JSX } from 'react'
import { X } from 'lucide-react'
import '@renderer/assets/stylesheets/components/dialog-config.css'
import { SuccessResponse } from 'src/entities/SuccessResponse'
import { SuccessModal } from '@renderer/components/modals/SuccessModal'
import { ErrorModal } from '@renderer/components/modals/ErrorModal'
import { useTheme } from '@renderer/contexts/ThemeContext'

import { CircleUserRound } from 'lucide-react'

interface DialogConfigProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogConfig = ({ open, onOpenChange }: DialogConfigProps): JSX.Element => {
  const [confifConta, setConfigConta] = useState(true)
  const [confifChave, setConfigChave] = useState(false)
  const [confifPref, setconfifPref] = useState(false)
  const [activeButton, setActiveButton] = useState('conta')

  const [user, setUser] = useState<User>()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState('')
  const [isEditingKey, setIsEditingKey] = useState(false)
  const [tempKey, setTempKey] = useState('')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    try {
      const storedUserId = sessionStorage.getItem('userId') || null

      if (!storedUserId) {
        setErrorMessage('Erro ao encontrar usuário. Por favor, faça login novamente.')
        return
      }

      const fetchUsers = async (): Promise<void> => {
        const response: SuccessResponse<User> | Error = await window.user.getUserById(storedUserId)
        if (response instanceof Error) {
          setErrorMessage(response.message)
          return
        }

        setUser(response.data)
      }

      fetchUsers()
    } catch (error) {
      console.log('error: ' + error)
    }
  }, [])

  const handleUpdateUser = async (updatedFields: Partial<User>): Promise<void> => {
    if (!user) return

    user.preferenceaimodel = 'gemini-2.5-flash'

    const newUserObj: User = { ...user, ...updatedFields }

    try {
      const response: SuccessResponse<User> | Error = await window.user.updateUser(newUserObj)

      if (response instanceof Error) {
        setErrorMessage(response.message)
        return
      }

      setUser(response.data)
      setSuccessMessage(response.message)

      if (updatedFields.name) {
        sessionStorage.setItem('userName', updatedFields.name)
        sessionStorage.setItem('userPhoto', updatedFields.photo)
      }
    } catch (error) {
      setErrorMessage('Erro ao atualizar dados: ' + String(error))
    }
  }

  const handleClickConta = (): void => {
    setConfigChave(false)
    setconfifPref(false)
    setConfigConta(true)
    setActiveButton('conta')
    console.log('chave' + confifChave, 'conta' + confifConta, 'preferencias' + confifPref)
  }

  const handleClickChaveIa = (): void => {
    setconfifPref(false)
    setConfigConta(false)
    setConfigChave(true)
    setActiveButton('chave')
    console.log('chave' + confifChave, 'conta' + confifConta, 'preferencias' + confifPref)
  }

  const handleClickPreferencias = (): void => {
    setConfigChave(false)
    setConfigConta(false)
    setconfifPref(true)
    setActiveButton('prefe')
    console.log('chave' + confifChave, 'conta' + confifConta, 'preferencias' + confifPref)
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      handleUpdateUser({ photo: base64String })
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = (): void => {
    fileInputRef.current?.click()
  }

  const buttonContaStyle = {
    display: confifConta === true ? 'flex' : 'none',
    gap: '15px',
    color: (theme === 'light' ? '#202124' : '#E5E7EF')
  }

  const buttonChaveStyle = {
    display: confifChave === true ? 'block' : 'none',
    gap: '15px',
    color: (theme === 'light' ? '#202124' : '#E5E7EF')
  }

  const buttonPrefeStyle = {
    display: confifPref === true ? 'block' : 'none',
    gap: '15px',
    color: theme === 'light' ? '#202124' : '#E5E7EF'
  }

  return (
    <DialogContent.Root open={open} onOpenChange={onOpenChange}>
      <DialogContent.Title title="Configurações" />
      <DialogContent.Content>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handlePhotoChange}
        />
        <div id="wrapper">
          <aside id="aside">
            <ul>
              <li className="list-config">
                <button
                  onClick={handleClickConta}
                  className="button-config"
                  style={{
                    background:
                      activeButton === 'conta' ? (theme === 'dark' ? '#2F333C' : '#949CAE') : 'none'
                  }}
                >
                  Conta
                </button>
              </li>
              <li className="list-config">
                <button
                  onClick={handleClickChaveIa}
                  className="button-config"
                  style={{
                    background:
                      activeButton === 'chave' ? (theme === 'dark' ? '#2F333C' : '#949CAE') : 'none'
                  }}
                >
                  Modelo de IA
                </button>
              </li>
              <li className="list-config">
                <button
                  onClick={handleClickPreferencias}
                  className="button-config"
                  style={{
                    background:
                      activeButton === 'prefe' ? (theme === 'dark' ? '#2F333C' : '#949CAE') : 'none'
                  }}
                >
                  Preferências
                </button>
              </li>
            </ul>
          </aside>

          <main id="main">
            <div id="config-conta" style={buttonContaStyle}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt="User Photo"
                    className="photo-user-header"
                    onClick={triggerFileInput} // <--- Clica na foto para abrir arquivo
                    style={{ cursor: 'pointer' }}
                    width={100}
                    height={100}
                  />
                ) : (
                  <CircleUserRound
                    size={50}
                    className="icon btn-config"
                    onClick={triggerFileInput} // <--- Clica no ícone para abrir arquivo
                    style={{ cursor: 'pointer' }}
                  />
                )}
                <p
                  onClick={triggerFileInput}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Editar foto
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {isEditingName ? (
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="input-config"
                    />
                    <button
                      onClick={() => {
                        handleUpdateUser({ name: tempName })
                        setIsEditingName(false)
                      }}
                    >
                      OK
                    </button>
                    <button onClick={() => setIsEditingName(false)}>X</button>
                  </div>
                ) : (
                  <h1>{user?.name}</h1>
                )}
                <div
                  className="p1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setTempName(user?.name || '')
                    setIsEditingName(true)
                  }}
                >
                  Alterar o nome
                </div>
              </div>
            </div>
            <div id="config-chave" style={buttonChaveStyle}>
              <div>
                <div>
                  <div>
                    <h1 style={{ margin: '10px 10px 10px -10px' }}>CHAVE DA API</h1>

                    {isEditingKey ? (
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <input
                          value={tempKey}
                          onChange={(e) => setTempKey(e.target.value)}
                          type="password"
                        />
                        <button
                          onClick={() => {
                            handleUpdateUser({ aikey: tempKey })
                            setIsEditingKey(false)
                          }}
                        >
                          Salvar
                        </button>
                        <button onClick={() => setIsEditingKey(false)}>Cancelar</button>
                      </div>
                    ) : (
                      <h4>{user?.aikey ? '••••••••' : 'Não configurada'}</h4>
                    )}

                    <h5
                      className="p1"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setTempKey(user?.aikey || '')
                        setIsEditingKey(true)
                      }}
                    >
                      {user?.aikey ? 'Alterar chave da api' : 'Inserir chave da API'}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div id="config-prefe" style={buttonPrefeStyle}>
              <div>
                <h1 style={{ margin: '10px 10px 10px -10px' }}>TEMA</h1>
                <h4>{theme === 'light' ? 'Claro' : 'Escuro'}</h4>
                <h5
                  className="p1"
                  tabIndex={0}
                  onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                  }}
                >
                  Alterar tema
                </h5>
              </div>
            </div>
          </main>
        </div>

        <div>
          <DialogContent.Close asChild>
            <button className="btn-icon btn-x-icon">
              <X className="icon" size={40} />
            </button>
          </DialogContent.Close>
        </div>
      </DialogContent.Content>
      {successMessage && (
        <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />
      )}
      {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
    </DialogContent.Root>
  )
}

export default DialogConfig
