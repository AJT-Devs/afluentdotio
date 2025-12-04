
import { useNavigate } from "react-router-dom";

import AfluentLogo from "@renderer/components/AfluentLogo";


import "@renderer/assets/stylesheets/pages/login-page.css";
import { useEffect, useState, useRef} from "react";
import { User } from "../../../entities/User";
import { SuccessResponse } from "../../../entities/SuccessResponse";
import { Plus, CircleUserRound } from "lucide-react";
import DialogCreateUser from "@renderer/components/overlays/dialogs/DialogCreateUser";
import { ErrorModal } from "@renderer/components/modals/ErrorModal";
import { SuccessModal } from "@renderer/components/modals/SuccessModal";

import cobol from '../../../../assets/public/cobol.png'
import cpp from '../../../../assets/public/cpp.png'
import delphi from '../../../../assets/public/delphi.png'
import golang from '../../../../assets/public/golang.png'
import java from '../../../../assets/public/java.png'
import kotlin from '../../../../assets/public/kotlin.png'
import python from '../../../../assets/public/python.png'
import rust from '../../../../assets/public/rust.png'





const LoginPage = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const hasFetchedUsers= useRef<boolean>(false);
  const navigate = useNavigate();
  
  const [userId, setUserId] = useState<string | null>(null); 
  const [userPhoto, setUserPhoto] = useState<string | null> (null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mapeamento de caminhos de imagem
  const imageMap: { [key: string]: string } = {
    [cobol]: cobol,
    [cpp]: cpp,
    [delphi]: delphi,
    [golang]: golang,
    [java]: java,
    [kotlin]: kotlin,
    [python]: python,
    [rust]: rust
  };

  function handleLogin(userTarget: string | null) {
    if (userTarget !== null) {
      navigate("/dashboard");
      sessionStorage.setItem("userId", userId ?? "naofoi");
      sessionStorage.setItem("userPhoto", userPhoto ?? "");
      return;
    }
    setErrorMessage("Selecione um usuário para continuar.");
  }

  function handleToBack(){
    return navigate("/")
  }


  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  async function createUser(name:string, photo:string | null | undefined){
    const user = new User(null, name, photo ?? null, null, null);

    const response: SuccessResponse<User> | Error = await window.user.postUser(user);

    if (response instanceof Error) {
      setErrorMessage(response.message);
      return;
    } 
    const createdUser: User = response.data;
    setUsers((prevUsers) => [...prevUsers, createdUser]);
    setSuccessMessage(response.message);
  }

  
  useEffect(() => {
    if (hasFetchedUsers.current) return;
    hasFetchedUsers.current = true;

    const fetchUsers = async () => {
      const response: SuccessResponse<User[]> | Error = await window.user.getAllUsers();
      if (response instanceof Error) {
        setErrorMessage(response.message);
        return;
      }
      response.data.map((user: User) => {
        setUsers((prevUsers) => [...prevUsers, user]);
      })
      
    };

    fetchUsers();
  }, []);


  return (
    <div className="login-page">
      <div onClick={handleToBack}><AfluentLogo /></div>
      <div className="user-list">
        {users.map((user) => (
          <button key={user.id} className="user-card" tabIndex={0} onClick={() => {setUserId(user.id); setUserPhoto(user.photo)} }>
            {user.photo ? <img src={imageMap[user.photo] || user.photo} alt={`${user.name} foto`} className="photo" /> : <CircleUserRound size={60} />}
            
            <h2 title={user.name}>{user.name.length > 5 ? user.name.slice(0, 5) + "..." : user.name}</h2>
          </button>
            )
        )}
        <button className="user-card" tabIndex={0} onClick={() => setIsDialogOpen(true)}>
          <Plus size={50} />
        </button>
      </div>  
      <button
        onClick={() => handleLogin(userId)} >
        LOGIN
      </button>
      <DialogCreateUser open={isDialogOpen} onOpenChange={setIsDialogOpen} actionSubmit={(name: string, photo?: string | null) => {createUser(name, photo);}} />
      {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}
      {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
    </div>
  )
}

export default LoginPage;