import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate de react-router-dom

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Hook de navigation pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');  // Reset des erreurs

    const userData = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Réponse de l\'API:', data);

        // Stocker les données de l'utilisateur dans le localStorage
        localStorage.setItem('token', JSON.stringify(data.data));

        // Vérification du rôle dans le nom d'utilisateur et redirection
        if (data.data.username.toLowerCase().includes('admin')) {
          navigate('/tous-les-plannings');  // Rediriger vers /tous-les-plannings pour un admin
        } else if (username.toLowerCase().includes('resident')) {
          navigate('/resident');  // Rediriger vers /resident pour un résident
        } else if (username.toLowerCase().includes('emp')) {
          navigate('/mes-plannings');  // Rediriger vers /mes-plannings pour un employé
        } else {
          setError('Vous n\'avez aucun rôle dans l\'entreprise');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur lors de la connexion');
      }
    } catch (err) {
      setError('Erreur réseau: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      {/* Arrière-plan flouté avec animation */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-[5px] opacity-40 animate-blur background-image[url('https://via.placeholder.com/1500')]"></div>

      {/* Formulaire au premier plan */}
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-96 z-10">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Se connecter</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}  {/* Affichage des erreurs */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}  // Désactive le bouton pendant le chargement
          >
            {loading ? 'Chargement...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
