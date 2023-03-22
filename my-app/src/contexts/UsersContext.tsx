import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUsersContextType {
  users: IUser[];
}

interface IUsersProviderProps {
  children: React.ReactNode;
}

export const UsersContext = createContext({} as IUsersContextType);

export function UsersProvider({ children }: IUsersProviderProps) {
  const [users, setUsers] = useState<IUser[]>([])

  async function loadUsers() {
    await axios.get("http://localhost:3333/users")
      .then(response => setUsers(response.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  )
}