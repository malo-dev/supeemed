import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../../layout/adminLayout";

const url = "http://localhost:3000/resident";

export default function ResidenceManagement() {

  const [residences, setResidences] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    requestingEmployeeId: "",
    startDate: "",
    endDate: "",
    status: "pending",
    employeeName: "",
    employeeId: "",
    reason: "",
    requestingEmployeeName : ""
  });
  const itemsPerPage = 5;
  useEffect(() => {
    fetchResidences();
  }, []);

 

  const totalPages = Math.ceil(residences.length / itemsPerPage);
  const paginatedResidences = residences.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

 




  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce résident ?")) {
      try {
        await axios.delete(`${url}/${id}`);
        fetchResidences();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };


  // NEW ONE 




  const fetchResidences = async () => {
    try {
      const response = await axios.get(url);
      if (response.data.status === 200) {
        setResidences(response.data.result || []);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des résidences:", error);
    }
  };

  const handleOpenModal = (residence = null) => {
    setEditData(residence);
    setFormData(
      residence || {
        name: "",
        location: "",
        requestingEmployeeId: "",
        startDate: "",
        endDate: "",
        status: "pending",
        employeeName: "",
        employeeId: "",
        reason: ""
      }
    );
    setIsModalOpen(true);
  };



  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
    setFormData({
      name: "",
      location: "",
      requestingEmployeeId: "",
      startDate: "",
      endDate: "",
      status: "pending",
      employeeName: "",
      employeeId: "",
      reason: "",
      requestingEmployeeName : ""
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      if (editData) {
        await axios.put(`${url}/${editData.id}`, formData);
      } else {
        await axios.post(url, formData);
      }
      fetchResidences();
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
    }
  };

  
  return (
    <DefaultLayout>
       <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Espace de gestion de  residence</h1>

      {/* Bouton pour ajouter un résident */}
      <button
        onClick={() => handleOpenModal()}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Ajouter un gestionnaire de résidence
      </button>

      {/* Tableau des résidences */}
      <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-600 text-left">
              <th className="py-3 px-4 font-semibold text-sm">ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Nom</th>
              <th className="py-3 px-4 font-semibold text-sm">Localisation</th>
           
              <th className="py-3 px-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedResidences.map((residence) => (
              <tr
                key={residence.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-3 px-4 text-sm">{residence.id}</td>
                <td className="py-3 px-4 text-sm">{residence.name}</td>
                <td className="py-3 px-4 text-sm">{residence.location}</td>
              
                <td className="py-3 px-4 text-sm flex gap-2">
                  <button
                    onClick={() => handleOpenModal(residence)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => handleDelete(residence.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Précédent
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Suivant
        </button>
      </div>

      {/* Formulaire modal */}
      {isModalOpen && (
         
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">{editData ? "Éditer Résident" : "Ajouter Résident"}</h2>
              <div className="space-y-4">
                <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md" />
                <input type="text" name="location" placeholder="Localisation" value={formData.location} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md" />
                <input type="number" name="requestingEmployeeId" placeholder="ID Employé" value={formData.requestingEmployeeId} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md" />
               
                <input type="text" name=" requestingEmployeeName" placeholder=" requestingEmployeeName " value={formData. requestingEmployeeName} className="w-full px-4 py-2 border rounded-md" />
                <input type="date" name="startDate" placeholder="Date de début" value={formData.startDate} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md" />
                <input type="date" name="endDate" placeholder="Date de fin" value={formData.endDate} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md" />
                <input type="text" name="employeeName" placeholder="Nom Employé" value={formData.employeeName} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md" />
                <input type="number" name="employeeId" placeholder="ID Employé" value={formData.employeeId} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md" />
                <input type="text" name="reason" placeholder="Raison" value={formData.reason} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md" />
                <div className="flex justify-end space-x-2">
                  <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Annuler</button>
                  <button onClick={handleFormSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Enregistrer</button>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
    </DefaultLayout>
   
  );
}
