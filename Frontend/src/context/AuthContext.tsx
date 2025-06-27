import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthState, UserRole, VisitorBooking } from "../types";

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string,
    role: UserRole,
  ) => Promise<void>;
  createVisitorBooking: (
    bookingData: Omit<VisitorBooking, "id" | "createdAt">,
  ) => Promise<string>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("madafoot_user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem("madafoot_user");
        setAuthState({
          ...initialState,
          loading: false,
        });
      }
    } else {
      setAuthState({
        ...initialState,
        loading: false,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setAuthState({
      ...authState,
      loading: true,
      error: null,
    });

    try {
      // Mock API call - would be replaced with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (email !== "user@example.com" || password !== "password123") {
        throw new Error("Email ou mot de passe incorrect");
      }

      const user: User = {
        id: "1",
        name: "John Doe",
        email: "user@example.com",
        phone: "+261 34 567 89",
      };

      // Store user in localStorage
      localStorage.setItem("madafoot_user", JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error:
          error instanceof Error ? error.message : "Une erreur est survenue",
      });
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    setAuthState({
      ...authState,
      loading: true,
      error: null,
    });

    try {
      // Mock API call - would be replaced with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user: User = {
        id: Date.now().toString(),
        name,
        email,
      };

      // Store user in localStorage
      localStorage.setItem("madafoot_user", JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error:
          error instanceof Error ? error.message : "Une erreur est survenue",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("madafoot_user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
