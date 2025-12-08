import { CircleUserRound, Bolt, Search, List, Grid2X2, Menu } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useState, useEffect, Key, useRef, JSX } from 'react'
import '@renderer/assets/stylesheets/components/dashboard/dashboard.css'
import { Brainstorm } from 'src/entities/Brainstorm'
import { ErrorModal } from '../modals/ErrorModal'
import { SuccessResponse } from 'src/entities/SuccessResponse'
import DialogConfig from '../overlays/dialogs/DialogConfig'
import MenuContext from '../overlays/contextmenu/MenuContext'
import AlertDialogContent from '../overlays/dialogs/AlertDialog'
import DialogContent from '../overlays/dialogs/Dialog'

export default function Dashboard(): JSX.Element {
  const [typeListNavSelected, setTypeListNavSelected] = useState<Key>('grid')
  const [brainstormList, setBrainstormList] = useState<Brainstorm[]>([])
  const [brainstormId, setBrainstormId] = useState<string>('')
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false)
  const [isAlertOpenDeleteBrainstorm, setIsAlertOpenDeleteBrainstorm] = useState<boolean>(false)
  const [isOpenDialogContextEditTitleAndContextBrainstorm, setIsOpenDialogContextEditTitleAndContextBrainstorm] = useState<boolean>(false)
  const [brainstormToEdit, setBrainstormToEdit] = useState<Brainstorm | null>(null)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const hasFetchedBrainstorms = useRef<boolean>(false)

  useEffect(() => {
    if (hasFetchedBrainstorms.current) {
      return
    }
    hasFetchedBrainstorms.current = true
    const getBrainstormList = async (): Promise<void> => {
      try {
        const userIdsession = sessionStorage.getItem('userId') || null
        setUserId(userIdsession)
        const userPhoto = sessionStorage.getItem('userPhoto') || null
        setUserPhoto(userPhoto)

        if (!userIdsession) {
          setErrorMessage('Erro ao encontrar usuário. Por favor, faça login novamente.')
          return
        }

        const response: SuccessResponse<Brainstorm[]> | Error =
          await window.brainstorm.getAllBrainstormByUser(userIdsession)
        console.log(response)
        if (response instanceof Error) {
          setErrorMessage(response.message)
          return
        }
        response.data.map((brainstorm: Brainstorm) => {
          setBrainstormList((prevList) => [...prevList, brainstorm])
        })
      } catch (error) {
        setErrorMessage('Erro inesperado $={error}'.replace('${error}', String(error)))
      }
    }
    getBrainstormList()
  }, [userPhoto, userId])

  const navigate = useNavigate()
  const handleCriar = (): void => {
    navigate('/introduction')
  }
  const handleVoltar = (): void => {
    navigate('/login')
  }

  const goToBrainstormingPage = async (id: string): Promise<void> => {
    await sessionStorage.setItem('brainstormId', id)
    navigate('/brainstorming')
  }

  console.log('User ID: ', userId, 'brainstormId: ', brainstormId)

  return (
    <>
      <header className="dashboard-header">
        {userPhoto ? (
          <img
            src={userPhoto}
            alt="User Photo"
            className="photo-user-header"
            onClick={handleVoltar}
            width={50}
            height={50}
          />
        ) : (
          <CircleUserRound
            size={50}
            className="icon btn-config"
            tabIndex={0}
            onClick={handleVoltar}
          />
        )}
        <div className="search-header">
          <input type="text" placeholder="Busque..." className="search-input" />
          <div className="icon-search">
            <Search size={30} />
          </div>
        </div>
        <button onClick={handleCriar}>CRIAR</button>
        <button className="btn-icon" onClick={() => setIsConfigOpen(true)}>
          <Bolt size={50} className="icon btn-config" />
        </button>
      </header>
      <nav className="dashboard-nav">
        <p className="dashboard-nav-p">Meus Brainstorms</p>
        <div className="div-type-list-nav">
          <Grid2X2
            key={'grid'}
            size={35}
            className={`icon type-list-nav ${typeListNavSelected == 'grid' ? 'type-list-nav-selected' : ''}`}
            onClick={() => {
              setTypeListNavSelected('grid')
            }}
          />
          <List
            key={'list'}
            size={35}
            className={`icon type-list-nav ${typeListNavSelected == 'list' ? 'type-list-nav-selected' : ''}`}
            onClick={() => {
              setTypeListNavSelected('list')
            }}
          />
        </div>
      </nav>
      <main className='dashboard-main'>
        {brainstormList.length > 0 &&
          brainstormList.map((brainstorm) => (
            <MenuContext.Root modal={false}>
              <MenuContext.Trigger asChild>
                <button
                  key={brainstorm.id}
                  className="brainstorm-card"
                  tabIndex={0}
                  onClick={() => {
                    setBrainstormId(brainstorm.id)
                    goToBrainstormingPage(brainstorm.id)
                  }}
                >
                  <h2 title={brainstorm.name} className="brainstorm-title">
                    {brainstorm.name.length > 30 ? brainstorm.name.slice(0, 30) + "..." : brainstorm.name}
                  </h2>
                  <p title={brainstorm.context} className='brainstorm-context'>{brainstorm.context.length > 30 ? brainstorm.context.slice(0, 30) + "..." : brainstorm.context}</p>
                </button>
              </MenuContext.Trigger>
              <MenuContext.Content>
                <MenuContext.Item onSelect={() => goToBrainstormingPage(brainstorm.id)}>
                  Abrir
                </MenuContext.Item>
                <MenuContext.Item onSelect={() => {setIsOpenDialogContextEditTitleAndContextBrainstorm(!isOpenDialogContextEditTitleAndContextBrainstorm); setBrainstormToEdit(brainstorm);}}>
                  Editar título e contexto
                </MenuContext.Item>
                <MenuContext.Item className='menu-context-item-delete' onSelect={() => { setIsAlertOpenDeleteBrainstorm(!isAlertOpenDeleteBrainstorm); setBrainstormId(brainstorm.id); }}>
                  Deletar
                </MenuContext.Item>
              </MenuContext.Content>
            </MenuContext.Root>
          ))}

        {brainstormList.length <= 0 && (
          <p className="dashboard-main-p">Nenhum brainstorm encontrado.</p>
        )}
      </main>
      <DialogConfig open={isConfigOpen} onOpenChange={setIsConfigOpen} />
      {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}

      <AlertDialogContent.Root onOpenChange={()=>{setIsAlertOpenDeleteBrainstorm(!isAlertOpenDeleteBrainstorm)}} open={isAlertOpenDeleteBrainstorm} key={"AlertDialopDeleteBrainstorm"}>
        <AlertDialogContent.Content>
          <AlertDialogContent.Title>Deletar Brainstorm</AlertDialogContent.Title>
          <AlertDialogContent.Description>
            Tem certeza que deseja deletar este brainstorm? Esta ação não pode ser desfeita.
          </AlertDialogContent.Description>
          <div className="alert-dialog-buttons">
            <AlertDialogContent.Cancel className="alert-dialog-button-cancel">
              Cancelar
            </AlertDialogContent.Cancel>
            <AlertDialogContent.Action className="alert-dialog-delete-action" onClick={ async () => {
              // Função de deletar brainstorm ainda não implementada
              try {
                if (!brainstormId) {
                  setErrorMessage('Erro ao encontrar brainstorm. Por favor, tente novamente.')
                  return
                }
                const response: SuccessResponse<null> | Error =
                  await window.brainstorm.deleteBrainstorm(brainstormId)
                if (response instanceof Error) {
                  setErrorMessage(response.message)
                  return
                }
                // Remover brainstorm da lista localmente
                setBrainstormList((prevList) =>
                  prevList.filter((brainstorm) => brainstorm.id !== brainstormId)
                )
                setIsAlertOpenDeleteBrainstorm(false)
              } catch (error) {
                if(error instanceof Error){
                  setErrorMessage(error.message)
                } else {
                  setErrorMessage('Erro inesperado ao deletar brainstorm.')
                }
              }
            }}>
              Deletar
            </AlertDialogContent.Action>
          </div>
        </AlertDialogContent.Content>
      </AlertDialogContent.Root>

      <DialogContent.Root key={"DialogContentEditBrainstormTitleAndContext"} onOpenChange={()=>{setIsOpenDialogContextEditTitleAndContextBrainstorm(!isOpenDialogContextEditTitleAndContextBrainstorm)}} open={isOpenDialogContextEditTitleAndContextBrainstorm}>
        <DialogContent.Content>
          <DialogContent.Title>Editar Título e Contexto</DialogContent.Title>
          <form onSubmit={async (event)=>{
            alert('Função de editar título e contexto ainda não implementada ainda!.');
            event.preventDefault();
            return;
            try {
                if (!brainstormToEdit) {
                  setErrorMessage('Erro ao encontrar brainstorm. Por favor, tente novamente.')
                  return
                }
                
                const formData = new FormData(event.target as HTMLFormElement);
                const updatedName = formData.get('brainstorm-title-input') as string;
                const updatedContext = formData.get('brainstorm-context-textarea') as string;

                // Aqui você pode adicionar a lógica para atualizar o brainstorm
                // Por enquanto, apenas exibe um alerta
                // alert(`Título atualizado para: ${updatedName}\nContexto atualizado para: ${updatedContext}`);

                const updatedBrainstorm: Brainstorm = {
                  ...brainstormToEdit,
                  name: updatedName,
                  context: updatedContext
                }

                console.log(updatedBrainstorm);
                
                const response: SuccessResponse<Brainstorm> | Error =
                  await window.brainstorm.updateBrainstorm(updatedBrainstorm)

                if (response instanceof Error) {
                  setErrorMessage(response.message)
                  return
                }

                // Atualizar a lista localmente
                setBrainstormList((prevList) =>
                  prevList.map((brainstorm) => 
                    brainstorm.id === updatedBrainstorm.id ? updatedBrainstorm : brainstorm
                  )
                )

                setIsOpenDialogContextEditTitleAndContextBrainstorm(false);

              } catch (error) {
                if(error instanceof Error){
                  setErrorMessage(error.message)
                } else {
                  setErrorMessage('Erro inesperado ao deletar brainstorm.')
                }
              }
          }}>
            <input type="text" id="brainstorm-title-input" name="brainstorm-title-input" placeholder='Título' />
            <textarea id="brainstorm-context-input" name="brainstorm-context-textarea" placeholder='Descrição'/>
            <div className="dialog-buttons">
              <DialogContent.Close type="button" className="dialog-button-cancel" onClick={() => {}}>
                Cancelar
              </DialogContent.Close>
              <button type="submit" className="dialog-button-save">
                Salvar
              </button>
            </div>
          </form>
        </DialogContent.Content>
      </DialogContent.Root>
    </>
  )
}
