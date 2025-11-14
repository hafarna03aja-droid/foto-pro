declare module '../contexts/AuthContext' {
  export interface User {
    email: string;
    name: string;
    loginTime: string;
  }

  export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => User;
    logout: () => void;
    isAuthenticated: boolean;
  }

  export function useAuth(): AuthContextType;
  export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element;
}
