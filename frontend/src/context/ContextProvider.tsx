import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  name: string;
  email: string;
}

interface VerifyResponse {
  success: boolean;
  user?: User;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }
  

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get<VerifyResponse>(
          `${import.meta.env.VITE_API_URL}/verify`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Verification failed:", error);
      }
    };
    verifyUser();
  }, []);
  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within a ContextProvider");
  }
  return context;
};
export default ContextProvider;
