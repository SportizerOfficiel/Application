/** @format */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const token = localStorage.getItem("jwt");
    if (token) {
      // Récupérer les informations de l'utilisateur à partir du token
      const user = decodeToken(token);
      setUser(user);
    }
  }, []);
  const ProtectedRoute = () => {
    // Vérifier si l'utilisateur est authentifié
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.replace("/Sign");
    }
  };

  const login = (token) => {
    // Enregistrer le token dans le localStorage
    localStorage.setItem("jwt", token);
    // Récupérer les informations de l'utilisateur à partir du token
    const user = decodeToken(token);
    setUser(user);
  };

  const logout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("jwt");
    setUser(null);
    // Rediriger vers la page de connexion
    router.replace("/Sign");
  };

  return { user, login, logout, ProtectedRoute };
};

function decodeToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    // Handle errors here
    console.log(error);
    return null;
  }
}

export default useAuth;
