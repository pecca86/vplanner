import { createContext, useContext, useReducer } from "react";

type State = {
    user: { name: string; email: string; avatar: string } | null;
    isAuthenticated: boolean;
}

type Action =
    | { type: "login"; payload: { name: string; email: string; avatar: string } }
    | { type: "logout" };

const AuthContext = createContext<{ user: { name: string; email: string; avatar: string } | null; isAuthenticated: boolean; login: (email: string, password: string) => boolean; logout: () => void } | undefined>(undefined);

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string): boolean {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      return true;
    }
    return false;
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export type AuthContextValue = {
    user: { name: string; email: string; avatar: string } | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
