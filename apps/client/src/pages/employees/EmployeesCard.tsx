import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import React from "react";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaUserCheck, FaCircle } from "react-icons/fa"; // Import de l'icône de statut en ligne
import { Link } from "react-router-dom";

const UsersCard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => newRequest.get(`/users`).then((res) => res.data),
  });

  if (isLoading) return <div>Chargement des données...</div>;
  if (error) return <div>Erreur lors du chargement des données</div>;

  console.log(data);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
      <div className="grid grid-cols-1 items-center sm:grid-cols-7 gap-3">
        {/* Affichage des détails de l'utilisateur */}
        <div className="relative text-left w-20 h-20">
          img{/* Point vert temporaire attaché à l'image */}
        </div>

        <div className="text-left">
          <h3 className="font-medium text-gray-500 dark:text-gray-300">
            Prénom
          </h3>
          <p className="text-black dark:text-white">{data?.username}</p>
        </div>
        <div className="text-left">
          <h3 className="font-medium text-gray-500 dark:text-gray-300">Nom</h3>
          <p className="text-black dark:text-white">{data?.subname}</p>
        </div>
        <div className="text-left">
          <h3 className="font-medium text-gray-500 dark:text-gray-300">
            Poste
          </h3>
          <p className="text-black dark:text-white">{}</p>
        </div>
        <div className="text-left">
          <h3 className="font-medium text-gray-500 dark:text-gray-300">
            Matricule
          </h3>
          <p className="text-black dark:text-white">{}</p>
        </div>

        <div className="flex  gap-2">
          <button className="bg-slate-600 cursor-pointer flex items-center gap-1 text-white text-sm p-2 rounded">
            <FaUserCheck color="yellow" size={20} />
            <span>Présence</span>
          </button>
          <Link to={``}>
            <button className="bg-slate-600 cursor-pointer items-center flex gap-1 text-white p-2 text-sm rounded">
              <FaRegFolderOpen color="yellow" size={20} />
              <span>Dossier</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;




