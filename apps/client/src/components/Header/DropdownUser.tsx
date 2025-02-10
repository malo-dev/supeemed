import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Utilisation de useNavigate
import ClickOutside from "../ClickOutside";
import UserOne from "../../../public/download.png";
import React from "react";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState(""); 
  const [role, setRole] = useState(""); // Nouveau state pour stocker le nom d'utilisateur
  const navigate = useNavigate(); // Utilisation du hook useNavigate pour la redirection

  useEffect(() => {
    // Vérifie si un token est présent dans le localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const parsedToken = JSON.parse(token); // On suppose que le token est un JSON
        setUsername(parsedToken.username); 
        setRole(parsedToken.role)// Extraire et stocker le nom d'utilisateur
      } catch (error) {
        console.error("Erreur lors de la récupération du token", error);
      }
    }
  }, []); // L'effet se déclenche une seule fois, à l'initialisation

  const handleLogout = () => {
    // Suppression des informations d'authentification (par exemple, dans le localStorage ou sessionStorage)
    localStorage.removeItem("token");

    // Redirection vers la page de connexion
    navigate("/"); // Remplace "/login" par l'URL de votre page de connexion
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {username || "..."} {/* Affiche le nom d'utilisateur */}
          </span>
          <span className="block text-xs">{role || "..."} {/* Affiche le nom d'utilisateur */}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Icon du paramètre ici */}
                </svg>
                Paramètres
              </Link>
            </li>

            {/* Ajout du bouton Log Out */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Icon de déconnexion */}
                </svg>
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
