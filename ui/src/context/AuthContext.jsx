import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext =
  createContext(null);

export const AuthProvider = ({
  children
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [isAuthenticated,
    setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "access_token"
      );

    const userData =
      localStorage.getItem(
        "user"
      );

    if (token && userData) {
      setUser(
        JSON.parse(userData)
      );

      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (
    token,
    userData
  ) => {
    localStorage.setItem(
      "access_token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);