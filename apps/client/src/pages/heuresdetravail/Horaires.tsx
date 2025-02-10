import React from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

const Horaires = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end p-4">
        <Link
          to="/ajouter-horaire"
          className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90"
        >
          Ajouter un horaire
        </Link>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Liste des horaires de travail
          </h3>
        </div>
        <div className="p-4 md:p-6 xl:p-9">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">
                    N°
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Nom
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Heure de début
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Heure de fin
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Jours de travail
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Statut
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    1
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    Horaire de jour
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    08:00
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    16:00
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    Lun - Ven
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                      Actif
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <BsFillPencilFill className="h-4 w-4" />
                      </button>
                      <button className="hover:text-primary">
                        <BsFillTrashFill className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horaires;
