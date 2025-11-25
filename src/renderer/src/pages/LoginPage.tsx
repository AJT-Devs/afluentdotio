
import { useNavigate } from "react-router-dom";

import AfluentLogo from "@renderer/components/AfluentLogo";


import "@renderer/assets/stylesheets/pages/login-page.css";
import { useEffect, useState, useRef } from "react";
import { User } from "src/entities/User";
import { SuccessResponse } from "src/entities/SuccessResponse";




function handleLogin(userTarget: React.RefObject<HTMLDivElement | null>) {
  const navigate = useNavigate();
  if (userTarget.current !== null) {
    navigate("/introduction");
  }
}

const LoginPage = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const hasFetchedUsers = useRef(false);

  const userTarget = useRef<HTMLDivElement>(null);

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
          <div key={user.id} className="user-card">
            <img src={user.photo} alt={`${user.name} foto`} className="photo" />
            <h2>{user.name}</h2>
          </div>
            )
        )}
      </div>
      <button
        onClick={() => handleLogin(userTarget)} >
        LOGIN
      </button>
    </div>
  )
}

export default LoginPage;