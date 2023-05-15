import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const token = localStorage.getItem('jwt');
    if (token) {
      // Récupérer les informations de l'utilisateur à partir du token
      const user = decodeToken(token);
      setUser(user);
    } else {
      // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      router.replace('/Sign');
    }
  }, []);

  const login = (token) => {
    // Enregistrer le token dans le localStorage
    localStorage.setItem('jwt', token);
    // Récupérer les informations de l'utilisateur à partir du token
    const user = decodeToken(token);
    setUser(user);
  };

  const logout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('jwt');
    setUser(null);
    // Rediriger vers la page de connexion
    router.replace('/Sign');
  };

  return { user, login, logout };
};

function decodeToken(token) {
  // Implémenter la logique pour décoder le token JWT ici
  return { name: 'John Doe', email: 'john.doe@example.com' };
}

export default useAuth;
