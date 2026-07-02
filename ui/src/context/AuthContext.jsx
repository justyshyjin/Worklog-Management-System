import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import axiosClient from "../api/axiosClient";

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

    const checkAuth = async () => {

        const token =
            localStorage.getItem(
                "access_token"
            );


        if(!token)
        {
            setLoading(false);
            return;
        }


        try {

            const response =
                await axiosClient.get(
                    "/auth/me"
                );


            setUser(
                response.data
            );

            setIsAuthenticated(true);


        }
        catch(error)
        {

            localStorage.removeItem(
                "access_token"
            );

            localStorage.removeItem(
                "user"
            );


            setUser(null);

            setIsAuthenticated(false);

        }


        setLoading(false);

    };


    checkAuth();


},[]);

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