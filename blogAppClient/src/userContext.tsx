import { createContext, useState } from "react";
import type { ReactNode } from "react"; // Type-only import

// Define the context
export const UserContext = createContext<any>({}); // Define the context value type

interface UserContextProviderProps {
  children: ReactNode; // Use ReactNode for children prop
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [ userInfo, setUserInfo ] = useState({})

  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
