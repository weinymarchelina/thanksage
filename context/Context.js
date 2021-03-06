import { createContext, useContext, useState } from "react";
export const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
