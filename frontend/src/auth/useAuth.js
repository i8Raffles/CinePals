import {useState, createContext} from "react";
import axios from "axios";

export const UserContext = createContext();

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (userName, password) => {
      // axios.xxx
      setUser({
          userName
      });
  };

  return { user, login };
}
