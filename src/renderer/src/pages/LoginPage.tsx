
import { useNavigate } from "react-router-dom";

import AfluentLogo from "@renderer/components/AfluentLogo";


import "@renderer/assets/stylesheets/pages/login-page.css";
import { useEffect, useState, useRef } from "react";
import { User } from "src/entities/User";
import { SuccessResponse } from "src/entities/SuccessResponse";
import { Plus } from "lucide-react";
import { Dialog } from "@radix-ui/react-dialog";






const LoginPage = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const hasFetchedUsers= useRef<boolean>(false);
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string | null>(null); 
  const createUserRef = useRef<boolean>(false);

  function handleLogin(userTarget: string | null) {
    if (userTarget !== null) {
      navigate("/introduction");
    }
  }

  function openUserModal() {
    createUserRef.current = true;
  }



  useEffect(() => {
    if (hasFetchedUsers.current) return;
    hasFetchedUsers.current = true;

    const fetchUsers = async () => {
      const response: SuccessResponse | Error = await window.user.getAllUsers();
      if (response instanceof Error) {
        console.error("Error fetching users:", response.message);
      }else{
        response.data.map((user: User) => {
        setUsers((prevUsers) => [...prevUsers, user]);
        console.log("User fetched:", user);
      });
      }
      
    };

    fetchUsers();
  }, []);


  return (
    <div className="login-page">
      <AfluentLogo />
      <div className="user-list">
        {users.map((user) => (
          <button key={user.id} className="user-card" tabIndex={0} onClick={() => {setUserId(user.id); console.log("Selected user ID:", user.id)} }>
            <img src={user.photo} alt={`${user.name} foto`} className="photo" />
            <h2>{user.name}</h2>
          </button>
            )
        )}
        <button className="user-card" tabIndex={0} onClick={() => openUserModal()}>
          <Plus size={30} />
        </button>
      </div>
      {createUserRef && <Dialog />}
      <button
        onClick={() => handleLogin(userId)} >
        LOGIN
      </button>
    </div>
  )
}

export default LoginPage;