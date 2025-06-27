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

  const login = async (
    email: string,
    password: string,
    role?: UserRole,
  ): Promise<void> => {
    setAuthState({
      ...authState,
      loading: true,
      error: null,
    });

    try {
      // Mock API call - would be replaced with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation with different test accounts
      let user: User | null = null;

      if (email === "admin@madafoot.com" && password === "admin123") {
        user = {
          id: "admin-1",
          name: "Administrateur",
          email: "admin@madafoot.com",
          phone: "+261 34 000 00 00",
          role: "admin",
          createdAt: "2024-01-01",
          lastLogin: new Date().toISOString(),
        };
      } else if (email === "owner@example.com" && password === "owner123") {
        user = {
          id: "owner-1",
          name: "Propriétaire Test",
          email: "owner@example.com",
          phone: "+261 34 111 11 11",
          role: "owner",
          subscription: {
            id: "sub-1",
            plan: "premium",
            status: "active",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            maxFields: 5,
            currentFields: 2,
            price: 120000,
          },
          createdAt: "2024-01-15",
          lastLogin: new Date().toISOString(),
        };
      } else if (email === "user@example.com" && password === "password123") {
        user = {
          id: "visitor-1",
          name: "Visiteur Test",
          email: "user@example.com",
          phone: "+261 34 567 89",
          role: "visitor",
          createdAt: "2024-02-01",
          lastLogin: new Date().toISOString(),
        };
      }

      if (!user) {
        throw new Error("Email ou mot de passe incorrect");
      }

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
    phone: string,
    role: UserRole,
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
        phone,
        role,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // For owner accounts, add default basic subscription
      if (role === "owner") {
        user.subscription = {
          id: `sub-${Date.now()}`,
          plan: "basic",
          status: "active",
          startDate: new Date().toISOString(),
          endDate: new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          maxFields: 2,
          currentFields: 0,
          price: 50000,
        };
      }

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

  const createVisitorBooking = async (
    bookingData: Omit<VisitorBooking, "id" | "createdAt">,
  ): Promise<string> => {
    try {
      // Mock API call for visitor booking
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const booking: VisitorBooking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      // Store booking temporarily (in real app, this would be sent to backend)
      const existingBookings = JSON.parse(
        localStorage.getItem("visitor_bookings") || "[]",
      );
      existingBookings.push(booking);
      localStorage.setItem(
        "visitor_bookings",
        JSON.stringify(existingBookings),
      );

      return booking.id;
    } catch (error) {
      throw new Error("Erreur lors de la création de la réservation");
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
    <AuthContext.Provider
      value={{ authState, login, register, createVisitorBooking, logout }}
    >
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
