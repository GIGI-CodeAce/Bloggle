import { createContext, useState } from "react";
import type { ReactNode } from "react";

// Define the context
export const UserContext = createContext<any>({});

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [ userInfo, setUserInfo ] = useState({})

  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
