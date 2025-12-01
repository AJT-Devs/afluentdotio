
import { useNavigate } from "react-router-dom";

import AfluentLogo from "@renderer/components/AfluentLogo";


import "@renderer/assets/stylesheets/pages/login-page.css";
import { useEffect, useState, useRef } from "react";
import { User } from "../../../entities/User";
import { SuccessResponse } from "../../../entities/SuccessResponse";
import { Plus, CircleUserRound } from "lucide-react";
import DialogCreateUser from "@renderer/components/overlays/dialogs/DialogCreateUser";
import { ErrorModal } from "@renderer/components/modals/ErrorModal";
import { SuccessModal } from "@renderer/components/modals/SuccessModal";





const LoginPage = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const hasFetchedUsers= useRef<boolean>(false);
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string | null>(null); 

   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleLogin(userTarget: string | null) {
    if (userTarget !== null) {
      navigate("/dashboard");
    }
    localStorage.setItem("userId", userTarget ?? "");
  }


  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  async function createUser(name:string, photo:string | null | undefined){
    const user = new User(null, name, photo ?? null, null, null);

    const response: SuccessResponse | Error = await window.user.postUser(user);

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
      const response: SuccessResponse | Error = await window.user.getAllUsers();
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
      <AfluentLogo />
      <div className="user-list">
        {users.map((user) => (
          <button key={user.id} className="user-card" tabIndex={0} onClick={() => {setUserId(user.id)} }>
            {user.photo ? <img src={user.photo} alt={`${user.name} foto`} className="photo" /> : <CircleUserRound size={30} />}
            
            <h2>{user.name}</h2>
          </button>
            )
        )}
        <button className="user-card" tabIndex={0} onClick={() => setIsDialogOpen(true)}>
          <Plus size={30} />
        </button>
      </div>  
      <button
        onClick={() => handleLogin(userId)} >
        LOGIN
      </button>
      <DialogCreateUser
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        actionSubmit={(name: string, photo?: string | null) => {createUser(name, photo);}}
      />
      {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}
      {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
    </div>
  )
}

export default LoginPage;